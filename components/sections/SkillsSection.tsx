"use client";

import { SKILLS_INTRO, SKILL_CATEGORIES } from "@/data/skills";
import { useTekversReveal } from "@/hooks/useTekversReveal";
import { useRef } from "react";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useTekversReveal(sectionRef, {
    headerSelector: "[data-skills-intro]",
    itemSelector: "[data-skills-item]",
    stagger: 0.08,
  });

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="section-shell py-16 md:py-24"
      aria-labelledby="skills-heading"
    >
      <div data-skills-intro>
        <p className="text-xs font-semibold tracking-[0.28em] text-sky-400 uppercase">
          {SKILLS_INTRO.eyebrow}
        </p>
        <h2 id="skills-heading" className="mt-3 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
          {SKILLS_INTRO.title}
        </h2>
        <p className="mt-4 max-w-2xl text-[0.9375rem] leading-relaxed text-slate-400 sm:text-base">
          {SKILLS_INTRO.subtitle}
        </p>
      </div>

      <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {SKILL_CATEGORIES.map((category) => (
          <li key={category.title} data-skills-item>
            <article className="h-full rounded-2xl border border-white/8 bg-white/[0.02] p-6">
              <h3 className="text-sm font-semibold tracking-wide text-sky-400 uppercase">
                {category.title}
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
