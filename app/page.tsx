import type { Metadata } from "next";
import ClientMarquee from "@/components/home/ClientMarquee";
import Dashboards from "@/components/home/Dashboards";
import Education from "@/components/home/Education";
import Experience from "@/components/home/Experience";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import Process from "@/components/home/Process";
import Profile from "@/components/home/Profile";
import Projects, { ProjectArchive } from "@/components/home/Projects";
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
  const photo = getProfilePhoto();
  return (
    <>
      <Hero photo={photo} />
      <ClientMarquee />
      <Manifesto photo={photo} />
      <Projects />
      <ProjectArchive />
      <Dashboards />
      <Services />
      <Process />
      <Profile />
      <Experience />
      <Skills />
      <Education />
    </>
  );
}
