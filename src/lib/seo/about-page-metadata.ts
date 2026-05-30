import type { Metadata } from "next";

const TITLE = "About Us";
const DESCRIPTION =
  "Learn about DoctorTap — your trusted partner for scheduling doctor appointments, managing health records, and connecting with verified healthcare professionals.";

export function buildAboutPageMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      type: "website",
      url: "/about",
    },
    twitter: {
      card: "summary_large_image",
      title: TITLE,
      description: DESCRIPTION,
    },
    alternates: {
      canonical: "/about",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export const ABOUT_PAGE_DESCRIPTION = DESCRIPTION;
