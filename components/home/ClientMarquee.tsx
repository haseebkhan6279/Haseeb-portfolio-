"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";
import { Sparkle } from "lucide-react";
import { useRef } from "react";
import { PROJECTS } from "@/data/projects";

const EXTRA = new Set(["atlantic-devices", "manpowerhub", "splendid", "tekvers", "gt-estate"]);
const NAMES = PROJECTS.filter((p) => p.featured || EXTRA.has(p.slug)).map((p) => p.name);
const SKILLS = ["Next.js", "React Native", "Node.js", "TypeScript", "NestJS", "PostgreSQL", "Three.js", "GSAP", "Stripe"];

const wrap = (min: number, max: number, v: number) => {
  const r = max - min;
  return ((((v - min) % r) + r) % r) + min;
};

/** A row that drifts on its own and speeds up / reverses with scroll velocity. */
function VelocityRow({ items, base, outline }: { items: string[]; base: number; outline?: boolean }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [-2000, 0, 2000], [-4, 0, 4], { clamp: false });
  const skew = useTransform(velocity, [-2500, 2500], [8, -8]);
  const dir = useRef(1);
  const xPct = useTransform(x, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const f = factor.get();
    if (f < 0) dir.current = -1;
    else if (f > 0) dir.current = 1;
    x.set(x.get() + dir.current * base * (delta / 1000) * (1 + Math.abs(f)));
  });

  return (
    <div className="flex overflow-hidden whitespace-nowrap">
      <motion.div className="flex shrink-0 items-center" style={{ x: xPct, skewX: reduce ? 0 : skew }}>
        {[0, 1].map((k) => (
          <div key={k} aria-hidden={k === 1} className="flex shrink-0 items-center">
            {items.map((n) => (
              <span key={n} className="flex items-center">
                <span
                  className={`px-6 font-display text-[clamp(2.4rem,7vw,6rem)] leading-[1.05] tracking-[-0.045em] transition-colors duration-300 sm:px-10 ${
                    outline ? "text-outline hover:[-webkit-text-stroke-color:var(--accent)]" : "text-fg/90 hover:text-accent"
                  }`}
                >
                  {n}
                </span>
                <Sparkle size={28} className="shrink-0 text-accent-2" strokeWidth={1.5} />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

/** Two counter-running, scroll-reactive rows: products shipped + tools used. */
export default function ClientMarquee() {
  return (
    <section aria-label="Products shipped" className="relative overflow-hidden border-y border-line py-12 sm:py-16">
      <p className="shell kicker mb-8">Products shipped &amp; tools I ship with</p>
      <div className="-rotate-[1.5deg] space-y-2">
        <VelocityRow items={NAMES} base={-2.2} />
        <VelocityRow items={SKILLS} base={2.2} outline />
      </div>
      <ul className="sr-only">
        {NAMES.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </section>
  );
}
