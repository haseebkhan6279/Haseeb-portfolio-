import { buildPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = buildPageMetadata({
  title: "Contact",
  description:
    "Contact Haseeb Gulraiz Khan for a free project quote within 24 hours. Web design, apps, e-commerce, and AI automation — based in Lahore, available worldwide.",
  path: "/contact",
});

export default function ContactPage() {
  redirect("/#contact");
}
