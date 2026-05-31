import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { PROVIDER_CALENDAR_PAGE_DESCRIPTION } from "@/lib/seo/provider-calendar-metadata";

interface ProviderCalendarJsonLdProps {
  siteUrl: string;
}

export function ProviderCalendarJsonLd({ siteUrl }: ProviderCalendarJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Provider calendar",
    description: PROVIDER_CALENDAR_PAGE_DESCRIPTION,
    url: `${siteUrl}${PROVIDER_ROUTES.calendar}`,
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
