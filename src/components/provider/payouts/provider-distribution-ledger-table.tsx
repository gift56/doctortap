import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatProviderPayoutStatus,
  type ProviderPayoutLedgerEntry,
  type ProviderPayoutStatus,
} from "@/lib/provider/provider-payouts";
import { cn } from "@/lib/utils";

const paidBadgeClassName =
  "rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700";

const processingBadgeClassName =
  "rounded-full border border-amber-200 bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700";

function payoutStatusBadgeClassName(status: ProviderPayoutStatus): string {
  return status === "PAID" ? paidBadgeClassName : processingBadgeClassName;
}

const tableCellClassName = "px-6 py-4";

interface ProviderDistributionLedgerTableProps {
  entries: ProviderPayoutLedgerEntry[];
}

export function ProviderDistributionLedgerTable({
  entries,
}: ProviderDistributionLedgerTableProps) {
  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Reference ID
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Initiated Date
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Amount Net
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Status Flag
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {entries.map((entry) => (
              <TableRow key={entry.reference} className="hover:bg-bg-base/30">
                <TableCell
                  className={cn(tableCellClassName, "font-medium text-text-primary")}
                >
                  {entry.reference}
                </TableCell>
                <TableCell className={cn(tableCellClassName, "text-text-primary")}>
                  {entry.date}
                </TableCell>
                <TableCell
                  className={cn(tableCellClassName, "font-medium text-text-primary")}
                >
                  {entry.amount}
                </TableCell>
                <TableCell className={tableCellClassName}>
                  <span
                    className={cn(
                      "inline-flex",
                      payoutStatusBadgeClassName(entry.status),
                    )}
                  >
                    {formatProviderPayoutStatus(entry.status)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
