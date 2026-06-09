export const WHY_INTRO = {
  eyebrow: "Why Hire Me",
  title: "A freelance partner you can rely on",
  subtitle:
    "You get senior-level execution without agency overhead — direct communication, clean delivery, and support after launch.",
} as const;

export const WHY_REASONS = [
  {
    icon: "chat" as const,
    title: "Fast Communication",
    description:
      "Direct access to me — no account managers. Expect clear updates, quick replies, and decisions made without delays.",
  },
  {
    icon: "code" as const,
    title: "Clean, Scalable Code",
    description:
      "TypeScript, modern architecture, and maintainable codebases your team can build on long after launch.",
  },
  {
    icon: "clock" as const,
    title: "On-Time Delivery",
    description:
      "Milestone-based timelines with weekly progress. 98% on-time delivery across 25+ shipped projects.",
  },
  {
    icon: "mobile" as const,
    title: "Mobile-First Development",
    description:
      "Every interface is designed for phones first — where most of your customers actually browse and buy.",
  },
  {
    icon: "search" as const,
    title: "SEO-Friendly Websites",
    description:
      "Semantic markup, fast performance, and structured content so Google can find and rank your pages.",
  },
  {
    icon: "support" as const,
    title: "Post-Launch Support",
    description:
      "Bug fixes, optimizations, and feature iterations after go-live — because launch day is just the beginning.",
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  projectType: string;
  rating: number;
  initials: string;
  project?: string;
  url?: string;
};

export const TESTIMONIALS_INTRO = {
  eyebrow: "Testimonials",
  title: "What clients say about working with me",
} as const;

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Haseeb built our Solana trading platform with wallet flows and a polished UI. Clear communication and on-time delivery throughout.",
    name: "Alex M.",
    role: "Founder",
    company: "DEGN",
    projectType: "Web Application",
    rating: 5,
    initials: "AM",
    project: "DEGN DApp",
    url: "https://degn.app",
  },
  {
    quote:
      "Our logistics dashboard needed real-time tracking and role-based access — he delivered both without the usual back-and-forth.",
    name: "Kamran A.",
    role: "Operations Manager",
    company: "A.K. Traders",
    projectType: "SaaS Dashboard",
    rating: 5,
    initials: "KA",
    project: "A.K. Traders",
    url: "https://aktraders.pk",
  },
  {
    quote:
      "The agency site feels premium with scroll animations that actually serve the story. Visitors finally understand what we do in seconds.",
    name: "Sarah L.",
    role: "Agency Lead",
    company: "Synovo Labs",
    projectType: "Corporate Website",
    rating: 5,
    initials: "SL",
    project: "Synovo Labs",
    url: "https://slabs-eight.vercel.app",
  },
  {
    quote:
      "Our e-commerce store looks professional and checkout is smooth on mobile. Catalog, payments, and admin were handled end-to-end.",
    name: "Ahmed R.",
    role: "Store Owner",
    company: "Wingz Impex",
    projectType: "E-commerce",
    rating: 5,
    initials: "AR",
    project: "Wingz Impex",
    url: "https://wingsimpex.com",
  },
  {
    quote:
      "Tekvers needed a corporate site that matched our portfolio depth. SEO structure, case studies, and contact flows were done right.",
    name: "James T.",
    role: "Director",
    company: "Tekvers",
    projectType: "Agency Website",
    rating: 5,
    initials: "JT",
    project: "Tekvers",
    url: "https://tekvers.com",
  },
  {
    quote:
      "NoblePOS required a robust retail system — inventory, sales, and reporting in one place. He understood enterprise constraints from day one.",
    name: "David N.",
    role: "Operations Lead",
    company: "NoblePOS",
    projectType: "Retail Platform",
    rating: 5,
    initials: "DN",
    project: "NoblePOS",
    url: "https://noblepos.com",
  },
];
