import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  formatAdminConsultationStatus,
  formatAdminScheduleWindow,
  MOCK_ADMIN_TELEMETRY,
  type AdminConsultationStatus,
} from "@/lib/admin/admin-dashboard";
import { cn } from "@/lib/utils";

const completedBadgeClassName =
  "w-max rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700";

const pendingBadgeClassName =
  "w-max rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700";

function consultationStatusBadgeClassName(
  status: AdminConsultationStatus,
): string {
  return status === "COMPLETED" ? completedBadgeClassName : pendingBadgeClassName;
}

const tableCellClassName = "px-3 py-3 sm:px-6 sm:py-4";

export function AdminRecentConsultationsTable() {
  return (
    <section className="mt-4 overflow-hidden rounded-xl border border-border-default bg-bg-base shadow-sm sm:mt-8">
      <div className="flex items-center justify-between border-b border-border-default bg-bg-base px-3 py-3 sm:px-6 sm:py-4">
        <h2 className="text-base font-bold text-text-primary">
          Recent Consultations
        </h2>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Session Ref
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Patient Details
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Assigned Doctor
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Schedule Window
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Processing Amount
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                System Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {MOCK_ADMIN_TELEMETRY.map((consultation) => (
              <TableRow key={consultation.id} className="hover:bg-bg-surface">
                <TableCell
                  className={cn(tableCellClassName, "font-medium text-text-primary")}
                >
                  {consultation.id}
                </TableCell>
                <TableCell className={tableCellClassName}>
                  <p className="font-medium text-text-primary">
                    {consultation.patientName}
                  </p>
                </TableCell>
                <TableCell className={cn(tableCellClassName, "text-text-primary")}>
                  {consultation.doctorName}
                </TableCell>
                <TableCell className={cn(tableCellClassName, "text-text-primary")}>
                  {formatAdminScheduleWindow(
                    consultation.date,
                    consultation.time,
                  )}
                </TableCell>
                <TableCell
                  className={cn(tableCellClassName, "font-medium text-text-primary")}
                >
                  {consultation.amount}
                </TableCell>
                <TableCell className={tableCellClassName}>
                  <span
                    className={cn(
                      "inline-flex",
                      consultationStatusBadgeClassName(consultation.status),
                    )}
                  >
                    {formatAdminConsultationStatus(consultation.status)}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
