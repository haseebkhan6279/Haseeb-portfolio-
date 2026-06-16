"use client";

import { useEffect, useRef, useState } from "react";
import { TRUST_STATS } from "@/data/stats";
import { useCountUp } from "@/hooks/useCountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function StatCard({
  value,
  suffix,
  label,
  active,
}: {
  value: number;
  suffix?: string;
  label: string;
  active: boolean;
}) {
  const count = useCountUp(value, 1800, active);
  return (
    <div className="trust-stat group relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900/55 p-5 text-center shadow-[0_10px_30px_rgba(2,6,23,0.35)] backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/40 hover:bg-slate-900/70 hover:shadow-[0_18px_36px_rgba(14,165,233,0.18)] md:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-300/70 to-transparent opacity-70" />
      <p className="font-display text-3xl font-semibold tracking-tight text-sky-300 md:text-4xl">
        {count}
        {suffix ?? ""}
      </p>
      <p className="mt-2 text-xs uppercase tracking-[0.14em] text-slate-300/85 md:text-[0.8rem]">
        {label}
      </p>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) {
      setActive(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  return (
    <section ref={ref} className="section-pad-sm border-t border-white/5" aria-label="Portfolio statistics">
      <div className="section-shell">
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {TRUST_STATS.map((stat) => (
            <li key={stat.label}>
              <StatCard {...stat} active={active} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
