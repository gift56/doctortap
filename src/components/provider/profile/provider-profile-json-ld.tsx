import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { PROVIDER_PROFILE_PAGE_DESCRIPTION } from "@/lib/seo/provider-profile-metadata";

interface ProviderProfileJsonLdProps {
  siteUrl: string;
}

export function ProviderProfileJsonLd({ siteUrl }: ProviderProfileJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Provider profile settings",
    description: PROVIDER_PROFILE_PAGE_DESCRIPTION,
    url: `${siteUrl}${PROVIDER_ROUTES.profile}`,
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
