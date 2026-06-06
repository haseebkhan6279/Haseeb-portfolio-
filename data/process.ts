export const PROCESS_INTRO = {
  eyebrow: "How I Work",
  title: "My Process",
  subtitle: "A clear, collaborative process so you always know where your project stands.",
  stat: "6 Steps to launch",
} as const;

export const PROCESS_STEPS = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "A free 30-minute call to understand your goals, audience, and timeline. I listen first, then advise. No commitment required.",
  },
  {
    number: "02",
    title: "Proposal & Scope",
    description:
      "Within 24 hours, you receive a clear written proposal with scope, fixed price, and timeline. No vague estimates.",
  },
  {
    number: "03",
    title: "Design in Figma",
    description:
      "I design every page before writing code. You review, request changes, and approve. This guarantees zero surprises during development.",
  },
  {
    number: "04",
    title: "Development",
    description:
      "Clean, documented code in Next.js and TypeScript. You have access to a staging URL throughout — no black box development.",
  },
  {
    number: "05",
    title: "Review & Polish",
    description:
      "Your revision rounds ensure every detail is right. I don't rush to close — I stay until the product is exactly what you envisioned.",
  },
  {
    number: "06",
    title: "Launch & Support",
    description:
      "I deploy to your domain, configure analytics, and stay available post-launch. Your success after delivery is part of the service.",
  },
] as const;
