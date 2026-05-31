"use client";

import { useState } from "react";

import { AdminAppointmentDetailsDialog } from "@/components/admin/appointments/admin-appointment-details-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type {
  AdminAppointmentRow,
  AdminAppointmentStatus,
  AdminAppointmentTier,
} from "@/lib/admin/admin-appointments";
import {
  formatAdminAppointmentStatus,
  formatAdminAppointmentTier,
} from "@/lib/admin/admin-appointments";
import { cn } from "@/lib/utils";

const tierBadgeClassName =
  "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700";

const completedBadgeClassName =
  "w-max rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700";

const pendingBadgeClassName =
  "w-max rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700";

const cancelledBadgeClassName =
  "w-max rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700";

function statusBadgeClassName(status: AdminAppointmentStatus): string {
  switch (status) {
    case "COMPLETED":
      return completedBadgeClassName;
    case "PENDING":
      return pendingBadgeClassName;
    case "CANCELLED":
      return cancelledBadgeClassName;
  }
}

function TierCell({ tier }: { tier: AdminAppointmentTier }) {
  if (tier === "REGULAR") {
    return (
      <span className="text-sm font-medium text-text-primary">
        {formatAdminAppointmentTier(tier)}
      </span>
    );
  }

  return <span className={tierBadgeClassName}>{tier}</span>;
}

const tableCellClassName = "px-3 py-3 sm:px-6 sm:py-4";

interface AdminAppointmentsTableProps {
  appointments: AdminAppointmentRow[];
}

export function AdminAppointmentsTable({
  appointments,
}: AdminAppointmentsTableProps) {
  const [selectedAppointment, setSelectedAppointment] =
    useState<AdminAppointmentRow | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleRowClick = (appointment: AdminAppointmentRow) => {
    setSelectedAppointment(appointment);
    setDialogOpen(true);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Appointment ID
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Patient Name
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Assigned Doctor
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Date &amp; Time
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Booking Tier
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Consultation Fee
              </TableHead>
              <TableHead className={cn(tableCellClassName, "text-text-secondary")}>
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className={cn(
                    tableCellClassName,
                    "text-center text-sm text-text-secondary",
                  )}
                >
                  No appointments match your filters.
                </TableCell>
              </TableRow>
            ) : (
              appointments.map((appointment) => (
                <TableRow
                  key={appointment.id}
                  className="cursor-pointer hover:bg-bg-surface"
                  onClick={() => handleRowClick(appointment)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      handleRowClick(appointment);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View details for appointment ${appointment.id}`}
                >
                  <TableCell
                    className={cn(
                      tableCellClassName,
                      "font-medium text-text-primary",
                    )}
                  >
                    {appointment.id}
                  </TableCell>
                  <TableCell className={tableCellClassName}>
                    <p className="font-medium text-text-primary">
                      {appointment.patient}
                    </p>
                  </TableCell>
                  <TableCell
                    className={cn(tableCellClassName, "text-text-primary")}
                  >
                    {appointment.doctor}
                  </TableCell>
                  <TableCell
                    className={cn(tableCellClassName, "text-text-primary")}
                  >
                    {appointment.schedule}
                  </TableCell>
                  <TableCell className={tableCellClassName}>
                    <TierCell tier={appointment.tier} />
                  </TableCell>
                  <TableCell
                    className={cn(
                      tableCellClassName,
                      "font-medium text-text-primary",
                    )}
                  >
                    {appointment.fee}
                  </TableCell>
                  <TableCell className={tableCellClassName}>
                    <span
                      className={cn(
                        "inline-flex",
                        statusBadgeClassName(appointment.status),
                      )}
                    >
                      {formatAdminAppointmentStatus(appointment.status)}
                    </span>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AdminAppointmentDetailsDialog
        appointment={selectedAppointment}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
