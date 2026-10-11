import { WorkFan } from "@/components/ui/HeaderAsides";
import PageHeader from "@/components/ui/PageHeader";
import WorkGrid from "@/components/work/WorkGrid";
import { FEATURED_PROJECTS, PROJECTS } from "@/data/projects";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Work",
  description:
    "Live websites and apps by Haseeb Khan — shops, booking systems, dashboards, mobile apps and marketing sites. Open a project to visit the live site or read how it was built.",
  path: "/work",
});

export default function WorkPage() {
  const live = PROJECTS.filter((p) => p.url).length;
  const saas = PROJECTS.filter((p) => p.categories.includes("SaaS & Dashboards")).length;
  const fan = FEATURED_PROJECTS.filter((p) => ["vellay", "zallo", "ostello"].includes(p.slug)).map(({ slug, name, image, tagline }) => ({
    slug,
    name,
    image,
    tagline,
  }));
  return (
    <>
      <PageHeader
        name={`Work · ${PROJECTS.length} projects`}
        title="Work you"
        accent="can open."
        lede={`${live} of these have a live website. Open a card to visit the site, or read how it was built.`}
        watermark="Work"
        aside={
          <WorkFan
            items={fan}
            stats={[
              [String(PROJECTS.length), "Projects"],
              [String(live), "Live sites"],
              [String(saas), "SaaS & dashboards"],
            ]}
          />
        }
      />
      <div className="shell pb-32">
        <WorkGrid />
      </div>
    </>
  );
}
