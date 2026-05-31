import type { Metadata } from "next";

import { AdminAppointmentsJsonLd } from "@/components/admin/appointments/admin-appointments-json-ld";
import { AdminAppointmentsWorkspace } from "@/components/admin/appointments/admin-appointments-workspace";
import { parseAdminAppointmentsPage } from "@/lib/admin/admin-appointments";
import { parseAdminAppointmentFiltersFromSearchParams } from "@/lib/admin/parse-appointment-filters";
import { buildAdminAppointmentsMetadata } from "@/lib/seo/admin-appointments-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface AdminAppointmentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: AdminAppointmentsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parseAdminAppointmentsPage(params);
  return buildAdminAppointmentsMetadata(page);
}

export default async function AdminAppointmentsPage({
  searchParams,
}: AdminAppointmentsPageProps) {
  const params = await searchParams;
  const filters = parseAdminAppointmentFiltersFromSearchParams(params);

  return (
    <>
      <AdminAppointmentsJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-6 p-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Global Appointments
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Real-time booking auditing, status tracking, and platform
            transaction volume logs.
          </p>
        </header>

        <AdminAppointmentsWorkspace initialFilters={filters} />
      </div>
    </>
  );
}
