"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import type { AdminPayoutLedgerEntry } from "@/lib/admin/admin-payouts";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

const MIN_REASON_LENGTH = 10;

interface AdminDispatchCancelReasonDialogProps {
  dispatch: AdminPayoutLedgerEntry | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCancelled?: () => void;
}

export function AdminDispatchCancelReasonDialog({
  dispatch,
  open,
  onOpenChange,
  onCancelled,
}: AdminDispatchCancelReasonDialogProps) {
  const [reason, setReason] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setReason("");
      setError(null);
    }
  }, [open]);

  if (!dispatch) {
    return null;
  }

  const trimmedReason = reason.trim();
  const isValid = trimmedReason.length >= MIN_REASON_LENGTH;

  const handleConfirm = () => {
    if (!isValid) {
      setError(
        `Please enter at least ${MIN_REASON_LENGTH} characters explaining the cancellation.`,
      );
      return;
    }

    showSuccessToast(
      `Cancellation recorded for ${dispatch.batchRef}. ${dispatch.beneficiary} will be notified by email — delivery pending integration.`,
    );
    onOpenChange(false);
    onCancelled?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-text-primary">
            Cancel payout
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            {dispatch.beneficiary} will receive an email with your reason for
            cancelling {dispatch.batchRef} ({dispatch.amount}).
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          <label
            htmlFor="dispatch-cancel-reason"
            className="text-xs font-semibold text-text-primary"
          >
            Reason for cancellation
            <span className="text-state-error"> *</span>
          </label>
          <Textarea
            id="dispatch-cancel-reason"
            value={reason}
            onChange={(event) => {
              setReason(event.target.value);
              if (error) {
                setError(null);
              }
            }}
            placeholder="e.g. Incomplete clinical clearance documentation for this settlement cycle."
            rows={4}
            aria-invalid={error ? true : undefined}
            className={cn(
              "min-h-24 resize-y rounded-lg border-border-default bg-white text-sm text-text-primary",
              error && "border-state-error ring-3 ring-state-error/20",
            )}
          />
          {error ? (
            <p className="text-xs text-state-error" role="alert">
              {error}
            </p>
          ) : (
            <p className="text-xs text-text-muted">
              Minimum {MIN_REASON_LENGTH} characters. This message is included in
              the beneficiary notification.
            </p>
          )}
        </div>

        <DialogFooter className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="cursor-pointer rounded-md border border-border-default px-4 py-2 text-xs font-semibold text-text-secondary transition-all hover:bg-bg-surface"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!isValid}
            className="cursor-pointer rounded-md border border-red-200 bg-red-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Confirm cancellation
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
