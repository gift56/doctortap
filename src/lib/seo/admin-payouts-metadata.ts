import type { Metadata } from "next";

import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const BASE_TITLE = "Platform Payouts & Escrow";
export const ADMIN_PAYOUTS_PAGE_DESCRIPTION =
  "Your DoctorTap admin payouts workspace — audit cross-platform transaction pipelines, review pending doctor settlement requests, and track Paystack distribution dispatches across the secure system management portal.";

export function buildAdminPayoutsMetadata(page: number = 1): Metadata {
  const siteUrl = getSiteUrl();
  const title = page > 1 ? `${BASE_TITLE} — Page ${page}` : BASE_TITLE;
  const canonicalPath =
    page > 1 ? `${ADMIN_ROUTES.payouts}?page=${page}` : ADMIN_ROUTES.payouts;

  return {
    title,
    description: ADMIN_PAYOUTS_PAGE_DESCRIPTION,
    openGraph: {
      title,
      description: ADMIN_PAYOUTS_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: ADMIN_PAYOUTS_PAGE_DESCRIPTION,
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
