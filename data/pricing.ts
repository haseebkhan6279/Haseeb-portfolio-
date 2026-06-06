export type PricingPackage = {
  id: string;
  tier: string;
  name: string;
  price: string;
  popular?: boolean;
  group: "core" | "addon";
  tagline: string;
  timeline: string;
  features: string[];
  notIncluded?: string[];
};

export const PRICING_INTRO = {
  eyebrow: "Pricing",
  addonsHeading: "Optional add-ons",
  addonsLede: "Stack mobile, Shopify, or AI automation on any core package — bundled pricing available.",
  footerNote:
    "All prices are starting points. Final quote based on scope. Contact us for a custom estimate — response within 24 hours.",
} as const;

export const PRICING_CORE: PricingPackage[] = [
  {
    id: "starter",
    tier: "Starter",
    name: "The Landing",
    price: "$499",
    group: "core",
    tagline: "A single, high-converting page. Ideal for startups, freelancers, and product launches.",
    timeline: "One-time · Delivered in 5–7 days",
    features: [
      "Single-page responsive website",
      "Custom UI design in Figma first",
      "Unlimited revisions until launch approval",
      "Contact form + email integration",
      "SEO meta tags & fast loading",
      "Mobile-first & fully responsive",
      "Deployed to Vercel / Netlify",
    ],
    notIncluded: ["Multiple pages", "Backend or database"],
  },
  {
    id: "signature",
    tier: "Signature",
    name: "The Website",
    price: "$999",
    popular: true,
    group: "core",
    tagline:
      "A complete multi-page presence. For businesses and agencies that need to make a serious impression.",
    timeline: "One-time · Delivered in 10–14 days",
    features: [
      "Up to 6 pages (Home, About, Services, Portfolio, Blog, Contact)",
      "Bespoke UI/UX design system",
      "Unlimited revisions until launch approval",
      "CMS integration — edit content yourself",
      "Blog with categories & SEO",
      "Smooth animations & transitions",
      "Domain setup + go-live support",
      "Google Analytics integration",
      "1 month free post-launch support",
    ],
  },
  {
    id: "enterprise",
    tier: "Enterprise",
    name: "The Platform",
    price: "$1,899",
    group: "core",
    tagline:
      "Full-stack web application for founders building a real product — SaaS, marketplace, or booking system.",
    timeline: "Starting from · Timeline by scope",
    features: [
      "Full-stack web application",
      "Unlimited revisions through build & UAT phases",
      "User auth, roles & permissions",
      "Admin & user dashboards",
      "REST API + PostgreSQL database",
      "Payment integration (Stripe, Shopify Payments)",
      "Real-time features (chat, notifications)",
      "AI automation hooks (chatbots, workflows)",
      "Deployment + CI/CD pipeline",
      "3 months post-launch support",
    ],
  },
];

export const PRICING_ADDONS: PricingPackage[] = [
  {
    id: "mobile-app",
    tier: "Mobile",
    name: "The App",
    price: "$1,299",
    group: "addon",
    tagline:
      "Cross-platform iOS & Android mobile app. Combine with any web package for a discounted rate.",
    timeline: "Starting from · Discounted when bundled",
    features: [
      "iOS & Android (React Native / Expo)",
      "Custom UI for both platforms",
      "Unlimited revisions until store submission",
      "Firebase auth & real-time database",
      "Push notifications",
      "Maps & location features",
      "App store submission guidance",
      "2 months post-launch support",
    ],
    notIncluded: ["Web dashboard (add Enterprise)"],
  },
  {
    id: "shopify",
    tier: "Shopify",
    name: "The Store",
    price: "$899",
    group: "addon",
    tagline:
      "Shopify store setup and custom theme — sell online fast with products, checkout, and payments built in.",
    timeline: "Starting from · Discounted when bundled",
    features: [
      "Shopify store setup & configuration",
      "Custom theme design & Liquid development",
      "Unlimited revisions until launch approval",
      "Product catalog, collections & variants",
      "Shopify Payments & checkout setup",
      "Essential apps (reviews, shipping, analytics)",
      "Mobile-optimized storefront",
      "1 month post-launch support",
    ],
    notIncluded: ["Custom headless storefront (add Enterprise)"],
  },
  {
    id: "ai-automation",
    tier: "AI",
    name: "Automation",
    price: "$749",
    group: "addon",
    tagline:
      "AI agents and workflow automation on your site or app — lead capture, support, and internal ops.",
    timeline: "Starting from · Scoped to your stack",
    features: [
      "AI chatbot or assistant on your product",
      "Workflow automation (n8n, APIs, webhooks)",
      "Unlimited revisions until workflows go live",
      "OpenAI / Claude integration",
      "CRM, email, or Slack connections",
      "Documentation & handoff",
      "2 weeks post-launch tuning",
    ],
    notIncluded: ["Full custom ML model training"],
  },
];

/** All packages — used for mobile tabs */
export const PRICING_PACKAGES: PricingPackage[] = [...PRICING_CORE, ...PRICING_ADDONS];
