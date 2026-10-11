"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, Search } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CONTACT, NAV_LINKS, PROFILE, SOCIALS } from "@/data/site";
import { openCommandPalette } from "@/components/ui/CommandPalette";

const ease = [0.16, 1, 0.3, 1] as const;

/** Tracks which home-page section is in the middle of the viewport. */
function useActiveSection(enabled: boolean) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    if (!enabled) return;
    const els = NAV_LINKS.map((l) => document.getElementById(l.href.split("#")[1] ?? "")).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`/#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [enabled]);
  return enabled ? active : null;
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const section = useActiveSection(pathname === "/");

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 700 && !open);
    setScrolled(y > 40);
  });

  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const compact = scrolled && !open;
  // Page links (e.g. /blog) are "current" by route; home anchors by the section in view.
  const routeMatch = NAV_LINKS.find((l) => !l.href.includes("#") && (pathname === l.href || pathname.startsWith(`${l.href}/`)))?.href;
  const currentHref = section ?? routeMatch ?? null;
  const highlight = hovered ?? currentHref;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80] px-3 pt-[calc(env(safe-area-inset-top)+0.75rem)] sm:px-5"
        animate={{ y: hidden ? "-130%" : "0%" }}
        transition={{ duration: 0.5, ease }}
      >
        <div
          className={`relative mx-auto flex items-center gap-3 rounded-full border transition-[max-width,height,padding,background-color,border-color,box-shadow] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            compact
              ? "h-[3.6rem] max-w-[1060px] border-line-strong bg-[rgb(13_11_23/0.86)] pl-2 pr-2 shadow-[0_20px_50px_-20px_rgb(0_0_0/0.8)] backdrop-blur-2xl backdrop-saturate-150"
              : "h-16 max-w-[1240px] border-transparent bg-transparent px-1 sm:px-[clamp(0.5rem,2vw,1.4rem)] sm:h-[4.5rem]"
          }`}
        >
          {/* Hairline gradient glow along the bottom edge of the capsule. */}
          <span
            aria-hidden
            className={`pointer-events-none absolute inset-x-10 -bottom-px h-px bg-[image:linear-gradient(90deg,transparent,#737373,#737373,transparent)] transition-opacity duration-700 ${
              compact ? "opacity-70" : "opacity-0"
            }`}
          />

          <Link href="/" className="group flex min-w-0 items-center gap-3" aria-label={`${PROFILE.displayName} — home`}>
            <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[image:var(--gradient)] font-display text-[13px] font-bold tracking-tight text-accent-fg shadow-[0_6px_20px_-6px_rgb(255_122_89/0.6)] transition-transform duration-500 group-hover:rotate-[-12deg] group-hover:scale-110">
              HK
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-bg bg-ok" />
            </span>
            <span className="min-w-0 leading-tight">
              <span className="block truncate font-display text-[17px] font-semibold tracking-[-0.03em]">{PROFILE.displayName}</span>
              <span
                className={`block truncate text-xs text-muted transition-all duration-500 ${
                  compact ? "max-h-0 opacity-0" : "max-h-5 opacity-100"
                }`}
              >
                {PROFILE.role}
              </span>
            </span>
          </Link>

          <nav
            className={`mx-auto hidden items-center rounded-full p-1 transition-[background-color,border-color] duration-700 lg:flex ${
              compact ? "border border-transparent" : "border border-line bg-surface/40 backdrop-blur-xl"
            }`}
            aria-label="Primary"
            onPointerLeave={() => setHovered(null)}
          >
            {NAV_LINKS.map((l) => {
              const on = highlight === l.href;
              const current = currentHref === l.href;
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onPointerEnter={() => setHovered(l.href)}
                  onFocus={() => setHovered(l.href)}
                  onBlur={() => setHovered(null)}
                  aria-current={current ? "location" : undefined}
                  className={`relative isolate rounded-full px-3 py-2 text-[13.5px] xl:px-4 font-medium transition-colors duration-300 ${
                    on || current ? "text-fg" : "text-fg-2 hover:text-fg"
                  }`}
                >
                  {on ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-[linear-gradient(180deg,rgb(255_255_255/0.09),rgb(255_255_255/0.03))]"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                  {l.label}
                  {current ? (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-0.5 left-[calc(50%-2px)] h-1 w-1 rounded-full bg-accent-2"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 lg:ml-0">
            <button
              type="button"
              onClick={openCommandPalette}
              className="group hidden h-10 items-center gap-2 rounded-full border border-line bg-surface/50 pl-3 pr-2 text-[13px] text-muted backdrop-blur-xl transition-colors hover:border-line-strong hover:text-fg lg:inline-flex"
              aria-label="Search projects and pages"
            >
              <Search size={15} />
              <kbd className="rounded-md border border-line bg-bg/60 px-1.5 py-0.5 font-mono text-[10.5px]">Ctrl K</kbd>
            </button>
            <Link href="/contact" className="btn btn-primary hidden h-10 px-5 text-[13.5px] sm:inline-flex">
              Hire me <ArrowUpRight size={15} />
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="relative z-20 grid h-10 w-10 place-items-center rounded-full border border-line-strong bg-surface/60 text-fg backdrop-blur-xl lg:hidden"
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
