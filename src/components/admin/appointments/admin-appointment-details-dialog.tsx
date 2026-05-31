"use client";

import type { ReactNode } from "react";

import { BaseChart } from "@/components/base-chart/base-chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getAdminAppointmentChartData } from "@/lib/admin/admin-appointment-charts";
import type { AdminAppointmentRow } from "@/lib/admin/admin-appointments";
import {
  formatAdminAppointmentStatus,
  formatAdminAppointmentTier,
} from "@/lib/admin/admin-appointments";
import { cn } from "@/lib/utils";

interface AdminAppointmentDetailsDialogProps {
  appointment: AdminAppointmentRow | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const tierBadgeClassName =
  "text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700";

const completedBadgeClassName =
  "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700";

const pendingBadgeClassName =
  "rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-medium text-amber-700";

const cancelledBadgeClassName =
  "rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700";

function statusBadgeClassName(status: AdminAppointmentRow["status"]): string {
  switch (status) {
    case "COMPLETED":
      return completedBadgeClassName;
    case "PENDING":
      return pendingBadgeClassName;
    case "CANCELLED":
      return cancelledBadgeClassName;
  }
}

export function AdminAppointmentDetailsDialog({
  appointment,
  open,
  onOpenChange,
}: AdminAppointmentDetailsDialogProps) {
  if (!appointment) {
    return null;
  }

  const charts = getAdminAppointmentChartData(appointment);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-text-primary">
            {appointment.id}
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            {appointment.patient} with {appointment.doctor} •{" "}
            {appointment.schedule}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <DetailField label="Patient" value={appointment.patient} />
          <DetailField label="Assigned Doctor" value={appointment.doctor} />
          <DetailField label="Schedule" value={appointment.schedule} />
          <DetailField
            label="Booking Tier"
            value={
              appointment.tier === "REGULAR" ? (
                formatAdminAppointmentTier(appointment.tier)
              ) : (
                <span className={tierBadgeClassName}>{appointment.tier}</span>
              )
            }
          />
          <DetailField label="Consultation Fee" value={appointment.fee} />
          <DetailField
            label="Status"
            value={
              <span
                className={cn(
                  "inline-flex",
                  statusBadgeClassName(appointment.status),
                )}
              >
                {formatAdminAppointmentStatus(appointment.status)}
              </span>
            }
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <BaseChart
            type="line"
            title="Booking Activity (6 months)"
            data={charts.bookingTrend}
            valueFormatter={(value) => `${value} sessions`}
          />
          <BaseChart
            type="bar"
            title="Revenue Breakdown (%)"
            data={charts.revenueBreakdown}
            valueFormatter={(value) => `${value}%`}
          />
          <BaseChart
            type="pie"
            title="Session Status Mix"
            data={charts.sessionMix}
            className="md:col-span-2"
            valueFormatter={(value) => `${value} events`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border-default bg-white px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <div className="mt-1 text-sm font-medium text-text-primary">{value}</div>
    </div>
  );
}
