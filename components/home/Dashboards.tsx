"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Layers, Lock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLenis } from "lenis/react";
import { useRef, useState } from "react";
import { DASHBOARDS, type Dashboard } from "@/data/dashboards";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";
import SectionHeading from "@/components/ui/SectionHeading";

const ease = [0.16, 1, 0.3, 1] as const;

function BrowserBar({ host, tint }: { host: string; tint?: string }) {
  return (
    <div className="flex h-9 items-center gap-3 border-b border-line bg-surface-2/90 px-4">
      <span className="flex gap-1.5">
        <i className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <i className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </span>
      <span className="mx-auto flex min-w-0 items-center gap-1.5 rounded-md bg-bg/60 px-3 py-1 font-mono text-[11px] text-fg-2">
        <Lock size={10} style={{ color: tint }} />
        <span className="truncate">{host}</span>
      </span>
      <span className="w-[42px]" />
    </div>
  );
}

function PortalLinks({ d }: { d: Dashboard }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {d.url ? (
        <a href={d.url} target="_blank" rel="noreferrer" data-cursor="Open" className="btn btn-primary h-11 text-sm">
          Open live portal <ArrowUpRight size={16} />
        </a>
      ) : (
        <Link href="/contact" className="btn btn-primary h-11 text-sm">
          Demo on request <ArrowUpRight size={16} />
        </Link>
      )}
      {d.slug ? (
        <Link href={`/work/${d.slug}`} className="btn btn-ghost h-11 text-sm">
          Case study
        </Link>
      ) : null}
    </div>
  );
}

function TenantBadge({ d }: { d: Dashboard }) {
  if (!d.tenancy) return null;
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium"
      style={{ borderColor: `${d.tint}66`, color: d.tint, background: `${d.tint}14` }}
    >
      <Layers size={12} /> Multi-tenant SaaS
    </span>
  );
}

function TenancyNote({ d, className = "" }: { d: Dashboard; className?: string }) {
  if (!d.tenancy) return null;
  return (
    <p className={`flex items-start gap-2 text-[13px] leading-snug text-fg-2 ${className}`}>
      <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: d.tint }} />
      {d.tenancy}
    </p>
  );
}

/** Mobile / reduced motion: plain stacked cards. */
function DashboardCard({ d }: { d: Dashboard }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, ease }}
      className="gradient-border overflow-hidden rounded-[22px] bg-surface"
    >
      <BrowserBar host={d.host} tint={d.tint} />
      <div className="relative aspect-[2.4/1] bg-white">
        <Image src={d.image} alt={`${d.name} — ${d.product}`} fill sizes="100vw" className="object-cover object-left-top" />
      </div>
      <div className="p-5 sm:p-7">
        {d.tenancy ? (
          <div className="mb-3">
            <TenantBadge d={d} />
          </div>
        ) : null}
        <p className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: d.tint }}>
          {d.product}
        </p>
        <h3 className="mt-2 font-display text-2xl tracking-[-0.03em]">{d.name}</h3>
        <p className="mt-2 leading-relaxed text-fg-2">{d.summary}</p>
        <TenancyNote d={d} className="mt-3" />
        <div className="mt-4 flex flex-wrap gap-1.5">
          {d.modules.map((m) => (
            <span key={m} className="chip">
              {m}
            </span>
          ))}
        </div>
        <div className="mt-5">
          <PortalLinks d={d} />
        </div>
      </div>
    </motion.article>
  );
}

/**
 * Pinned showcase of the multi-tenant SaaS platforms (and one back office): the browser frame tilts up into view,
 * then each portal wipes in over the last as you scroll.
 */
export default function Dashboards() {
  const root = useRef<HTMLElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);
  const [active, setActive] = useState(0);
  const lenis = useLenis();
  const n = DASHBOARDS.length;
  const current = DASHBOARDS[active] ?? DASHBOARDS[0];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (min-height: 600px)", () => {
        if (prefersReducedMotion()) return;
        const pin = q<HTMLElement>(".dash-pin")[0];
        const frame = q<HTMLElement>(".dash-frame")[0];
        const shots = q<HTMLElement>(".dash-shot");
        if (!pin || !frame) return;

        gsap.fromTo(
          frame,
          { rotateX: 24, scale: 0.84, yPercent: 10 },
          {
            rotateX: 0,
            scale: 1,
            yPercent: 0,
            ease: "none",
            scrollTrigger: { trigger: pin, start: "top bottom", end: "top top", scrub: true },
          },
        );

        const tl = gsap.timeline({
          defaults: { duration: 1 },
          scrollTrigger: {
            trigger: pin,
            start: "top top",
            end: () => `+=${(n - 1) * window.innerHeight * 0.85}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => setActive(Math.min(n - 1, Math.round(self.progress * (n - 1)))),
          },
        });
        trigger.current = tl.scrollTrigger ?? null;

        shots.forEach((shot, i) => {
          if (i === 0) return;
          const prev = shots[i - 1];
          tl.fromTo(shot, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "power1.inOut" }, i - 1)
            .fromTo(shot.querySelector("img"), { yPercent: 14, scale: 1.12 }, { yPercent: 0, scale: 1, ease: "none" }, i - 1);
          if (prev) {
            tl.to(prev.querySelector("img"), { yPercent: -8, scale: 1.06, ease: "none" }, i - 1).to(
              prev.querySelector(".dash-dim"),
              { opacity: 0.6, ease: "none" },
              i - 1,
            );
          }
        });
        q<HTMLElement>(".dash-tab-fill").forEach((fill, i) => {
          if (i > 0) tl.fromTo(fill, { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1 }, i - 1);
        });

        return () => {
          trigger.current = null;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  function jump(i: number) {
    const st = trigger.current;
    if (!st) return;
    const y = st.start + ((st.end - st.start) * i) / (n - 1) + 2;
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  }

  return (
    <section ref={root} id="dashboards" className="theme-ink relative scroll-mt-16 border-t border-line">
      {/* Mobile + tablet */}
      <div className="section pin:hidden">
        <div className="shell">
          <SectionHeading index="03" name="SaaS platforms" title="Multi-tenant SaaS," accent="running real businesses.">
            Four multi-tenant platforms I designed and built — every business gets its own isolated workspace — plus a
            back office for a UK phone wholesaler.
          </SectionHeading>
          <div className="space-y-8">
            {DASHBOARDS.map((d) => (
              <DashboardCard key={d.name} d={d} />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop (tall enough to pin): scroll story with the info column beside the frame */}
      <div className="dash-pin relative hidden h-svh flex-col overflow-hidden pb-6 pt-[5.5rem] pin:flex">
        <div
          aria-hidden
          className="aurora left-[60%] top-1/2 h-[30rem] w-[50rem] -translate-x-1/2 -translate-y-1/3 opacity-30 transition-colors duration-700"
          style={{ background: current.tint }}
        />

        <div className="shell relative flex shrink-0 items-end justify-between gap-8">
          <div className="min-w-0">
            <p className="kicker">
              <span className="text-fg">03</span>
              <span aria-hidden>/</span>SaaS platforms
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,2.7vw,2.6rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
              Multi-tenant SaaS, <span className="serif-i">running real businesses.</span>
            </h2>
          </div>
          <div className="flex shrink-0 flex-wrap justify-end gap-1.5" role="tablist" aria-label="Choose a platform">
            {DASHBOARDS.map((d, i) => (
              <button
                key={d.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => jump(i)}
                className={`relative overflow-hidden rounded-full border px-3.5 py-1.5 text-[13px] transition-colors duration-300 ${
                  i === active ? "border-line-strong bg-surface/60 text-fg" : "border-line text-muted hover:text-fg"
                }`}
              >
                <span
                  aria-hidden
                  className="dash-tab-fill absolute inset-x-0 bottom-0 h-[2px] origin-left"
                  style={{ background: d.tint, transform: i === 0 ? undefined : "scaleX(0)" }}
                />
                <span className="font-mono text-[11px] opacity-60">0{i + 1}</span> {d.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>

        <div className="shell relative mt-6 grid min-h-0 flex-1 grid-cols-[minmax(17rem,21rem)_minmax(0,1fr)] items-center gap-10 xl:gap-14">
          {/* Info column: remounts per platform so it animates in fresh. */}
          <motion.div
            key={current.name}
            className="flex max-h-full min-h-0 flex-col justify-center overflow-hidden"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.05 } } }}
          >
            {[
              <div key="badge" className="flex flex-wrap items-center gap-2">
                <TenantBadge d={current} />
              </div>,
              <p key="product" className="mt-3 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: current.tint }}>
                {current.product}
              </p>,
              <h3 key="name" className="mt-2 font-display text-[clamp(1.6rem,2.2vw,2.1rem)] leading-none tracking-[-0.035em]">
                {current.name}
              </h3>,
              <p key="summary" className="mt-3 line-clamp-4 text-[14.5px] leading-relaxed text-fg-2">
                {current.summary}
              </p>,
              <div key="modules" className="mt-4 flex flex-wrap gap-1.5">
                {current.modules.map((m) => (
                  <span key={m} className="rounded-full border border-line bg-surface/70 px-2.5 py-1 text-[12px] text-fg-2">
                    {m}
                  </span>
                ))}
              </div>,
              <TenancyNote key="tenancy" d={current} className="mt-4" />,
              <div key="links" className="mt-5">
                <PortalLinks d={current} />
              </div>,
            ].map((node, i) => (
              <motion.div
                key={i}
                variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                transition={{ duration: 0.5, ease }}
              >
                {node}
              </motion.div>
            ))}
          </motion.div>

          {/* Frame cell is a size container, so the frame fits whatever height is left. */}
          <div className="relative flex h-full min-h-0 items-center justify-center [container-type:size] [perspective:1600px]">
            <div
              className="dash-frame gradient-border relative overflow-hidden rounded-[18px] bg-surface shadow-[0_50px_100px_-40px_rgb(0_0_0/0.9)] [transform-origin:50%_100%]"
              style={{ width: "min(100cqw, calc((100cqh - 2.25rem) * 2.4))" }}
            >
              <BrowserBar host={current.host} tint={current.tint} />
              <div className="relative aspect-[2.4/1] overflow-hidden bg-white">
                {DASHBOARDS.map((d, i) => (
                  <div
                    key={d.name}
                    className="dash-shot absolute inset-0 overflow-hidden"
                    style={{ zIndex: i, clipPath: i === 0 ? undefined : "inset(100% 0% 0% 0%)" }}
                  >
                    <Image
                      src={d.image}
                      alt={`${d.name} — ${d.product}`}
                      fill
                      sizes="(min-width:1024px) 1100px, 100vw"
                      loading="eager"
                      className="origin-top object-cover object-left-top"
                    />
                    <div className="dash-dim pointer-events-none absolute inset-0 bg-black opacity-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
