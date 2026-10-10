import { ArrowUpRight, Mail } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import LocalTime from "@/components/ui/LocalTime";
import PageHeader from "@/components/ui/PageHeader";
import { CONTACT, PROFILE } from "@/data/site";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Tell Haseeb Khan about your project. Open to freelance work and remote roles. Replies usually within 24 hours.",
  path: "/contact",
});

const channels = [
  { label: "Email", value: CONTACT.email, href: `mailto:${CONTACT.email}`, icon: Mail },
  { label: "WhatsApp", value: CONTACT.phone, href: CONTACT.whatsapp, icon: WhatsappIcon },
  { label: "LinkedIn", value: "in/haseebgulraizkhan", href: CONTACT.linkedIn, icon: LinkedinIcon },
  { label: "GitHub", value: "haseebkhan6279", href: CONTACT.github, icon: GithubIcon },
];

const NEXT_STEPS = [
  ["I reply within 24 hours", "With questions or a first take on scope."],
  ["A short discovery call", "We align on goals, features and timeline."],
  ["A fixed proposal", "Clear scope, milestones and price — in writing."],
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        name="Contact"
        title="Let’s talk about"
        accent="your project."
        lede="Share the goal, timeline and budget. I’ll reply within 24 hours with a clear next step — usually a few questions or a call."
      />
      <div className="shell grid min-w-0 gap-6 pb-28 lg:grid-cols-[1.45fr_1fr] lg:gap-8">
        <div className="card min-w-0 overflow-hidden p-5 shadow-[var(--shadow-sm)] sm:p-9">
          <ContactForm />
        </div>

        <aside className="min-w-0 space-y-6">
          <div className="overflow-hidden rounded-[20px] border border-line bg-surface">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="group flex min-w-0 items-center justify-between gap-3 border-b border-line p-4 transition-colors last:border-b-0 hover:bg-surface-2 sm:p-5"
              >
                <span className="flex min-w-0 items-center gap-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-line bg-bg text-fg-2">
                    <c.icon size={16} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-muted">{c.label}</span>
                    <span className="block truncate text-fg">{c.value}</span>
                  </span>
                </span>
                <ArrowUpRight
                  size={17}
                  className="shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg"
                />
              </a>
            ))}
          </div>

          <div className="rounded-[20px] border border-line bg-surface p-5 sm:p-6">
            <p className="kicker kicker-plain">What happens next</p>
            <ol className="mt-5 space-y-5">
              {NEXT_STEPS.map(([title, text], i) => (
                <li key={title} className="flex gap-4">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-accent-soft font-mono text-xs text-accent">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-0.5 text-sm text-fg-2">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-line bg-surface p-5 text-sm">
            <span className="flex items-center gap-2.5 text-fg">
              <span className="status-dot" /> {PROFILE.availability}
            </span>
            <span className="text-muted">
              <LocalTime /> · Lahore
            </span>
          </div>
        </aside>
      </div>
    </>
  );
}
