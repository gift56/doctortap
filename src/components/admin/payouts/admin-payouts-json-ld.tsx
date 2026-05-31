import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { ADMIN_PAYOUTS_PAGE_DESCRIPTION } from "@/lib/seo/admin-payouts-metadata";

interface AdminPayoutsJsonLdProps {
  siteUrl: string;
}

export function AdminPayoutsJsonLd({ siteUrl }: AdminPayoutsJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Platform Payouts & Escrow",
    description: ADMIN_PAYOUTS_PAGE_DESCRIPTION,
    url: `${siteUrl}${ADMIN_ROUTES.payouts}`,
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
