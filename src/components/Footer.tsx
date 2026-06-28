"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { NoxLogo } from "@/components/ui/NoxLogo";

const NAV_LINKS = [
  { href: "/#work",     label: "Work"     },
  { href: "/#process",  label: "Process"  },
  { href: "/#faq",      label: "FAQs"     },
  { href: "/#about",    label: "About"    },
  { href: "https://cal.com/aritrya-sanyal/introductory-call.-30-mins", label: "Contact"  },
];

function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () =>
      new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
    const raf = requestAnimationFrame(() => setTime(fmt()));
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => { clearInterval(id); cancelAnimationFrame(raf); };
  }, []);

  if (!time) return null;

  return (
    <span className="font-mono-display tabular-nums text-[0.75rem] tracking-[0.08em] text-nox-gold">
      {time}
    </span>
  );
}

export const Footer = () => {
  return (
    <footer className="bg-nox-black border-t border-white/[0.08]">
      <div className="container mx-auto w-full max-w-[calc(100%-3rem)]">

        {/* ── Desktop: logo / nav / contacts ── */}
        <div className="hidden md:flex items-center gap-6 py-8">
          <Link href="/" aria-label="Home" className="hover-blink inline-flex flex-none items-center">
            <NoxLogo className="h-[0.9rem] w-auto text-nox-white" />
          </Link>
          <nav className="flex flex-1 items-center justify-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="hover-blink inline-flex min-h-[44px] items-center font-mono-display text-[0.75rem] tracking-[0.08em] text-nox-gold transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-none items-center gap-6">
            <a
              href="mailto:hello@noxstudios.co"
              className="hover-blink inline-flex min-h-[44px] items-center font-mono-display text-[0.75rem] tracking-[0.08em] text-nox-white transition-colors duration-200"
            >
              hello@noxstudios.co
            </a>
            <a
              href="https://www.linkedin.com/company/this-is-nox/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-blink inline-flex min-h-[44px] items-center font-mono-display text-[0.75rem] tracking-[0.08em] text-nox-white transition-colors duration-200"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* ── Mobile: structured rows ── */}
        <div className="md:hidden py-5 flex flex-col gap-5">

          {/* Row 1: Logo + Clock */}
          <div className="flex items-center justify-between">
            <Link href="/" aria-label="Home" className="hover-blink inline-flex min-h-[44px] items-center">
              <NoxLogo className="h-[0.9rem] w-auto text-nox-white" />
            </Link>
            <LiveClock />
          </div>

          {/* Contacts */}
          <div className="flex flex-col">
            <a
              href="mailto:hello@noxstudios.co"
              className="hover-blink flex min-h-[44px] items-center font-mono-display text-[0.75rem] tracking-[0.08em] text-nox-white"
            >
              hello@noxstudios.co
            </a>
            <a
              href="https://www.linkedin.com/company/this-is-nox/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-blink flex min-h-[44px] items-center font-mono-display text-[0.75rem] tracking-[0.08em] text-nox-white"
            >
              LinkedIn
            </a>
          </div>

        </div>

        {/* ── Copyright row ── */}
        <div className="flex items-center justify-between py-4">
          <p className="font-mono-display text-[0.75rem] tracking-[0.08em] text-nox-white/70">
            © {new Date().getFullYear()} Nox Studios. All rights reserved.
          </p>
          <span className="hidden md:inline">
            <LiveClock />
          </span>
        </div>

      </div>
    </footer>
  );
};
