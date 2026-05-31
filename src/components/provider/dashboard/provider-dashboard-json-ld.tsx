import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { PROVIDER_DASHBOARD_PAGE_DESCRIPTION } from "@/lib/seo/provider-dashboard-metadata";

interface ProviderDashboardJsonLdProps {
  siteUrl: string;
}

export function ProviderDashboardJsonLd({
  siteUrl,
}: ProviderDashboardJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Provider dashboard",
    description: PROVIDER_DASHBOARD_PAGE_DESCRIPTION,
    url: `${siteUrl}${PROVIDER_ROUTES.dashboard}`,
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
