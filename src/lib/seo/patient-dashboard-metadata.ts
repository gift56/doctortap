import type { Metadata } from "next";

import { PATIENT_ROUTES } from "@/config/constants/patient/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const TITLE = "Health summary";
export const PATIENT_DASHBOARD_PAGE_DESCRIPTION =
  "Your DoctorTap patient health summary — view profile details, upcoming consultations, and prescription activity in your secure clinical portal.";

export function buildPatientDashboardMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = PATIENT_ROUTES.dashboard;

  return {
    title: TITLE,
    description: PATIENT_DASHBOARD_PAGE_DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: PATIENT_DASHBOARD_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: TITLE,
      description: PATIENT_DASHBOARD_PAGE_DESCRIPTION,
    },
    alternates: {
      canonical: canonicalPath,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}
