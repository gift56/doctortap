import type { Metadata } from "next";

import { AdminDashboardJsonLd } from "@/components/admin/dashboard/admin-dashboard-json-ld";
import { AdminDashboardMetrics } from "@/components/admin/dashboard/admin-dashboard-metrics";
import { AdminRecentConsultationsTable } from "@/components/admin/dashboard/admin-recent-consultations-table";
import { buildAdminDashboardMetadata } from "@/lib/seo/admin-dashboard-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildAdminDashboardMetadata();

export default function AdminDashboardPage() {
  return (
    <>
      <AdminDashboardJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-3 p-2 sm:space-y-6 sm:p-6 lg:p-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            System dashboard
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Health monitoring, session volume, and financial tickers.
          </p>
        </header>

        <AdminDashboardMetrics />
        <AdminRecentConsultationsTable />
      </div>
    </>
  );
}
