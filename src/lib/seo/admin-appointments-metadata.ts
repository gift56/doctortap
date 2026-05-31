import type { Metadata } from "next";

import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const BASE_TITLE = "Global Appointments";
export const ADMIN_APPOINTMENTS_PAGE_DESCRIPTION =
  "Your DoctorTap admin appointments workspace — monitor every doctor-patient booking, audit consultation status, filter by booking tier, and paginate through platform transaction volume logs in the secure system portal.";

export function buildAdminAppointmentsMetadata(page: number = 1): Metadata {
  const siteUrl = getSiteUrl();
  const title = page > 1 ? `${BASE_TITLE} — Page ${page}` : BASE_TITLE;
  const canonicalPath =
    page > 1
      ? `${ADMIN_ROUTES.appointments}?page=${page}`
      : ADMIN_ROUTES.appointments;

  return {
    title,
    description: ADMIN_APPOINTMENTS_PAGE_DESCRIPTION,
    openGraph: {
      title,
      description: ADMIN_APPOINTMENTS_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: ADMIN_APPOINTMENTS_PAGE_DESCRIPTION,
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
