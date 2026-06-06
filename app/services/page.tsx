import { buildPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = buildPageMetadata({
  title: "Services",
  description:
    "Services by Haseeb Gulraiz Khan: landing pages, websites, web apps, e-commerce, Shopify, mobile apps, UI/UX, SEO, and AI automation.",
  path: "/services",
});

export default function ServicesPage() {
  redirect("/#services");
}
