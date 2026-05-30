import type { Metadata } from "next";

import { PATIENT_ROUTES } from "@/config/constants/patient/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const BASE_TITLE = "My Appointments";
export const PATIENT_APPOINTMENTS_PAGE_DESCRIPTION =
  "View and manage your upcoming and past doctor consultations on DoctorTap. Track appointment dates, provider details, payment status, and cancellation options.";

export function buildPatientAppointmentsMetadata(page: number): Metadata {
  const title = page > 1 ? `${BASE_TITLE} — Page ${page}` : BASE_TITLE;
  const siteUrl = getSiteUrl();
  const canonicalPath =
    page > 1
      ? `${PATIENT_ROUTES.appointments}?page=${page}`
      : PATIENT_ROUTES.appointments;

  return {
    title,
    description: PATIENT_APPOINTMENTS_PAGE_DESCRIPTION,
    openGraph: {
      title,
      description: PATIENT_APPOINTMENTS_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: PATIENT_APPOINTMENTS_PAGE_DESCRIPTION,
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
