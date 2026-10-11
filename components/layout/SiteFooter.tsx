"use client";

import { ArrowUp, ArrowUpRight, Check, Copy } from "lucide-react";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { CONTACT, PROFILE, SOCIALS } from "@/data/site";
import LocalTime from "@/components/ui/LocalTime";
import Magnetic from "@/components/ui/Magnetic";
import { SplitReveal } from "@/components/ui/Reveal";

const SITEMAP = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

const PROFILES = [
  ...SOCIALS.filter((s) => s.label !== "Email"),
  ...(CONTACT.upwork ? [{ label: "Upwork", href: CONTACT.upwork }] : []),
  ...(CONTACT.fiverr ? [{ label: "Fiverr", href: CONTACT.fiverr }] : []),
];

export default function SiteFooter() {
  const lenis = useLenis();
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const nameY = useTransform(scrollYProgress, [0, 1], ["60%", "0%"]);
  const nameScale = useTransform(scrollYProgress, [0, 1], [0.86, 1]);
  const glowY = useTransform(scrollYProgress, [0, 1], ["-30%", "10%"]);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  }

  return (
    <footer ref={ref} className="theme-ink relative isolate overflow-hidden">
      <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[520px] w-[520px] rounded-full bg-[#6d4bff]/30 blur-[130px]" />
      <motion.div aria-hidden style={{ y: glowY }} className="pointer-events-none absolute -bottom-40 -left-32 -z-10 h-[420px] w-[420px] rounded-full bg-[#ff5a3c]/20 blur-[130px]" />
      <div className="shell relative pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-20 sm:pt-28">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:items-end">
          <div>
            <p className="kicker kicker-plain">
              <span className="status-dot !h-1.5 !w-1.5" /> {PROFILE.availability}
            </p>
            <SplitReveal as="h2" className="mt-6 max-w-[14ch] font-display text-[clamp(2.4rem,7vw,5rem)] leading-[1] tracking-[-0.045em]">
              Let’s build something <span className="serif-i text-accent">great</span> together.
            </SplitReveal>
            <p className="mt-6 max-w-lg text-[1.05rem] leading-relaxed text-fg-2">
              Tell me about your product, timeline and budget. I usually reply within 24 hours with clear next steps.
            </p>
            <div className="mt-9 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Magnetic strength={0.2} className="block w-full sm:inline-block sm:w-auto">
                <Link href="/contact" className="btn btn-primary w-full sm:w-auto">
                  Start a project <ArrowUpRight size={16} />
                </Link>
              </Magnetic>
              <button type="button" onClick={copyEmail} className="btn btn-ghost w-full sm:w-auto" aria-live="polite">
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Email copied" : CONTACT.email}
              </button>
            </div>
          </div>

          <div className="grid min-w-0 gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2">
            {[
              ["Email", "Send a message", `mailto:${CONTACT.email}`],
              ["WhatsApp", CONTACT.phone, CONTACT.whatsapp],
              ["LinkedIn", "Haseeb Khan", CONTACT.linkedIn],
              ["GitHub", "@haseebkhan6279", CONTACT.github],
            ].map(([label, value, href]) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group min-w-0 bg-bg p-5 transition-colors duration-300 hover:bg-surface"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{label}</p>
                <p className="mt-2 flex min-w-0 items-center justify-between gap-2 text-[15px]">
                  <span className="min-w-0 truncate">{value}</span>
                  <ArrowUpRight
                    size={15}
                    className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                  />
                </p>
              </a>
            ))}
          </div>
        </div>

        <div aria-hidden className="mt-20 overflow-hidden sm:mt-28">
          <motion.p
            style={{ y: nameY, scale: nameScale }}
            className="text-gradient pointer-events-none origin-bottom select-none whitespace-nowrap pb-[0.08em] text-center font-display text-[clamp(3rem,14.5vw,13rem)] font-bold leading-[0.85] tracking-[-0.06em] opacity-90"
          >
            {PROFILE.displayName}
          </motion.p>
        </div>

        <div className="mt-6 flex flex-col gap-5 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Footer">
            {SITEMAP.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-fg">
                {l.label}
              </Link>
            ))}
            <span className="hidden text-line-strong md:inline">|</span>
            {PROFILES.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="transition-colors hover:text-fg">
                {s.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2">
            <p>
              © {new Date().getFullYear()} {PROFILE.name} · <LocalTime /> Lahore
            </p>
            <button
              type="button"
              onClick={() => (lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }))}
              className="flex shrink-0 items-center gap-1.5 transition-colors hover:text-fg"
            >
              Back to top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
