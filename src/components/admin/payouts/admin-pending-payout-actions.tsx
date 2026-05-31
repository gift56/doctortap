"use client";

import type { AdminPendingPayoutRequest } from "@/lib/admin/admin-payouts";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

interface AdminPendingPayoutActionsProps {
  request: AdminPendingPayoutRequest;
}

export function AdminPendingPayoutActions({
  request,
}: AdminPendingPayoutActionsProps) {
  const handleHold = () => {
    showErrorToast(
      `${request.doctorName} payout held — settlement workflow pending database integration.`,
    );
  };

  const handleRelease = () => {
    showSuccessToast(
      `${request.amount} released to ${request.doctorName} — Paystack dispatch pending integration.`,
    );
  };

  return (
    <div className="grid grid-cols-2 gap-3">
      <button
        type="button"
        onClick={handleHold}
        className="cursor-pointer rounded-md border border-border-default py-2 text-center text-xs font-semibold text-text-secondary transition-all hover:bg-bg-base"
      >
        Hold
      </button>
      <button
        type="button"
        onClick={handleRelease}
        className="cursor-pointer rounded-md bg-accent-primary py-2 text-center text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90"
      >
        Release Funds
      </button>
    </div>
  );
}
