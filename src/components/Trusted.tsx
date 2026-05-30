"use client";

import { useRef, useEffect } from "react";

const CLIENTS = [
  { name: "Amurex" },
  { name: "Parsewise" },
  { name: "Asteroid" },
];

export function Trusted() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-client]"));
    items.forEach((t) => { t.style.opacity = "0"; });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        import("animejs").then((mod) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            items.forEach((t) => { t.style.opacity = ""; });
            return;
          }
          const tl = mod.createTimeline({});
          items.forEach((item, i) => {
            const base = i * 80;
            tl.add(item, { opacity: 1, duration: 20, ease: "linear" }, base)
              .add(item, { opacity: 0, duration: 20, ease: "linear" }, base + 20)
              .add(item, { opacity: 1, duration: 25, ease: "linear" }, base + 40);
          });
        }).catch(() => {
          items.forEach((t) => { t.style.opacity = "1"; });
        });
      },
      { threshold: 0.15, rootMargin: "-40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="pt-8 pb-16 md:pb-24">
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">
        <div className="flex flex-col items-center gap-10">
          <p
            data-heading-reveal
            className="font-mono text-[0.75rem] tracking-[0.08em] leading-[1.2] text-nox-white/40"
          >
            Trusted by
          </p>

          <div ref={ref} className="flex flex-wrap items-center justify-center gap-4 md:gap-16">
            {CLIENTS.map((client, idx) => (
              <div key={client.name} data-client className="flex items-center gap-4 md:gap-16">
                {idx > 0 && (
                  <span aria-hidden className="h-4 w-px bg-nox-white/20" />
                )}
                <span className="font-mono text-[0.875rem] md:text-[1rem] tracking-[0.18em] text-nox-white select-none">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
