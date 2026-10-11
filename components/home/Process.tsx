"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { PROCESS } from "@/data/experience";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const TINTS = ["#e5e5e5", "#d4d4d4", "#a3a3a3", "#737373"];
const WORDS = ["Listen", "Shape", "Build", "Launch"];

/** Sticky stacking cards: each step pins, and the ones beneath shrink back as the next arrives. */
export default function Process() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const cards = gsap.utils.toArray<HTMLElement>(".proc-card", root.current);
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        gsap.to(card.querySelector(".proc-inner"), {
          scale: 0.9 + i * 0.02,
          filter: "brightness(0.55)",
          ease: "none",
          scrollTrigger: { trigger: next, start: "top bottom", end: "top 20%", scrub: true },
        });
      });
      gsap.utils.toArray<HTMLElement>(".proc-word", root.current).forEach((el) => {
        gsap.fromTo(el, { yPercent: 40 }, {
          yPercent: -40,
          ease: "none",
          scrollTrigger: { trigger: el.closest(".proc-card"), start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="process" className="section scroll-mt-16 border-y border-line bg-bg-2">
      <div className="shell">
        <SectionHeading title="A clear process," accent="no surprises.">
          You always know what’s being built, what it costs and when it ships. Here’s how a typical project runs.
        </SectionHeading>

        <ol className="relative">
          {PROCESS.map((p, i) => {
            const tint = TINTS[i % TINTS.length];
            return (
              <li
                key={p.step}
                className="proc-card sticky pb-6"
                style={{ top: `calc(6rem + ${i * 1.25}rem)` }}
              >
                <div className="proc-inner gradient-border relative grid origin-top overflow-hidden rounded-[32px] bg-surface p-7 shadow-[var(--shadow)] sm:p-10 md:min-h-[22rem] md:grid-cols-[1fr_1.1fr] md:gap-10 md:p-12">
                  <div
                    aria-hidden
                    className="absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-[0.08] blur-[80px]"
                    style={{ background: tint }}
                  />
                  <div className="relative flex flex-col">
                    <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: tint }}>
                      Step {p.step} / {String(PROCESS.length).padStart(2, "0")}
                    </span>
                    <h3 className="mt-5 font-display text-[clamp(2rem,4vw,3.25rem)] leading-none tracking-[-0.04em]">{p.title}</h3>
                    <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-fg-2">{p.text}</p>
                  </div>
                  <div className="relative mt-8 hidden items-center justify-end overflow-hidden md:mt-0 md:flex">
                    <span
                      aria-hidden
                      className="proc-word select-none font-display text-[clamp(4rem,9vw,8.5rem)] leading-none tracking-[-0.06em] text-transparent"
                      style={{ WebkitTextStroke: `1.5px ${tint}` }}
                    >
                      {WORDS[i] ?? p.title}
                    </span>
                  </div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="gradient-border relative mt-10 flex flex-col items-start gap-4 overflow-hidden rounded-[28px] bg-surface p-6 sm:flex-row sm:items-center sm:justify-between sm:p-9">
          <div>
            <p className="font-display text-2xl tracking-[-0.03em]">Have a project in mind?</p>
            <p className="mt-1 text-fg-2">Get a free consultation and a fixed quote — no commitment.</p>
          </div>
          <Link href="/contact" className="btn btn-primary w-full shrink-0 sm:w-auto">
            Get a free quote <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
