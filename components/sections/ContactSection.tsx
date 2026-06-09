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
    const form = e.currentTarget;
    const fd = new FormData(form);
    const email = String(fd.get("email") ?? "").trim();
    const message = String(fd.get("message") ?? "").trim();
    const website = String(fd.get("website") ?? "").trim();
    const interest =
      serviceInterest.trim() || String(fd.get("serviceInterest") ?? "").trim();
    setErrorMessage(null);

    if (website) {
      setStatus("success");
      setServiceInterest("");
      form.reset();
      return;
    }
    if (!email) {
      setErrorMessage("Please enter your email address.");
      setStatus("error");
      return;
    }
    if (!interest) {
      setErrorMessage("Please choose a service you’re interested in.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          serviceInterest: interest,
          message,
          website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        setErrorMessage(
          data.error ??
            `Could not send your message. Email me directly at ${CONTACT.email}.`,
        );
        setStatus("error");
        return;
      }
      form.reset();
      setServiceInterest("");
      setStatus("success");
    } catch (err) {
      const offline =
        typeof navigator !== "undefined" && navigator.onLine === false;
      const fetchFailed = err instanceof TypeError;
      setErrorMessage(
        offline
          ? "You appear to be offline. Check your connection and try again."
          : fetchFailed
            ? `Could not reach the server. Try again or email ${CONTACT.email}.`
            : `Something went wrong. Try again or email ${CONTACT.email}.`,
      );
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
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div data-contact-reveal>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-form-heading" className="headline-section mt-4 text-slate-50">
              Have a project in mind? Let&apos;s build it together.
            </h2>
            <p className="mt-4 text-[var(--text-lede)] text-slate-400">
              Share your goals and timeline — I&apos;ll reply within {CONTACT.responseTime} with a
              free consultation and clear next steps.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 text-slate-300 transition-colors hover:text-sky-300"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sky-400">
                    ✉
                  </span>
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 transition-colors hover:text-sky-300"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sky-400">
                    WA
                  </span>
                  WhatsApp — {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-300 transition-colors hover:text-sky-300"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-sky-400">
                    in
                  </span>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="glass-panel rounded-2xl p-5 sm:p-8" data-contact-reveal>
            {status === "success" ? (
              <p className="text-slate-300">
                Thanks — I&apos;ll reply within {CONTACT.responseTime} at{" "}
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
                    name="serviceInterest"
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
                    placeholder="What are you building? Timeline, budget range, links — anything that helps."
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
                  {status === "sending" ? "Sending…" : "Send Project Inquiry →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
