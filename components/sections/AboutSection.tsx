"use client";

import { useRef } from "react";
import { ABOUT_INTRO, ABOUT_POINTS } from "@/data/about";
import MagneticButton from "@/components/ui/MagneticButton";
import { useTekversReveal } from "@/hooks/useTekversReveal";

export default function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  useTekversReveal(ref, {
    headerSelector: "[data-about-header]",
    itemSelector: "[data-about-item]",
    stagger: 0.08,
  });

  return (
    <section ref={ref} id="about" className="section-pad border-t border-white/5" aria-labelledby="about-heading">
      <div className="section-shell">
        <div className="max-w-3xl" data-about-header>
          <p className="eyebrow">{ABOUT_INTRO.eyebrow}</p>
          <h2 id="about-heading" className="headline-section mt-4 text-slate-50">
            {ABOUT_INTRO.title}
          </h2>
          <p className="mt-6 text-[var(--text-lede)] leading-relaxed text-slate-400">{ABOUT_INTRO.lede}</p>
        </div>

        <ul className="mt-14 grid gap-5 md:grid-cols-2">
          {ABOUT_POINTS.map((point) => (
            <li key={point.title} data-about-item>
              <article className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <h3 className="font-display text-lg text-sky-300">{point.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{point.description}</p>
              </article>
            </li>
          ))}
        </ul>

        <div className="mt-12" data-about-item>
          <MagneticButton href="/#contact">Let&apos;s discuss your project →</MagneticButton>
        </div>
      </div>
    </section>
  );
}
