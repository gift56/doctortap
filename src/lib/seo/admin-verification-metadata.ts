import type { Metadata } from "next";

import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const BASE_TITLE = "Provider Verification";
export const ADMIN_VERIFICATION_PAGE_DESCRIPTION =
  "Your DoctorTap admin verification workspace — review medical council credentials, inspect license documents, and approve or reject practitioner onboarding applications in the secure platform portal.";

export function buildAdminVerificationMetadata(page: number = 1): Metadata {
  const siteUrl = getSiteUrl();
  const title = page > 1 ? `${BASE_TITLE} — Page ${page}` : BASE_TITLE;
  const canonicalPath =
    page > 1
      ? `${ADMIN_ROUTES.verification}?page=${page}`
      : ADMIN_ROUTES.verification;

  return {
    title,
    description: ADMIN_VERIFICATION_PAGE_DESCRIPTION,
    openGraph: {
      title,
      description: ADMIN_VERIFICATION_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: ADMIN_VERIFICATION_PAGE_DESCRIPTION,
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
