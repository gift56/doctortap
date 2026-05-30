"use client";

import { Download } from "lucide-react";

import { showWarningToast } from "@/lib/toast";

interface PatientBillingDownloadReceiptButtonProps {
  invoiceId: string;
}

export function PatientBillingDownloadReceiptButton({
  invoiceId,
}: PatientBillingDownloadReceiptButtonProps) {
  return (
    <button
      type="button"
      className="flex cursor-pointer items-center gap-1 text-xs font-semibold text-accent-primary hover:underline"
      onClick={() =>
        showWarningToast(
          `PDF receipt download for ${invoiceId} will be available after database integration.`,
        )
      }
    >
      <Download className="size-3.5 shrink-0" aria-hidden />
      Download PDF Receipt
    </button>
  );
}
