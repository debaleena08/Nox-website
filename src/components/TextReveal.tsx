"use client";

import { useEffect } from "react";

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

export function TextReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(
      document.querySelectorAll<HTMLElement>("[data-heading-reveal]")
    );
    if (!targets.length) return;

    const observers: IntersectionObserver[] = [];

    import("animejs").then(({ animate, stagger }) => {
      targets.forEach((t) => {
        const isComplex = t.children.length > 0;

        if (isComplex) {
          t.style.opacity = "0";
        }

        const chars = isComplex ? [] : splitToChars(t);

        const observer = new IntersectionObserver(
          (entries) => {
            if (!entries[0].isIntersecting) return;
            observer.disconnect();

            if (isComplex) {
              animate(t, { opacity: [0, 1], duration: 1, ease: "linear" });
            } else {
              animate(chars, {
                opacity: [0, 1],
                duration: 1,
                delay: stagger(20),
                ease: "linear",
              });
            }
          },
          { threshold: 0.15, rootMargin: "-40px 0px" }
        );

        observer.observe(t);
        observers.push(observer);
      });
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return null;
}
