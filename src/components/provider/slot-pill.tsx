"use client";

import { X } from "lucide-react";

import { cn } from "@/lib/utils";

interface SlotPillProps {
  time: string;
  isBooked: boolean;
  onDelete?: () => void;
}

export function SlotPill({ time, isBooked, onDelete }: SlotPillProps) {
  if (isBooked) {
    return (
      <div
        className={cn(
          "flex flex-col gap-1 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-medium shadow-sm",
          "cursor-not-allowed",
        )}
        aria-disabled
      >
        <span className="text-[10px] font-semibold uppercase tracking-wide text-amber-700">
          Booked
        </span>
        <span className="text-amber-900">{time}</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "group flex items-center justify-between rounded-lg border border-accent-primary bg-bg-surface px-3 py-2 text-xs font-medium text-accent-primary shadow-sm transition-all",
      )}
    >
      <span>{time}</span>
      <button
        type="button"
        aria-label={`Remove ${time} slot`}
        onClick={onDelete}
        className="ml-1.5 cursor-pointer text-red-500 opacity-0 transition-opacity group-hover:opacity-100"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden />
      </button>
    </div>
  );
}
