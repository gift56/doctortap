import type { Metadata } from "next";

import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const TITLE = "Provider profile settings";
export const PROVIDER_PROFILE_PAGE_DESCRIPTION =
  "Your DoctorTap provider profile workspace — update public practice details, clinical registration credentials, consultation specialties, and base appointment pricing in your secure clinical portal.";

export function buildProviderProfileMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = PROVIDER_ROUTES.profile;

  return {
    title: TITLE,
    description: PROVIDER_PROFILE_PAGE_DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: PROVIDER_PROFILE_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: TITLE,
      description: PROVIDER_PROFILE_PAGE_DESCRIPTION,
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
