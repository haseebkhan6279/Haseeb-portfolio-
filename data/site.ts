export const PROFILE = {
  name: "Haseeb Gulraiz Khan",
  displayName: "Haseeb Khan",
  firstName: "Haseeb",
  lastName: "Khan",
  role: "Full-Stack Developer",
  studio: "Websites & apps for businesses",
  headline: "Full-stack developer building fast, reliable web and mobile products.",
  availability: "Available for new projects",
  location: "Lahore, Pakistan · remote worldwide",
  timezone: "Asia/Karachi",
  cv: "/haseeb-khan-cv.pdf",
  description:
    "I help startups and growing businesses in the UK, US and Pakistan launch online shops, booking platforms, dashboards and mobile apps — designed, built and shipped end to end.",
  manifesto: "I care about the outcome, not just the code — products that load fast, convert visitors and are easy to run.",
} as const;

export const NAV_LINKS = [
  { label: "Work", href: "/#work" },
  { label: "SaaS", href: "/#dashboards" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Experience", href: "/#experience" },
  { label: "Education", href: "/#education" },
  { label: "Blog", href: "/blog" },
] as const;

export const CONTACT = {
  email: "haseebgulraiz222@gmail.com",
  phone: "+92 324 049 7250",
  whatsapp: "https://wa.me/923240497250",
  location: "Lahore, Pakistan — working remotely worldwide",
  linkedIn: "https://www.linkedin.com/in/haseebgulraizkhan",
  github: "https://github.com/haseebkhan6279",
  portfolio: "https://haseeb-portfolio-hazel.vercel.app",
  responseTime: "Usually within 24 hours",
  /** Optional marketplace profile URLs — shown in the footer and on the contact page once filled in. */
  upwork: "",
  fiverr: "",
} as const;

export const SOCIALS = [
  { label: "LinkedIn", href: CONTACT.linkedIn },
  { label: "GitHub", href: CONTACT.github },
  { label: "WhatsApp", href: CONTACT.whatsapp },
  { label: "Email", href: `mailto:${CONTACT.email}` },
] as const;
