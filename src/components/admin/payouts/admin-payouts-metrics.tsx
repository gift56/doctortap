import {
  ADMIN_GLOBAL_ESCROW_HOLDING,
  ADMIN_PENDING_APPROVAL_QUEUE,
  ADMIN_TOTAL_SETTLED_TRANSFERRED,
} from "@/lib/admin/admin-payouts";

const summaryCardClassName =
  "rounded-xl border border-border-default bg-white p-4 shadow-sm sm:p-6";

export function AdminPayoutsMetrics() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:mt-6 sm:gap-6 md:grid-cols-3">
      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold text-text-secondary">
          Global Escrow Holding
        </p>
        <p className="mt-2 text-2xl font-bold text-text-primary">
          {ADMIN_GLOBAL_ESCROW_HOLDING}
        </p>
        <p className="mt-1 text-xs text-text-muted">
          Awaiting clinical clearance cycles
        </p>
      </article>

      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold text-text-secondary">
          Pending Approval Queue
        </p>
        <p className="mt-2 text-2xl font-bold text-amber-600">
          {ADMIN_PENDING_APPROVAL_QUEUE}
        </p>
      </article>

      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold text-text-secondary">
          Total Settled Transferred
        </p>
        <p className="mt-2 text-2xl font-bold text-text-primary">
          {ADMIN_TOTAL_SETTLED_TRANSFERRED}
        </p>
      </article>
    </div>
  );
}
