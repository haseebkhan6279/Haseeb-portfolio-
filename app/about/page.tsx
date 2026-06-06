import { buildPageMetadata } from "@/lib/metadata";
import { redirect } from "next/navigation";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "About Haseeb Gulraiz Khan — full-stack developer & designer building websites, apps, and AI automation with a results-driven process.",
  path: "/about",
});

export default function AboutPage() {
  redirect("/#why");
}
