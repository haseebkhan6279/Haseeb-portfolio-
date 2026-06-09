"use client";

import { CTA } from "@/data/cta";
import { CONTACT } from "@/data/site";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CtaSection() {
  return (
    <section className="section-pad" aria-labelledby="cta-heading">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-950 via-[var(--bg-surface)] to-[var(--bg-deep)] px-6 py-14 sm:rounded-[2rem] sm:px-8 sm:py-20 md:px-16">
          <p className="eyebrow">{CTA.eyebrow}</p>
          <h2 id="cta-heading" className="headline-section mt-6 max-w-3xl text-slate-50">
            {CTA.headline}
          </h2>
          <p className="mt-6 max-w-xl text-[var(--text-lede)] text-slate-400">{CTA.subtext}</p>
          <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <MagneticButton href={CTA.primary.href} className="!w-full sm:!w-auto">
              {CTA.primary.label}
            </MagneticButton>
            <MagneticButton href={CTA.secondary.href} variant="ghost" className="!w-full sm:!w-auto">
              {CTA.secondary.label}
            </MagneticButton>
          </div>
          <p className="mt-8 text-sm text-slate-500">
            Response time: <span className="text-slate-400">{CONTACT.responseTime}</span> ·{" "}
            {CONTACT.location}
          </p>
        </div>
      </div>
    </section>
  );
}
