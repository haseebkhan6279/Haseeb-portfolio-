"use client";

import { useRef, useState } from "react";
import { PRICING_INTRO, PRICING_PACKAGES, type PricingPackage } from "@/data/pricing";
import MagneticButton from "@/components/ui/MagneticButton";
import { useTekversReveal } from "@/hooks/useTekversReveal";

function tabLabel(pkg: PricingPackage) {
  return pkg.group === "addon" ? `${pkg.tier} · ${pkg.name}` : pkg.tier;
}

export default function PricingSection() {
  const ref = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(1);

  useTekversReveal(ref, {
    headerSelector: "[data-reveal-header]",
    itemSelector: "[data-reveal-item]",
    stagger: 0.09,
  });

  function selectPackage(index: number) {
    setActive(index);
    panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const activePkg = PRICING_PACKAGES[active];

  return (
    <section ref={ref} id="pricing" className="pricing-section" aria-labelledby="pricing-heading">
      <div className="section-shell">
        <div className="pricing-section__intro" data-reveal-header>
          <h2 id="pricing-heading" className="pricing-section__title">
            {PRICING_INTRO.eyebrow}
          </h2>
          <p className="pricing-section__lede">{PRICING_INTRO.lede}</p>
        </div>

        <div className="pricing-tabs mt-8" role="tablist" aria-label="Pricing packages">
          {PRICING_PACKAGES.map((pkg, i) => (
            <button
              key={pkg.id}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-controls="pricing-panel"
              id={`pricing-tab-${pkg.id}`}
              onClick={() => selectPackage(i)}
              className={`btn-interactive rounded-full px-4 py-2.5 text-sm touch-manipulation ${
                active === i ? "bg-sky-400 text-slate-950" : "border border-white/15 text-slate-400"
              }`}
            >
              {tabLabel(pkg)}
            </button>
          ))}
        </div>

        <div
          id="pricing-panel"
          ref={panelRef}
          role="tabpanel"
          aria-labelledby={`pricing-tab-${activePkg.id}`}
          className="pricing-panel mt-6 lg:mt-8"
        >
          <PricingCard key={activePkg.id} pkg={activePkg} active={true} reveal={false} />
        </div>

        <p className="mt-6 text-center text-xs text-slate-500 lg:text-sm" data-reveal-header>
          {PRICING_INTRO.addonsLede}
        </p>

        <p className="mt-10 max-w-3xl text-center text-sm text-slate-500 md:mx-auto" data-reveal-header>
          {PRICING_INTRO.footerNote}
        </p>
      </div>
    </section>
  );
}

function PricingCard({
  pkg,
  active = false,
  reveal = true,
}: {
  pkg: PricingPackage;
  active?: boolean;
  reveal?: boolean;
}) {
  const isAddon = pkg.group === "addon";

  return (
    <article
      {...(reveal ? { "data-reveal-item": true } : {})}
      className={`pricing-card mx-auto flex h-full max-w-xl flex-col rounded-2xl border p-6 transition-all duration-300 sm:p-7 lg:max-w-2xl ${
        active ? "pricing-card--active" : ""
      } ${
        pkg.popular
          ? "pricing-card--popular border-sky-500/40 bg-gradient-to-b from-sky-950/50 to-[var(--bg-surface)] ring-1 ring-sky-500/20"
          : isAddon
            ? "pricing-card--addon border-dashed border-white/15 bg-[var(--bg-surface)]/80"
            : "border-white/8 bg-[var(--bg-surface)]"
      }`}
    >
      {pkg.popular ? (
        <span className="mb-3 w-fit rounded-full bg-sky-400 px-3 py-1 text-xs font-semibold text-slate-950">
          Most Popular
        </span>
      ) : (
        <span
          className={`mb-3 text-xs font-semibold tracking-widest uppercase ${
            isAddon ? "text-violet-300/90" : "text-slate-500"
          }`}
        >
          {pkg.tier}
        </span>
      )}

      <h3 className="font-display text-xl text-slate-50 sm:text-2xl">{pkg.name}</h3>
      <p className="mt-2 font-display text-3xl text-slate-50 sm:text-4xl">{pkg.price}</p>
      <p className="mt-3 text-sm leading-relaxed text-slate-400">{pkg.tagline}</p>
      <p className="mt-3 text-xs text-sky-400/90">{pkg.timeline}</p>

      <ul className="mt-5 flex-1 space-y-2 text-sm text-slate-400">
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-2 leading-snug">
            <span className="shrink-0 text-sky-500">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      {pkg.notIncluded?.length ? (
        <div className="mt-5 border-t border-white/8 pt-4">
          <p className="text-xs font-medium text-slate-500">Not included</p>
          <ul className="mt-2 space-y-1 text-xs text-slate-500">
            {pkg.notIncluded.map((n) => (
              <li key={n}>— {n}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-6">
        <MagneticButton
          href="/#contact"
          variant={pkg.popular ? "solid" : "ghost"}
          className="!w-full !px-5 !py-3"
        >
          Get started →
        </MagneticButton>
      </div>
    </article>
  );
}
