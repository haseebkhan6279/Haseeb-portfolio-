import AboutSection from "@/components/sections/AboutSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";
import CtaSection from "@/components/sections/CtaSection";
import HeroSection from "@/components/sections/HeroSection";
import ProcessSection from "@/components/sections/ProcessSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
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
      <StatsSection />
      <TrustedSection />
      <ServicesSection />
      <WorkSection />
      <WhySection />
      <TestimonialsSection />
      <AboutSection />
      <ProcessSection />
      <BlogSection />
      <CtaSection />
      <ContactSection />
    </>
  );
}
