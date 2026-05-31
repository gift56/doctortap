import type { Metadata } from "next";

import { ProviderDashboardJsonLd } from "@/components/provider/dashboard/provider-dashboard-json-ld";
import { ProviderDashboardMetrics } from "@/components/provider/dashboard/provider-dashboard-metrics";
import { ProviderLatestBookings } from "@/components/provider/dashboard/provider-latest-bookings";
import { buildProviderDashboardMetadata } from "@/lib/seo/provider-dashboard-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildProviderDashboardMetadata();

export default function ProviderDashboardPage() {
  return (
    <>
      <ProviderDashboardJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-8 p-8">
        <ProviderDashboardMetrics />
        <ProviderLatestBookings />
      </div>
    </>
  );
}
