"use client";

import { useRef } from "react";
import { WHY_INTRO, WHY_REASONS, WHY_STATS, WHY_TESTIMONIALS } from "@/data/why";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTekversReveal } from "@/hooks/useTekversReveal";

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
        <SectionHeading eyebrow={WHY_INTRO.eyebrow} title={WHY_INTRO.title} />

        <ul className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {WHY_REASONS.map((r) => (
            <li key={r.title} data-reveal-item>
              <article className="h-full rounded-2xl border border-white/8 p-6">
                <h3 className="font-display text-lg text-sky-300">{r.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{r.description}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4" data-reveal-item>
          {WHY_STATS.map((s) => (
            <div key={s.label} className="glass-panel rounded-2xl p-5 text-center">
              <p className="font-display text-2xl text-sky-300 md:text-3xl">{s.value}</p>
              <p className="mt-2 text-xs text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16" data-reveal-item>
          <p className="text-xs font-semibold tracking-[0.28em] text-sky-400 uppercase">Client feedback</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-slate-50 sm:text-2xl">
            What clients say
          </h3>
          <ul className="mt-8 grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2">
            {WHY_TESTIMONIALS.map((t) => (
              <li key={t.project ?? t.attribution}>
                <blockquote className="h-full rounded-2xl border border-white/8 border-l-2 border-l-amber-500/50 bg-white/[0.02] p-6 pl-7">
                  <p className="text-[0.9375rem] leading-relaxed text-slate-300 italic sm:text-base">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-4 text-sm text-slate-500">
                    — {t.attribution}
                    {t.project ? (
                      <>
                        {", "}
                        {t.url ? (
                          <a
                            href={t.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sky-400/90 hover:text-sky-300"
                          >
                            {t.project}
                          </a>
                        ) : (
                          <span className="text-slate-400">{t.project}</span>
                        )}
                      </>
                    ) : null}
                  </footer>
                </blockquote>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
