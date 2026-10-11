"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { PROJECTS } from "@/data/projects";
import { PROFILE } from "@/data/site";
import Counter from "@/components/ui/Counter";
import { ScrubText } from "@/components/ui/Reveal";

const roundDown = (n: number) => Math.max(5, Math.floor(n / 5) * 5);

const STATS = [
  { value: roundDown(PROJECTS.length), suffix: "+", label: "Projects delivered" },
  { value: roundDown(PROJECTS.filter((p) => p.url).length), suffix: "+", label: "Live products" },
  { value: 3, suffix: "", label: "Countries served" },
  { value: 24, suffix: "h", label: "Typical reply time" },
];

/** Scroll-scrubbed statement with a layered parallax portrait and stats. */
export default function Manifesto({ photo }: { photo: string | null }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const frameY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [-40, 140]);
  const badgeY = useTransform(scrollYProgress, [0, 1], ["60%", "-90%"]);
  const bigY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section ref={ref} className="section relative overflow-hidden">
      <motion.p
        aria-hidden
        style={{ y: bigY }}
        className="text-outline pointer-events-none absolute -right-[5vw] top-10 select-none font-display text-[22vw] leading-none tracking-[-0.06em] opacity-60"
      >
        HK
      </motion.p>

      <div className="shell relative grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <motion.div style={{ y: frameY }} className="relative mx-auto w-full max-w-[400px]">
          <motion.div
            aria-hidden
            style={{ rotate: ringRotate }}
            className="absolute -inset-6 rounded-full border border-dashed border-line-strong"
          />
          <div className="gradient-border relative aspect-[4/5] overflow-hidden rounded-[32px] bg-surface">
            <motion.div style={{ y: imgY }} className="absolute inset-[-16%_0]">
              {photo ? (
                <Image
                  src={photo}
                  alt={`${PROFILE.displayName}, ${PROFILE.role}`}
                  fill
                  sizes="(min-width:1024px) 400px, 80vw"
                  className="object-cover object-[64%_center]"
                />
              ) : (
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#2e2e2e,transparent_55%),radial-gradient(circle_at_80%_80%,#1c1c1c,transparent_50%)]">
                  <span className="serif-i absolute inset-0 grid place-items-center text-[9rem] leading-none">HK</span>
                </div>
              )}
            </motion.div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <p className="font-display text-xl text-white">{PROFILE.displayName}</p>
              <p className="mt-1 flex items-center gap-1.5 text-sm text-white/70">
                <MapPin size={13} /> {PROFILE.location}
              </p>
            </div>
          </div>
          <motion.div
            style={{ y: badgeY }}
            className="absolute -right-4 bottom-28 rounded-2xl border border-line bg-surface/80 px-4 py-3 shadow-[var(--shadow)] backdrop-blur-xl sm:-right-10"
          >
            <p className="text-[11px] text-muted">Currently</p>
            <p className="text-sm font-semibold">Web Developer · Hypelet</p>
          </motion.div>
        </motion.div>

        <div>
          <p className="kicker">Who I am</p>
          <ScrubText
            className="mt-6 font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.03em]"
            text={`I’m ${PROFILE.firstName} — a full-stack developer who thinks like a product owner. I design, build and ship web and mobile products that load fast, convert visitors and are easy to run.`}
          />
          <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-line bg-line">
            {STATS.map((s) => (
              <div key={s.label} className="flex flex-col-reverse bg-bg p-5 sm:p-7">
                <dt className="mt-2 text-sm text-muted">{s.label}</dt>
                <dd className="text-gradient font-display text-[clamp(2.2rem,4.5vw,3.5rem)] leading-none">
                  <Counter value={s.value} suffix={s.suffix} />
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
