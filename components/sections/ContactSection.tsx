"use client";

import { type FormEvent, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CONTACT_SERVICE_OPTIONS } from "@/data/services";
import { CONTACT } from "@/data/site";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serviceInterest, setServiceInterest] = useState("");
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = sectionRef.current;
    if (!root || reduced) return;
    const els = gsap.utils.toArray<HTMLElement>(root.querySelectorAll("[data-contact-reveal]"));
    gsap.set(els, { opacity: 0, y: 32 });
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        gsap.to(els, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: "power3.out" });
      },
      { threshold: 0.08 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [reduced]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const website = String(fd.get("website") ?? "").trim();
    setErrorMessage(null);

    if (website) {
      setStatus("success");
      setServiceInterest("");
      return;
    }
    if (!serviceInterest) {
      setErrorMessage("Please choose a service you’re interested in.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, serviceInterest, message, website }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrorMessage(data.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }
      setStatus("success");
      setServiceInterest("");
      e.currentTarget.reset();
    } catch {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="section-pad border-t border-white/5 pb-24"
      aria-labelledby="contact-form-heading"
    >
      <div className="section-shell max-w-2xl">
        <h2 id="contact-form-heading" className="font-display text-2xl text-slate-50" data-contact-reveal>
          Send me a message
        </h2>
        <div className="glass-panel mt-8 rounded-2xl p-5 sm:p-8" data-contact-reveal>
          {status === "success" ? (
            <p className="text-slate-300">
              Thanks—we&apos;ll reply within 24 hours at{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-sky-300">
                {CONTACT.email}
              </a>
              .
            </p>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit} noValidate>
              <label className="block text-sm text-slate-400">
                Email *
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100"
                  disabled={status === "sending"}
                />
              </label>
              <label className="block text-sm text-slate-400">
                Service interest *
                <select
                  value={serviceInterest}
                  onChange={(e) => setServiceInterest(e.target.value)}
                  required
                  className="contact-form__select mt-2 w-full rounded-xl border border-white/15 bg-white px-4 py-3 text-slate-900"
                  disabled={status === "sending"}
                >
                  <option value="">Select a service</option>
                  {CONTACT_SERVICE_OPTIONS.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sr-only" aria-hidden>
                Website
                <input name="website" type="text" tabIndex={-1} defaultValue="" />
              </label>
              <label className="block text-sm text-slate-400">
                Project details
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Timeline, scope, links—anything that helps."
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100"
                  disabled={status === "sending"}
                />
              </label>
              {status === "error" && errorMessage ? (
                <p className="text-sm text-red-400" role="alert">
                  {errorMessage}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-interactive w-full rounded-full bg-sky-400 px-8 py-3.5 text-sm font-semibold text-slate-950 hover:bg-sky-300 disabled:opacity-60 sm:w-auto"
              >
                {status === "sending" ? "Sending…" : "Send Message →"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
