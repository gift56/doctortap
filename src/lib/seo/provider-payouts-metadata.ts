import type { Metadata } from "next";

import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const BASE_TITLE = "Provider payouts";
export const PROVIDER_PAYOUTS_PAGE_DESCRIPTION =
  "Your DoctorTap provider payouts workspace — manage Paystack settlement destinations, review withdrawable balance, and track distribution ledger history in your secure clinical portal.";

export function buildProviderPayoutsMetadata(page: number = 1): Metadata {
  const siteUrl = getSiteUrl();
  const title = page > 1 ? `${BASE_TITLE} — Page ${page}` : BASE_TITLE;
  const canonicalPath =
    page > 1
      ? `${PROVIDER_ROUTES.payouts}?page=${page}`
      : PROVIDER_ROUTES.payouts;

  return {
    title,
    description: PROVIDER_PAYOUTS_PAGE_DESCRIPTION,
    openGraph: {
      title,
      description: PROVIDER_PAYOUTS_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: PROVIDER_PAYOUTS_PAGE_DESCRIPTION,
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
