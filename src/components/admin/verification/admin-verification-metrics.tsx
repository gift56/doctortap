import {
  ADMIN_VERIFICATION_APPROVED_COUNT,
  ADMIN_VERIFICATION_PENDING_COUNT,
  ADMIN_VERIFICATION_TOTAL_COUNT,
} from "@/lib/admin/admin-verification";

const metricCardClassName =
  "rounded-xl border border-border-default bg-bg-base p-3 shadow-sm sm:p-4";

export function AdminVerificationMetrics() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-3 sm:gap-6">
      <article className={metricCardClassName}>
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Pending Review
        </p>
        <p className="text-xl font-bold text-amber-600">
          {ADMIN_VERIFICATION_PENDING_COUNT} Applications
        </p>
      </article>

      <article className={metricCardClassName}>
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Approved Practitioners
        </p>
        <p className="text-xl font-bold text-emerald-600">
          {ADMIN_VERIFICATION_APPROVED_COUNT} Active
        </p>
      </article>

      <article className={metricCardClassName}>
        <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
          Total Global Registrations
        </p>
        <p className="text-xl font-bold text-text-primary">
          {ADMIN_VERIFICATION_TOTAL_COUNT} Applications
        </p>
      </article>
    </div>
  );
}
