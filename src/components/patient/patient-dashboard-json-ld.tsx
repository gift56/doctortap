import { PATIENT_ROUTES } from "@/config/constants/patient/routes";
import { PATIENT_DASHBOARD_PAGE_DESCRIPTION } from "@/lib/seo/patient-dashboard-metadata";

interface PatientDashboardJsonLdProps {
  siteUrl: string;
}

export function PatientDashboardJsonLd({ siteUrl }: PatientDashboardJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Health summary",
    description: PATIENT_DASHBOARD_PAGE_DESCRIPTION,
    url: `${siteUrl}${PATIENT_ROUTES.dashboard}`,
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
