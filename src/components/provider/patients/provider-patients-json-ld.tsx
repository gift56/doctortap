import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { PROVIDER_PATIENTS_PAGE_DESCRIPTION } from "@/lib/seo/provider-patients-metadata";

interface ProviderPatientsJsonLdProps {
  siteUrl: string;
}

export function ProviderPatientsJsonLd({ siteUrl }: ProviderPatientsJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Provider patients",
    description: PROVIDER_PATIENTS_PAGE_DESCRIPTION,
    url: `${siteUrl}${PROVIDER_ROUTES.patients}`,
    isPartOf: {
      "@type": "WebSite",
      name: "DoctorTap",
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
