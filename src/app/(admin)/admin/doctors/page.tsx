import type { Metadata } from "next";

import { AdminDoctorsJsonLd } from "@/components/admin/doctors/admin-doctors-json-ld";
import { AdminDoctorsWorkspace } from "@/components/admin/doctors/admin-doctors-workspace";
import { parseAdminDoctorsPage } from "@/lib/admin/admin-doctors";
import { parseAdminDoctorFiltersFromSearchParams } from "@/lib/admin/parse-doctor-filters";
import { buildAdminDoctorsMetadata } from "@/lib/seo/admin-doctors-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface AdminDoctorsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: AdminDoctorsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parseAdminDoctorsPage(params);
  return buildAdminDoctorsMetadata(page);
}

export default async function AdminDoctorsPage({
  searchParams,
}: AdminDoctorsPageProps) {
  const params = await searchParams;
  const filters = parseAdminDoctorFiltersFromSearchParams(params);

  return (
    <>
      <AdminDoctorsJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-4 p-3 sm:space-y-6 sm:p-6 lg:p-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Doctors Management
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Create doctor profiles, provision login credentials, review active
            medical accounts, and view practice logs.
          </p>
        </header>

        <AdminDoctorsWorkspace initialFilters={filters} />
      </div>
    </>
  );
}
