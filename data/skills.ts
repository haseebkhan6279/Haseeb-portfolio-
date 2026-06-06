export type SkillCategory = {
  title: string;
  items: string[];
};

export const SKILLS_INTRO = {
  eyebrow: "Technical Skills",
  title: "Stack & tooling",
  subtitle:
    "Full-stack development across modern web, mobile, enterprise backends, and Web3 — from UI polish to production deployment.",
} as const;

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "Vue.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Three.js",
      "Framer Motion",
      "Redux",
      "GSAP",
      "Responsive Design",
    ],
  },
  {
    title: "Backend",
    items: [
      "Node.js",
      "Express.js",
      "NestJS",
      "ASP.NET Core",
      "C#",
      "GraphQL",
      "REST APIs",
      "JWT",
      "Microservices",
      "Clean Architecture",
    ],
  },
  {
    title: "Database",
    items: [
      "MongoDB",
      "SQL Server",
      "PostgreSQL",
      "MySQL",
      "Entity Framework Core",
      "Mongoose",
      "Query Optimization",
      "Indexing",
    ],
  },
  {
    title: "Web3 & Blockchain",
    items: [
      "Ethers.js",
      "Web3.js",
      "Solana Web3.js",
      "MetaMask",
      "WalletConnect",
      "Jupiter DEX",
      "Token Staking",
      "NFT Integration",
    ],
  },
];
