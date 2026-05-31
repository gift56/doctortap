import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { ADMIN_APPOINTMENTS_PAGE_DESCRIPTION } from "@/lib/seo/admin-appointments-metadata";

interface AdminAppointmentsJsonLdProps {
  siteUrl: string;
}

export function AdminAppointmentsJsonLd({
  siteUrl,
}: AdminAppointmentsJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Global Appointments",
    description: ADMIN_APPOINTMENTS_PAGE_DESCRIPTION,
    url: `${siteUrl}${ADMIN_ROUTES.appointments}`,
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
