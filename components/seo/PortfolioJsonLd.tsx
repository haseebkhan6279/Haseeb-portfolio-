import { CONTACT, PROFILE } from "@/data/site";
import { SKILL_GROUPS } from "@/data/experience";
import { SITE_URL } from "@/lib/metadata";

export default function PortfolioJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.name,
        alternateName: PROFILE.displayName,
        jobTitle: PROFILE.role,
        description: PROFILE.description,
        url: SITE_URL,
        email: CONTACT.email,
        address: { "@type": "PostalAddress", addressLocality: "Lahore", addressRegion: "Punjab", addressCountry: "PK" },
        worksFor: { "@type": "Organization", name: "Hypelet" },
        alumniOf: [
          { "@type": "CollegeOrUniversity", name: "The University of Lahore" },
          { "@type": "CollegeOrUniversity", name: "Forman Christian College" },
        ],
        sameAs: [CONTACT.linkedIn, CONTACT.github],
        knowsAbout: SKILL_GROUPS.flatMap((g) => g.items),
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: PROFILE.name,
        description: PROFILE.description,
        publisher: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
