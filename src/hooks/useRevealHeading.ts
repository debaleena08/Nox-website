import { useEffect, useRef } from "react";

function splitToChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent || "";
  el.setAttribute("aria-label", text);
  el.textContent = "";

  const chars: HTMLElement[] = [];
  const words = text.split(" ");

  words.forEach((word, wordIdx) => {
    const wordWrapper = document.createElement("span");
    wordWrapper.style.cssText = "display:inline-block;white-space:nowrap";

    word.split("").forEach((char) => {
      const span = document.createElement("span");
      span.style.cssText = "display:inline-block;opacity:0";
      span.textContent = char;
      wordWrapper.appendChild(span);
      chars.push(span);
    });

    el.appendChild(wordWrapper);
    if (wordIdx < words.length - 1) {
      el.appendChild(document.createTextNode(" "));
    }
  });

  return chars;
}

export function useRevealHeading<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>("[data-heading-reveal]"));
    if (!targets.length) return;

    const allChars: HTMLElement[] = [];
    const blockEls: HTMLElement[] = [];

    targets.forEach((t) => {
      // Split plain text elements (spans, p) into individual chars
      if (t.children.length === 0) {
        allChars.push(...splitToChars(t));
      } else {
        // Complex children (e.g. signal pill) — fade + rise the whole element
        t.style.opacity = "0";
        t.style.transform = "translateY(6px)";
        blockEls.push(t);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        observer.disconnect();

        import("animejs").then(({ animate, stagger }) => {
          if (blockEls.length) {
            animate(blockEls, {
              opacity: [0, 1],
              duration: 1,
              delay: stagger(20),
              ease: "linear",
            });
          }
          if (allChars.length) {
            animate(allChars, {
              opacity: [0, 1],
              duration: 1,
              delay: stagger(20, { start: blockEls.length ? 80 : 0 }),
              ease: "linear",
            });
          }
        });
      },
      { threshold: 0.15, rootMargin: "-40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}
