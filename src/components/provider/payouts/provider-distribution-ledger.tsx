import type { ProviderPayoutLedgerEntry } from "@/lib/provider/provider-payouts";

import { ProviderDistributionLedgerTable } from "./provider-distribution-ledger-table";
import { ProviderPayoutsPagination } from "./provider-payouts-pagination";

interface ProviderDistributionLedgerProps {
  entries: ProviderPayoutLedgerEntry[];
  currentPage: number;
  totalPages: number;
}

export function ProviderDistributionLedger({
  entries,
  currentPage,
  totalPages,
}: ProviderDistributionLedgerProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border-default bg-bg-surface shadow-sm lg:col-span-7">
      <div className="flex items-center justify-between border-b border-border-default bg-bg-base/50 px-6 py-4">
        <h2 className="text-sm font-bold text-text-primary">Distribution Ledger</h2>
      </div>

      <ProviderDistributionLedgerTable entries={entries} />
      <ProviderPayoutsPagination
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </section>
  );
}
