import type { Metadata } from "next";

import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const TITLE = "Provider dashboard";
export const PROVIDER_DASHBOARD_PAGE_DESCRIPTION =
  "Your DoctorTap provider workspace — review practice earnings, appointment volume, patient counts, and the latest booking queue in your secure clinical portal.";

export function buildProviderDashboardMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = PROVIDER_ROUTES.dashboard;

  return {
    title: TITLE,
    description: PROVIDER_DASHBOARD_PAGE_DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: PROVIDER_DASHBOARD_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: TITLE,
      description: PROVIDER_DASHBOARD_PAGE_DESCRIPTION,
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
