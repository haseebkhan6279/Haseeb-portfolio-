"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { NAV_LINKS, PROFILE } from "@/data/site";
import MagneticButton from "@/components/ui/MagneticButton";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const close = () => setMenuOpen(false);
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="site-header fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[var(--glass)] backdrop-blur-xl"
    >
      <div className="section-shell flex h-[4.5rem] items-center justify-between gap-2 sm:gap-3">
        <Link
          href="/"
          className="font-brand min-w-0 shrink text-sm text-slate-100 sm:text-[0.9375rem]"
          onClick={() => setMenuOpen(false)}
        >
          <span className="sm:hidden">{PROFILE.shortName}</span>
          <span className="hidden sm:inline lg:hidden">{PROFILE.displayName}</span>
          <span className="hidden lg:inline">{PROFILE.name}</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-slate-400 transition-colors hover:text-sky-300"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <MagneticButton
            href="/#contact"
            className="hidden !px-4 !py-2.5 !text-xs sm:!inline-flex sm:!px-5 md:!text-sm"
          >
            Start Your Project
          </MagneticButton>

          <button
            type="button"
            className="site-header__menu-btn flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-slate-200 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className="sr-only">{menuOpen ? "Close" : "Menu"}</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[4.5rem] z-40 bg-slate-950/80 backdrop-blur-sm md:hidden"
              aria-label="Close menu"
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="site-header__mobile-nav absolute inset-x-0 top-full z-50 border-b border-white/10 bg-[var(--bg-surface)] px-4 py-5 shadow-2xl md:hidden"
              aria-label="Mobile"
            >
              <ul className="flex flex-col gap-1">
                {NAV_LINKS.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-xl px-4 py-3.5 text-base font-medium text-slate-200 transition-colors hover:bg-white/5 hover:text-sky-300"
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
                <li className="mt-2 border-t border-white/10 pt-3">
                  <Link
                    href="/#contact"
                    className="flex min-h-[3rem] items-center justify-center rounded-full bg-sky-400 px-5 text-sm font-semibold text-slate-950 hover:bg-sky-300"
                    onClick={() => setMenuOpen(false)}
                  >
                    Start Your Project
                  </Link>
                </li>
              </ul>
            </motion.nav>
          </>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
