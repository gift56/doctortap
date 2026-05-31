import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { PROVIDER_PAYOUTS_PAGE_DESCRIPTION } from "@/lib/seo/provider-payouts-metadata";

interface ProviderPayoutsJsonLdProps {
  siteUrl: string;
}

export function ProviderPayoutsJsonLd({ siteUrl }: ProviderPayoutsJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Provider payouts",
    description: PROVIDER_PAYOUTS_PAGE_DESCRIPTION,
    url: `${siteUrl}${PROVIDER_ROUTES.payouts}`,
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
