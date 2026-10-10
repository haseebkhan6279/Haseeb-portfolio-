"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Database, Layout, Server, Smartphone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { SKILL_GROUPS } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS: LucideIcon[] = [Layout, Server, Database, Smartphone, Boxes];

export default function Skills() {
  return (
    <section id="skills" className="section scroll-mt-16 border-t border-line bg-bg-2">
      <div className="shell">
        <SectionHeading index="06" name="Tech stack" title="Modern tools," accent="production-proven.">
          The stack I use day to day to ship fast, maintainable products — and the right tool when a project needs
          something else.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_GROUPS.map((g, gi) => {
            const Icon = ICONS[gi] ?? Boxes;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: (gi % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="card p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent-soft text-accent">
                    <Icon size={17} strokeWidth={1.9} />
                  </span>
                  <h3 className="font-display text-xl">{g.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <span key={s} className="chip bg-surface-2">
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="theme-ink relative flex flex-col justify-between overflow-hidden rounded-[20px] p-6 sm:p-7"
          >
            <div aria-hidden className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/30 blur-[60px]" />
            <p className="relative font-display text-xl">Need a different stack?</p>
            <p className="relative mt-3 text-sm leading-relaxed text-fg-2">
              I pick tools based on your product, team and budget — not habit. Let’s talk about what fits.
            </p>
            <Link href="/contact" className="relative mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent">
              Discuss your project <ArrowUpRight size={15} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
