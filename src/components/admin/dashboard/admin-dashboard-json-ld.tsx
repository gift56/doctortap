import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { ADMIN_DASHBOARD_PAGE_DESCRIPTION } from "@/lib/seo/admin-dashboard-metadata";

interface AdminDashboardJsonLdProps {
  siteUrl: string;
}

export function AdminDashboardJsonLd({ siteUrl }: AdminDashboardJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "System dashboard",
    description: ADMIN_DASHBOARD_PAGE_DESCRIPTION,
    url: `${siteUrl}${ADMIN_ROUTES.dashboard}`,
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
