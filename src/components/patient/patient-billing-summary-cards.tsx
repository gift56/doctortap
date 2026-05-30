import {
  BILLING_OUTSTANDING_BALANCE,
  computeTotalPaidMedicalFees,
} from "@/lib/patient/patient-billing";

const summaryCardClassName =
  "rounded-xl border border-border-default bg-bg-surface p-4 sm:p-6";

export function PatientBillingSummaryCards() {
  const totalPaid = computeTotalPaidMedicalFees();

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold uppercase text-text-secondary">
          Outstanding Balance
        </p>
        <p className="mt-2 text-2xl font-bold text-text-primary">
          {BILLING_OUTSTANDING_BALANCE}
        </p>
      </article>

      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold uppercase text-text-secondary">
          Total Paid Medical Fees
        </p>
        <p className="mt-2 text-2xl font-bold text-text-primary">{totalPaid}</p>
      </article>

      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold uppercase text-text-secondary">
          Payment Processor
        </p>
        <span className="mt-2 flex w-max items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-medium text-teal-700">
          Paystack Active
        </span>
      </article>
    </div>
  );
}
