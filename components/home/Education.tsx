"use client";

import { motion } from "framer-motion";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { CERTIFICATIONS, EDUCATION } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education() {
  return (
    <section id="education" className="section scroll-mt-16 border-t border-line">
      <div className="shell">
        <SectionHeading index="07" name="Education" title="Education &" accent="certifications.">
          A Computer Science foundation, sharpened by shipping real products.
        </SectionHeading>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <ol>
            {EDUCATION.map((e, i) => {
              const current = "note" in e && e.note === "In progress";
              return (
                <motion.li
                  key={e.school}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.7, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  className="flex gap-5 border-t border-line py-6 last:border-b"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-surface text-fg-2">
                    <GraduationCap size={18} strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <h3 className="font-display text-lg">{e.degree}</h3>
                      <p className="font-mono text-xs text-muted">{e.period}</p>
                    </div>
                    <p className="mt-1 text-fg-2">{e.school}</p>
                    {"note" in e && e.note ? (
                      <p className={`mt-2 text-sm ${current ? "text-accent" : "text-muted"}`}>{e.note}</p>
                    ) : null}
                  </div>
                </motion.li>
              );
            })}
          </ol>

          <div>
            <p className="kicker kicker-plain mb-5">Certifications</p>
            <div className="grid gap-3">
              {CERTIFICATIONS.map((c, i) => (
                <motion.div
                  key={c}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-4"
                >
                  <BadgeCheck size={20} className="shrink-0 text-accent" strokeWidth={1.8} />
                  <p className="text-sm leading-snug">{c}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
