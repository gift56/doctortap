"use client";

import { SlotPill } from "@/components/provider/calendar/slot-pill";
import type { ProviderAvailabilitySlot } from "@/lib/provider/provider-calendar";

interface ProviderCalendarSlotsGridProps {
  selectedDateLabel: string;
  slots: ProviderAvailabilitySlot[];
  onDeleteSlot: (slotId: string) => void;
}

export function ProviderCalendarSlotsGrid({
  selectedDateLabel,
  slots,
  onDeleteSlot,
}: ProviderCalendarSlotsGridProps) {
  return (
    <>
      <p className="mt-6 mb-3 text-xs font-bold tracking-wider text-text-muted uppercase">
        Generated Availability for {selectedDateLabel}
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {slots.length === 0 ? (
          <p className="col-span-full text-sm text-text-secondary">
            No availability slots for this date. Use the generator above to add
            windows.
          </p>
        ) : (
          slots.map((slot) => (
            <SlotPill
              key={slot.id}
              time={slot.time}
              isBooked={slot.isBooked}
              onDelete={
                slot.isBooked ? undefined : () => onDeleteSlot(slot.id)
              }
            />
          ))
        )}
      </div>
    </>
  );
}
