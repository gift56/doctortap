import type { Metadata } from "next";

import { PatientBillingHistoryTable } from "@/components/patient/patient-billing-history-table";
import { PatientBillingJsonLd } from "@/components/patient/patient-billing-json-ld";
import { PatientBillingPagination } from "@/components/patient/patient-billing-pagination";
import { PatientBillingSummaryCards } from "@/components/patient/patient-billing-summary-cards";
import {
  MOCK_BILLING_INVOICES,
  paginatePatientBillingInvoices,
  parsePatientBillingPage,
} from "@/lib/patient/patient-billing";
import { buildPatientBillingMetadata } from "@/lib/seo/patient-billing-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface PatientBillingPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: PatientBillingPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parsePatientBillingPage(params);
  return buildPatientBillingMetadata(page);
}

export default async function PatientBillingPage({
  searchParams,
}: PatientBillingPageProps) {
  const params = await searchParams;
  const requestedPage = parsePatientBillingPage(params);
  const { items, totalPages, currentPage, totalItems } =
    paginatePatientBillingInvoices(MOCK_BILLING_INVOICES, requestedPage);

  return (
    <>
      <PatientBillingJsonLd
        invoices={items}
        currentPage={currentPage}
        totalItems={totalItems}
        siteUrl={getSiteUrl()}
      />
      <div className="mx-auto w-full max-w-5xl space-y-6 sm:space-y-8">
        <header>
          <h1 className="text-xl font-bold tracking-tight text-text-primary sm:text-2xl">
            Billing & Statements
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage your payment payment histories, download legal medical receipts,
            and review outstanding consultation fee balances.
          </p>
        </header>

        <PatientBillingSummaryCards />
        <div className="space-y-4">
          <PatientBillingHistoryTable invoices={items} />
          <PatientBillingPagination
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </>
  );
}
