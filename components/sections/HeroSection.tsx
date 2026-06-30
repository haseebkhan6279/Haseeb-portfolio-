"use client";

import { useState, type SyntheticEvent } from "react";
import MagneticButton from "@/components/ui/MagneticButton";
import { HERO } from "@/data/hero";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const VIDEO_PHASES = [
  { title: "Concept", text: "We map your offer into a clear, premium story that instantly builds trust." },
  { title: "Design", text: "Visual direction evolves frame-by-frame into modern layouts with elegant motion." },
  { title: "Build", text: "Fast frontend + robust backend engineering keeps performance and scale in balance." },
  { title: "Launch", text: "SEO, analytics, and conversion tuning turn traffic into measurable business growth." },
] as const;

export default function HeroSection() {
  const reduced = useReducedMotion();
  const [phaseIndex, setPhaseIndex] = useState(0);

  const handleVideoTimeUpdate = (event: SyntheticEvent<HTMLVideoElement>) => {
    const video = event.currentTarget;
    if (!video.duration || reduced) return;
    const ratio = video.currentTime / video.duration;
    const next = Math.min(VIDEO_PHASES.length - 1, Math.floor(ratio * VIDEO_PHASES.length));
    setPhaseIndex((current) => (current === next ? current : next));
  };

  return (
    <section
      className={`relative flex min-h-[100svh] flex-col overflow-hidden pt-[4.5rem]${!reduced ? " hero-entrance" : ""}`}
      aria-label="Hero"
    >
      <div className="hero-video-bg" aria-hidden>
        <video
          className="hero-video-bg__media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onTimeUpdate={handleVideoTimeUpdate}
        >
          <source src="/images/A_stunning_3D_particle_animation_202606301335.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="hero-video-vignette" aria-hidden />
      <div className="section-shell relative z-[2] flex min-h-0 w-full min-w-0 flex-1 items-end pb-8 sm:pb-10 md:pb-14">
        <div className="hero-overlay-card max-w-xl">
          <p className="hero-overlay-kicker">Digital Studio · Lahore</p>
          <h1 className="hero-overlay-title">Premium web experiences that turn attention into revenue.</h1>
          <p className="hero-overlay-copy">
            I design and develop elegant, high-performance websites for modern brands - combining visual polish,
            fast delivery, and conversion-focused UX.
          </p>
          <div key={phaseIndex} className="hero-phase-card" aria-live="polite">
            <p className="hero-phase-label">Live Sequence · {VIDEO_PHASES[phaseIndex].title}</p>
            <p className="hero-phase-text">{VIDEO_PHASES[phaseIndex].text}</p>
          </div>
          <p className="hero-overlay-meta">{HERO.availability}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <MagneticButton href={HERO.ctaPrimary.href}>{HERO.ctaPrimary.label}</MagneticButton>
            <MagneticButton href={HERO.ctaSecondary.href} variant="ghost">
              {HERO.ctaSecondary.label}
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
