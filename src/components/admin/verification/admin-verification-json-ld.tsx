import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { ADMIN_VERIFICATION_PAGE_DESCRIPTION } from "@/lib/seo/admin-verification-metadata";

interface AdminVerificationJsonLdProps {
  siteUrl: string;
}

export function AdminVerificationJsonLd({ siteUrl }: AdminVerificationJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Provider Verification",
    description: ADMIN_VERIFICATION_PAGE_DESCRIPTION,
    url: `${siteUrl}${ADMIN_ROUTES.verification}`,
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
