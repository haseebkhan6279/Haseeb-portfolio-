"use client";

import { ArrowRight, ArrowUpRight, Briefcase, Download, MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/site";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import Counter from "@/components/ui/Counter";
import Magnetic from "@/components/ui/Magnetic";
import { SplitReveal } from "@/components/ui/Reveal";

const roundDown = (n: number) => Math.max(5, Math.floor(n / 5) * 5);

const STATS = [
  { value: roundDown(PROJECTS.length), suffix: "+", label: "Projects delivered" },
  { value: roundDown(PROJECTS.filter((p) => p.url).length), suffix: "+", label: "Live products" },
  { value: 3, suffix: "", label: "Countries served" },
  { value: 24, suffix: "h", label: "Typical reply time" },
];

const STACK = ["Next.js", "React Native", "Node.js", "TypeScript"];

function Portrait({ photo }: { photo: string | null }) {
  return (
    <div className="hero-portrait relative mx-auto w-full max-w-[380px] sm:max-w-[420px] lg:max-w-none">
      <div className="hero-portrait-media relative aspect-[4/4.6] overflow-hidden rounded-[28px] bg-[#0b0d0c] shadow-[var(--shadow)] sm:aspect-[4/5]">
        {photo ? (
          <Image
            src={photo}
            alt={`${PROFILE.displayName}, ${PROFILE.role}`}
            fill
            preload
            sizes="(min-width: 1024px) 32vw, 420px"
            className="hero-portrait-img object-cover object-[64%_center]"
          />
        ) : (
          <div className="hero-portrait-img absolute inset-0">
            <div className="dot-grid absolute inset-0 opacity-25 [--line-strong:rgb(255_255_255/0.35)]" />
            <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-[#34d399]/30 blur-[90px]" />
            <div className="absolute -bottom-20 -left-10 h-60 w-60 rounded-full bg-[#34d399]/15 blur-[80px]" />
            <span className="absolute inset-0 grid place-items-center font-italic text-[clamp(7rem,16vw,11rem)] italic leading-none text-white/90">
              HK
            </span>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <p className="text-lg font-semibold tracking-tight">{PROFILE.displayName}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-sm text-white/70">
            <MapPin size={13} /> Lahore, Pakistan · Remote worldwide
          </p>
        </div>
      </div>

      <div className="hero-float absolute -left-2 top-8 sm:-left-8 lg:-left-12">
        <div className="float-y flex items-center gap-3 rounded-2xl border border-line bg-surface/95 p-3 pr-4 shadow-[var(--shadow-sm)] backdrop-blur">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-accent">
            <Briefcase size={16} />
          </span>
          <span className="leading-tight">
            <span className="block text-[11px] text-muted">Currently</span>
            <span className="block text-[13px] font-medium">Web Developer · Hypelet</span>
          </span>
        </div>
      </div>

      <div className="hero-float absolute bottom-24 hidden sm:-right-6 sm:block lg:-right-8">
        <div className="float-y rounded-2xl border border-line bg-surface/95 p-3 shadow-[var(--shadow-sm)] backdrop-blur [animation-delay:-3s]">
          <p className="px-1 text-[11px] text-muted">Core stack</p>
          <div className="mt-2 flex max-w-[11rem] flex-wrap gap-1">
            {STACK.map((s) => (
              <span key={s} className="rounded-md bg-surface-2 px-2 py-1 text-[11px] font-medium text-fg-2">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Hero({ photo }: { photo: string | null }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(root);
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.from(q(".hero-in"), { y: 24, opacity: 0, duration: 1.1, stagger: 0.08 }, 0.15)
        .fromTo(
          q(".hero-portrait-media"),
          { clipPath: "inset(100% 0% 0% 0% round 28px)" },
          { clipPath: "inset(0% 0% 0% 0% round 28px)", duration: 1.5, ease: "expo.inOut" },
          0.1,
        )
        .from(q(".hero-portrait-img"), { scale: 1.3, duration: 1.8 }, 0.1)
        .from(q(".hero-float"), { y: 20, opacity: 0, duration: 1, stagger: 0.12 }, 1.05);
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden pt-28 sm:pt-36">
      <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,#000,transparent)]" />
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 -z-10 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[120px]" />

      <div className="shell">
        <div className="grid items-center gap-14 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
          <div>
            <p className="hero-in inline-flex items-center gap-2.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-[13px] text-fg-2 shadow-[var(--shadow-sm)]">
              <span className="status-dot" />
              {PROFILE.availability}
            </p>

            <SplitReveal as="h1" className="h-display mt-7" immediate delay={0.1}>
              {/* Margin instead of a trailing space: SplitText drops whitespace after nested elements. */}
              Full-stack developer building <span className="serif-i mr-[0.24em] text-accent">fast, reliable</span>web
              &amp; mobile products.
            </SplitReveal>

            <p className="hero-in lede mt-7 max-w-[37rem]">
              I’m {PROFILE.firstName} — I help startups and growing businesses in the UK, US and Pakistan launch online
              shops, booking platforms, dashboards and mobile apps. Designed, built and shipped end to end.
            </p>

            <div className="hero-in mt-9 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Magnetic strength={0.2} className="block w-full sm:inline-block sm:w-auto">
                <Link href="/#work" className="btn btn-primary w-full sm:w-auto">
                  View my work <ArrowRight size={16} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.2} className="block w-full sm:inline-block sm:w-auto">
                <Link href="/contact" className="btn btn-ghost w-full sm:w-auto">
                  Start a project <ArrowUpRight size={16} />
                </Link>
              </Magnetic>
              <a
                href={PROFILE.cv}
                target="_blank"
                rel="noreferrer"
                className="link-underline mx-auto inline-flex items-center gap-2 py-2 text-sm font-medium text-fg-2 hover:text-fg sm:mx-0 sm:ml-2"
              >
                <Download size={15} /> Download CV
              </a>
            </div>
          </div>

          <Portrait photo={photo} />
        </div>

        <dl className="hero-in mt-16 grid grid-cols-2 gap-px overflow-hidden border-y border-line bg-line sm:mt-20 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex min-w-0 flex-col-reverse bg-bg px-1 py-7 sm:px-6 sm:py-9 [&:nth-child(even)]:pl-5 sm:[&:nth-child(even)]:pl-6">
              <dt className="mt-2.5 text-sm text-muted">{s.label}</dt>
              <dd className="font-display text-[clamp(2.1rem,4.5vw,3.25rem)] leading-none">
                <Counter value={s.value} suffix={s.suffix} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
