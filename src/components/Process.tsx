"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import { ColonIcon } from "@/components/ui/ColonIcon";
const STEPS = [
  {
    step: "01",
    heading: "Discovery & Script",
    items: [
      "One agreed goal before going into production.",
      "Brand assets in. No mid-project delays.",
      "Script locked. Written for you or with you.",
    ],
  },
  {
    step: "02",
    heading: "Design Direction",
    items: [
      "Storyboard, styleframes, music: see and hear what gets made.",
      "Nothing moves forward without your sign-off.",
      "If the direction misses, you get a full refund.",
    ],
  },
  {
    step: "03",
    heading: "Animation & Delivery",
    items: [
      "Two rounds of revisions per project.",
      "Production complete. Ready to go live.",
      "Final delivery with all required specs.",
    ],
  },
];

type AnimeModule = typeof import("animejs");

function StepCard({
  step,
  heading,
  items,
  index,
}: {
  step: string;
  heading: string;
  items: string[];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const animeRef = useRef<AnimeModule | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    import("animejs").then((mod) => {
      animeRef.current = mod;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const accent    = el.querySelector<HTMLElement>("[data-accent]");
      const headerRow = el.querySelector<HTMLElement>("[data-header-row]");
      const divider   = el.querySelector<HTMLElement>("[data-divider]");
      const listItems = Array.from(el.querySelectorAll<HTMLElement>("[data-list-item]"));

      el.style.opacity = "0";
      if (accent)    { accent.style.opacity = "0"; accent.style.transformOrigin = "left"; }
      if (headerRow) { headerRow.style.opacity = "0"; headerRow.style.transform = "translateY(6px)"; }
      if (divider)   { divider.style.opacity = "0"; divider.style.transformOrigin = "left"; }
      listItems.forEach((li) => { li.style.opacity = "0"; li.style.transform = "translateX(-6px)"; });

      const base = index * 180;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observerRef.current?.disconnect();

          const tl = mod.createTimeline({ defaults: { ease: "outQuart" } });

          tl.add(el, { opacity: 1, duration: 30, ease: "linear" }, base)
            .add(el, { opacity: 0, duration: 25, ease: "linear" }, base + 30)
            .add(el, { opacity: 1, duration: 20, ease: "linear" }, base + 55)
            .add(el, { opacity: 0, duration: 30, ease: "linear" }, base + 75)
            .add(el, { opacity: 1, duration: 35, ease: "linear" }, base + 105);

          if (accent) {
            tl.add(accent, { opacity: 1, scaleX: [0, 1], duration: 380 }, base + 160);
            tl.add(accent, { opacity: 0.35, duration: 35, ease: "linear" }, base + 540);
            tl.add(accent, { opacity: 1,    duration: 55, ease: "linear" }, base + 575);
          }

          if (headerRow) tl.add(headerRow, { opacity: 1, translateY: [6, 0], duration: 350 }, base + 260);

          if (divider) tl.add(divider, { opacity: 1, duration: 300 }, base + 520);

          listItems.forEach((item, i) => {
            tl.add(item, { opacity: 1, translateX: [-6, 0], duration: 200 }, base + 660 + i * 60);
          });
        },
        { threshold: 0.15, rootMargin: "-60px 0px" }
      );

      observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, [index]);


  return (
    <article
      ref={ref}
      className="group relative flex flex-col bg-nox-black overflow-hidden"
    >
      {/* Top accent line */}
      <div data-accent className="absolute top-0 left-0 right-0 h-[2px] bg-nox-gold" style={{ opacity: 0 }} />

      {/* Header row */}
      <div data-header-row className="border-b border-white/[0.08]">
        <div className="px-6 pt-6 pb-3">
          <span className="font-mono-display text-[0.6875rem] tracking-[0.08em] text-nox-white/40">
            {step}
          </span>
        </div>
        <div className="px-6 pb-6">
          <h3 className="font-mono-display text-[1.25rem] leading-[1.2] tracking-[-0.04em] text-nox-white">
            {heading}
          </h3>
        </div>
      </div>

      {/* Items */}
      <ul className="flex flex-col">
        {items.map((item, i) => (
          <li
            key={i}
            data-list-item
            className="flex items-center gap-3 border-b border-white/[0.08] px-6 py-4 last:border-b-0"
          >
            <span className="flex-none font-mono-display text-[0.625rem] text-nox-gold/50" aria-hidden>—</span>
            <span className="font-mono-display text-[0.875rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-nox-black pb-16 md:pb-24">
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">

        <div className="mb-16 flex flex-col gap-6">
          <div data-heading-reveal className="flex items-center gap-2">
            <span aria-hidden className="font-mono-display text-[0.75rem] text-nox-gold">./</span>
            <span className="font-mono-display text-[0.75rem] text-nox-white/40">process</span>
          </div>

          <h2 className="font-display text-[2rem] leading-[1.2] tracking-[-0.04em]">
            <span data-heading-reveal className="block text-nox-white">How we work.</span>
            <span data-heading-reveal className="block text-nox-gold">Why it works.</span>
          </h2>

          <p data-heading-reveal className="max-w-[42ch] font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
            Founders come to us with a product. Our job is to figure out what the video needs to make their user feel, and what it needs to make them believe.
          </p>
        </div>

        <div className="relative border border-white/[0.08]">
          <span className="absolute -top-2 -left-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
          <span className="absolute -top-2 -right-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
          <span className="absolute -bottom-2 -right-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
          <span className="absolute -bottom-2 -left-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.08]">
            {STEPS.map((s, i) => (
              <StepCard key={s.step} {...s} index={i} />
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-start">
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
              Book a Call
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
