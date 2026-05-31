import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { ADMIN_DOCTORS_PAGE_DESCRIPTION } from "@/lib/seo/admin-doctors-metadata";

interface AdminDoctorsJsonLdProps {
  siteUrl: string;
}

export function AdminDoctorsJsonLd({ siteUrl }: AdminDoctorsJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Doctors Management",
    description: ADMIN_DOCTORS_PAGE_DESCRIPTION,
    url: `${siteUrl}${ADMIN_ROUTES.doctors}`,
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
