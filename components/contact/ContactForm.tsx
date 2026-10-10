"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { CONTACT_TOPICS } from "@/data/contact";
import { CONTACT } from "@/data/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [topic, setTopic] = useState<string>(CONTACT_TOPICS[0]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          serviceInterest: topic,
          message: name ? `From: ${name}\n\n${message}` : message,
          website: form.get("website"),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error ?? "Something went wrong.");
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "sent" ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-start gap-5 py-6 sm:py-10"
        >
          <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-accent-fg">
            <Check size={26} />
          </span>
          <h3 className="font-display text-3xl">Message sent</h3>
          <p className="text-fg-2">Thanks — I&apos;ll get back to you {CONTACT.responseTime.toLowerCase()}.</p>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={onSubmit} exit={{ opacity: 0, y: -20 }} className="space-y-6">
          <fieldset>
            <legend className="mb-3 text-sm font-medium">I&apos;m reaching out about</legend>
            <div className="grid grid-cols-1 gap-2 sm:flex sm:flex-wrap">
              {CONTACT_TOPICS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTopic(t)}
                  aria-pressed={topic === t}
                  className={`rounded-full border px-3 py-2.5 text-center text-[13px] transition-colors sm:px-3 sm:py-2 sm:text-left ${
                    topic === t ? "border-fg bg-fg text-bg" : "border-line-strong bg-surface text-fg-2 hover:border-fg hover:text-fg"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium">Your name</span>
              <input name="name" autoComplete="name" placeholder="Jane Smith" className="field" maxLength={120} />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium">
                Email <span className="text-accent">*</span>
              </span>
              <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" className="field" />
            </label>
          </div>
          <label className="block">
            <span className="mb-2 block text-sm font-medium">Project details</span>
            <textarea
              name="message"
              rows={6}
              maxLength={7000}
              placeholder="What are you building? Goals, timeline and budget help me give you an accurate quote."
              className="field resize-none"
            />
          </label>
          <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

          <div className="flex flex-wrap items-center gap-5">
            <button type="submit" disabled={status === "sending"} className="btn btn-primary w-full disabled:opacity-60 sm:w-auto" data-cursor="Send">
              {status === "sending" ? (
                <>
                  Sending <Loader2 size={18} className="animate-spin" />
                </>
              ) : (
                <>
                  Send message <ArrowUpRight size={18} />
                </>
              )}
            </button>
            {status === "error" ? (
              <p role="alert" className="text-sm text-syn-red">
                {error} You can also email{" "}
                <a className="underline" href={`mailto:${CONTACT.email}`}>
                  {CONTACT.email}
                </a>
                .
              </p>
            ) : null}
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
