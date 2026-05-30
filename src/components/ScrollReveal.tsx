"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll<Element>("[data-reveal]");
    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.07, rootMargin: "0px 0px -48px 0px" }
    );

    elements.forEach((el) => io.observe(el));

    // Gate CSS hide only after observer is wired — no blank flash without JS
    document.documentElement.classList.add("reveal-ready");

    return () => {
      io.disconnect();
      document.documentElement.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
