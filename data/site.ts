export const PROFILE = {
  name: "Haseeb Gulraiz Khan",
  displayName: "Haseeb Gulraiz",
  shortName: "Haseeb.",
  role: "Full-Stack Developer & Web3 Engineer",
  tagline: "I craft digital presences",
  description:
    "I build bespoke websites, web apps, and automations that command attention, build trust, and convert visitors into clients.",
} as const;

/** @deprecated Use PROFILE — kept for gradual migration */
export const COMPANY = PROFILE;

export const NAV_LINKS = [
  { label: "Skills", href: "/#skills" },
  { label: "Work", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Process", href: "/#process" },
] as const;

export const CONTACT = {
  email: "haseebgulraiz222@gmail.com",
  phone: "+92 324 049 7250",
  location: "Lahore, Pakistan — available worldwide",
  linkedIn: "https://www.linkedin.com/in/haseebgulraizkhan",
  github: "https://github.com/haseebkhan6279",
} as const;
