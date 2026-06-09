export type ServiceIcon =
  | "code"
  | "saas"
  | "cart"
  | "ai"
  | "landing"
  | "speed"
  | "mobile";

export type Service = {
  id: string;
  title: string;
  description: string;
  benefits: string[];
  icon: ServiceIcon;
};

export const SERVICES_INTRO = {
  eyebrow: "Services",
  title: "Solutions that solve real business problems",
  subtitle:
    "From first landing page to full-scale product — I deliver end-to-end builds focused on growth, performance, and reliability.",
} as const;

export const SERVICES: Service[] = [
  {
    id: "web-dev",
    title: "Custom Web Development",
    icon: "code",
    description:
      "Tailored websites and web apps built around your brand, workflow, and growth goals — not templates.",
    benefits: [
      "Scalable Next.js architecture",
      "Admin panels & dashboards",
      "Third-party API integrations",
    ],
  },
  {
    id: "saas",
    title: "SaaS Development",
    icon: "saas",
    description:
      "Multi-tenant platforms with auth, billing, analytics, and role-based access — ready for real users.",
    benefits: [
      "User onboarding & subscriptions",
      "Real-time data & reporting",
      "Secure, production-grade backend",
    ],
  },
  {
    id: "ecommerce",
    title: "E-commerce Development",
    icon: "cart",
    description:
      "Online stores designed to convert — product catalogs, checkout, payments, and inventory management.",
    benefits: [
      "Mobile-optimized checkout",
      "Payment gateway integration",
      "Order & catalog management",
    ],
  },
  {
    id: "ai",
    title: "AI Integration",
    icon: "ai",
    description:
      "Intelligent chatbots, lead handlers, and workflow automations that reduce manual work and response times.",
    benefits: [
      "Custom AI assistants",
      "CRM & tool integrations",
      "Automated lead qualification",
    ],
  },
  {
    id: "landing",
    title: "Landing Pages",
    icon: "landing",
    description:
      "Single-page experiences built to capture leads and drive sign-ups — fast, focused, and conversion-tested.",
    benefits: [
      "Copy-driven layout & hierarchy",
      "A/B-ready structure",
      "Sub-2s load performance",
    ],
  },
  {
    id: "optimization",
    title: "Website Optimization",
    icon: "speed",
    description:
      "Speed, SEO, and UX audits with hands-on fixes — so your existing site ranks higher and converts better.",
    benefits: [
      "Core Web Vitals improvements",
      "Technical SEO fixes",
      "Conversion rate enhancements",
    ],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    icon: "mobile",
    description:
      "Cross-platform iOS and Android apps with real-time features, push notifications, and polished native feel.",
    benefits: [
      "React Native delivery",
      "App Store ready builds",
      "Backend & API integration",
    ],
  },
];

export const CONTACT_SERVICE_OPTIONS = SERVICES.map((s) => s.title);

export function isContactServiceOption(value: string): boolean {
  return CONTACT_SERVICE_OPTIONS.includes(value);
}
