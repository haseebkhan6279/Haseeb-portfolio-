import { Bot, CalendarCheck, Coins, Globe, LayoutDashboard, ShoppingBag, Smartphone, type LucideIcon } from "lucide-react";
import type { ProjectCategory } from "@/data/projects";

export const CATEGORY_META: Record<ProjectCategory, { icon: LucideIcon; blurb: string }> = {
  "SaaS & Dashboards": {
    icon: LayoutDashboard,
    blurb: "Tools your team logs into — logins, reports, billing and day-to-day operations.",
  },
  AI: {
    icon: Bot,
    blurb: "Receptionists, assistants and automations that do real work inside the product.",
  },
  "E-commerce": {
    icon: ShoppingBag,
    blurb: "Online shops with catalogues, checkout, admin and pages that show up on Google.",
  },
  "Booking & Marketplaces": {
    icon: CalendarCheck,
    blurb: "Appointments, venues and two-sided marketplaces customers can actually book on.",
  },
  Mobile: {
    icon: Smartphone,
    blurb: "iPhone and Android apps — plus the website and admin behind them.",
  },
  Web3: {
    icon: Coins,
    blurb: "Crypto products: wallets, swaps, staking and live trading screens.",
  },
  Websites: {
    icon: Globe,
    blurb: "Marketing and company sites that load fast and make it easy to enquire.",
  },
};
