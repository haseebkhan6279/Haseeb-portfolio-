"use client";

import Image from "next/image";
import { CTA } from "@/data/cta";
import { CONTACT } from "@/data/site";
import MagneticButton from "@/components/ui/MagneticButton";

export default function CtaSection() {
  return (
    <section className="section-pad" aria-labelledby="cta-heading">
      <div className="section-shell">
        <div className="relative overflow-hidden rounded-2xl border border-[var(--line)] bg-gradient-to-br from-[var(--bg-elevated)] via-[var(--bg-surface)] to-[var(--bg-deep)] px-6 py-10 sm:rounded-[2rem] sm:px-8 sm:py-12 md:px-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="eyebrow">{CTA.eyebrow}</p>
              <h2 id="cta-heading" className="headline-section mt-4 max-w-3xl">
                {CTA.headline}
              </h2>
              <p className="mt-4 max-w-xl text-[var(--text-lede)] text-[var(--fg-muted)]">{CTA.subtext}</p>
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <MagneticButton href={CTA.primary.href} className="!w-full sm:!w-auto">
                  {CTA.primary.label}
                </MagneticButton>
                <MagneticButton href={CTA.secondary.href} variant="ghost" className="!w-full sm:!w-auto">
                  {CTA.secondary.label}
                </MagneticButton>
              </div>
              <p className="mt-6 text-sm text-[var(--fg-dim)]">
                Response time: <span className="text-[var(--fg-muted)]">{CONTACT.responseTime}</span> ·{" "}
                {CONTACT.location}
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[color-mix(in_srgb,var(--bg-surface)_88%,white)]">
              <div className="relative aspect-[16/10] bg-[color-mix(in_srgb,var(--bg-deep)_70%,white)] p-3 sm:p-4">
                <Image
                  src="/images/projects/gt-estate-20260616-1456.png"
                  alt="Project showcase preview"
                  fill
                  className="rounded-xl object-contain object-center"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div className="border-t border-[var(--line)] px-4 py-3 text-xs tracking-[0.08em] text-[var(--fg-dim)] uppercase">
                Selected work preview
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
