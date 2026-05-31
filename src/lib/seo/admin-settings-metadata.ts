import type { Metadata } from "next";

import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const TITLE = "Account & System Settings";
export const ADMIN_SETTINGS_PAGE_DESCRIPTION =
  "Your DoctorTap admin settings workspace — update root supervisor credentials, rotate system security passwords, and manage global application branding and operational notice metadata in the secure system management portal.";

export function buildAdminSettingsMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = ADMIN_ROUTES.settings;

  return {
    title: TITLE,
    description: ADMIN_SETTINGS_PAGE_DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: ADMIN_SETTINGS_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: TITLE,
      description: ADMIN_SETTINGS_PAGE_DESCRIPTION,
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
