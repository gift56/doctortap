import type { Metadata } from "next";

import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const BASE_TITLE = "Doctors Management";
export const ADMIN_DOCTORS_PAGE_DESCRIPTION =
  "Your DoctorTap admin doctors workspace — search practitioner records, filter by specialty or account status, provision new doctor logins, and review medical council credentials and patient session logs in the secure system portal.";

export function buildAdminDoctorsMetadata(page: number = 1): Metadata {
  const siteUrl = getSiteUrl();
  const title = page > 1 ? `${BASE_TITLE} — Page ${page}` : BASE_TITLE;
  const canonicalPath =
    page > 1 ? `${ADMIN_ROUTES.doctors}?page=${page}` : ADMIN_ROUTES.doctors;

  return {
    title,
    description: ADMIN_DOCTORS_PAGE_DESCRIPTION,
    openGraph: {
      title,
      description: ADMIN_DOCTORS_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: ADMIN_DOCTORS_PAGE_DESCRIPTION,
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

export const ADMIN_DOCTORS_NEW_PAGE_DESCRIPTION =
  "Your DoctorTap admin doctor provisioning workspace — setup authentication credentials, assign medical council licenses, and define base consultation rates for new practitioner accounts in the secure system portal.";

export function buildAdminDoctorsNewMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const title = "Provision New Doctor";

  return {
    title,
    description: ADMIN_DOCTORS_NEW_PAGE_DESCRIPTION,
    openGraph: {
      title,
      description: ADMIN_DOCTORS_NEW_PAGE_DESCRIPTION,
      url: `${siteUrl}${ADMIN_ROUTES.doctorsNew}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: ADMIN_DOCTORS_NEW_PAGE_DESCRIPTION,
    },
    alternates: {
      canonical: ADMIN_ROUTES.doctorsNew,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}
