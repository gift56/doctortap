import { ABOUT_PAGE_DESCRIPTION } from "@/lib/seo/about-page-metadata";

interface AboutPageJsonLdProps {
  siteUrl: string;
}

export function AboutPageJsonLd({ siteUrl }: AboutPageJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Us",
    description: ABOUT_PAGE_DESCRIPTION,
    url: `${siteUrl}/about`,
    mainEntity: {
      "@type": "Organization",
      name: "DoctorTap",
      description: ABOUT_PAGE_DESCRIPTION,
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
