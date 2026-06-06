"use client";

import { CTA } from "@/data/cta";
import { CONTACT } from "@/data/site";
import MagneticButton from "@/components/ui/MagneticButton";
import ContactSection from "@/components/sections/ContactSection";

export default function CtaSection() {
  return (
    <>
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
            <ul className="mt-12 flex flex-col gap-3 text-sm text-slate-400 sm:gap-2 md:flex-row md:flex-wrap md:gap-8">
              <li className="min-w-0 break-all sm:break-normal">
                <a href={`mailto:${CONTACT.email}`} className="hover:text-sky-300">
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-sky-300">
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={CONTACT.github} target="_blank" rel="noopener noreferrer" className="hover:text-sky-300">
                  @haseebkhan6279
                </a>
              </li>
              <li>
                <a href={CONTACT.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-sky-300">
                  LinkedIn
                </a>
              </li>
              <li>{CONTACT.location}</li>
            </ul>
          </div>
        </div>
      </section>
      <ContactSection />
    </>
  );
}
