// Downloads all assets referenced by the live aurigaspace.com page to public/
// Reads docs/research/asset-urls.txt and writes binaries under public/{images,videos,fonts,seo}/.
import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const URL_FILE = path.join(ROOT, 'docs/research/asset-urls.txt');
const ASSET_MAP_FILE = path.join(ROOT, 'docs/research/asset-map.json');

function classify(url) {
  const u = decodeURIComponent(url);
  if (/\.(mp4|webm|mov)$/i.test(u)) return 'videos';
  if (/\.(ttf|otf|woff2?)$/i.test(u)) return 'fonts';
  if (/(favicon|webclip|apple-touch-icon|ogimage|webmanifest)/i.test(u)) return 'seo';
  return 'images';
}

function baseName(url) {
  const decoded = decodeURIComponent(url);
  let name = decoded.split('?')[0].split('#')[0].split('/').pop() || 'asset';
  name = name.replace(/[^A-Za-z0-9._-]/g, '_');
  return name;
}

async function ensureDir(p) { await fs.mkdir(p, { recursive: true }); }

async function downloadOne(url) {
  const folder = classify(url);
  const fname = baseName(url);
  const outDir = path.join(ROOT, 'public', folder);
  const outPath = path.join(outDir, fname);
  await ensureDir(outDir);
  try {
    const exists = await fs.stat(outPath).then(s => s.size > 0).catch(() => false);
    if (exists) return { url, outPath, status: 'cached', folder, fname };
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return { url, outPath, status: `http_${res.status}`, folder, fname };
    const buf = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(outPath, buf);
    return { url, outPath, status: 'ok', bytes: buf.length, folder, fname };
  } catch (e) {
    return { url, outPath, status: 'err:' + e.message, folder, fname };
  }
}

async function pool(items, concurrency, worker) {
  const results = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: concurrency }, async () => {
    while (i < items.length) {
      const idx = i++;
      results[idx] = await worker(items[idx], idx);
      const r = results[idx];
      const tag = r.status === 'ok' ? `${(r.bytes / 1024).toFixed(0)}kb` : r.status;
      process.stdout.write(`[${idx + 1}/${items.length}] ${r.fname} ${tag}\n`);
    }
  }));
  return results;
}

const raw = await fs.readFile(URL_FILE, 'utf8');
const urls = [...new Set(
  raw.split(/\r?\n/)
    .map(l => l.replace(/^[^:]+:/, '').trim())
    .flatMap(l => l.split(/,\s*/))
    .map(s => s.replace(/\s+\d+w$/, '').trim())
    .filter(s => /^https?:\/\//.test(s))
)];

console.log(`Downloading ${urls.length} assets...`);
const results = await pool(urls, 6, downloadOne);

const map = {};
for (const r of results) {
  map[r.url] = { local: '/' + path.relative(path.join(ROOT, 'public'), r.outPath), status: r.status, folder: r.folder };
}
await fs.writeFile(ASSET_MAP_FILE, JSON.stringify(map, null, 2));
const ok = results.filter(r => r.status === 'ok').length;
const cached = results.filter(r => r.status === 'cached').length;
const err = results.filter(r => r.status.startsWith('err') || r.status.startsWith('http_')).length;
console.log(`\nDone. ok=${ok} cached=${cached} err=${err} total=${results.length}`);
console.log(`Asset map written to ${path.relative(ROOT, ASSET_MAP_FILE)}`);
