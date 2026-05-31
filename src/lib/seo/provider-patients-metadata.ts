import type { Metadata } from "next";

import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { getSiteUrl } from "@/lib/seo/site-url";

const TITLE = "Provider patients";
export const PROVIDER_PATIENTS_PAGE_DESCRIPTION =
  "Your DoctorTap provider patient directory — search, sort, and review patient charts, diagnostic summaries, and clinical visit history in your secure clinical portal.";

export function buildProviderPatientsMetadata(): Metadata {
  const siteUrl = getSiteUrl();
  const canonicalPath = PROVIDER_ROUTES.patients;

  return {
    title: TITLE,
    description: PROVIDER_PATIENTS_PAGE_DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: PROVIDER_PATIENTS_PAGE_DESCRIPTION,
      url: `${siteUrl}${canonicalPath}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: TITLE,
      description: PROVIDER_PATIENTS_PAGE_DESCRIPTION,
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
