"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ColonIcon } from "@/components/ui/ColonIcon";

const CARDS = [
  {
    imageSrc: "/images/debaleena.jpg",
    objectPosition: "center bottom",
    imageScale: undefined as number | undefined,
    heading: "Debaleena Basu",
    role: "Co-Founder",
    ctaHref: "https://www.linkedin.com/in/debaleena2003/",
    ctaLabel: "LinkedIn",
    email: "debaleena@noxstudios.co",
  },
  {
    imageSrc: "/images/aritrya.jpg",
    objectPosition: "center bottom",
    imageScale: undefined as number | undefined,
    heading: "Aritrya Sanyal",
    role: "Co-Founder",
    ctaHref: "https://www.linkedin.com/in/aritrya-sanyal/",
    ctaLabel: "LinkedIn",
    email: "aritrya@noxstudios.co",
  },
];

function PersonCard({ card, index }: { card: (typeof CARDS)[0]; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fallbackTimer: ReturnType<typeof setTimeout> | undefined;

    // Synchronously hide before animation so there's no flash — only when motion is allowed.
    // Without JS, elements remain visible (opacity not set in JSX).
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "0";
      const photoEl = el.querySelector<HTMLElement>("[data-photo]");
      const headerEl = el.querySelector<HTMLElement>("[data-header-row]");
      const listEls = Array.from(el.querySelectorAll<HTMLElement>("[data-list-item]"));
      if (photoEl) photoEl.style.opacity = "0";
      if (headerEl) headerEl.style.opacity = "0";
      listEls.forEach((li) => { li.style.opacity = "0"; });
    }

    import("animejs").then((mod) => {
      const photo     = el.querySelector<HTMLElement>("[data-photo]");
      const headerRow = el.querySelector<HTMLElement>("[data-header-row]");
      const listItems = Array.from(el.querySelectorAll<HTMLElement>("[data-list-item]"));

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const accent    = el.querySelector<HTMLElement>("[data-accent]");
      const divider   = el.querySelector<HTMLElement>("[data-divider]");

      // el, photo, headerRow, listItems already hidden above — set transforms only
      if (accent)    { accent.style.opacity = "0"; accent.style.transformOrigin = "left"; }
      if (headerRow) { headerRow.style.transform = "translateY(6px)"; }
      if (divider)   { divider.style.opacity = "0"; divider.style.transformOrigin = "left"; }
      listItems.forEach((li) => { li.style.transform = "translateX(-6px)"; });

      const base = index * 120;

      const revealAll = () => {
        el.style.opacity = "1";
        if (accent)    { (accent as HTMLElement).style.opacity = "1"; (accent as HTMLElement).style.transform = "scaleX(1)"; }
        if (photo)     (photo as HTMLElement).style.opacity = "1";
        if (headerRow) { (headerRow as HTMLElement).style.opacity = "1"; (headerRow as HTMLElement).style.transform = "none"; }
        if (divider)   { (divider as HTMLElement).style.opacity = "1"; (divider as HTMLElement).style.transform = "scaleX(1)"; }
        listItems.forEach((li) => { li.style.opacity = "1"; li.style.transform = "none"; });
      };

      // Fallback: if observer never fires (card not scrolled into view enough), reveal after delay
      fallbackTimer = setTimeout(revealAll, 3000 + base);

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observerRef.current?.disconnect();
          clearTimeout(fallbackTimer);

          const tl = mod.createTimeline({ defaults: { ease: "outQuart" } });

          tl.add(el, { opacity: 1, duration: 30, ease: "linear" }, base)
            .add(el, { opacity: 0, duration: 25, ease: "linear" }, base + 30)
            .add(el, { opacity: 1, duration: 20, ease: "linear" }, base + 55)
            .add(el, { opacity: 0, duration: 30, ease: "linear" }, base + 75)
            .add(el, { opacity: 1, duration: 35, ease: "linear" }, base + 105);

          if (accent) {
            tl.add(accent, { opacity: 1, scaleX: [0, 1], duration: 380 }, base + 160);
            tl.add(accent, { opacity: 0.35, duration: 60, ease: "linear" }, base + 540);
            tl.add(accent, { opacity: 1,    duration: 100, ease: "linear" }, base + 600);
          }

          if (photo)     tl.add(photo,     { opacity: 1, duration: 400 },                    base + 240);
          if (headerRow) tl.add(headerRow, { opacity: 1, translateY: [6, 0], duration: 350 }, base + 320);
          if (divider)   tl.add(divider,   { opacity: 1, scaleX: [0, 1], duration: 400 },     base + 520);

          listItems.forEach((item, i) => {
            tl.add(item, { opacity: 1, translateX: [-6, 0], duration: 320 }, base + 660 + i * 100);
          });
        },
        { threshold: 0.05, rootMargin: "0px 0px -20px 0px" }
      );

      observerRef.current.observe(el);
    }).catch(() => {
      el.style.opacity = "1";
      const photo     = el.querySelector<HTMLElement>("[data-photo]");
      const headerRow = el.querySelector<HTMLElement>("[data-header-row]");
      const listItems = Array.from(el.querySelectorAll<HTMLElement>("[data-list-item]"));
      if (photo)     photo.style.opacity = "1";
      if (headerRow) headerRow.style.opacity = "1";
      listItems.forEach((li) => { li.style.opacity = "1"; });
    });

    return () => { observerRef.current?.disconnect(); clearTimeout(fallbackTimer); };
  }, [index]);

  return (
    <article
      ref={ref}
      className="group relative flex flex-col items-center bg-nox-black transition-colors duration-[350ms] hover:bg-nox-surface pt-10 px-6 pb-6 gap-8 md:pt-[8.93rem] md:px-[2.23rem] md:pb-[2.23rem] md:gap-[7.82rem]"
    >
      {/* Top accent line */}
      <div
        data-accent
        className="absolute top-0 left-0 right-0 h-[2px] bg-nox-gold"
        style={{ opacity: 0 }}
      />

      {/* Image — 210×140px, centered, with corner ticks */}
      <div className="relative w-full max-w-[17.057rem] aspect-[272/182]">
        <span className="absolute -top-2 -left-1 z-10 h-2 w-1 bg-nox-white" aria-hidden />
        <span className="absolute -top-2 -right-1 z-10 h-2 w-1 bg-nox-white" aria-hidden />
        <span className="absolute -bottom-2 -right-1 z-10 h-2 w-1 bg-nox-white" aria-hidden />
        <span className="absolute -bottom-2 -left-1 z-10 h-2 w-1 bg-nox-white" aria-hidden />
        <div
          data-photo
          className="absolute inset-0 overflow-hidden"
        >
          <Image
            src={card.imageSrc}
            alt={`${card.heading}, ${card.role}`}
            fill
            sizes="(max-width: 768px) 100vw, 272px"
            className="object-cover grayscale"
            style={{
              objectPosition: card.objectPosition,
              ...(card.imageScale ? { transform: `scale(${card.imageScale})`, transformOrigin: "center top" } : {}),
            }}
          />
        </div>
      </div>

      {/* Content — full width */}
      <div
        data-header-row
        className="flex w-full flex-col gap-8 md:gap-[3.35rem]"
      >
        {/* Details — centered 402px column */}
        <div
          className="mx-auto flex flex-col"
          style={{ gap: "0.558rem", width: "100%", maxWidth: "25.125rem" }}
        >
          <h3 className="font-mono-display text-[1.25rem] leading-[1.2] tracking-[-0.04em] text-nox-white">
            {card.heading}
          </h3>
          <p className="font-mono-display text-[0.75rem] uppercase leading-snug tracking-[0.08em] text-nox-white/70">
            {card.role}
          </p>
        </div>

        {/* CTA rows — 8px gap, full-bleed via negative margin */}
        <div className="flex flex-col gap-2" style={{ marginLeft: "-2.23rem", marginRight: "-2.23rem", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <Link
            data-list-item
            href={card.ctaHref}
            target={card.ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={card.ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
            className="hover-blink flex items-center justify-end bg-nox-surface hover:bg-nox-black transition-colors duration-200"
            style={{ gap: "1.117rem", padding: "0.875rem 1.117rem 0.875rem 2.23rem" }}
          >
            <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center flex-none text-nox-gold">
              <ColonIcon fill="currentColor" />
            </span>
            <span className="font-mono-display text-[0.75rem] tracking-[0.08em] text-nox-white">
              {card.ctaLabel}
            </span>
          </Link>

          <Link
            data-list-item
            href={`mailto:${card.email}`}
            className="hover-blink flex items-center justify-end bg-nox-surface hover:bg-nox-black transition-colors duration-200"
            style={{ gap: "1.117rem", padding: "0.875rem 1.117rem 0.875rem 2.23rem" }}
          >
            <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center flex-none text-nox-gold">
              <ColonIcon fill="currentColor" />
            </span>
            <span className="font-mono-display text-[0.75rem] tracking-[0.08em] text-nox-white">
              {card.email}
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export function About() {
  return (
    <section id="about" className="relative bg-nox-black pb-16 md:pb-24">
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">
        <div className="flex flex-col" style={{ gap: "2.79rem" }}>

          {/* Heading */}
          <div className="flex flex-col gap-6">
            <div data-heading-reveal className="flex items-center gap-2">
              <span aria-hidden className="font-mono-display text-[0.75rem] text-nox-gold">./</span>
              <span className="font-mono-display text-[0.75rem] text-nox-white/40">about</span>
            </div>

            <h2 className="font-display text-[2rem] leading-[1.2] tracking-[-0.04em]">
              <span data-heading-reveal className="block text-nox-white">Story and strategy.</span>
              <span data-heading-reveal className="block text-nox-gold">That&apos;s the whole team.</span>
            </h2>

            <p data-heading-reveal className="max-w-[42ch] font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
              The people who lose sleep over whether your product is coming across right. You work directly with us.
            </p>
          </div>

          {/* Cards grid — no border container, gap-[0.558rem] */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "0.558rem" }}>
            {CARDS.map((card, i) => (
              <PersonCard key={card.heading} card={card} index={i} />
            ))}
          </div>

          {/* Body copy */}
          <div className="flex flex-col gap-8 max-w-[65ch]">
            <p className="font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white">
              We started Nox because we&apos;d seen enough great products lose the room. In every place we worked, the video was always last. Tightest deadline, smallest window, least amount of thinking. We always knew it mattered. The process never treated it that way.
            </p>
            <p className="font-mono-display text-[0.875rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
              We&apos;ve seen an eighteen-month build dismissed in a meeting because the video looked like a prototype. The product was ready. The story wasn&apos;t. Explanation has become the overlooked part. And that&apos;s exactly where the opportunity is.
            </p>
            <p className="font-mono-display text-[0.875rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
              A product video done right isn&apos;t a marketing asset. It&apos;s the highest ROI investment a founder can make because clarity creates conviction, and conviction is what closes rooms. We build what makes that happen.
            </p>
          </div>

          {/* CTA */}
          <div className="flex justify-start">
            <Link
              href="https://cal.com/aritrya-sanyal/introductory-call.-30-mins"
              target="_blank"
              rel="noopener noreferrer"
              className="group hover-blink inline-flex flex-none items-center gap-4 bg-nox-white hover:bg-nox-gray transition-colors duration-200 px-6 py-3"
            >
              <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center text-nox-black group-hover:text-nox-gold transition-colors duration-200">
                <ColonIcon fill="currentColor" />
              </span>
              <span className="font-mono text-[0.75rem] font-normal tracking-[0.04em] leading-[1.2] text-nox-black group-hover:text-nox-white transition-colors duration-200">
                Tell Us What You Are Building
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
