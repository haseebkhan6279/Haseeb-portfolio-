import type { Metadata } from "next";
import ClientMarquee from "@/components/home/ClientMarquee";
import Education from "@/components/home/Education";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Process from "@/components/home/Process";
import Profile from "@/components/home/Profile";
import Projects from "@/components/home/Projects";
import Services from "@/components/home/Services";
import Skills from "@/components/home/Skills";
import { SEO } from "@/lib/metadata";
import { getProfilePhoto } from "@/lib/profile-photo";

export const metadata: Metadata = {
  title: { absolute: SEO.defaultTitle },
  description: SEO.description,
};

export const revalidate = 86400;

export default function Home() {
  return (
    <>
      <Hero photo={getProfilePhoto()} />
      <ClientMarquee />
      <Projects />
      <Services />
      <Process />
      <Profile />
      <Experience />
      <Skills />
      <Education />
    </>
  );
}
