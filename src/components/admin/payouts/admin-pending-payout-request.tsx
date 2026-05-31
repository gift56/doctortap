"use client";

import { useState } from "react";

import type {
  AdminPendingPayoutRequest,
  AdminPayoutLedgerEntry,
} from "@/lib/admin/admin-payouts";

import { AdminDispatchDetailsDialog } from "./admin-dispatch-details-dialog";
import { AdminPendingPayoutActions } from "./admin-pending-payout-actions";

interface AdminPendingPayoutRequestCardProps {
  request: AdminPendingPayoutRequest;
}

function pendingRequestToDispatch(
  request: AdminPendingPayoutRequest,
): AdminPayoutLedgerEntry {
  return {
    batchRef: "TXN-ADMIN-PENDING",
    beneficiary: request.doctorName,
    date: "Awaiting clearance",
    amount: request.amount,
    status: "PENDING",
    bankName: request.bankName,
    maskedAccount: request.maskedAccount,
    profileRef: request.profileRef,
  };
}

export function AdminPendingPayoutRequestCard({
  request,
}: AdminPendingPayoutRequestCardProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <article
        className="cursor-pointer space-y-4 rounded-xl border border-border-default bg-white p-4 shadow-sm transition-all hover:border-accent-primary/30"
        onClick={() => setDialogOpen(true)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            setDialogOpen(true);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label={`View pending payout for ${request.doctorName}`}
      >
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-bold text-text-primary">{request.doctorName}</p>
          <p className="text-sm font-bold text-text-primary">{request.amount}</p>
        </div>

        <div className="space-y-1 rounded-lg border border-border-default bg-white p-3 text-xs text-text-secondary">
          <p>
            Destination: {request.bankName} • {request.maskedAccount}
          </p>
          <p>Verified Profile Ref: {request.profileRef}</p>
        </div>

        <div onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.stopPropagation()}>
          <AdminPendingPayoutActions request={request} />
        </div>
      </article>

      <AdminDispatchDetailsDialog
        dispatch={pendingRequestToDispatch(request)}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
