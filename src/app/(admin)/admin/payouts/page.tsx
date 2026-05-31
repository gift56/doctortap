import type { Metadata } from "next";

import { AdminPayoutsJsonLd } from "@/components/admin/payouts/admin-payouts-json-ld";
import { AdminPayoutsWorkspace } from "@/components/admin/payouts/admin-payouts-workspace";
import {
  MOCK_ADMIN_PAYOUT_LEDGER,
  MOCK_ADMIN_PENDING_PAYOUT,
  paginateAdminPayouts,
  parseAdminPayoutsPage,
} from "@/lib/admin/admin-payouts";
import { buildAdminPayoutsMetadata } from "@/lib/seo/admin-payouts-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface AdminPayoutsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: AdminPayoutsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parseAdminPayoutsPage(params);
  return buildAdminPayoutsMetadata(page);
}

export default async function AdminPayoutsPage({
  searchParams,
}: AdminPayoutsPageProps) {
  const params = await searchParams;
  const requestedPage = parseAdminPayoutsPage(params);
  const { items, totalPages, currentPage } = paginateAdminPayouts(
    MOCK_ADMIN_PAYOUT_LEDGER,
    requestedPage,
  );

  return (
    <>
      <AdminPayoutsJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-4 p-3 sm:space-y-6 sm:p-6 lg:p-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Platform Payouts & Escrow
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Audit cross-platform transaction pipelines, process pending doctor
            settlements, and manage active Paystack distributions.
          </p>
        </header>

        <AdminPayoutsWorkspace
          pendingRequest={MOCK_ADMIN_PENDING_PAYOUT}
          ledgerEntries={items}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
