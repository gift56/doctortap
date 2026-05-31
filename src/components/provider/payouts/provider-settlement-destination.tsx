import { CircleCheck } from "lucide-react";

import { PROVIDER_SETTLEMENT_BANK } from "@/lib/provider/provider-payouts";

import { ProviderUpdateBankButton } from "./provider-update-bank-button";

export function ProviderSettlementDestination() {
  return (
    <section className="space-y-4 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm lg:col-span-5">
      <h2 className="text-sm font-bold text-text-primary">Settlement Destination</h2>

      <div className="flex items-start gap-3 rounded-lg border border-border-default bg-bg-base p-4">
        <CircleCheck
          className="mt-0.5 h-4 w-4 shrink-0 text-accent-primary"
          aria-hidden
        />
        <div>
          <p className="text-xs font-bold text-text-primary">
            Paystack Destination Connected
          </p>
          <p className="mt-1 text-xs text-text-secondary">
            {PROVIDER_SETTLEMENT_BANK.name} • {PROVIDER_SETTLEMENT_BANK.maskedAccount}
          </p>
        </div>
      </div>

      <ProviderUpdateBankButton />
    </section>
  );
}
