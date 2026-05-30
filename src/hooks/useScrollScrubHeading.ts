import { useEffect, useRef } from "react";

export function useScrollScrubHeading<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>("[data-heading-reveal]"));
    if (!targets.length) return;

    const STAGGER_PX = 40;   // each element lags 40px of scroll behind the previous
    const RANGE_PX   = 160;  // px of scroll to go from 0 → 1 per element
    const OFFSET     = 120;  // head-start so elements are partially visible at scrollY=0

    targets.forEach((t) => {
      t.style.willChange = "opacity, transform";
    });

    function update() {
      const y = window.scrollY;
      targets.forEach((t, i) => {
        const progress = Math.max(0, Math.min(1, (y + OFFSET - i * STAGGER_PX) / RANGE_PX));
        t.style.opacity   = String(progress);
        t.style.transform = `translateY(${(1 - progress) * 20}px)`;
      });
    }

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return ref;
}
