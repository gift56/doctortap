import type { Metadata } from "next";

import { ProviderPayoutsJsonLd } from "@/components/provider/payouts/provider-payouts-json-ld";
import { ProviderPayoutsWorkspace } from "@/components/provider/payouts/provider-payouts-workspace";
import {
  MOCK_PROVIDER_PAYOUTS,
  paginateProviderPayouts,
  parseProviderPayoutsPage,
} from "@/lib/provider/provider-payouts";
import { buildProviderPayoutsMetadata } from "@/lib/seo/provider-payouts-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface ProviderPayoutsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: ProviderPayoutsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parseProviderPayoutsPage(params);
  return buildProviderPayoutsMetadata(page);
}

export default async function ProviderPayoutsPage({
  searchParams,
}: ProviderPayoutsPageProps) {
  const params = await searchParams;
  const requestedPage = parseProviderPayoutsPage(params);
  const { items, totalPages, currentPage } = paginateProviderPayouts(
    MOCK_PROVIDER_PAYOUTS,
    requestedPage,
  );

  return (
    <>
      <ProviderPayoutsJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-6 p-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Payouts
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Paystack destinations, booking payouts, and revenue data.
          </p>
        </header>

        <ProviderPayoutsWorkspace
          ledgerEntries={items}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
