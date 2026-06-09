import AboutSection from "@/components/sections/AboutSection";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "About Haseeb Gulraiz Khan — freelance web developer helping businesses ship websites, SaaS products, and apps that drive measurable growth.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutSection />;
}
