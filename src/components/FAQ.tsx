"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ColonIcon } from "@/components/ui/ColonIcon";
type FAQItem = { q: string; a: string };

const FAQ_ITEMS: FAQItem[] = [
  {
    q: "How long does it take?",
    a: "Sprint delivers in 7 business days. Standard is 2–3 weeks. The clock starts the day your deposit clears, and all brand assets are in.",
  },
  {
    q: "What do you need from me?",
    a: "Your brand kit (logo SVG, color palette, fonts), product screenshots or UI captures, a voiceover script signed off internally (if applicable), and one point of contact who can approve work. You'll have 3 business days to respond to each draft. That's what helps us maintain the timeline.",
  },
  {
    q: "What types of revisions are offered?",
    a: "We keep it simple.\n\nCorrections: typos, timing, and minor tweaks within the approved scope. Always free.\nChanges: 2 rounds are included in each project.\n\nIf you want to shift the creative direction, script, or structure, that's a new scope. We'll bill separately before moving forward.",
  },
  {
    q: "What if your feedback is unclear or outside the original brief?",
    a: "We'll pause and get on a call before we touch anything. We'd rather take an extra day to get the direction right than deliver something that misses.",
  },
];

function FAQPanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const answerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-faq-item]"));
    items.forEach((t) => { t.style.opacity = "0"; });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        import("animejs").then((mod) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            items.forEach((t) => { t.style.opacity = "1"; });
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

  const handleSelect = (i: number) => {
    if (i === activeIndex) return;
    setActiveIndex(i);

    if (pendingTimeout.current !== null) {
      clearTimeout(pendingTimeout.current);
      pendingTimeout.current = null;
    }

    const el = answerRef.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplayIndex(i);
      return;
    }

    import("animejs").then(({ animate }) => {
      animate(el, { opacity: 0, translateY: -6, duration: 150, ease: "outQuad" });
      pendingTimeout.current = setTimeout(() => {
        pendingTimeout.current = null;
        setDisplayIndex(i);
        requestAnimationFrame(() => {
          animate(el, { opacity: [0, 1], translateY: [6, 0], duration: 250, ease: "outQuart" });
        });
      }, 170);
    });
  };

  return (
    <div className="hidden md:flex gap-16 xl:gap-24">

      {/* Left: question list */}
      <div ref={listRef} className="flex flex-col flex-none w-[42%]">
        {FAQ_ITEMS.map((item, i) => (
          <button
            key={item.q}
            type="button"
            data-faq-item
            onClick={() => handleSelect(i)}
            onMouseEnter={() => handleSelect(i)}
            className={`group flex flex-col gap-1.5 py-5 text-left border-t border-white/[0.08] border-l-2 pl-4 transition-colors duration-200 ${
              activeIndex === i ? "border-l-nox-gold" : "border-l-transparent"
            }`}
          >
            <span
              className={`font-mono text-[0.625rem] tracking-[0.1em] transition-colors duration-200 ${
                activeIndex === i ? "text-nox-gold" : "text-nox-white/50"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`font-display text-[1rem] leading-[1.3] tracking-[-0.03em] transition-colors duration-200 ${
                activeIndex === i
                  ? "text-nox-white"
                  : "text-nox-white/50 group-hover:text-nox-white/70"
              }`}
            >
              {item.q}
            </span>
          </button>
        ))}
        <div className="border-t border-white/[0.08]" />
      </div>

      {/* Right: answer panel */}
      <div className="flex-1 pt-5">
        <div ref={answerRef}>
          <p className="whitespace-pre-line font-mono-display text-[0.75rem] leading-relaxed tracking-[-0.02em] text-nox-white/70 max-w-[48ch]">
            {FAQ_ITEMS[displayIndex].a}
          </p>
        </div>
      </div>

    </div>
  );
}

function FAQMobile() {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const items = Array.from(el.querySelectorAll<HTMLElement>("[data-faq-item]"));
    items.forEach((t) => { t.style.opacity = "0"; });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();
        import("animejs").then((mod) => {
          if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            items.forEach((t) => { t.style.opacity = "1"; });
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
      { threshold: 0.1, rootMargin: "-40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={listRef} className="flex flex-col md:hidden">
      {FAQ_ITEMS.map((item, i) => (
        <div key={item.q} data-faq-item className="border-t border-white/[0.08] py-6 flex flex-col gap-3">
          <span className="font-mono text-[0.625rem] tracking-[0.1em] text-nox-gold">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="font-display text-[1rem] leading-[1.3] tracking-[-0.03em] text-nox-white">
            {item.q}
          </p>
          <p className="whitespace-pre-line font-mono-display text-[0.875rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
            {item.a}
          </p>
        </div>
      ))}
      <div className="border-t border-white/[0.08]" />
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="relative bg-nox-black pb-16 md:pb-24">
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">

        <div className="mb-10 md:mb-16 flex flex-col gap-6">
          <div data-heading-reveal className="flex items-center gap-2">
            <span aria-hidden className="font-mono-display text-[0.75rem] text-nox-gold">./</span>
            <span className="font-mono-display text-[0.75rem] text-nox-white/40">faq</span>
          </div>
          <h2 className="font-display text-[2rem] leading-[1.2] tracking-[-0.04em]">
            <span data-heading-reveal className="block text-nox-white">Things you might ask.</span>
            <span data-heading-reveal className="block text-nox-gold">Before you book.</span>
          </h2>

          <p data-heading-reveal className="max-w-[42ch] font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
            No gatekeeping. Just the answers you need before you reach out.
          </p>
        </div>

        <FAQPanel />
        <FAQMobile />

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
            <span className="font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-black group-hover:text-nox-white transition-colors duration-200">
              Book a Discovery Call
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
}
