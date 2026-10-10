import PageHeader from "@/components/ui/PageHeader";
import WorkGrid from "@/components/work/WorkGrid";
import { PROJECTS } from "@/data/projects";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Work",
  description:
    "Live websites and apps by Haseeb Khan — shops, booking systems, dashboards, mobile apps and marketing sites. Open a project to visit the live site or read how it was built.",
  path: "/work",
});

export default function WorkPage() {
  const live = PROJECTS.filter((p) => p.url).length;
  return (
    <>
      <PageHeader
        name={`Work · ${PROJECTS.length} projects`}
        title="Work you"
        accent="can open."
        lede={`${live} of these have a live website. Open a card to visit the site, or read how it was built.`}
      />
      <div className="shell pb-32">
        <WorkGrid />
      </div>
    </>
  );
}
