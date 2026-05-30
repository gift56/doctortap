import type { Metadata } from "next";

import { PATIENT_ROUTES } from "@/config/constants/patient/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const BASE_TITLE = "Billing & Statements";
export const PATIENT_BILLING_PAGE_DESCRIPTION =
  "Manage your medical payment history on DoctorTap. Review consultation fees, download PDF receipts, track outstanding balances, and view Paystack settlement records.";

export function buildPatientBillingMetadata(page: number): Metadata {
  const title = page > 1 ? `${BASE_TITLE} — Page ${page}` : BASE_TITLE;
  const siteUrl = getSiteUrl();
  const canonicalPath =
    page > 1
      ? `${PATIENT_ROUTES.billing}?page=${page}`
      : PATIENT_ROUTES.billing;

  return {
    title,
    description: PATIENT_BILLING_PAGE_DESCRIPTION,
    openGraph: {
      title,
      description: PATIENT_BILLING_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description: PATIENT_BILLING_PAGE_DESCRIPTION,
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
