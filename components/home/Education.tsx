"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useRef, useSyncExternalStore } from "react";
import Tilt from "react-parallax-tilt";
import { CERTIFICATIONS, EDUCATION, type EducationItem } from "@/data/experience";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;
// Oldest → newest, left to right.
const JOURNEY = [...EDUCATION].reverse();
const TINTS = ["#ffc861", "#ff7a59", "#b69cff"];

function monthIndex(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return (y ?? 0) * 12 + ((m ?? 1) - 1);
}

const subscribeNoop = () => () => {};

/** Share of a programme completed today; null on the server so the markup matches before hydration. */
function useProgress(e: EducationItem) {
  return useSyncExternalStore(
    subscribeNoop,
    () => {
      if (!e.current) return null;
      const now = new Date();
      const total = monthIndex(e.end) - monthIndex(e.start);
      const done = now.getFullYear() * 12 + now.getMonth() - monthIndex(e.start);
      return Math.max(2, Math.min(100, Math.round((done / Math.max(total, 1)) * 100)));
    },
    () => null,
  );
}

function StageCard({ e, i }: { e: EducationItem; i: number }) {
  const pct = useProgress(e);
  const tint = TINTS[i % TINTS.length];
  return (
    <li className="edu-stage relative min-w-0 pl-16 lg:pl-0" data-speed={[0.06, -0.04, -0.12][i] ?? 0}>
      {/* Node on the timeline */}
      <span
        className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border-4 border-bg font-display text-sm font-bold text-accent-fg shadow-[0_0_0_1px_var(--line-strong)] lg:relative lg:mx-0"
        style={{ background: tint }}
      >
        {e.short}
      </span>

      <div className="gradient-border relative mt-0 overflow-hidden rounded-[24px] bg-surface p-6 sm:p-7 lg:mt-6">
        <div aria-hidden className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-25 blur-[60px]" style={{ background: tint }} />
        <p className="relative font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{e.period}</p>
        <h3 className="relative mt-3 font-display text-[1.45rem] leading-[1.1] tracking-[-0.03em]">{e.degree}</h3>
        <p className="relative mt-1.5 text-fg-2">{e.school}</p>

        {e.current ? (
          <div className="relative mt-5">
            <div className="flex items-center justify-between text-xs">
              <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-bg/50 px-2.5 py-1 text-fg">
                <span className="status-dot !h-1.5 !w-1.5" /> In progress
              </span>
              <span className="font-mono text-muted">{pct === null ? "—" : `${pct}%`}</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface-3">
              <motion.div
                className="h-full rounded-full bg-[image:var(--gradient)]"
                initial={{ width: 0 }}
                whileInView={{ width: pct === null ? 0 : `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.6, ease, delay: 0.3 }}
              />
            </div>
            <p className="mt-2 text-xs text-muted">Graduating {e.period.split("—")[1]?.trim()}</p>
          </div>
        ) : e.note ? (
          e.projectSlug ? (
            <Link
              href={`/work/${e.projectSlug}`}
              className="group relative mt-5 flex items-center justify-between gap-3 rounded-2xl border border-line bg-bg/50 p-3.5 text-sm transition-colors hover:border-line-strong"
            >
              <span className="min-w-0">
                <span className="block text-[11px] uppercase tracking-[0.12em] text-muted">Final-year thesis</span>
                <span className="mt-0.5 block truncate text-fg">{e.note.replace(/^Thesis:\s*/, "")}</span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-muted transition-transform duration-300 group-hover:rotate-45 group-hover:text-fg" />
            </Link>
          ) : (
            <p className="relative mt-4 text-sm text-muted">{e.note}</p>
          )
        ) : (
          <p className="relative mt-5 flex items-center gap-2 text-sm text-muted">
            <GraduationCap size={15} /> Completed
          </p>
        )}
      </div>
    </li>
  );
}

export default function Education() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const list = q<HTMLElement>(".edu-list")[0];
      if (!list) return;
      const mm = gsap.matchMedia();
      // The journey line draws as you scroll: across on desktop, down on mobile.
      mm.add("(min-width: 1024px)", () => {
        gsap.fromTo(q(".edu-line-fill"), { scaleX: 0 }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 80%", end: "bottom 55%", scrub: 0.6 },
        });
        // Each stage rises at its own speed for a layered parallax.
        q<HTMLElement>(".edu-stage").forEach((el) => {
          const speed = Number(el.dataset.speed ?? 0);
          gsap.fromTo(el, { y: 120 * speed + 40 }, {
            y: -120 * speed,
            ease: "none",
            scrollTrigger: { trigger: list, start: "top bottom", end: "bottom top", scrub: true },
          });
        });
      });
      mm.add("(max-width: 1023px)", () => {
        gsap.fromTo(q(".edu-line-fill"), { scaleY: 0 }, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: list, start: "top 75%", end: "bottom 60%", scrub: 0.6 },
        });
      });
      gsap.from(q(".edu-stage"), {
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.12,
        scrollTrigger: { trigger: list, start: "top 85%", once: true },
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="education" className="section relative scroll-mt-16 overflow-hidden border-t border-line">
      <div aria-hidden className="aurora -left-40 top-1/3 h-[26rem] w-[26rem] bg-[#ffb340] opacity-15" />
      <div aria-hidden className="aurora -right-40 bottom-0 h-[26rem] w-[26rem] bg-[#6d4bff] opacity-20" />

      <div className="shell relative">
        <SectionHeading index="09" name="Education" title="Education &" accent="certifications.">
          A Computer Science foundation — now a Master’s in progress — sharpened by shipping real products.
        </SectionHeading>

        <div className="edu-list relative">
          {/* Journey line */}
          <div aria-hidden className="absolute bottom-6 left-6 top-6 w-px bg-line-strong lg:bottom-auto lg:left-6 lg:right-6 lg:top-6 lg:h-px lg:w-auto">
            <div className="edu-line-fill h-full w-full origin-top bg-[image:linear-gradient(to_bottom,#ffc861,#ff7a59,#b69cff)] lg:origin-left lg:bg-[image:linear-gradient(to_right,#ffc861,#ff7a59,#b69cff)]" />
          </div>
          <ol className="relative grid gap-8 lg:grid-cols-3 lg:gap-6">
            {JOURNEY.map((e, i) => (
              <StageCard key={e.school} e={e} i={i} />
            ))}
          </ol>
        </div>

        <div className="mt-20">
          <p className="kicker">Certifications</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CERTIFICATIONS.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease }}
              >
                <Tilt
                  tiltMaxAngleX={10}
                  tiltMaxAngleY={10}
                  perspective={900}
                  glareEnable
                  glareMaxOpacity={0.14}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="20px"
                  className="h-full"
                >
                  <div className="gradient-border flex h-full items-center gap-4 rounded-[20px] bg-surface p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[image:var(--gradient)] text-accent-fg">
                      <BadgeCheck size={20} strokeWidth={2} />
                    </span>
                    <p className="text-[15px] font-medium leading-snug">{c}</p>
                  </div>
                </Tilt>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
