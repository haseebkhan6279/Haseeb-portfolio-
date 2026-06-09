"use client";

import { useRef } from "react";
import { TESTIMONIALS, TESTIMONIALS_INTRO } from "@/data/why";
import { useTekversReveal } from "@/hooks/useTekversReveal";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          className={i < rating ? "text-amber-400" : "text-slate-700"}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null);
  useTekversReveal(ref, {
    headerSelector: "[data-testimonial-header]",
    itemSelector: "[data-testimonial-item]",
    stagger: 0.1,
  });

  return (
    <section
      ref={ref}
      id="testimonials"
      className="section-pad border-t border-white/5"
      aria-labelledby="testimonials-heading"
    >
      <div className="section-shell">
        <div data-testimonial-header>
          <p className="eyebrow">{TESTIMONIALS_INTRO.eyebrow}</p>
          <h2 id="testimonials-heading" className="headline-section mt-4 text-slate-50">
            {TESTIMONIALS_INTRO.title}
          </h2>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <li key={t.project ?? t.name} data-testimonial-item>
              <article className="flex h-full flex-col rounded-2xl border border-white/8 bg-white/[0.02] p-6">
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-500/15 text-sm font-semibold text-sky-300"
                    aria-hidden
                  >
                    {t.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-slate-100">{t.name}</p>
                    <p className="text-sm text-slate-500">
                      {t.role}, {t.company}
                    </p>
                    <p className="mt-1 text-xs text-sky-400/80">{t.projectType}</p>
                  </div>
                </div>

                <StarRating rating={t.rating} />

                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-slate-300">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>

                {t.project && t.url ? (
                  <footer className="mt-4 border-t border-white/5 pt-4 text-xs text-slate-500">
                    Project:{" "}
                    <a
                      href={t.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 hover:text-sky-300"
                    >
                      {t.project}
                    </a>
                  </footer>
                ) : null}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
