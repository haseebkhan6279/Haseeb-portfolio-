/** Client & freelance portfolio — full project catalogue (25 builds). */
import type { Project } from "./project-types";

export type { Project, ProjectVisual } from "./project-types";

export const PORTFOLIO_INTRO = {
  eyebrow: "Case Studies",
  lede: "Real projects, real outcomes — see how I help businesses solve problems and ship products that perform.",
  initialVisible: 6,
  expandLabel: "View more projects",
} as const;

export const PROJECTS: Project[] = [
  {
    name: "Cab.uk",
    tagline: "Heathrow, Gatwick & UK airport transfers",
    description:
      "Fixed-fare airport taxi booking across 19 UK airports, 111+ cities, and 4,000+ routes with multilingual support and flight tracking.",
    url: "https://www.ukairporttaxitransfers.co.uk",
    image: "/images/projects/cab-uk.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "UK-wide airport taxi comparison with instant fixed-fare quotes",
      "Multi-language site with SEO pages for routes, airports, and locations",
      "Flight monitoring, meet-and-greet, and 24/7 booking support",
      "Fleet options from saloon to 8-seater minibus with secure checkout",
    ],
    caseStudy: {
      client: "Cab.uk",
      industry: "Transport & Travel",
      problem:
        "Needed a UK-wide booking platform covering 4,000+ routes with instant quotes, multilingual support, and SEO visibility across airports.",
      solution:
        "Built a Next.js platform with route comparison, fixed-fare checkout, flight tracking, and localized SEO pages for 19 airports and 111+ cities.",
      results: [
        "4,000+ bookable routes live",
        "19 UK airports covered",
        "Multi-language site with 24/7 booking",
      ],
    },
  },
  {
    name: "Vellay.pro",
    tagline: "SaaS for sports venue owners",
    description:
      "Owner dashboard for venue bookings, user management, and revenue insights across courts and facilities.",
    url: "https://vellay.pro",
    image: "/images/projects/vellay-pro.png",
    mediaFit: "contain",
    stack: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind CSS"],
    highlights: [
      "SaaS console for sports venue owners — bookings, users, and revenue",
      "Venue scheduling, availability, and operational reporting",
      "Multi-venue support with role-based owner and staff access",
      "Revenue analytics, sport breakdowns, and booking source tracking",
    ],
    caseStudy: {
      client: "Vellay",
      industry: "Sports & Recreation",
      problem:
        "Venue owners managed bookings across spreadsheets with no revenue visibility or multi-location support.",
      solution:
        "Delivered a SaaS owner dashboard with scheduling, role-based access, and real-time revenue analytics across venues.",
      results: [
        "Unified booking & revenue ops",
        "Multi-venue management",
        "Role-based staff access",
      ],
    },
  },
  {
    name: "Vellay.app",
    tagline: "Sports court booking for players",
    description:
      "Player-facing discovery app to find courts, check availability, and book sessions in a few taps.",
    url: "https://vellay.app",
    image: "/images/projects/vellay-app.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Court discovery and booking for players and casual groups",
      "Live availability, venue profiles, and session checkout",
      "Map-based search with filters for sport and location",
      "Pairs with Vellay.pro for venue-owner operations",
    ],
    caseStudy: {
      client: "Vellay",
      industry: "Sports & Recreation",
      problem:
        "Players struggled to find available courts and book sessions without calling venues directly.",
      solution:
        "Built a player-facing app with map search, live availability, and instant booking — synced with the owner platform.",
      results: [
        "Instant court booking",
        "Map-based venue discovery",
        "End-to-end player experience",
      ],
    },
  },
  {
    name: "Court Chuno",
    tagline: "Futsal booking & real-time chat",
    description:
      "Cross-platform mobile app for futsal court reservations, match coordination, and in-app messaging.",
    url: "https://court-chuno.web.app",
    image: "/images/projects/court-chuno.png",
    visual: "phone",
    stack: ["React Native", "Firebase", "TypeScript"],
    highlights: [
      "Futsal court booking with real-time chat between players",
      "React Native and Firebase for auth, data, and messaging",
      "Cross-platform delivery for iOS and Android",
      "Search, booking, notifications, and match coordination in one app",
    ],
    caseStudy: {
      client: "Court Chuno",
      industry: "Sports & Mobile",
      problem:
        "Futsal players needed a single app to book courts, coordinate matches, and communicate in real time.",
      solution:
        "Shipped a React Native app with Firebase backend for booking, chat, notifications, and cross-platform delivery.",
      results: [
        "iOS & Android from one codebase",
        "Real-time player chat",
        "End-to-end booking flow",
      ],
    },
  },
  {
    name: "Flex Fuel",
    tagline: "Gym platform with AI nutrition",
    description:
      "Fitness app unifying workouts, trainer programs, and an AI assistant for diet and training guidance.",
    url: "https://frontend-repo-umber.vercel.app",
    image: "/images/projects/flex-fuel.jpeg",
    mediaFit: "contain",
    stack: ["React.js", "Node.js", "AI Chatbot", "Tailwind CSS"],
    highlights: [
      "Unified dashboard for workouts, nutrition, and trainer interaction",
      "AI-powered chatbot for real-time fitness and diet guidance",
      "Workout tracking, programs, and progress in web and mobile views",
      "React.js and Node.js full-stack product experience",
    ],
    caseStudy: {
      client: "Flex Fuel",
      industry: "Health & Fitness",
      problem:
        "Gym members lacked a unified platform for workouts, nutrition tracking, and personalized trainer guidance.",
      solution:
        "Built a full-stack fitness platform with AI nutrition assistant, workout programs, and trainer dashboards.",
      results: [
        "AI-powered diet guidance",
        "Unified workout tracking",
        "Trainer-member interaction",
      ],
    },
  },
  {
    name: "DEGN DApp",
    tagline: "Solana DEX token trading platform",
    description:
      "Blockchain trading platform with wallet connection, DeFi features, and DEX integrations for Solana token trading.",
    url: "https://degn.app",
    github: "https://github.com/haseebkhan6279",
    image: "/images/projects/degn-dapp.png",
    stack: ["Next.js", "NestJS", "MongoDB", "Web3.js", "JWT", "Recharts"],
    highlights: [
      "Buy and sell DEX tokens on Solana with wallet management and portfolio tracking",
      "NestJS backend with MongoDB and Jupiter API integration",
      "Multi-source price data and secure JWT authentication",
      "Trading history, charts, and comprehensive API documentation",
    ],
    caseStudy: {
      client: "DEGN",
      industry: "Web3 / FinTech",
      problem:
        "Needed a production-grade Solana trading platform with wallet flows, portfolio tracking, and real-time price data.",
      solution:
        "Delivered a Next.js + NestJS platform with Jupiter API integration, JWT auth, trading charts, and wallet management.",
      results: [
        "Live Solana DEX trading",
        "Portfolio & price tracking",
        "Secure wallet integration",
      ],
    },
  },
  {
    name: "BestVersion1",
    tagline: "Football training & coaching platform",
    description:
      "Football training and coaching platform featuring video analysis, training programs, and player profiles.",
    url: "https://bestversion1.com",
    image: "/images/projects/best-version-1.png",
    stack: ["Next.js 14", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Video analysis, programs, and tactical foundations for coaches and players",
      "Coach profiles, player outcomes, and team showcase sections",
      "Programs, testimonials, press, and performance-tuned dark UI",
      "Responsive Next.js 14 delivery with TypeScript throughout",
    ],
  },
  {
    name: "Synovo Labs",
    tagline: "Web development agency website",
    description:
      "Animated agency portfolio featuring scroll-triggered animations and technology showcases.",
    url: "https://slabs-eight.vercel.app",
    image: "/images/projects/synovo-labs.png",
    stack: ["Next.js 15", "GSAP", "Framer Motion"],
    highlights: [
      "Next.js 15 with GSAP and Framer Motion scroll experiences",
      "WordPress engineering, full-stack delivery, and design systems",
      "Portfolio, stack overview, and how-it-works narrative",
      "Lenis smooth scroll with scroll-triggered effects",
    ],
  },
  {
    name: "HB Sub Noor",
    tagline: "Packaging and strap solutions",
    description:
      "Industrial manufacturer site for strapping solutions, product catalog, quality standards, and inquiry flows.",
    url: "https://hbsubnoor.com",
    image: "/images/projects/hb-sub-noor.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Industrial packaging and strapping product catalog",
      "Process visualization, quality standards, and certifications",
      "Quote flows, specs, and technical support inquiries",
      "Responsive professional branding for manufacturing clients",
    ],
  },
  {
    name: "Voxity",
    tagline: "Web3 marketing agency",
    description:
      "Creative Web3 agency site with dark-theme UI, service pages, and interactive portfolio presentation.",
    url: "https://voxity.io",
    image: "/images/projects/voxity.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Web3 marketing agency with wallet and DeFi service positioning",
      "Gallery, case studies, and brand service pages",
      "Contact, inquiries, and interactive testimonials",
      "Dark theme UI with animations and interactive elements",
    ],
  },
  {
    name: "Softlogix",
    tagline: "Tax consultancy & general trading",
    description:
      "Corporate site for tax consultancy and general trading solutions with consultation and quote request flows.",
    url: "https://softlogixconsultancy.com",
    image: "/images/projects/softlogix.png",
    stack: ["Next.js", "React", "Tailwind CSS"],
    highlights: [
      "Professional tax consultancy and trading services presence",
      "Consultation requests, quote flows, and service pages",
      "Team profiles, industries served, and contact forms",
      "Responsive layout with professional corporate branding",
    ],
  },
  {
    name: "IBS",
    tagline: "Vegetable and fruit exporter",
    description:
      "Export trading platform showcasing fresh produce, supply operations, and global market delivery.",
    url: "https://ibs-jade.vercel.app",
    image: "/images/projects/ibs.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Fresh produce export from Pakistan to global markets",
      "Product catalog, process visualization, and quality standards",
      "Quote and inquiry flows for international buyers",
      "Multi-page architecture with SEO-ready content structure",
    ],
  },
  {
    name: "Altitude Arena",
    tagline: "Bowling and trampoline arena",
    description:
      "Entertainment venue site with activity booking, events, blog, and multi-location arena presentation.",
    url: "https://altitudearena.ae",
    image: "/images/projects/altitude-arena.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Bowling and trampoline arena booking and events",
      "Activity galleries, blog, and contact flows",
      "Book-now CTAs and venue showcase pages",
      "Responsive UI tailored for entertainment venues",
    ],
  },
  {
    name: "Exalted",
    tagline: "Coding & packing solutions",
    description:
      "Industrial B2B site for coding and packing solutions with product exploration and contact flows.",
    url: "https://exalted-lovat.vercel.app",
    image: "/images/projects/exalted.png",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Professional coding and packing solutions for businesses",
      "Product pages, brands, and process visualization",
      "Quote requests and technical support contact",
      "Responsive industrial branding with service breakdowns",
    ],
  },
  {
    name: "Wingz Impex",
    tagline: "E-commerce & admin management",
    description:
      "E-commerce and admin management system for a food trading company with catalog and order operations.",
    url: "https://wingsimpex.com",
    image: "/images/projects/wingz-impex.png",
    stack: ["Next.js", "React", "Stripe API", "MongoDB", "Tailwind CSS"],
    highlights: [
      "Food trading e-commerce with product catalog and checkout",
      "Admin for inventory, orders, and customer management",
      "Stripe payments and supplier onboarding flows",
      "Global sourcing, quality assurance, and delivery positioning",
    ],
  },
  {
    name: "Payday Website",
    tagline: "Financial services platform",
    description:
      "Financial services platform with multi-step loan applications, calculators, and email integration.",
    url: "https://paydayexpress.ca",
    image: "/images/projects/payday-express.png",
    stack: ["React.js", "Node.js", "Firebase", "Tailwind CSS"],
    highlights: [
      "Multi-step loan application flows for Canadian market",
      "Loan calculators, partner pages, and practice guides",
      "Firebase-backed auth and email integration",
      "Conversion-focused financial services UX",
    ],
  },
  {
    name: "Dispatching Company Website",
    tagline: "Truck dispatching services",
    description:
      "Dispatching company website providing truck dispatch support, load booking, and compliance services.",
    url: "https://freightslogistic.com",
    image: "/images/projects/dispatching-company-website.png",
    stack: ["Next.js 15", "TypeScript", "Tailwind CSS"],
    highlights: [
      "Professional dispatch site for 24/7 support and load booking",
      "Carrier setup, compliance support, and invoicing assistance",
      "Pricing, testimonials, FAQ, and contact forms",
      "Responsive layout showcasing services and nationwide coverage",
    ],
  },
  {
    name: "EverXNode",
    tagline: "Node.js development & deployment platform",
    description:
      "Node.js development and deployment platform with NFT licensing, token staking, and cloud deployment systems.",
    url: "https://everxnode.com",
    image: "/images/projects/everx-node.png",
    stack: ["Next.js", "Node.js", "NestJS", "Docker", "MongoDB", "Ethers.js", "Web3.js"],
    highlights: [
      "Node.js dev platform with editor, templates, and deployment",
      "NFT node licenses, token staking, and governance features",
      "Cloud deployment, containers, monitoring, and CLI tooling",
      "Web3 integration with wallet connection and rewards",
    ],
  },
  {
    name: "Arena SOL",
    tagline: "Gaming platform website",
    description:
      "Gaming platform with 3D visuals, token integration, and Solana blockchain support.",
    url: "https://arenastudio.fun",
    image: "/images/projects/arena-sol.png",
    stack: ["React.js", "Three.js", "Solana Web3.js", "Tailwind CSS"],
    highlights: [
      "Gaming platform with 3D character visuals and tokenomics",
      "Whitepaper, roadmap, and token purchase flows",
      "Solana blockchain integration and wallet support",
      "Dark theme UI with interactive Web3 components",
    ],
  },
  {
    name: "Punjab AC",
    tagline: "Content management system",
    description:
      "Content management system with admin dashboard, SEO tools, and analytics tracking.",
    url: "https://punjabac.com",
    image: "/images/projects/punjab-ac.png",
    stack: ["Next.js 14", "Node.js", "MongoDB"],
    highlights: [
      "Full-stack CMS with articles, media library, and categories",
      "Admin dashboard with roles and granular permissions",
      "SEO tooling, templates, and analytics tracking",
      "Rich text editor, scheduling, and version control",
    ],
  },
  {
    name: "Hypelet",
    tagline: "Influencer marketing platform",
    description:
      "Web3 influencer marketing platform with animated components and QR code generation.",
    url: "https://hypelet.pro",
    image: "/images/projects/hypelet.png",
    stack: ["React", "Redux", "Framer Motion", "Tailwind CSS"],
    highlights: [
      "Influencer marketing platform with KOL campaign management",
      "SEO content positioning and animated brand experiences",
      "QR code generation and contact flows",
      "Dark theme UI with Framer Motion interactions",
    ],
  },
  {
    name: "A.K. Traders",
    tagline: "Freight forwarding & customs clearance",
    description:
      "Freight forwarding and customs clearance platform with multi-role dashboard and shipment tracking.",
    url: "https://aktraders.pk",
    image: "/images/projects/ak-traders.jpeg",
    stack: ["Next.js 15", "PostgreSQL", "Node.js"],
    highlights: [
      "Freight forwarding platform with shipment tracking and quotes",
      "Multi-role dashboards for admin, staff, and client access",
      "Invoice generation and real-time shipment status updates",
      "Responsive UI tailored for logistics operations",
    ],
  },
  {
    name: "DEGN Website",
    tagline: "Blockchain & Web3 platform",
    description:
      "Web3 marketing site with wallet connection, DeFi features, and dark-theme interactive UI.",
    url: "https://degn.app",
    image: "/images/projects/degn-website.png",
    stack: ["Next.js", "Web3.js", "Tailwind CSS"],
    highlights: [
      "Modern blockchain site with wallet connection and DeFi features",
      "Dark theme UI with animations and interactive elements",
      "Waitlist, app store CTAs, and token trading positioning",
      "Cross-chain and DEX integration messaging",
    ],
  },
  {
    name: "Tekvers Website",
    tagline: "Professional services website",
    description:
      "Corporate website for a technology company offering software solutions and product management.",
    url: "https://tekvers.com",
    image: "/images/projects/tekvers.png",
    stack: ["Next.js", "React.js", "Node.js"],
    highlights: [
      "Agency site for software development and AI services",
      "Portfolio, services, tech stack, and testimonials",
      "Contact forms, FAQ, and SEO-optimized content",
      "Responsive design with scroll animations",
    ],
  },
  {
    name: "NoblePOS",
    tagline: "Point of sale & business management",
    description:
      "Comprehensive Point of Sale system for retail operations with inventory and sales management.",
    url: "https://noblepos.com",
    image: "/images/projects/noblepos.png",
    stack: ["Vue.js", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
    highlights: [
      "Retail POS with catalog, transactions, and inventory tracking",
      "Customers, loyalty, credit tracking, and sales analytics",
      "Business intelligence dashboards and reporting",
      "Enterprise ASP.NET Core backend with SQL Server",
    ],
  },
];
