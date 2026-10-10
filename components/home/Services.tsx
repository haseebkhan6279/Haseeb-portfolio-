"use client";

import { motion } from "framer-motion";
import { Bot, CalendarCheck, Check, Globe, LayoutDashboard, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import { SERVICES } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS: LucideIcon[] = [LayoutDashboard, CalendarCheck, ShoppingBag, Smartphone, Bot, Globe];

export default function Services() {
  return (
    <section id="services" className="section scroll-mt-16">
      <div className="shell">
        <SectionHeading index="02" name="Services" title="Everything you need to" accent="launch & grow.">
          One accountable partner for product design, engineering and launch — so you get a working product, not a
          handoff between agencies.
        </SectionHeading>

        <div className="grid gap-px overflow-hidden rounded-[24px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[i] ?? Globe;
            return (
              <motion.article
                key={s.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col bg-bg p-6 transition-colors duration-500 hover:bg-surface sm:p-8"
              >
                <div className="flex items-start justify-between">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-surface text-fg transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-accent-fg">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-8 font-display text-[1.45rem] leading-tight">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-fg-2">{s.blurb}</p>
                <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-fg-2">
                  {s.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5">
                      <Check size={14} className="shrink-0 text-accent" strokeWidth={2.5} />
                      {pt}
                    </li>
                  ))}
                </ul>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
