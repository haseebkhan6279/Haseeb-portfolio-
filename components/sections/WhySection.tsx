"use client";

import { useRef } from "react";
import { WHY_INTRO, WHY_REASONS } from "@/data/why";
import { useTekversReveal } from "@/hooks/useTekversReveal";

const ICONS = {
  chat: (
    <path
      d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4v8z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
  ),
  code: (
    <path
      d="M8 9l-4 3 4 3M16 9l4 3-4 3M13 5l-2 14"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  mobile: (
  <>
    <rect x="7" y="2" width="10" height="20" rx="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
    <path d="M11 18h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </>
  ),
  support: (
    <path
      d="M12 2a7 7 0 00-4 12.7V20h8v-5.3A7 7 0 0012 2z"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
      strokeLinejoin="round"
    />
  ),
} as const;

export default function WhySection() {
  const ref = useRef<HTMLElement>(null);
  useTekversReveal(ref, {
    headerSelector: "[data-reveal-header]",
    itemSelector: "[data-reveal-item]",
    stagger: 0.1,
  });

  return (
    <section ref={ref} id="why" className="section-pad border-t border-white/5" aria-labelledby="why-heading">
      <div className="section-shell">
        <div className="max-w-2xl" data-reveal-header>
          <p className="eyebrow">{WHY_INTRO.eyebrow}</p>
          <h2 id="why-heading" className="headline-section mt-4 text-slate-50">
            {WHY_INTRO.title}
          </h2>
          <p className="mt-4 text-[var(--text-lede)] text-slate-400">{WHY_INTRO.subtitle}</p>
        </div>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_REASONS.map((r) => (
            <li key={r.title} data-reveal-item>
              <article className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/10 text-sky-400">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                    {ICONS[r.icon]}
                  </svg>
                </div>
                <h3 className="mt-4 font-display text-lg text-slate-100">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{r.description}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
