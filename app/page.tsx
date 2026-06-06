import BlogSection from "@/components/sections/BlogSection";
import CtaSection from "@/components/sections/CtaSection";
import HeroSection from "@/components/sections/HeroSection";
import PricingSection from "@/components/sections/PricingSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import SkillsSection from "@/components/sections/SkillsSection";
import TrustedSection from "@/components/sections/TrustedSection";
import WhySection from "@/components/sections/WhySection";
import WorkSection from "@/components/sections/WorkSection";
import type { Metadata } from "next";
import { SEO } from "@/lib/metadata";

/** Home uses the full branded title (not the `%s | Site` template). */
export const metadata: Metadata = {
  title: { absolute: SEO.defaultTitle },
  description: SEO.description,
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustedSection />
      <ServicesSection />
      <WorkSection />
      <SkillsSection />
      <PricingSection />
      <ProcessSection />
      <WhySection />
      <BlogSection />
      <CtaSection />
    </>
  );
}
