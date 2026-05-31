import type { Metadata } from "next";

import { AdminVerificationJsonLd } from "@/components/admin/verification/admin-verification-json-ld";
import { AdminVerificationMetrics } from "@/components/admin/verification/admin-verification-metrics";
import { AdminVerificationWorkspace } from "@/components/admin/verification/admin-verification-workspace";
import { parseAdminVerificationPage } from "@/lib/admin/admin-verification";
import { parseAdminVerificationFiltersFromSearchParams } from "@/lib/admin/parse-verification-filters";
import { buildAdminVerificationMetadata } from "@/lib/seo/admin-verification-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface AdminVerificationPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: AdminVerificationPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parseAdminVerificationPage(params);
  return buildAdminVerificationMetadata(page);
}

export default async function AdminVerificationPage({
  searchParams,
}: AdminVerificationPageProps) {
  const params = await searchParams;
  const filters = parseAdminVerificationFiltersFromSearchParams(params);

  return (
    <>
      <AdminVerificationJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-4 p-3 sm:space-y-6 sm:p-6 lg:p-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Provider Verification
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Review submitted medical council credentials, verify clinical
            licenses, and manage onboarding practitioner applications.
          </p>
        </header>

        <AdminVerificationMetrics />
        <AdminVerificationWorkspace initialFilters={filters} />
      </div>
    </>
  );
}
