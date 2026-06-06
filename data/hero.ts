export const HERO = {
  line1: "I Craft",
  line3: "Presences",
  italicLineIndex: 1,
  subheading:
    "I build bespoke websites and landing pages that command attention, build trust, and convert visitors into loyal clients.",
  ctaPrimary: { label: "View Pricing →", href: "/#pricing" },
  ctaSecondary: { label: "See My Work", href: "/#projects" },
} as const;

/** Rotating center line + description — Tekvers-style hero scroll */
export const HERO_SLIDES = [
  {
    line2: "Digital",
    description: HERO.subheading,
  },
  {
    line2: "Landing Pages",
    description:
      "Single, focused pages engineered to convert. I obsess over hierarchy, copy structure, and micro-interactions to turn first-time visitors into paying customers.",
  },
  {
    line2: "Web Applications",
    description:
      "SaaS dashboards, booking systems, and data-driven platforms with authentication, real-time updates, and scalable backend architecture.",
  },
  {
    line2: "SEO Services",
    description:
      "Technical SEO, on-page optimization, and content structure that help you rank, get discovered, and turn organic traffic into qualified leads.",
  },
] as const;

export const HERO_STATS = [
  { value: "25+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "15+", label: "Live Products" },
  { value: "3+", label: "Years Experience" },
] as const;
