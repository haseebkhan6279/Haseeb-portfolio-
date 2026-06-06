export const WHY_INTRO = {
  eyebrow: "Why Work With Me",
  title: "What Sets Me Apart",
} as const;

export const WHY_REASONS = [
  {
    title: "Design-First Philosophy",
    description:
      "I never open a code editor before the design is approved. Every pixel is intentional — because how it looks is inseparable from how it performs.",
  },
  {
    title: "Fixed, Transparent Pricing",
    description:
      "You know the total cost before I start. No surprise invoices, no hourly billing anxiety. What I quote is what you pay.",
  },
  {
    title: "You Work Directly With Me",
    description:
      "No account managers or middle layers — you talk to the person designing and building your product. Fast, informed responses every time.",
  },
  {
    title: "Production-Grade Standards",
    description:
      "TypeScript, clean architecture, and performance budgets from day one. I build for the long term — not just to pass a demo review.",
  },
  {
    title: "Global Quality, Competitive Rates",
    description:
      "Based in Lahore, Pakistan — I deliver world-class work at rates that make premium quality accessible for startups and growing businesses.",
  },
] as const;

export const WHY_STATS = [
  { value: "98%", label: "On-time delivery" },
  { value: "100%", label: "Client satisfaction rate" },
  { value: "80%", label: "Repeat & referral clients" },
  { value: "100%", label: "Projects delivered on spec" },
] as const;

export type Testimonial = {
  quote: string;
  attribution: string;
  project?: string;
  url?: string;
};

export const WHY_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Haseeb built our Solana trading platform with wallet flows and a polished UI. Clear communication and on-time delivery throughout.",
    attribution: "Product founder",
    project: "DEGN DApp",
    url: "https://degn.app",
  },
  {
    quote:
      "Our logistics dashboard needed real-time tracking and role-based access — he delivered both without the usual back-and-forth.",
    attribution: "Operations manager",
    project: "A.K. Traders",
    url: "https://aktraders.pk",
  },
  {
    quote:
      "The agency site feels premium with scroll animations that actually serve the story. Visitors finally understand what we do in seconds.",
    attribution: "Agency lead",
    project: "Synovo Labs",
    url: "https://slabs-eight.vercel.app",
  },
  {
    quote:
      "Our e-commerce store looks professional and checkout is smooth on mobile. Catalog, payments, and admin were handled end-to-end.",
    attribution: "Store owner",
    project: "Wingz Impex",
    url: "https://wingsimpex.com",
  },
  {
    quote:
      "Tekvers needed a corporate site that matched our portfolio depth. SEO structure, case studies, and contact flows were done right.",
    attribution: "Agency director",
    project: "Tekvers",
    url: "https://tekvers.com",
  },
  {
    quote:
      "NoblePOS required a robust retail system — inventory, sales, and reporting in one place. He understood enterprise constraints from day one.",
    attribution: "Retail operations lead",
    project: "NoblePOS",
    url: "https://noblepos.com",
  },
];
