import { PatientBillingDownloadReceiptButton } from "@/components/patient/patient-billing-download-receipt-button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BillingInvoice, BillingInvoiceStatus } from "@/lib/patient/patient-billing";
import { formatBillingInvoiceStatus } from "@/lib/patient/patient-billing";
import { cn } from "@/lib/utils";

interface PatientBillingHistoryTableProps {
  invoices: BillingInvoice[];
}

const succeededBadgeClassName =
  "rounded-full border border-state-success bg-state-success/10 px-2 py-0.5 text-xs font-medium text-state-success";

const failedBadgeClassName =
  "rounded-full border border-state-error bg-state-error/10 px-2 py-0.5 text-xs font-medium text-state-error";

function billingStatusBadgeClassName(status: BillingInvoiceStatus): string {
  return status === "SUCCEEDED" ? succeededBadgeClassName : failedBadgeClassName;
}

const tableCellClassName = "px-3 py-3 sm:px-6 sm:py-4";

export function PatientBillingHistoryTable({
  invoices,
}: PatientBillingHistoryTableProps) {
  return (
    <section className="overflow-hidden rounded-xl border border-border-default bg-bg-surface shadow-sm">
      <div className="border-b border-border-default bg-bg-base/50 px-3 py-3 sm:px-6 sm:py-4">
        <h2 className="text-base font-bold text-text-primary">Payment History</h2>
      </div>

      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
              Invoice ID
            </TableHead>
            <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
              Consulting Practitioner
            </TableHead>
            <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
              Date Processed
            </TableHead>
            <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
              Settled Amount
            </TableHead>
            <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
              Status Tag
            </TableHead>
            <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id} className="hover:bg-bg-base/30">
              <TableCell
                className={cn(tableCellClassName, "font-medium text-text-primary")}
              >
                {invoice.id}
              </TableCell>
              <TableCell className={tableCellClassName}>
                <p className="font-medium text-text-primary">{invoice.doctorName}</p>
                <p className="text-xs text-text-secondary">{invoice.specialty}</p>
              </TableCell>
              <TableCell className={cn(tableCellClassName, "text-text-primary")}>
                {invoice.date}
              </TableCell>
              <TableCell
                className={cn(tableCellClassName, "font-medium text-text-primary")}
              >
                {invoice.amount}
              </TableCell>
              <TableCell className={tableCellClassName}>
                <span
                  className={cn(
                    "inline-flex",
                    billingStatusBadgeClassName(invoice.status),
                  )}
                >
                  {formatBillingInvoiceStatus(invoice.status)}
                </span>
              </TableCell>
              <TableCell className={tableCellClassName}>
                <PatientBillingDownloadReceiptButton invoiceId={invoice.id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
}
