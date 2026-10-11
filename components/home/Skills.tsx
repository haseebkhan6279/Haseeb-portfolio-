"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Boxes, Database, Layout, Server, Smartphone, type LucideIcon } from "lucide-react";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { SKILL_GROUPS } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

const ICONS: LucideIcon[] = [Layout, Server, Database, Smartphone, Boxes];
const TINTS = ["#b69cff", "#ff7a59", "#ffc861", "#7ef0b5", "#7ec8ff"];
// Bento spans on large screens: the first group is the hero tile.
const SPANS = ["lg:col-span-2 lg:row-span-2", "", "", "lg:col-span-2", ""];

export default function Skills() {
  return (
    <section id="skills" className="section relative scroll-mt-16 overflow-hidden border-t border-line bg-bg-2">
      <div aria-hidden className="aurora -right-40 top-20 h-[28rem] w-[28rem] bg-[#ff5a3c] opacity-20" />
      <div className="shell relative">
        <SectionHeading index="08" name="Tech stack" title="Modern tools," accent="production-proven.">
          The stack I use day to day to ship fast, maintainable products — and the right tool when a project needs
          something else.
        </SectionHeading>

        <div className="grid auto-rows-[minmax(13rem,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SKILL_GROUPS.map((g, gi) => {
            const Icon = ICONS[gi] ?? Boxes;
            const tint = TINTS[gi % TINTS.length];
            const big = gi === 0;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: (gi % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={SPANS[gi] ?? ""}
              >
                <Tilt
                  tiltMaxAngleX={7}
                  tiltMaxAngleY={7}
                  perspective={1100}
                  glareEnable
                  glareMaxOpacity={0.12}
                  glareColor="#ffffff"
                  glarePosition="all"
                  glareBorderRadius="24px"
                  transitionSpeed={1600}
                  className="h-full [transform-style:preserve-3d]"
                >
                  <div className="gradient-border relative flex h-full flex-col overflow-hidden rounded-[24px] bg-surface p-6 sm:p-7">
                    <div
                      aria-hidden
                      className="absolute -bottom-20 -right-20 h-56 w-56 rounded-full opacity-25 blur-[70px]"
                      style={{ background: tint }}
                    />
                    <div className="relative flex items-center gap-3 [transform:translateZ(40px)]">
                      <span
                        className="grid h-11 w-11 place-items-center rounded-xl border border-line-strong bg-bg/60"
                        style={{ color: tint }}
                      >
                        <Icon size={19} strokeWidth={1.8} />
                      </span>
                      <h3 className="font-display text-2xl tracking-[-0.03em]">{g.title}</h3>
                      <span className="ml-auto font-mono text-xs text-muted">{String(g.items.length).padStart(2, "0")}</span>
                    </div>
                    <div className={`relative mt-auto flex flex-wrap gap-2 pt-8 [transform:translateZ(25px)] ${big ? "lg:gap-2.5" : ""}`}>
                      {g.items.map((s) => (
                        <span
                          key={s}
                          className={`rounded-full border border-line bg-bg/50 text-fg-2 backdrop-blur transition-colors hover:border-[var(--t)] hover:text-fg ${
                            big ? "px-4 py-2 text-[15px]" : "px-3 py-1.5 text-[13px]"
                          }`}
                          style={{ ["--t" as string]: tint }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            );
          })}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="sm:col-span-2 lg:col-span-3"
          >
            <Link
              href="/contact"
              className="group relative flex h-full min-h-[13rem] flex-col justify-between overflow-hidden rounded-[24px] bg-[image:var(--gradient)] p-6 text-accent-fg sm:p-7"
            >
              <p className="font-display text-2xl leading-tight tracking-[-0.03em]">Need a different stack?</p>
              <p className="text-sm leading-relaxed opacity-80">
                I pick tools based on your product, team and budget — not habit.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold">
                Discuss your project
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:rotate-45" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
