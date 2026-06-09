import { CONTACT } from "@/data/site";
import { PROJECTS } from "@/data/projects";

export const CTA = {
  eyebrow: "Let's Work Together",
  headline: "Have a project in mind? Let's build it together.",
  subtext:
    "Tell me about your goals — I'll reply within 24 hours with a free consultation and a clear plan. No commitment required.",
  primary: { label: "Start Your Project →", href: "/#contact" },
  secondary: { label: "View Case Studies", href: "/#projects" },
} as const;

export const FOOTER = {
  tagline:
    "Freelance web developer based in Lahore. I help startups, agencies, and founders ship websites, apps, and automations that drive real business results.",
  services: [
    { label: "Custom Web Development", href: "/#services" },
    { label: "SaaS Development", href: "/#services" },
    { label: "E-commerce", href: "/#services" },
    { label: "AI Integration", href: "/#services" },
    { label: "Landing Pages", href: "/#services" },
    { label: "Website Optimization", href: "/#services" },
    { label: "Mobile Apps", href: "/#services" },
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
