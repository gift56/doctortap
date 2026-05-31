"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  formatAdminPayoutLedgerStatus,
  isAdminPayoutPending,
  type AdminPayoutLedgerEntry,
  type AdminPayoutLedgerStatus,
} from "@/lib/admin/admin-payouts";
import { showSuccessToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

import { AdminDispatchCancelReasonDialog } from "./admin-dispatch-cancel-reason-dialog";

interface AdminDispatchDetailsDialogProps {
  dispatch: AdminPayoutLedgerEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const dispatchedBadgeClassName =
  "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700";

const failedBadgeClassName =
  "rounded-full border border-rose-200 bg-rose-50 px-2.5 py-0.5 text-xs font-medium text-rose-700";

const pendingBadgeClassName =
  "rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700";

const cancelPayoutButtonClassName =
  "w-full cursor-pointer rounded-md border border-red-200 bg-red-50 px-4 py-2.5 text-xs font-semibold text-red-600 transition-all hover:border-red-300 hover:bg-red-100 sm:w-auto";

function statusBadgeClassName(status: AdminPayoutLedgerStatus): string {
  switch (status) {
    case "PENDING":
      return pendingBadgeClassName;
    case "DISPATCHED":
      return dispatchedBadgeClassName;
    case "FAILED":
      return failedBadgeClassName;
  }
}

export function AdminDispatchDetailsDialog({
  dispatch,
  open,
  onOpenChange,
}: AdminDispatchDetailsDialogProps) {
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);

  useEffect(() => {
    if (!open) {
      setCancelDialogOpen(false);
    }
  }, [open]);

  if (!dispatch) {
    return null;
  }

  const pending = isAdminPayoutPending(dispatch);

  const handleRelease = () => {
    showSuccessToast(
      `${dispatch.amount} released to ${dispatch.beneficiary} — Paystack dispatch pending integration.`,
    );
    onOpenChange(false);
  };

  const handleCancelled = () => {
    onOpenChange(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold text-text-primary">
              {dispatch.batchRef}
            </DialogTitle>
            <DialogDescription className="text-text-secondary">
              {dispatch.beneficiary} • {dispatch.date}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <DetailField label="Beneficiary" value={dispatch.beneficiary} />
            <DetailField label="Date Settled" value={dispatch.date} />
            <DetailField label="Amount Net" value={dispatch.amount} />
            <DetailField
              label="Gateway Status"
              value={
                <span
                  className={cn(
                    "inline-flex",
                    statusBadgeClassName(dispatch.status),
                  )}
                >
                  {formatAdminPayoutLedgerStatus(dispatch.status)}
                </span>
              }
            />
            {dispatch.bankName ? (
              <DetailField
                label="Destination Bank"
                value={`${dispatch.bankName} • ${dispatch.maskedAccount ?? ""}`}
                className="sm:col-span-2"
              />
            ) : null}
            {dispatch.profileRef ? (
              <DetailField
                label="Verified Profile Ref"
                value={dispatch.profileRef}
                className="sm:col-span-2"
              />
            ) : null}
          </div>

          {pending ? (
            <div className="space-y-2 border-t border-border-default pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                Cancel settlement
              </p>
              <p className="text-xs text-text-secondary">
                Cancelling notifies the beneficiary by email with your reason.
                This cannot be undone from this screen.
              </p>
              <button
                type="button"
                onClick={() => setCancelDialogOpen(true)}
                className={cancelPayoutButtonClassName}
              >
                Cancel payout
              </button>
            </div>
          ) : null}

          <DialogFooter className="flex flex-col-reverse gap-2 border-t border-border-default pt-4 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer rounded-md border border-border-default px-4 py-2 text-xs font-semibold text-text-secondary transition-all hover:bg-bg-surface"
            >
              Close
            </button>
            {pending ? (
              <button
                type="button"
                onClick={handleRelease}
                className="cursor-pointer rounded-md bg-accent-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90"
              >
                Release Funds
              </button>
            ) : null}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AdminDispatchCancelReasonDialog
        dispatch={dispatch}
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        onCancelled={handleCancelled}
      />
    </>
  );
}

function DetailField({
  label,
  value,
  className,
}: {
  label: string;
  value: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border-default bg-white px-3 py-2.5",
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <div className="mt-1 text-sm font-medium text-text-primary">{value}</div>
    </div>
  );
}
