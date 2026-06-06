"use client";

import { useRef } from "react";
import { PROCESS_INTRO, PROCESS_STEPS } from "@/data/process";
import SectionHeading from "@/components/ui/SectionHeading";
import { useTekversReveal } from "@/hooks/useTekversReveal";

export default function ProcessSection() {
  const ref = useRef<HTMLElement>(null);
  useTekversReveal(ref, {
    headerSelector: "[data-reveal-header]",
    itemSelector: "[data-step]",
    stagger: 0.12,
  });

  return (
    <section ref={ref} id="process" className="section-pad border-t border-white/5" aria-labelledby="process-heading">
      <div className="section-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow={PROCESS_INTRO.eyebrow}
            title={PROCESS_INTRO.title}
            lede={PROCESS_INTRO.subtitle}
          />
          <p className="font-display text-3xl text-sky-400/80 sm:text-4xl lg:text-5xl" data-reveal-header>
            {PROCESS_INTRO.stat}
          </p>
        </div>

        <ol className="mt-16 space-y-4">
          {PROCESS_STEPS.map((step) => (
            <li key={step.number} data-step>
              <article className="grid gap-4 rounded-2xl border border-white/8 bg-[var(--bg-surface)] p-6 md:grid-cols-[5rem_1fr] md:gap-8 md:p-8">
                <span className="font-display text-3xl text-sky-500/50">{step.number}</span>
                <div>
                  <h3 className="font-display text-xl text-slate-100">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.description}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
