export type Service = {
  number: string;
  title: string;
  description: string;
  tags: string[];
};

export const SERVICES_INTRO = {
  eyebrow: "What I Do",
  title: "Skills & Services",
  subtitle:
    "Every project starts with understanding your business, audience, and goals — then I design and build the right solution.",
} as const;

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Landing Pages",
    description:
      "A single, focused page engineered to convert. I obsess over hierarchy, copy structure, and micro-interactions to turn first-time visitors into paying customers.",
    tags: ["Next.js", "Framer Motion", "Tailwind"],
  },
  {
    number: "02",
    title: "Multi-Page Websites",
    description:
      "Complete brand presences — Home, About, Services, Blog, Contact and beyond. Built for SEO, speed, and the kind of first impression your brand deserves.",
    tags: ["Next.js", "CMS", "TypeScript"],
  },
  {
    number: "03",
    title: "Web Applications",
    description:
      "SaaS dashboards, booking systems, and data-driven platforms with authentication, real-time updates, and scalable backend architecture.",
    tags: ["Node.js", "PostgreSQL", "REST API"],
  },
  {
    number: "04",
    title: "E-commerce Stores",
    description:
      "Custom online stores built for high conversion — seamless checkout flows, product management, payment gateways, and beautiful product pages.",
    tags: ["Stripe", "Next.js", "PostgreSQL"],
  },
  {
    number: "05",
    title: "Mobile Applications",
    description:
      "Cross-platform iOS and Android apps in React Native. I've shipped production apps with real-time features, maps, push notifications, and clean UI.",
    tags: ["React Native", "Expo", "Firebase"],
  },
  {
    number: "06",
    title: "UI / UX Design",
    description:
      "Design-first approach. I wireframe, prototype, and validate in Figma before writing a single line of code — ensuring the experience is right before the build begins.",
    tags: ["Figma", "Prototyping", "Design System"],
  },
  {
    number: "07",
    title: "SEO Services",
    description:
      "Technical SEO, on-page optimization, and content structure that help you rank, get discovered, and turn organic traffic into qualified leads.",
    tags: ["Technical SEO", "Google Search Console", "Analytics"],
  },
  {
    number: "08",
    title: "AI Automation",
    description:
      "AI agents, workflow automation, and intelligent integrations that cut manual work — from chatbots and lead handling to custom pipelines connected to your existing tools.",
    tags: ["OpenAI", "LangChain", "n8n", "API Integrations"],
  },
  {
    number: "09",
    title: "Shopify Stores",
    description:
      "Shopify setup, custom themes, and store optimization — product catalogs, checkout, apps, and conversion-focused layouts for brands that want to launch and scale on a proven e-commerce platform.",
    tags: ["Shopify", "Liquid", "Shopify Payments"],
  },
];

export const CONTACT_SERVICE_OPTIONS = SERVICES.map((s) => s.title);

export function isContactServiceOption(value: string): boolean {
  return CONTACT_SERVICE_OPTIONS.includes(value);
}
