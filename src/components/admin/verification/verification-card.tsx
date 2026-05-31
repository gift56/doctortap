"use client";

import type { PendingVerificationRequest } from "@/lib/admin/admin-verification";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

interface VerificationCardProps {
  request: PendingVerificationRequest;
}

export function VerificationCard({ request }: VerificationCardProps) {
  const handleReject = () => {
    showErrorToast(
      `${request.name} (${request.id}) rejected — status update pending database integration.`,
    );
  };

  const handleApprove = () => {
    showSuccessToast(
      `${request.name} (${request.id}) approved and verified — workflow pending database integration.`,
    );
  };

  return (
    <article className="flex flex-col gap-4 rounded-xl border border-border-default bg-bg-base p-4 shadow-sm transition-all hover:border-border-default sm:gap-6 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="min-w-0 flex-1">
        <h2 className="text-base font-bold text-text-primary">{request.name}</h2>
        <p className="mt-0.5 text-xs text-text-secondary">
          {request.specialty} • {request.experience} Experience
        </p>
        <p className="mt-1 w-max rounded border border-border-default bg-bg-base px-2 py-0.5 font-mono text-xs text-text-muted">
          NMC Reg No: {request.councilId}
        </p>
      </div>

      <div className="shrink-0">
        <a
          href={request.documentUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-accent-primary/10 bg-accent-primary/5 px-3 py-2 text-xs font-medium text-accent-primary transition-all hover:bg-accent-primary/10"
        >
          <span aria-hidden>📄</span>
          View {request.documentName}
        </a>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <button
          type="button"
          onClick={handleReject}
          className="cursor-pointer rounded-md border border-red-200 px-4 py-2 text-xs font-semibold text-red-600 transition-all hover:bg-red-50"
        >
          Reject
        </button>
        <button
          type="button"
          onClick={handleApprove}
          className="cursor-pointer rounded-md bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700"
        >
          Approve & Verify
        </button>
      </div>
    </article>
  );
}
