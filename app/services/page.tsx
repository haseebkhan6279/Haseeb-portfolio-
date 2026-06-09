import { buildPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Freelance web development services: custom websites, SaaS, e-commerce, AI integration, landing pages, optimization, and mobile apps.",
  path: "/services",
});

export default function ServicesPage() {
  redirect("/#services");
}
