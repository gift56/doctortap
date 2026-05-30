import type { Metadata } from "next";

import { getSiteUrl } from "@/lib/seo/site-url";

const TITLE = "Contact Our Medical Support Team | DoctorTap";
const DESCRIPTION =
  "Connect with our office in Kathmandu, Nepal. Reach out for telehealth support, technical platform assistance, or explore healthcare career opportunities with DoctorTap.";
const KEYWORDS = [
  "DoctorTap contact",
  "medical support Nepal",
  "telehealth career support",
  "Kathmandu healthcare support",
] as const;

const OPEN_GRAPH_DESCRIPTION =
  "Get in touch with the DoctorTap office or explore clinical open roles.";

export function buildContactPageMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...KEYWORDS],
    openGraph: {
      title: TITLE,
      description: OPEN_GRAPH_DESCRIPTION,
      url: `${siteUrl}/contact`,
      type: "website",
      images: [
        {
          url: "/og-contact-preview.jpg",
          width: 1200,
          height: 630,
          alt: "DoctorTap Help & Support Center Portal",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: OPEN_GRAPH_DESCRIPTION,
    },
    alternates: {
      canonical: "/contact",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const CONTACT_PAGE_DESCRIPTION = DESCRIPTION;
