"use client";

import { useEffect, useRef, useState } from "react";
import { HERO, HERO_SLIDES } from "@/data/hero";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const reduced = useReducedMotion();
  const slide = HERO_SLIDES[slideIndex];

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
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.14),transparent)]" />

      <div className="section-shell relative flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center py-10 md:py-14 lg:py-20">
          <div className="hero-line--outer-left mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-4 py-1.5">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" aria-hidden />
            <span className="text-xs font-medium tracking-wide text-emerald-300">{HERO.availability}</span>
          </div>

          <h1 className="hero-line--center max-w-4xl text-balance text-[clamp(1.75rem,5vw,3.25rem)] font-bold leading-[1.1] tracking-tight text-slate-50">
            {HERO.headline}
          </h1>

          <div className="hero-description mt-8 max-w-2xl">
            <p className="text-lg font-medium text-sky-300">
              Drive <span className="text-sky-200">{slide.highlight}</span>
            </p>
            <p
              key={slideIndex}
              className="mt-3 text-[var(--text-lede)] leading-relaxed text-slate-400 motion-safe:animate-[fadeIn_0.5s_ease-out]"
            >
              {slide.description}
            </p>
          </div>

          <p className="hero-line--outer-right mt-6 max-w-2xl text-sm text-slate-500">{HERO.trustLine}</p>

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
    </section>
  );
}
