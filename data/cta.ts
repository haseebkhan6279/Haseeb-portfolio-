import { CONTACT } from "@/data/site";
import { PROJECTS } from "@/data/projects";

export const CTA = {
  eyebrow: "Let's Work Together",
  headline: "Have a project in mind?",
  subtext:
    "Send me a message — I'll reply with a free consultation and detailed quote within 24 hours. No commitment required.",
  primary: { label: "Send a Message →", href: "/#contact" },
  secondary: { label: "GitHub Profile", href: CONTACT.github },
} as const;

export const FOOTER = {
  tagline:
    "Full-stack developer & designer based in Lahore. I help startups, brands, and founders ship websites, apps, and automations worldwide.",
  services: [
    { label: "Landing Pages", href: "/#services" },
    { label: "Full Websites", href: "/#services" },
    { label: "Web Applications", href: "/#services" },
    { label: "E-commerce", href: "/#services" },
    { label: "Shopify", href: "/#pricing" },
    { label: "Mobile Apps", href: "/#pricing" },
    { label: "UI / UX Design", href: "/#services" },
    { label: "SEO Services", href: "/#services" },
    { label: "AI Automation", href: "/#services" },
  ],
  blog: [
    { label: "All articles", href: "/blog" },
    { label: "Landing page tips", href: "/blog/why-landing-pages-convert-better-than-homepages" },
    { label: "SEO basics", href: "/blog/seo-basics-for-new-websites" },
    { label: "AI automation guide", href: "/blog/ai-automation-for-small-business-a-practical-guide" },
  ],
  work: PROJECTS.filter((p) => p.url)
    .slice(0, 8)
    .map((p) => ({ label: p.name, href: p.url! })),
  bottom: "© 2026 Haseeb Gulraiz Khan. All rights reserved.",
} as const;
