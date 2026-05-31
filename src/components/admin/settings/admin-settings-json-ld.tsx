import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { ADMIN_SETTINGS_PAGE_DESCRIPTION } from "@/lib/seo/admin-settings-metadata";

interface AdminSettingsJsonLdProps {
  siteUrl: string;
}

export function AdminSettingsJsonLd({ siteUrl }: AdminSettingsJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Account & System Settings",
    description: ADMIN_SETTINGS_PAGE_DESCRIPTION,
    url: `${siteUrl}${ADMIN_ROUTES.settings}`,
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
