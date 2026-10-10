"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { PROCESS } from "@/data/experience";

/** Studio process — no video, no product screenshot. */
export default function Showreel() {
  return (
    <section className="pb-4 pt-8" aria-label="How I work">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
          <div>
            <p className="kicker">How we work</p>
            <h2 className="font-serif mt-3 text-[clamp(1.8rem,3.2vw,2.6rem)] tracking-tight">From brief to live site</h2>
          </div>
          <Link href="/contact" className="text-sm text-fg-2 underline-offset-4 hover:text-accent hover:underline">
            Start with a brief →
          </Link>
        </div>
        <div className="grid gap-10 py-12 md:grid-cols-3">
          {PROCESS.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif text-4xl text-accent/80">{step.step}</p>
              <h3 className="mt-4 font-serif text-2xl tracking-tight">{step.title}</h3>
              <p className="mt-3 text-[0.98rem] leading-relaxed text-fg-2">{step.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
