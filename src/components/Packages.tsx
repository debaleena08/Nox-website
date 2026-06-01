"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { ColonIcon } from "@/components/ui/ColonIcon";

const PACKAGES = [
  { name: "Standard",   featured: false, price: "$1300"  },
  { name: "Sprint",     featured: true,  price: "$2000"  },
  { name: "Bundle",     featured: false, price: null     },
];

const COMPARISON_ROWS: {
  label: string;
  values: (string | boolean)[];
  type: "text" | "bool";
}[] = [
  { label: "Delivery",         values: ["2–3 weeks",  "7 days",      "7 days / video"],  type: "text" },
  { label: "What you get",    values: ["1 video",    "1 video",     "2-3 videos / month"], type: "text" },
  { label: "Video length",    values: ["From 60s",   "From 60s",   "30s / 60s / 90s"],     type: "text" },
  { label: "Storyboard",       values: [true,          true,           true],          type: "bool" },
  { label: "Revisions",        values: ["2 rounds",   "2 rounds",    "2 rounds per video"], type: "text" },
  { label: "Priority slot + locked rate", values: [false, false, true], type: "bool" },

];


const CheckIcon = () => (
  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" className="flex-none text-nox-gold" aria-hidden>
    <path d="M1 4L3.5 6.5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

function useTableReveal(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver | null = null;

    import("animejs").then((mod) => {
      if (!ref.current) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        el.style.opacity = "1";
        return;
      }

      const header = el.querySelector<HTMLElement>("[data-table-header]");
      const rows   = Array.from(el.querySelectorAll<HTMLElement>("[data-table-row]"));
      const accent = el.querySelector<HTMLElement>("[data-col-accent]");

      if (header) header.style.opacity = "0";
      rows.forEach((r) => { r.style.opacity = "0"; });
      if (accent) { accent.style.opacity = "0"; accent.style.transformOrigin = "left"; }

      const STAGGER = 80;

      observer = new IntersectionObserver(
        (entries) => {
          if (!entries[0].isIntersecting) return;
          observer?.disconnect();

          const tl = mod.createTimeline({ defaults: { ease: "outQuart" } });

          if (header) {
            tl.add(header, { opacity: 1, duration: 30, ease: "linear" }, 0)
              .add(header, { opacity: 0, duration: 25, ease: "linear" }, 30)
              .add(header, { opacity: 1, duration: 20, ease: "linear" }, 55)
              .add(header, { opacity: 0, duration: 30, ease: "linear" }, 75)
              .add(header, { opacity: 1, duration: 35, ease: "linear" }, 105);
          }

          if (accent) tl.add(accent, { opacity: 1, scaleX: [0, 1], duration: 380 }, 160);

          rows.forEach((row, i) => {
            tl.add(row, { opacity: 1, duration: 220, ease: "outQuart" }, STAGGER * (i + 1));
          });
        },
        { threshold: 0.1, rootMargin: "-60px 0px" }
      );

      observer.observe(el);
    });

    return () => observer?.disconnect();
  }, []);
}

export function Packages() {
  const tableRef = useRef<HTMLDivElement>(null);

  useTableReveal(tableRef);

  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const month = MONTHS[new Date().getMonth()];

  return (
    <section id="packages" className="relative overflow-hidden bg-nox-black pb-16 md:pb-24">
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">

        <div className="mb-16 flex flex-col gap-6">
          <div data-heading-reveal className="flex items-center gap-2">
            <span aria-hidden className="font-mono-display text-[0.75rem] text-nox-gold">./</span>
            <span className="font-mono-display text-[0.75rem] text-nox-white/40">packages</span>
          </div>

          <h2 className="font-display text-[2rem] leading-[1.2] tracking-[-0.04em]">
            <span data-heading-reveal className="block text-nox-white">Clear scope.</span>
            <span data-heading-reveal className="block text-nox-gold">No surprises.</span>
          </h2>

          <p data-heading-reveal className="max-w-[42ch] font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
            You know what you&apos;re getting, what it costs, and when it lands. Before we start.
          </p>
        </div>

        {/* Signal bar */}
        <div className="mb-4 flex items-center gap-3 bg-nox-surface px-6 py-3 w-full">
          <span className="relative flex h-1.5 w-1.5 flex-none" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping bg-nox-gold opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 bg-nox-gold" />
          </span>
          <span className="font-mono-display text-[0.75rem] tracking-[-0.01em] text-nox-white">
            Slots open for {month}. If the direction misses, you get a full refund.
          </span>
        </div>

        {/* Mobile: separate cards with gaps */}
        <div className="md:hidden flex flex-col gap-6">
          {PACKAGES.map((pkg, pkgIdx) => (
            <div key={pkg.name} className="relative border border-white/[0.08]">
              {/* Corner ticks */}
              <span className="absolute -top-2 -left-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
              <span className="absolute -top-2 -right-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
              <span className="absolute -bottom-2 -left-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
              <span className="absolute -bottom-2 -right-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
              {pkg.featured && (
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-nox-gold" />
              )}
              {/* Name + price */}
              <div className="px-5 py-5 border-b border-white/[0.08]">
                {pkg.featured && (
                  <span className="inline-flex self-start bg-nox-white text-nox-black font-mono-display text-[0.5rem] uppercase tracking-[0.14em] leading-none py-[3px] px-[7px] mb-3">
                    Most Popular
                  </span>
                )}
                <span
                  className={`block font-mono-display text-[1.25rem] leading-[1.2] tracking-[-0.04em] mb-4 ${
                    pkg.featured ? "text-nox-gold" : "text-nox-white"
                  }`}
                >
                  {pkg.name}
                </span>
                {pkg.price ? (
                  <div className="flex flex-col gap-1">
                    <span className="font-mono-display text-[0.625rem] uppercase tracking-[0.08em] text-nox-white/40">
                      Starting from
                    </span>
                    <span className="font-mono-display text-[2rem] leading-none tracking-[-0.06em] text-nox-white">
                      {pkg.price}
                    </span>
                  </div>
                ) : (
                  <Link
                    href="https://cal.com/aritrya-sanyal/introductory-call.-30-mins"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group hover-blink inline-flex self-start items-center gap-4 bg-nox-white hover:bg-nox-gray transition-colors duration-200 px-4 py-2"
                  >
                    <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center text-nox-black group-hover:text-nox-gold transition-colors duration-200">
                      <ColonIcon fill="currentColor" />
                    </span>
                    <span className="font-mono text-[0.75rem] font-normal tracking-[0.04em] leading-[1.2] text-nox-black group-hover:text-nox-white transition-colors duration-200">
                      Contact for Pricing
                    </span>
                  </Link>
                )}
              </div>
              {/* Feature rows */}
              {COMPARISON_ROWS.map((row) => {
                const val = row.values[pkgIdx];
                return (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-4 px-5 py-3 border-b last:border-b-0 border-white/[0.08]"
                  >
                    <span className="font-mono-display text-[0.625rem] uppercase tracking-[0.1em] text-nox-white/50 flex-none">
                      {row.label}
                    </span>
                    {row.type === "bool" ? (
                      val ? (
                        <CheckIcon />
                      ) : (
                        <span className="font-mono-display text-[0.75rem] text-nox-white/20">—</span>
                      )
                    ) : (
                      <span className="font-mono-display text-[0.75rem] leading-snug tracking-[-0.02em] text-nox-white/70 text-right">
                        {val as string}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Desktop: framed comparison table */}
        <div className="hidden md:relative md:block md:border md:border-white/[0.08]">
          <span className="absolute -top-2 -left-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
          <span className="absolute -top-2 -right-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
          <span className="absolute -bottom-2 -left-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
          <span className="absolute -bottom-2 -right-1 z-20 h-2 w-1 bg-nox-white" aria-hidden />
          <div ref={tableRef} className="overflow-x-auto overflow-y-hidden">
            <table className="min-w-[480px] w-full border-collapse">
              <thead>
                <tr data-table-header className="border-b border-white/[0.08]">
                  <th className="border-r border-white/[0.08] w-[9rem]" />
                  {PACKAGES.map((pkg) => (
                    <th
                      key={pkg.name}
                      scope="col"
                      className="relative border-r last:border-r-0 border-white/[0.08] px-5 py-5 text-left font-normal"
                    >
                      {pkg.featured && (
                        <div
                          data-col-accent
                          className="absolute top-0 left-0 right-0 h-[2px] bg-nox-gold"
                          style={{ opacity: 0 }}
                        />
                      )}
                      <div className="flex flex-col gap-4">
                        {pkg.featured && (
                          <span className="inline-flex self-start bg-nox-white text-nox-black font-mono-display text-[0.5rem] uppercase tracking-[0.14em] leading-none py-[3px] px-[7px]">
                            Most Popular
                          </span>
                        )}
                        <span
                          className={`font-mono-display text-[1.25rem] leading-[1.2] tracking-[-0.04em] ${
                            pkg.featured ? "text-nox-gold" : "text-nox-white"
                          }`}
                        >
                          {pkg.name}
                        </span>
                        {pkg.price ? (
                          <div className="flex flex-col gap-1">
                            <span className="font-mono-display text-[0.625rem] uppercase tracking-[0.08em] text-nox-white/40">
                              Starting from
                            </span>
                            <span className="font-mono-display text-[2rem] leading-none tracking-[-0.06em] text-nox-white">
                              {pkg.price}
                            </span>
                          </div>
                        ) : (
                          <Link
                            href="https://cal.com/aritrya-sanyal/introductory-call.-30-mins"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group hover-blink inline-flex self-start items-center gap-4 bg-nox-white hover:bg-nox-gray transition-colors duration-200 px-4 py-2"
                          >
                            <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center text-nox-black group-hover:text-nox-gold transition-colors duration-200">
                              <ColonIcon fill="currentColor" />
                            </span>
                            <span className="font-mono text-[0.75rem] font-normal tracking-[0.04em] leading-[1.2] text-nox-black group-hover:text-nox-white transition-colors duration-200">
                              Contact for Pricing
                            </span>
                          </Link>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr
                    key={row.label}
                    data-table-row
                    className="border-b last:border-b-0 border-white/[0.08]"
                  >
                    <th
                      scope="row"
                      className="border-r border-white/[0.08] px-5 py-4 text-left font-normal"
                    >
                      <span className="font-mono-display text-[0.625rem] uppercase tracking-[0.1em] text-nox-white">
                        {row.label}
                      </span>
                    </th>
                    {row.values.map((val, colIdx) => (
                      <td
                        key={colIdx}
                        className="border-r last:border-r-0 border-white/[0.08] px-5 py-4"
                      >
                        {row.type === "bool" ? (
                          val ? (
                            <CheckIcon />
                          ) : (
                            <span className="font-mono-display text-[0.75rem] text-nox-white/20">—</span>
                          )
                        ) : (
                          <span className="font-mono-display text-[0.75rem] leading-snug tracking-[-0.02em] text-nox-white/70">
                            {val as string}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

        {/* CTA */}
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
