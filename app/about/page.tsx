import Education from "@/components/home/Education";
import Experience from "@/components/home/Experience";
import Profile from "@/components/home/Profile";
import Skills from "@/components/home/Skills";
import StackMarquee from "@/components/home/StackMarquee";
import PageHeader from "@/components/ui/PageHeader";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "About",
  description:
    "About Haseeb Khan — a developer from Lahore who learned by putting real websites and apps on the internet for clients in Pakistan, the UK and the US.",
  path: "/about",
});

export const revalidate = 86400;

export default function AboutPage() {
  return (
    <>
      <PageHeader
        name="About"
        title="Learned by"
        accent="building."
        lede="I build websites and apps for businesses. Computer Science graduate (UOL), Master’s in progress at ITU. Open to client work and full-time remote roles."
      />
      <StackMarquee />
      <Profile />
      <Experience />
      <Education />
      <Skills />
    </>
  );
}
