export type Role = {
  title: string;
  period: string;
  points: string[];
  links?: { label: string; href: string }[];
};

export type Experience = {
  company: string;
  type: string;
  period: string;
  summary?: string;
  roles: Role[];
  stack?: string[];
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Hypelet",
    type: "Full-time · Remote",
    period: "Apr 2026 — Present",
    summary:
      "Building and shipping product features across Hypelet’s web and mobile apps as part of a remote product team.",
    roles: [
      {
        title: "Web Developer",
        period: "Jul 2026 — Present",
        points: [
          "Own front-end features end to end — from spec to production — in Next.js and TypeScript",
          "Partner with product and design to ship on a predictable release cadence",
          "Maintain a consistent, accessible component system across the product",
        ],
        links: [{ label: "Hypelet", href: "https://hypelet.pro" }],
      },
      {
        title: "Web Developer",
        period: "Apr 2026 — Jun 2026",
        points: [
          "Shipped new screens and features for the live product",
          "Improved performance and responsiveness across key user flows",
        ],
      },
    ],
    stack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "React Native"],
  },
  {
    company: "Tekvers",
    type: "Part-time contract · Remote",
    period: "Jan 2025 — Present",
    summary:
      "Design, build and launch production web and mobile products for clients in the UK, US and Pakistan — owning scope, architecture, delivery and post-launch support.",
    roles: [
      {
        title: "Full-Stack Developer & Consultant",
        period: "Jan 2025 — Present",
        points: [
          "Cab.uk — UK airport transfer booking platform covering 4,000+ routes and 19 airports",
          "Vellay — two-sided sports venue booking SaaS with web, mobile and owner dashboard",
          "Buy4Low — e-commerce store, admin and ~3,200 SEO landing pages, live in 2 days",
          "DEGN — real-time crypto trading dApp with wallet connect and live charts",
          "Court Chuno — React Native pitch booking app with real-time chat",
        ],
        links: [
          { label: "Cab.uk", href: "https://www.ukairporttaxitransfers.co.uk" },
          { label: "Vellay", href: "https://vellay.pro" },
          { label: "Buy4Low", href: "https://buy4low.com" },
          { label: "DEGN", href: "https://degn.app" },
          { label: "Court Chuno", href: "https://court-chuno.web.app" },
        ],
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "React Native",
      "NestJS",
      "PostgreSQL",
      "MongoDB",
      "Firebase",
      "Web3.js",
    ],
  },
  {
    company: "AdAxiom",
    type: "Internship · On-site",
    period: "May 2024 — Jul 2024",
    roles: [
      {
        title: "Web Developer",
        period: "May 2024 — Jul 2024",
        points: [
          "Built responsive interfaces in React for client projects",
          "Integrated REST APIs and third-party services",
          "Delivered in weekly sprints within a professional agency team",
        ],
      },
    ],
    stack: ["React", "JavaScript", "REST APIs"],
  },
];

export type EducationItem = {
  school: string;
  short: string;
  degree: string;
  period: string;
  /** YYYY-MM, used for the in-progress bar. */
  start: string;
  end: string;
  note?: string;
  /** Case study for a thesis or final project. */
  projectSlug?: string;
  current?: boolean;
};

export const EDUCATION: EducationItem[] = [
  {
    school: "Information Technology University",
    short: "ITU",
    degree: "Master's Degree, Computer Science",
    period: "Aug 2026 — Jan 2028",
    start: "2026-08",
    end: "2028-01",
    note: "In progress",
    current: true,
  },
  {
    school: "The University of Lahore",
    short: "UOL",
    degree: "Bachelor's Degree, Computer Science",
    period: "Jan 2022 — Feb 2026",
    start: "2022-01",
    end: "2026-02",
    note: "Thesis: Court Chuno (React Native + Firebase)",
    projectSlug: "court-chuno",
  },
  {
    school: "Forman Christian College, Lahore",
    short: "FCC",
    degree: "Intermediate, Pre-Engineering",
    period: "Aug 2019 — Jun 2021",
    start: "2019-08",
    end: "2021-06",
  },
];

export const CERTIFICATIONS = [
  "Claude AI",
  "Claude Code",
  "Introduction to Programming Using JavaScript",
  "Software Development Fundamentals",
] as const;

export const STATS = [
  { value: 40, suffix: "+", label: "Projects built" },
  { value: 3, suffix: "", label: "Countries served" },
  { value: 4000, suffix: "+", label: "Live routes on Cab.uk" },
  { value: 2, suffix: " days", label: "Buy4Low, idea to live" },
] as const;

export const SKILL_GROUPS = [
  {
    title: "Frontend",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "GSAP", "Three.js", "Redux", "TanStack Query", "Vue.js"],
  },
  {
    title: "Backend",
    items: ["Node.js", "NestJS", "Express", "REST APIs", "JWT / Auth", "Prisma", "Mongoose", "ASP.NET Core"],
  },
  {
    title: "Data & Infra",
    items: ["PostgreSQL", "MongoDB", "Supabase", "Firebase", "Redis", "Docker", "Vercel", "Cloudinary"],
  },
  {
    title: "Mobile & Web3",
    items: ["React Native", "Expo", "Solana", "Web3.js", "Ethers.js", "Jupiter API"],
  },
  {
    title: "Tooling",
    items: ["Postman", "Git & GitHub", "Figma", "Playwright", "Claude Code", "Stripe"],
  },
] as const;

export const SERVICES = [
  {
    title: "SaaS & business dashboards",
    blurb: "Internal tools and SaaS products your team logs into every day — roles, reports, billing and the workflows behind them.",
    points: ["Auth, roles & permissions", "Reporting & analytics", "Subscriptions & billing"],
  },
  {
    title: "Booking platforms",
    blurb: "Appointments, venues, rentals and transfers — live availability, payments and a flow customers actually finish.",
    points: ["Real-time availability", "Online payments", "Admin & staff tools"],
  },
  {
    title: "E-commerce",
    blurb: "Online stores built to sell: fast catalogues, smooth checkout, order management and SEO that brings traffic.",
    points: ["Catalogue & checkout", "Order & inventory admin", "Technical SEO"],
  },
  {
    title: "Mobile apps",
    blurb: "iOS and Android apps with React Native — bookings, chat, notifications and payments, plus the backend behind them.",
    points: ["iOS + Android, one codebase", "Push notifications", "API & admin panel"],
  },
  {
    title: "AI integrations",
    blurb: "Practical AI inside your product — assistants, automations and smart search that save your team real hours.",
    points: ["LLM assistants & chat", "Workflow automation", "Document & data extraction"],
  },
  {
    title: "High-converting websites",
    blurb: "Marketing and company sites that load in a blink, rank on Google and turn visitors into enquiries.",
    points: ["Next.js performance", "CMS you can edit", "Analytics & lead capture"],
  },
] as const;

export const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    text: "We talk through your goals, users and budget. You get a clear scope, timeline and a fixed quote in writing.",
  },
  {
    step: "02",
    title: "Design",
    text: "Wireframes and polished designs for the key screens, so you can see and shape the product before it’s built.",
  },
  {
    step: "03",
    title: "Build",
    text: "Weekly progress on a live staging link. You test real features in the browser — no black box, no surprises.",
  },
  {
    step: "04",
    title: "Launch & support",
    text: "Deployment, analytics and handover docs. I stay close after launch while real users arrive.",
  },
] as const;

export const MARQUEE = [
  "Next.js",
  "TypeScript",
  "React Native",
  "NestJS",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Tailwind CSS",
  "Solana",
  "Docker",
  "GSAP",
  "Three.js",
  "Prisma",
  "Postman",
] as const;
