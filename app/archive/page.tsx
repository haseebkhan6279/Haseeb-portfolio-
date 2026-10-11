import { Archive } from "@/components/home/Projects";
import PageHeader from "@/components/ui/PageHeader";
import { PROJECTS } from "@/data/projects";
import { buildPageMetadata } from "@/lib/metadata";

export const metadata = buildPageMetadata({
  title: "Project archive",
  description:
    "The full project archive of Haseeb Khan — filter by industry and open any live product in one tap.",
  path: "/archive",
});

export default function ArchivePage() {
  return (
    <>
      <PageHeader
        name={`Archive · ${PROJECTS.length} projects`}
        title="More from"
        accent="the archive."
        lede="Filter by industry. Where a product is live, you can open it in one tap."
        watermark="Archive"
      />
      <div className="shell pb-32">
        <Archive />
      </div>
    </>
  );
}
