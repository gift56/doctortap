import type { Metadata } from "next";

import { DoctorsDirectory } from "@/components/public/doctors/doctors-directory";
import { DoctorsDirectoryJsonLd } from "@/components/public/doctors/doctors-directory-json-ld";
import { parseDoctorFiltersFromSearchParams } from "@/lib/doctors/parse-search-params";
import { buildDoctorsDirectoryMetadata } from "@/lib/seo/doctors-directory-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface DoctorsDirectoryPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: DoctorsDirectoryPageProps): Promise<Metadata> {
  const params = await searchParams;
  const filters = parseDoctorFiltersFromSearchParams(params);
  return buildDoctorsDirectoryMetadata(filters);
}

export default async function DoctorsDirectoryPage({
  searchParams,
}: DoctorsDirectoryPageProps) {
  const params = await searchParams;
  const filters = parseDoctorFiltersFromSearchParams(params);

  return (
    <>
      <DoctorsDirectoryJsonLd filters={filters} siteUrl={getSiteUrl()} />
      <DoctorsDirectory initialFilters={filters} />
    </>
  );
}
