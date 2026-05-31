import type { ProviderPayoutLedgerEntry } from "@/lib/provider/provider-payouts";

import { ProviderDistributionLedger } from "./provider-distribution-ledger";
import { ProviderPayoutsSummaryCards } from "./provider-payouts-summary-cards";
import { ProviderSettlementDestination } from "./provider-settlement-destination";

interface ProviderPayoutsWorkspaceProps {
  ledgerEntries: ProviderPayoutLedgerEntry[];
  currentPage: number;
  totalPages: number;
}

export function ProviderPayoutsWorkspace({
  ledgerEntries,
  currentPage,
  totalPages,
}: ProviderPayoutsWorkspaceProps) {
  return (
    <>
      <ProviderPayoutsSummaryCards />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
        <ProviderSettlementDestination />
        <ProviderDistributionLedger
          entries={ledgerEntries}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
