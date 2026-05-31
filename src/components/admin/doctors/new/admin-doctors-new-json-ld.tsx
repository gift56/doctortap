import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { ADMIN_DOCTORS_NEW_PAGE_DESCRIPTION } from "@/lib/seo/admin-doctors-metadata";

interface AdminDoctorsNewJsonLdProps {
  siteUrl: string;
}

export function AdminDoctorsNewJsonLd({ siteUrl }: AdminDoctorsNewJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Provision New Doctor",
    description: ADMIN_DOCTORS_NEW_PAGE_DESCRIPTION,
    url: `${siteUrl}${ADMIN_ROUTES.doctorsNew}`,
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
