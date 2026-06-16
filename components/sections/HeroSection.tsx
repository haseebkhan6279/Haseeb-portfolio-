"use client";

import { useEffect, useState } from "react";
import { HERO, HERO_SLIDES } from "@/data/hero";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const reduced = useReducedMotion();
  const slide = HERO_SLIDES[slideIndex];
  const heroBadges = ["Fast Delivery", "Mobile-First UX", "SEO Ready"];

  useEffect(() => {
    if (reduced) return;
    const id = window.setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col overflow-hidden pt-[4.5rem]${!reduced ? " hero-entrance" : ""}`}
      aria-label="Hero"
    >
      <div className="hero-surface-glow" aria-hidden />
      <div className="hero-surface-grid" aria-hidden />

      <div className="section-shell relative flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center py-10 md:py-14 lg:py-20">
          <div className="hero-shell">
            <div className="hero-line--outer-left hero-status-pill">
              <span className="hero-status-dot" aria-hidden />
              <span>{HERO.availability}</span>
            </div>

            <h1 className="hero-line--center max-w-4xl text-balance text-[clamp(1.95rem,5.5vw,3.4rem)] font-bold leading-[1.06] tracking-tight text-slate-50">
              {HERO.headline}
            </h1>

            <div className="hero-badge-row" aria-label="Core delivery strengths">
              {heroBadges.map((badge) => (
                <span key={badge} className="hero-badge-chip">
                  {badge}
                </span>
              ))}
            </div>

            <div className="hero-description mt-7 max-w-2xl">
              <p className="text-base font-semibold uppercase tracking-[0.14em] text-sky-300/90 md:text-lg">
                Drive <span className="text-sky-200">{slide.highlight}</span>
              </p>
              <p
                key={slideIndex}
                className="mt-3 text-[var(--text-lede)] leading-relaxed text-slate-300 motion-safe:animate-[fadeIn_0.5s_ease-out]"
              >
                {slide.description}
              </p>
            </div>

            <p className="hero-line--outer-right mt-6 max-w-2xl text-sm text-slate-400/95">{HERO.trustLine}</p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <MagneticButton href={HERO.ctaPrimary.href} className="!w-full sm:!w-auto">
                {HERO.ctaPrimary.label}
              </MagneticButton>
              <MagneticButton href={HERO.ctaSecondary.href} variant="ghost" className="!w-full sm:!w-auto">
                {HERO.ctaSecondary.label}
              </MagneticButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
