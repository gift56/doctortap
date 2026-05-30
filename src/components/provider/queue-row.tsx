"use client";

import { X } from "lucide-react";
import Image from "next/image";

import type { ProviderQueueBooking } from "@/lib/provider/provider-dashboard";
import { showWarningToast } from "@/lib/toast";

interface QueueRowProps {
  booking: ProviderQueueBooking;
}

export function QueueRow({ booking }: QueueRowProps) {
  const { patientName, bookingDateLabel, avatarUrl } = booking;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-bg-base">
          <Image
            src={avatarUrl}
            alt={patientName}
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="min-w-0">
          <p className="text-sm font-bold text-text-primary">{patientName}</p>
          <p className="mt-0.5 text-xs text-text-secondary">
            {bookingDateLabel}
          </p>
        </div>
      </div>

      <button
        type="button"
        aria-label={`Reject booking for ${patientName}`}
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-red-100 bg-red-50 text-red-500 transition-all hover:bg-red-500 hover:text-white"
        onClick={() =>
          showWarningToast(
            "Booking rejection will be available after database integration.",
          )
        }
      >
        <X className="h-4 w-4" strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}
