import {
  PROVIDER_PENDING_ESCROW,
  PROVIDER_TOTAL_EARNINGS,
  PROVIDER_WITHDRAWABLE_BALANCE,
} from "@/lib/provider/provider-payouts";

import { ProviderInstantPayoutButton } from "./provider-instant-payout-button";

const summaryCardClassName =
  "rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm";

export function ProviderPayoutsSummaryCards() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold text-text-secondary">
          Withdrawable Balance
        </p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
          {PROVIDER_WITHDRAWABLE_BALANCE}
        </p>
        <ProviderInstantPayoutButton />
      </article>

      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold text-text-secondary">
          Pending Escrow Clearance
        </p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-text-secondary">
          {PROVIDER_PENDING_ESCROW}
        </p>
      </article>

      <article className={summaryCardClassName}>
        <p className="text-xs font-semibold text-text-secondary">
          Total Practice Earnings
        </p>
        <p className="mt-2 text-2xl font-bold tracking-tight text-text-primary">
          {PROVIDER_TOTAL_EARNINGS}
        </p>
      </article>
    </div>
  );
}
