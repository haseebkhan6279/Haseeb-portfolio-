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
    <div className="trust-stat glass-panel rounded-2xl p-6 text-center">
      <p className="font-display text-3xl text-sky-300 md:text-4xl">
        {count}
        {suffix ?? ""}
      </p>
      <p className="mt-2 text-sm text-slate-500">{label}</p>
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
