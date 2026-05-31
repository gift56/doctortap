"use client";

import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatAdminPayoutLedgerStatus,
  type AdminPayoutLedgerEntry,
  type AdminPayoutLedgerStatus,
} from "@/lib/admin/admin-payouts";
import { cn } from "@/lib/utils";

import { AdminDispatchDetailsDialog } from "./admin-dispatch-details-dialog";
import { AdminPayoutsPagination } from "./admin-payouts-pagination";

const dispatchedBadgeClassName =
  "rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700";

const failedBadgeClassName =
  "rounded-full border border-rose-200 bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700";

const pendingBadgeClassName =
  "rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700";

function ledgerStatusBadgeClassName(status: AdminPayoutLedgerStatus): string {
  switch (status) {
    case "PENDING":
      return pendingBadgeClassName;
    case "DISPATCHED":
      return dispatchedBadgeClassName;
    case "FAILED":
      return failedBadgeClassName;
  }
}

const tableCellClassName = "px-3 py-3 sm:px-6 sm:py-4";

interface AdminSystemDispatchesTableProps {
  entries: AdminPayoutLedgerEntry[];
  currentPage: number;
  totalPages: number;
}

export function AdminSystemDispatchesTable({
  entries,
  currentPage,
  totalPages,
}: AdminSystemDispatchesTableProps) {
  const [selectedDispatch, setSelectedDispatch] =
    useState<AdminPayoutLedgerEntry | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRowClick = (entry: AdminPayoutLedgerEntry) => {
    setSelectedDispatch(entry);
    setDialogOpen(true);
  };

  return (
    <>
      <section className="overflow-hidden rounded-xl border border-border-default bg-white shadow-sm lg:col-span-7">
        <div className="flex items-center justify-between border-b border-border-default bg-white px-3 py-3 sm:px-6 sm:py-4">
          <h2 className="text-sm font-bold text-text-primary">System Dispatches</h2>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead
                  className={cn(tableCellClassName, "text-text-secondary")}
                >
                  Batch Ref
                </TableHead>
                <TableHead
                  className={cn(tableCellClassName, "text-text-secondary")}
                >
                  Beneficiary
                </TableHead>
                <TableHead
                  className={cn(tableCellClassName, "text-text-secondary")}
                >
                  Date Settled
                </TableHead>
                <TableHead
                  className={cn(tableCellClassName, "text-text-secondary")}
                >
                  Amount Net
                </TableHead>
                <TableHead
                  className={cn(tableCellClassName, "text-text-secondary")}
                >
                  Gateway Status
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry) => (
                <TableRow
                  key={entry.batchRef}
                  className="cursor-pointer hover:bg-bg-surface"
                  onClick={() => handleRowClick(entry)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleRowClick(entry);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for dispatch ${entry.batchRef}`}
                >
                  <TableCell
                    className={cn(
                      tableCellClassName,
                      "font-medium text-text-primary",
                    )}
                  >
                    {entry.batchRef}
                  </TableCell>
                  <TableCell
                    className={cn(tableCellClassName, "text-text-primary")}
                  >
                    {entry.beneficiary}
                  </TableCell>
                  <TableCell
                    className={cn(tableCellClassName, "text-text-primary")}
                  >
                    {entry.date}
                  </TableCell>
                  <TableCell
                    className={cn(
                      tableCellClassName,
                      "font-medium text-text-primary",
                    )}
                  >
                    {entry.amount}
                  </TableCell>
                  <TableCell className={tableCellClassName}>
                    <span
                      className={cn(
                        "inline-flex",
                        ledgerStatusBadgeClassName(entry.status),
                      )}
                    >
                      {formatAdminPayoutLedgerStatus(entry.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <AdminPayoutsPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </section>

      <AdminDispatchDetailsDialog
        dispatch={selectedDispatch}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
