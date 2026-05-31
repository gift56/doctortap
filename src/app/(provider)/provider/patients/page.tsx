import type { Metadata } from "next";

import { ProviderPatientsJsonLd } from "@/components/provider/patients/provider-patients-json-ld";
import { ProviderPatientsWorkspace } from "@/components/provider/patients/provider-patients-workspace";
import { parseProviderPatientFiltersFromSearchParams } from "@/lib/provider/parse-patient-filters";
import { buildProviderPatientsMetadata } from "@/lib/seo/provider-patients-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildProviderPatientsMetadata();

interface ProviderPatientsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProviderPatientsPage({
  searchParams,
}: ProviderPatientsPageProps) {
  const params = await searchParams;
  const filters = parseProviderPatientFiltersFromSearchParams(params);

  return (
    <>
      <ProviderPatientsJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-6 p-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Patients
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Patient charts index, diagnostic logs, and clinical records.
          </p>
        </header>
        <ProviderPatientsWorkspace initialFilters={filters} />
      </div>
    </>
  );
}
