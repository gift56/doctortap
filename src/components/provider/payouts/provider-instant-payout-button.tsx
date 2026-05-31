"use client";

import { showInfoToast } from "@/lib/toast";

export function ProviderInstantPayoutButton() {
  return (
    <button
      type="button"
      className="mt-3 block w-full cursor-pointer rounded-md bg-accent-primary py-2 text-center text-xs font-semibold text-white transition-all hover:opacity-90"
      onClick={() =>
        showInfoToast("Instant payout requests will be available after Paystack integration.")
      }
    >
      Request Instant Payout
    </button>
  );
}
