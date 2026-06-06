"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";
import { HERO, HERO_SLIDES, HERO_STATS } from "@/data/hero";
import MagneticButton from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SCROLL_STEP = 320;
const HERO_ZONE_END = (HERO_SLIDES.length - 1) * SCROLL_STEP;
const AT_TOP_THRESHOLD = 24;
const WHEEL_DELTA_THRESHOLD = 120;

const ENTRANCE_FROM = { line1: { x: "-40%", opacity: 0 }, line3: { x: "40%", opacity: 0 } };
const ENTRANCE_TO = { line1: { x: "0%", opacity: 1 }, line3: { x: "0%", opacity: 1 } };

function runTransition(
  headline: HTMLDivElement,
  description: HTMLParagraphElement,
  direction: number,
  onContentSwap: () => void,
  onComplete: () => void,
  options?: { runEntrance?: boolean },
) {
  const line1 = headline.querySelector<HTMLElement>(".hero-line--outer-left");
  const line3 = headline.querySelector<HTMLElement>(".hero-line--outer-right");

  gsap.to(headline, {
    opacity: 0,
    y: direction * 24,
    duration: 0.35,
    ease: "power2.in",
  });
  gsap.to(description, {
    opacity: 0,
    y: direction * 12,
    duration: 0.3,
    ease: "power2.in",
    onComplete: () => {
      onContentSwap();
      gsap.set(headline, { opacity: 0, y: -direction * 24 });
      gsap.set(description, { opacity: 0, y: -direction * 12 });
      if (options?.runEntrance && line1 && line3) {
        gsap.set(line1, ENTRANCE_FROM.line1);
        gsap.set(line3, ENTRANCE_FROM.line3);
      }
      requestAnimationFrame(() => {
        let done = 0;
        const total = options?.runEntrance && line1 && line3 ? 4 : 2;
        const maybeComplete = () => {
          done += 1;
          if (done === total) onComplete();
        };
        gsap.to(headline, {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          onComplete: maybeComplete,
        });
        gsap.to(description, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
          delay: 0.05,
          onComplete: maybeComplete,
        });
        if (options?.runEntrance && line1 && line3) {
          gsap.to(line1, {
            ...ENTRANCE_TO.line1,
            duration: 0.9,
            ease: "power2.out",
            onComplete: maybeComplete,
          });
          gsap.to(line3, {
            ...ENTRANCE_TO.line3,
            duration: 0.9,
            delay: 0.15,
            ease: "power2.out",
            onComplete: maybeComplete,
          });
        }
      });
    },
  });
}

export default function HeroSection() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slideRef = useRef(slideIndex);
  const headlineRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const scrollInnerRef = useRef<HTMLSpanElement>(null);
  const scrollArrowRef = useRef<HTMLSpanElement>(null);
  const isAnimatingRef = useRef(false);
  const exitingHeroRef = useRef(false);
  const wheelAccumulatedRef = useRef(0);
  const lenis = useLenis();
  const reduced = useReducedMotion();

  useEffect(() => {
    slideRef.current = slideIndex;
  }, [slideIndex]);

  const scrollPastHero = useCallback(() => {
    const target = document.getElementById("services");
    if (target) {
      lenis?.scrollTo(target, { offset: -72, duration: 1.1 });
    } else {
      lenis?.scrollTo(window.innerHeight, { duration: 1.1 });
    }
  }, [lenis]);

  const goToNext = useCallback(() => {
    const current = slideRef.current;
    if (current >= HERO_SLIDES.length - 1) {
      scrollPastHero();
      return;
    }
    if (isAnimatingRef.current) return;
    const headline = headlineRef.current;
    const description = descriptionRef.current;
    if (!headline || !description) return;

    wheelAccumulatedRef.current = 0;
    isAnimatingRef.current = true;
    lenis?.stop();
    lenis?.scrollTo(0, { immediate: true });

    runTransition(
      headline,
      description,
      1,
      () => setSlideIndex(current + 1),
      () => {
        isAnimatingRef.current = false;
        lenis?.start();
      },
    );
  }, [lenis, scrollPastHero]);

  const goToPrev = useCallback(() => {
    const current = slideRef.current;
    if (current <= 0 || isAnimatingRef.current) return;
    const headline = headlineRef.current;
    const description = descriptionRef.current;
    if (!headline || !description) return;

    wheelAccumulatedRef.current = 0;
    isAnimatingRef.current = true;
    lenis?.stop();
    lenis?.scrollTo(0, { immediate: true });

    runTransition(
      headline,
      description,
      -1,
      () => setSlideIndex(current - 1),
      () => {
        isAnimatingRef.current = false;
        lenis?.start();
      },
    );
  }, [lenis]);

  useLenis((instance) => {
    const y = typeof instance?.scroll === "number" ? instance.scroll : window.scrollY;
    if (y <= AT_TOP_THRESHOLD) exitingHeroRef.current = false;
    if (slideRef.current === HERO_SLIDES.length - 1) exitingHeroRef.current = true;
    if (y < SCROLL_STEP || isAnimatingRef.current) return;
    if (exitingHeroRef.current && y <= HERO_ZONE_END) return;
    const index = Math.min(Math.floor(y / SCROLL_STEP), HERO_SLIDES.length - 1);
    setSlideIndex((p) => (p !== index ? index : p));
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onWheel = (e: WheelEvent) => {
      if (isAnimatingRef.current) return;
      const y = lenis?.scroll ?? window.scrollY;
      if (y > HERO_ZONE_END + 50) return;
      const current = slideRef.current;

      if (e.deltaY > 0) {
        if (current < HERO_SLIDES.length - 1) {
          e.preventDefault();
          e.stopPropagation();
          if (wheelAccumulatedRef.current < 0) wheelAccumulatedRef.current = 0;
          wheelAccumulatedRef.current += e.deltaY;
          if (wheelAccumulatedRef.current >= WHEEL_DELTA_THRESHOLD) goToNext();
        } else {
          wheelAccumulatedRef.current = 0;
        }
      } else if (e.deltaY < 0 && y <= AT_TOP_THRESHOLD && current > 0) {
        e.preventDefault();
        e.stopPropagation();
        if (wheelAccumulatedRef.current > 0) wheelAccumulatedRef.current = 0;
        wheelAccumulatedRef.current += e.deltaY;
        if (wheelAccumulatedRef.current <= -WHEEL_DELTA_THRESHOLD) goToPrev();
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
  }, [lenis, goToNext, goToPrev, reduced]);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const line1 = headlineRef.current?.querySelector(".hero-line--outer-left");
      const line3 = headlineRef.current?.querySelector(".hero-line--outer-right");
      if (line1) {
        gsap.fromTo(line1, ENTRANCE_FROM.line1, {
          ...ENTRANCE_TO.line1,
          duration: 0.9,
          ease: "power2.out",
        });
      }
      if (line3) {
        gsap.fromTo(line3, ENTRANCE_FROM.line3, {
          ...ENTRANCE_TO.line3,
          duration: 0.9,
          delay: 0.15,
          ease: "power2.out",
        });
      }
      if (scrollInnerRef.current) {
        gsap.fromTo(
          scrollInnerRef.current,
          { opacity: 1, boxShadow: "0 0 0 0 rgba(56, 189, 248, 0.35)" },
          {
            opacity: 0.85,
            boxShadow: "0 0 0 8px rgba(56, 189, 248, 0)",
            duration: 1,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
          },
        );
      }
      if (scrollArrowRef.current) {
        gsap.to(scrollArrowRef.current, {
          y: 4,
          duration: 0.75,
          ease: "power2.inOut",
          repeat: -1,
          yoyo: true,
        });
      }
    });
    return () => ctx.revert();
  }, [reduced]);

  const slide = HERO_SLIDES[slideIndex];

  return (
    <section
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-[4.5rem]"
      aria-label="Hero"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(14,165,233,0.14),transparent)]" />

      <div className="section-shell relative flex min-h-0 flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center py-10 md:py-14 lg:py-16">
          <div ref={headlineRef}>
            <h1 className="headline-display max-w-5xl text-balance uppercase">
              <span className="hero-line--outer-left block text-slate-500">{HERO.line1}</span>
              <span className="block text-slate-100">
                <span className="text-slate-100">{slide.line2}</span>
              </span>
              <span className="hero-line--outer-right block text-slate-500">{HERO.line3}</span>
            </h1>
          </div>

          <p
            ref={descriptionRef}
            className="mt-6 max-w-2xl border-l border-sky-500/30 pl-6 text-[var(--text-lede)] leading-relaxed text-slate-400 md:mt-8"
          >
            {slide.description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 md:mt-10 md:gap-6">
            <MagneticButton href={HERO.ctaPrimary.href}>{HERO.ctaPrimary.label}</MagneticButton>
            <MagneticButton href={HERO.ctaSecondary.href} variant="ghost">
              {HERO.ctaSecondary.label}
            </MagneticButton>
          </div>
        </div>

        <div className="mt-auto shrink-0 border-t border-white/10 pb-6 pt-8 md:pb-8 md:pt-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-10">
            <ul
              className="grid flex-1 grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-4 md:gap-8"
              aria-label="Portfolio statistics"
            >
              {HERO_STATS.map((s) => (
                <li key={s.label}>
                  <p className="font-display text-2xl text-sky-300 md:text-3xl">{s.value}</p>
                  <p className="mt-1 text-sm text-slate-500">{s.label}</p>
                </li>
              ))}
            </ul>

            <button
              type="button"
              className="hero-scroll-hint btn-interactive mx-auto flex shrink-0 flex-col items-center gap-2 text-sky-400/80 transition-colors hover:text-sky-300 md:mx-0 md:mb-1"
              onClick={goToNext}
              aria-label={
                slideIndex >= HERO_SLIDES.length - 1
                  ? "Scroll to services section"
                  : "Scroll to next slide"
              }
            >
              <span
                ref={scrollInnerRef}
                className="flex h-12 w-8 items-center justify-center rounded-full border border-white/15 md:h-14 md:w-9"
              >
                <span ref={scrollArrowRef} className="text-base md:text-lg" aria-hidden>
                  ↓
                </span>
              </span>
              <span className="text-[0.65rem] tracking-[0.2em] text-slate-500 uppercase">
                {slideIndex >= HERO_SLIDES.length - 1 ? "Explore" : "Scroll"}
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
