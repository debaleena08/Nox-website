"use client";

import { useRef, useEffect } from "react";

const SERVICES = [
  {
    index: "01",
    name: "Product Explainers",
    descriptor: "Conceptual. Why it matters.",
  },
  {
    index: "02",
    name: "Product Demos",
    descriptor: "Walkthroughs. What it does.",
  },
  {
    index: "03",
    name: "Launch Videos",
    descriptor: "Demo Day. Product Hunt. Fundraise.",
  },
];

export function Services() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const rows = Array.from(el.querySelectorAll<HTMLElement>("[data-service-row]"));
    rows.forEach((r) => { r.style.opacity = "0"; });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        import("animejs").then((mod) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            rows.forEach((r) => { r.style.opacity = "1"; });
            return;
          }
          const tl = mod.createTimeline({});
          rows.forEach((row, i) => {
            const base = i * 80;
            tl.add(row, { opacity: 1, duration: 20, ease: "linear" }, base)
              .add(row, { opacity: 0, duration: 20, ease: "linear" }, base + 20)
              .add(row, { opacity: 1, duration: 25, ease: "linear" }, base + 40);
          });
        }).catch(() => {
          rows.forEach((r) => { r.style.opacity = "1"; });
        });
      },
      { threshold: 0.1, rootMargin: "-20px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-nox-black pt-16 pb-16 md:pt-24 md:pb-24">

      {/* Heading — contained */}
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">
        <div className="mb-16 flex flex-col gap-6">
          <div data-heading-reveal className="flex items-center gap-2">
            <span aria-hidden className="font-mono-display text-[0.75rem] text-nox-gold">./</span>
            <span className="font-mono-display text-[0.75rem] text-nox-white/40">services</span>
          </div>
          <h2 className="font-display text-[2rem] leading-[1.2] tracking-[-0.04em]">
            <span data-heading-reveal className="block text-nox-white">What we make.</span>
            <span data-heading-reveal className="block text-nox-gold">Talks before you do.</span>
          </h2>
          <p data-heading-reveal className="max-w-[42ch] font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
            The videos founders reach for before a launch, a raise, or a sales call.
          </p>
        </div>
      </div>

      {/* Service panels — full-width */}
      <div ref={listRef} className="flex flex-col">
        {SERVICES.map((service) => (
          <div
            key={service.index}
            data-service-row
            className="relative bg-nox-black border-t border-nox-white/[0.08] py-6 md:py-8 flex items-center"
          >

            <span aria-hidden className="absolute top-0.5 left-1 w-1 h-2 bg-nox-white" />

            {/* Content — contained */}
            <div className="container mx-auto w-full max-w-[calc(100%-3rem)] flex items-center justify-between gap-8">
              <span className="flex-none font-mono text-[0.75rem] tracking-[0.1em] text-nox-white/20 w-6">
                {service.index}
              </span>
              <span className="flex-1 font-mono text-[1.25rem] sm:text-[1.5rem] md:text-[1.75rem] leading-[1.2] tracking-[-0.03em] text-nox-white uppercase">
                {service.name}
              </span>
              <span className="hidden md:block font-mono text-[0.75rem] tracking-[0.08em] text-nox-white/70 flex-none">
                {service.descriptor}
              </span>
            </div>
          </div>
        ))}

        {/* Closing border */}
        <div className="border-t border-nox-white/[0.08]" />
      </div>

    </section>
  );
}
