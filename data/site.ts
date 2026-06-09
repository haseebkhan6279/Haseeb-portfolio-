export const PROFILE = {
  name: "Haseeb Gulraiz Khan",
  displayName: "Haseeb Gulraiz",
  shortName: "Haseeb.",
  role: "Freelance Web Developer",
  tagline: "I help businesses grow online",
  description:
    "I help businesses build fast, scalable web applications and modern websites that drive growth — from landing pages to full SaaS products.",
} as const;

/** @deprecated Use PROFILE — kept for gradual migration */
export const COMPANY = PROFILE;

export const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Process", href: "/#process" },
  { label: "Blog", href: "/blog" },
] as const;

export const CONTACT = {
  email: "haseebgulraiz222@gmail.com",
  phone: "+92 324 049 7250",
  whatsapp: "https://wa.me/923240497250",
  location: "Lahore, Pakistan — available worldwide",
  linkedIn: "https://www.linkedin.com/in/haseebgulraizkhan",
  github: "https://github.com/haseebkhan6279",
  responseTime: "Within 24 hours",
} as const;
