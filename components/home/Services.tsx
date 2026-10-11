"use client";

import { ArrowUpRight, Bot, CalendarCheck, Check, Globe, LayoutDashboard, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { SERVICES } from "@/data/experience";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS: LucideIcon[] = [LayoutDashboard, CalendarCheck, ShoppingBag, Smartphone, Bot, Globe];
const TINTS = ["#e5e5e5", "#d4d4d4", "#a3a3a3"];

function spot(e: React.PointerEvent<HTMLElement>) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

/** Desktop: the section pins and the cards travel sideways. Mobile: a simple stack. */
export default function Services() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 740px)", () => {
        if (prefersReducedMotion()) return;
        const track = q<HTMLElement>(".svc-track")[0];
        const pin = q<HTMLElement>(".svc-pin")[0];
        if (!track || !pin) return;
        const distance = () => track.scrollWidth - window.innerWidth + 48;
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
        gsap.to(q(".svc-progress"), {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: pin, start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" className="relative isolate scroll-mt-16">
      <div className="svc-pin relative overflow-hidden py-[clamp(4.5rem,8vw,6.75rem)] pin-tall:flex pin-tall:h-svh pin-tall:flex-col pin-tall:justify-center pin-tall:pb-8 pin-tall:pt-20">
        <div aria-hidden className="aurora -z-10 -left-40 top-1/3 h-[30rem] w-[30rem] bg-[var(--glow-sage)] opacity-[0.18]" />
        <div className="shell">
          <SectionHeading title="Everything you need to" accent="launch & grow." className="!mb-10 pin-tall:!mb-8">
            One accountable partner for product design, engineering and launch — so you get a working product, not a
            handoff between agencies.
          </SectionHeading>
        </div>

        <div className="svc-track shell grid gap-4 sm:grid-cols-2 lg:grid-cols-3 pin-tall:flex pin-tall:w-max pin-tall:max-w-none pin-tall:flex-row pin-tall:gap-6 pin-tall:pl-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))] pin-tall:pr-12">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i] ?? Globe;
            const tint = TINTS[i % TINTS.length];
            return (
              <article
                key={s.title}
                onPointerMove={spot}
                className="svc-card spotlight gradient-border group relative flex min-h-[24rem] flex-col overflow-hidden rounded-[28px] bg-surface p-7 transition-transform duration-500 hover:-translate-y-1 sm:p-9 pin-tall:h-[min(30rem,calc(100svh-19rem))] pin-tall:w-[26rem]"
                style={{ ["--tint" as string]: tint }}
              >
                <div
                  aria-hidden
                  className="absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-[0.08] blur-[60px] transition-opacity duration-500 group-hover:opacity-[0.16]"
                  style={{ background: tint }}
                />
                <span
                  className="relative grid h-14 w-14 place-items-center rounded-2xl border border-line-strong bg-bg/60 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110"
                  style={{ color: tint }}
                >
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <h3 className="relative mt-auto pt-10 font-display text-[1.8rem] leading-[1.05] tracking-[-0.03em]">{s.title}</h3>
                <p className="relative mt-3 leading-relaxed text-fg-2">{s.blurb}</p>
                <ul className="relative mt-6 space-y-2 border-t border-line pt-5 text-sm text-fg-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5">
                      <Check size={14} className="shrink-0" style={{ color: tint }} strokeWidth={2.5} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}

          <Link
            href="/contact"
            data-cursor="Talk"
            className="group relative flex min-h-[16rem] flex-col justify-between overflow-hidden rounded-[28px] bg-[image:var(--gradient)] p-7 text-accent-fg sm:p-9 pin-tall:h-[min(30rem,calc(100svh-19rem))] pin-tall:w-[22rem]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.14em] opacity-70">Not sure what you need?</p>
            <div>
              <p className="font-display text-[2.4rem] leading-[0.95] tracking-[-0.04em]">Let’s scope it together.</p>
              <span className="mt-6 inline-grid h-14 w-14 place-items-center rounded-full bg-accent-fg text-fg transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight size={22} />
              </span>
            </div>
          </Link>
        </div>

        <div className="shell mt-8 hidden pin-tall:block">
          <div className="h-px w-full bg-line">
            <div className="svc-progress h-full origin-left scale-x-0 bg-[image:var(--gradient)]" />
          </div>
        </div>
      </div>
    </section>
  );
}
