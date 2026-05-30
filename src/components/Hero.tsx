"use client";

import Link from "next/link";
import { ColonIcon } from "@/components/ui/ColonIcon";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export function Hero() {
  const month = MONTHS[new Date().getMonth()];
  return (
    <section className="section_home-hero relative overflow-hidden pt-28 pb-16 md:pt-48 md:pb-24">
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">

          {/* Left column: signal → headline → subheading */}
          <div className="flex flex-col items-start gap-4">
            <div data-heading-reveal className="flex items-center gap-2 py-1">
              <span className="relative flex h-2 w-2 flex-none" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping bg-nox-gold opacity-60" />
                <span className="relative inline-flex h-2 w-2 bg-nox-gold" />
              </span>
              <span suppressHydrationWarning className="font-mono-display text-[0.75rem] tracking-[0.04em] text-nox-white">
                Slots open for {month}
              </span>
            </div>

            <h1 className="font-display text-[clamp(2rem,9vw,2.5rem)] leading-[1.1] tracking-[-0.04em] text-nox-white">
              <span data-heading-reveal className="block">Motion design partner for</span>
              <span data-heading-reveal className="block text-nox-gold">tech teams.</span>
            </h1>

            <div className="flex w-full flex-col font-mono-display text-[1rem] leading-relaxed tracking-[-0.02em] text-nox-white/70">
              <span data-heading-reveal>Clarity-first motion graphics for complex products.</span>
              <span data-heading-reveal>Built around your launches and campaigns.</span>
            </div>
          </div>

          <div className="flex flex-none flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link
              href="https://tally.so/r/9qM95p"
              target="_blank"
              rel="noopener noreferrer"
              className="group hover-blink inline-flex flex-none items-center gap-4 bg-nox-white hover:bg-nox-gray transition-colors duration-200 px-6 py-3"
            >
              <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center text-nox-black group-hover:text-nox-gold transition-colors duration-200">
                <ColonIcon fill="currentColor" />
              </span>
              <span className="font-mono text-[0.75rem] font-normal tracking-[0.04em] leading-[1.2] text-nox-black group-hover:text-nox-white transition-colors duration-200">
                Get a Concept
              </span>
            </Link>

            <Link
              href="/#packages"
              className="group hover-blink inline-flex flex-none items-center gap-4 border border-nox-white/30 hover:border-nox-white/60 hover:bg-nox-white/[0.06] transition-colors duration-200 px-6 py-3"
            >
              <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center text-nox-white/40 group-hover:text-nox-gold transition-colors duration-200">
                <ColonIcon fill="currentColor" />
              </span>
              <span className="font-mono text-[0.75rem] font-normal tracking-[0.04em] leading-[1.2] text-nox-white/70 group-hover:text-nox-white transition-colors duration-200">
                See Plans
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
