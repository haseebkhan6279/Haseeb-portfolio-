import { CONTACT, PROFILE } from "@/data/site";
import { SITE_URL } from "@/lib/metadata";

export default function PortfolioJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: PROFILE.name,
        jobTitle: PROFILE.role,
        description: PROFILE.description,
        url: SITE_URL,
        email: CONTACT.email,
        telephone: CONTACT.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lahore",
          addressCountry: "PK",
        },
        sameAs: [CONTACT.linkedIn, CONTACT.github],
        knowsAbout: [
          "Web Development",
          "SaaS Development",
          "E-commerce",
          "Mobile App Development",
          "AI Integration",
          "SEO",
        ],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#business`,
        name: `${PROFILE.displayName} — Freelance Web Development`,
        description: PROFILE.description,
        url: SITE_URL,
        priceRange: "$$",
        areaServed: "Worldwide",
        provider: { "@id": `${SITE_URL}/#person` },
        serviceType: [
          "Custom Web Development",
          "SaaS Development",
          "E-commerce Development",
          "AI Integration",
          "Landing Page Design",
          "Website Optimization",
          "Mobile App Development",
        ],
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
