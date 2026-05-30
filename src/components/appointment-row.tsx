"use client";

import Image from "next/image";

import type { PatientAppointment } from "@/lib/patient/patient-appointments";
import { showWarningToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface AppointmentRowProps {
  appointment: PatientAppointment;
}

const cancelButtonClassName =
  "rounded-md border border-border-default bg-transparent px-4 py-2 text-xs font-medium text-text-secondary transition-all hover:bg-state-error/10 hover:text-state-error";

function CancelAppointmentButton({
  className,
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      className={cn(cancelButtonClassName, className)}
      onClick={() =>
        showWarningToast(
          "Appointment cancellation will be available after database integration.",
        )
      }
    >
      Cancel appointment
    </button>
  );
}

function PendingActions() {
  return <CancelAppointmentButton />;
}

function PaymentRequiredActions() {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto">
      <button
        type="button"
        className="w-full rounded-md bg-accent-primary px-6 py-2 text-center text-xs font-medium text-white hover:opacity-90"
        onClick={() =>
          showWarningToast(
            "Online payment will be available after database integration.",
          )
        }
      >
        Pay here
      </button>
      <CancelAppointmentButton className="w-full text-center" />
    </div>
  );
}

function PaidActions() {
  return (
    <div className="flex w-full flex-col gap-2 sm:w-auto">
      <span className="w-full cursor-default select-none rounded-md border border-state-success bg-state-success/10 px-6 py-2 text-center text-xs font-semibold text-state-success">
        Paid
      </span>
      <CancelAppointmentButton className="w-full text-center" />
    </div>
  );
}

export function AppointmentRow({ appointment }: AppointmentRowProps) {
  const {
    doctorName,
    specialty,
    avatarUrl,
    addressLocation,
    cityRegion,
    dateLabel,
    timeLabel,
    paymentStatus,
  } = appointment;

  return (
    <article className="flex flex-col items-start justify-between gap-4 rounded-xl border border-border-default bg-bg-surface p-6 sm:flex-row sm:items-center">
      <div className="flex items-start gap-4">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg border border-border-default bg-bg-base">
          <Image
            src={avatarUrl}
            alt={`Dr. ${doctorName}`}
            width={80}
            height={80}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <p className="text-base font-bold text-text-primary">
            Dr. {doctorName}
          </p>
          <p className="text-xs text-text-secondary">{specialty}</p>
          <p className="mt-2 text-xs leading-relaxed text-text-secondary">
            Address: {addressLocation}, {cityRegion}, Nepal
          </p>
        </div>
      </div>

      <p className="text-xs font-medium text-text-primary rounded-md border border-border-default bg-bg-base px-3 py-1.5">
        Date &amp; Time: {dateLabel} | {timeLabel}
      </p>

      <div className="w-full shrink-0 sm:w-auto">
        {paymentStatus === "pending" && <PendingActions />}
        {paymentStatus === "payment_required" && <PaymentRequiredActions />}
        {paymentStatus === "paid" && <PaidActions />}
      </div>
    </article>
  );
}
