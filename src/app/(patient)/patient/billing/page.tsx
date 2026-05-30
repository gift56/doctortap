import { PatientBillingHistoryTable } from "@/components/patient/patient-billing-history-table";
import { PatientBillingPagination } from "@/components/patient/patient-billing-pagination";
import { PatientBillingSummaryCards } from "@/components/patient/patient-billing-summary-cards";
import {
  MOCK_BILLING_INVOICES,
  paginatePatientBillingInvoices,
  parsePatientBillingPage,
} from "@/lib/patient/patient-billing";

interface PatientBillingPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function PatientBillingPage({
  searchParams,
}: PatientBillingPageProps) {
  const params = await searchParams;
  const requestedPage = parsePatientBillingPage(params);
  const { items, totalPages, currentPage } = paginatePatientBillingInvoices(
    MOCK_BILLING_INVOICES,
    requestedPage,
  );

  return (
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
  );
}
