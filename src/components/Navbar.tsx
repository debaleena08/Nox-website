"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ColonIcon } from "@/components/ui/ColonIcon";
import { NoxLogo } from "@/components/ui/NoxLogo";

const NAV_LINKS = [
  { href: "/#work",     label: "Work"     },
  { href: "/#process",  label: "Process"  },
  { href: "/#packages", label: "Packages" },
  { href: "/#faq",      label: "FAQs"     },
  { href: "/#about",    label: "About"    },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header role="banner" className="fixed inset-x-0 top-0 z-[2137]">

      {/* Desktop */}
      <div className="hidden w-full items-center justify-between px-6 py-3 md:flex">
        <Link href="/" aria-label="Home" className="flex items-center">
          <NoxLogo className="h-[14px] w-auto text-nox-white" />
        </Link>

        <nav aria-label="Site navigation" className="flex flex-1 items-center justify-evenly">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-underline font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-white whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="https://cal.com/aritrya-sanyal/introductory-call.-30-mins"
          target="_blank"
          rel="noopener noreferrer"
          className="hover-blink inline-flex min-h-[44px] items-center gap-2 bg-nox-gold hover:bg-nox-white transition-colors duration-200 px-5 py-3 font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-black whitespace-nowrap"
        >
          <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center">
            <ColonIcon fill="currentColor" />
          </span>
          Contact
        </Link>
      </div>

      {/* Mobile — logo + contact + trigger */}
      <div className="flex w-full items-center justify-between px-6 py-3 md:hidden">
        <Link href="/" aria-label="Home" className="flex items-center">
          <NoxLogo className="h-[14px] w-auto text-nox-white" />
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="https://cal.com/aritrya-sanyal/introductory-call.-30-mins"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-blink inline-flex min-h-[44px] items-center gap-1.5 bg-nox-gold hover:bg-nox-white transition-colors duration-200 px-4 font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-black whitespace-nowrap"
          >
            <span aria-hidden className="colon-blink flex h-[0.875rem] w-2 items-center justify-center">
              <ColonIcon fill="currentColor" />
            </span>
            Contact
          </Link>
          <motion.button
            type="button"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="flex min-h-[44px] min-w-[44px] items-center justify-center gap-2 font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-white"
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <span className="font-mono text-[0.75rem] tracking-[0.04em] leading-[1.2] text-nox-white">
              {mobileOpen ? "Close" : "Menu"}
            </span>
          </motion.button>
        </div>
      </div>

      {/* Mobile dropdown — animated */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            key="mobile-menu"
            aria-label="Mobile navigation"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden border-t border-white/[0.08] bg-nox-black"
          >
            <ul className="flex flex-col border-t border-white/[0.08]">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30, delay: i * 0.04 }}
                  className="border-b border-white/[0.08]"
                >
                  <Link
                    href={link.href}
                    className="group flex items-center justify-between px-6 py-4 font-mono text-[0.75rem] tracking-[0.06em] text-nox-white transition-colors duration-150 hover:bg-nox-surface"
                    onClick={() => setMobileOpen(false)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-[0.625rem] tracking-[0.1em] text-nox-white/20 w-5 tabular-nums" aria-hidden>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {link.label}
                    </div>
                    <span className="font-mono text-[0.625rem] text-nox-white/20 transition-colors duration-150 group-hover:text-nox-gold" aria-hidden>→</span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>

    </header>
  );
}
