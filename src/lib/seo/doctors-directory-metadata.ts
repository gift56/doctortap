import type { Metadata } from "next";

import type { DoctorFilterState } from "@/hooks/use-doctor-filters";
import { getSpecialtyLabel } from "@/lib/doctors/parse-search-params";

const BASE_TITLE = "Find a Doctor";
const BASE_DESCRIPTION =
  "Browse verified doctors by specialty on DoctorTap. Search by name, filter by specialty, and book appointments online.";

export function buildDoctorsDirectoryMetadata(
  filters: DoctorFilterState,
): Metadata {
  const specialtyName = filters.specialty
    ? getSpecialtyLabel(filters.specialty)
    : undefined;
  const searchTerm = filters.search.trim();

  let title = BASE_TITLE;
  if (specialtyName && searchTerm) {
    title = `${searchTerm} — ${specialtyName} Doctors`;
  } else if (specialtyName) {
    title = `${specialtyName} Doctors`;
  } else if (searchTerm) {
    title = `Doctors matching "${searchTerm}"`;
  }

  if (filters.page > 1) {
    title = `${title} — Page ${filters.page}`;
  }

  const descriptionParts = [BASE_DESCRIPTION];
  if (specialtyName) {
    descriptionParts.unshift(
      `Explore ${specialtyName} providers available on DoctorTap.`,
    );
  }
  if (searchTerm) {
    descriptionParts.unshift(
      `Search results for "${searchTerm}" on the DoctorTap doctor directory.`,
    );
  }

  const description = descriptionParts[0];

  const canonicalQuery = new URLSearchParams();
  if (searchTerm) canonicalQuery.set("search", searchTerm);
  if (filters.specialty) canonicalQuery.set("specialty", filters.specialty);
  if (filters.page > 1) canonicalQuery.set("page", String(filters.page));
  const canonicalSuffix = canonicalQuery.toString();

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: canonicalSuffix ? `/doctors?${canonicalSuffix}` : "/doctors",
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
