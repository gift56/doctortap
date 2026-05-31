"use client";

import { showInfoToast } from "@/lib/toast";

export function ProviderUpdateBankButton() {
  return (
    <button
      type="button"
      className="w-full cursor-pointer rounded-lg border border-border-default py-2.5 text-center text-xs font-semibold text-text-primary transition-all hover:border-accent-primary hover:bg-bg-base"
      onClick={() =>
        showInfoToast("Bank account updates will be available after Paystack integration.")
      }
    >
      Update Bank Account
    </button>
  );
}
