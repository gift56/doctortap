import type { Metadata } from "next";

import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const TITLE = "System dashboard";
export const ADMIN_DASHBOARD_PAGE_DESCRIPTION =
  "Your DoctorTap admin workspace — monitor active practitioners, platform appointment volume, patient demographics, and recent consultation activity across the secure system management portal.";

export function buildAdminDashboardMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = ADMIN_ROUTES.dashboard;

  return {
    title: TITLE,
    description: ADMIN_DASHBOARD_PAGE_DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: ADMIN_DASHBOARD_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: TITLE,
      description: ADMIN_DASHBOARD_PAGE_DESCRIPTION,
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
