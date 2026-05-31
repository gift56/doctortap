import type {
  AdminPayoutLedgerEntry,
  AdminPendingPayoutRequest,
} from "@/lib/admin/admin-payouts";

import { AdminPayoutsMetrics } from "./admin-payouts-metrics";
import { AdminPendingPayoutRequestCard } from "./admin-pending-payout-request";
import { AdminSystemDispatchesTable } from "./admin-system-dispatches-table";

interface AdminPayoutsWorkspaceProps {
  pendingRequest: AdminPendingPayoutRequest;
  ledgerEntries: AdminPayoutLedgerEntry[];
  currentPage: number;
  totalPages: number;
}

export function AdminPayoutsWorkspace({
  pendingRequest,
  ledgerEntries,
  currentPage,
  totalPages,
}: AdminPayoutsWorkspaceProps) {
  return (
    <>
      <AdminPayoutsMetrics />

      <div className="mt-6 grid grid-cols-1 gap-6 sm:mt-8 sm:gap-8 lg:grid-cols-12">
        <section className="space-y-3 sm:space-y-4 lg:col-span-5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-text-secondary">
            Awaiting Clearance
          </h2>
          <AdminPendingPayoutRequestCard request={pendingRequest} />
        </section>

        <AdminSystemDispatchesTable
          entries={ledgerEntries}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
