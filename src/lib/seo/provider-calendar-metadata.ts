import type { Metadata } from "next";

import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const TITLE = "Provider calendar";
export const PROVIDER_CALENDAR_PAGE_DESCRIPTION =
  "Your DoctorTap provider calendar — manage daily availability, generate booking slots, copy weekly schedules, and review booked patient windows in your secure clinical portal.";

export function buildProviderCalendarMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = PROVIDER_ROUTES.calendar;

  return {
    title: TITLE,
    description: PROVIDER_CALENDAR_PAGE_DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: PROVIDER_CALENDAR_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: TITLE,
      description: PROVIDER_CALENDAR_PAGE_DESCRIPTION,
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
