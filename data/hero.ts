export const HERO = {
  availability: "Available for new projects",
  headline:
    "I help businesses build fast, scalable web applications and modern websites that drive growth.",
  trustLine:
    "Trusted by startups, agencies, and brands worldwide — 25+ projects shipped with 100% client satisfaction.",
  ctaPrimary: { label: "Start Your Project →", href: "/#contact" },
  ctaSecondary: { label: "View Case Studies", href: "/#projects" },
} as const;

/** Rotating value propositions — business outcomes, not tech labels */
export const HERO_SLIDES = [
  {
    highlight: "More leads",
    description:
      "Conversion-focused landing pages and websites engineered to turn visitors into paying customers — clear messaging, fast load times, and CTAs that work.",
  },
  {
    highlight: "Faster operations",
    description:
      "Custom dashboards, booking systems, and SaaS tools that replace spreadsheets and manual work — built to scale with your team.",
  },
  {
    highlight: "Higher revenue",
    description:
      "E-commerce stores and booking platforms with smooth checkout, mobile-first UX, and SEO foundations that bring in qualified traffic.",
  },
  {
    highlight: "Smarter workflows",
    description:
      "AI integrations and automations that handle leads, support, and repetitive tasks — so your team focuses on growth.",
  },
] as const;
