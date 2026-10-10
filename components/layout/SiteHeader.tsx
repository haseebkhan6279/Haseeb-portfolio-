"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT, NAV_LINKS, PROFILE, SOCIALS } from "@/data/site";
import { openCommandPalette } from "@/components/ui/CommandPalette";

const ease = [0.16, 1, 0.3, 1] as const;

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 500 && !open);
    setScrolled(y > 24);
  });

  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => !href.includes("#") && (pathname === href || pathname.startsWith(`${href}/`));
  const solid = scrolled || open;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        animate={{ y: hidden ? "-110%" : "0%" }}
        transition={{ duration: 0.45, ease }}
      >
        <div
          className={`border-b pt-[env(safe-area-inset-top)] transition-[background-color,border-color,backdrop-filter] duration-500 ${
            solid ? "border-line bg-bg/85 backdrop-blur-xl" : "border-transparent bg-transparent"
          }`}
        >
          <div className="shell flex h-16 items-center gap-4 sm:h-[4.5rem]">
            <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label={`${PROFILE.displayName} — home`}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-fg text-[13px] font-semibold tracking-tight text-bg transition-transform duration-500 group-hover:rotate-[-6deg]">
                HK
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block truncate text-[15px] font-semibold tracking-tight">{PROFILE.displayName}</span>
                <span className="block truncate text-xs text-muted">{PROFILE.role}</span>
              </span>
            </Link>

            <nav className="mx-auto hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive(l.href) ? "text-fg" : "text-fg-2 hover:bg-surface-2 hover:text-fg"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
              <button
                type="button"
                onClick={openCommandPalette}
                className="hidden h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-[13px] text-muted transition-colors hover:border-line-strong hover:text-fg lg:inline-flex"
                aria-label="Search projects and pages"
              >
                <Search size={14} />
                <kbd className="font-mono text-[11px]">Ctrl K</kbd>
              </button>
              <Link href="/contact" className="btn btn-dark hidden h-10 px-5 text-[13.5px] sm:inline-flex">
                Hire me <ArrowUpRight size={15} />
              </Link>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="relative z-20 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface text-fg lg:hidden"
                aria-expanded={open}
                aria-label={open ? "Close menu" : "Open menu"}
              >
                <span className="relative block h-3 w-4">
                  <span className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 h-[1.5px] w-4 rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-bg lg:hidden"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            data-lenis-prevent
          >
            <nav className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-4 pt-24 sm:px-8" aria-label="Mobile">
              {[{ label: "Home", href: "/" }, ...NAV_LINKS, { label: "All projects", href: "/work" }, { label: "Contact", href: "/contact" }].map(
                (l, i) => (
                  <div key={l.href} className="overflow-hidden border-b border-line">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ delay: 0.2 + i * 0.045, duration: 0.6, ease }}
                    >
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between gap-3 py-4"
                      >
                        <span className="font-display text-[1.85rem] leading-none sm:text-4xl">{l.label}</span>
                        <span className="shrink-0 font-mono text-[11px] text-muted">0{i + 1}</span>
                      </Link>
                    </motion.div>
                  </div>
                ),
              )}
            </nav>
            <motion.div
              className="shrink-0 space-y-4 border-t border-line px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-5 sm:px-8"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
            >
              <Link href="/contact" className="btn btn-primary w-full" onClick={() => setOpen(false)}>
                Start a project <ArrowUpRight size={16} />
              </Link>
              <div className="flex items-center justify-between gap-3 text-sm">
                <a href={`mailto:${CONTACT.email}`} className="min-w-0 truncate text-fg-2">
                  {CONTACT.email}
                </a>
                <span className="flex shrink-0 items-center gap-2 text-xs text-muted">
                  <span className="status-dot" /> Available
                </span>
              </div>
              <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-fg-2">
                {SOCIALS.slice(0, 3).map((s) => (
                  <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="hover:text-fg">
                    {s.label}
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
