"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EXPERIENCE } from "@/data/experience";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Experience() {
  return (
    <section id="experience" className="section scroll-mt-16 border-t border-line">
      <div className="shell">
        <SectionHeading index="05" name="Experience" title="Where I’ve been" accent="building.">
          Product teams, freelance clients and the agency internship where it started.
        </SectionHeading>

        <ol className="relative">
          {EXPERIENCE.map((xp, i) => {
            const current = xp.period.includes("Present");
            return (
              <motion.li
                key={xp.company}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="grid gap-5 border-t border-line py-10 sm:py-12 lg:grid-cols-[260px_1fr] lg:gap-14"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.08em] text-muted">{xp.period}</p>
                  <p className="mt-3 font-display text-[1.75rem] leading-none">{xp.company}</p>
                  <p className="mt-2 text-sm text-fg-2">{xp.type}</p>
                  {current ? (
                    <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-2.5 py-1 text-xs text-fg-2">
                      <span className="status-dot !h-1.5 !w-1.5" /> Current
                    </span>
                  ) : null}
                </div>

                <div className="min-w-0">
                  {xp.summary ? <p className="max-w-2xl text-[1.05rem] leading-relaxed text-fg">{xp.summary}</p> : null}
                  {xp.roles.map((r, ri) => (
                    <div key={r.period} className={ri > 0 || xp.summary ? "mt-7" : ""}>
                      <p className="flex flex-wrap items-baseline gap-x-2 font-medium">
                        {r.title}
                        <span className="text-sm font-normal text-muted">· {r.period}</span>
                      </p>
                      <ul className="mt-3 space-y-2.5 text-[15px] leading-relaxed text-fg-2">
                        {r.points.map((pt) => (
                          <li key={pt} className="flex gap-3">
                            <span className="mt-[0.6rem] h-1 w-2.5 shrink-0 rounded-full bg-accent/70" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      {r.links?.length ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          {r.links.map((l) => (
                            <a
                              key={l.href}
                              href={l.href}
                              target="_blank"
                              rel="noreferrer"
                              className="chip transition-colors hover:border-fg hover:text-fg"
                            >
                              {l.label} <ArrowUpRight size={12} />
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                  {xp.stack ? (
                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {xp.stack.map((s) => (
                        <span key={s} className="rounded-md bg-surface-2 px-2 py-1 font-mono text-[11px] text-fg-2">
                          {s}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
