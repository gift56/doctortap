"use client";

import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { BOOKING_TIME_SLOTS, type BookingTimeSlot } from "@/config/mock-data";
import { getBookingWeekDays } from "@/lib/doctors/booking-calendar";
import { showSuccessToast, showWarningToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface DoctorBookingPanelProps {
  doctorName: string;
}

export function DoctorBookingPanel({ doctorName }: DoctorBookingPanelProps) {
  const weekDays = useMemo(() => getBookingWeekDays(), []);
  const [selectedDate, setSelectedDate] = useState(weekDays[0]?.isoDate ?? "");
  const [selectedTime, setSelectedTime] = useState<BookingTimeSlot | null>(null);

  function handleBookAppointment() {
    if (!selectedDate || !selectedTime) {
      showWarningToast("Select a date and time slot before booking.");
      return;
    }

    showSuccessToast(
      `Appointment slot selected — Dr. ${doctorName} · ${selectedDate} · ${selectedTime}`,
    );
  }

  return (
    <section className="space-y-6 rounded-xl border border-border-default bg-bg-base p-6">
      <h2 className="text-lg font-bold text-text-primary">Booking slots</h2>

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {weekDays.map((day) => {
          const isActive = selectedDate === day.isoDate;

          return (
            <button
              key={day.isoDate}
              type="button"
              aria-pressed={isActive}
              onClick={() => {
                setSelectedDate(day.isoDate);
                setSelectedTime(null);
              }}
              className={cn(
                "flex min-w-18 shrink-0 flex-col items-center rounded-xl border px-3 py-3 text-center transition-all duration-200",
                isActive
                  ? "scale-105 border-accent-primary bg-accent-primary text-white shadow-md"
                  : "border-border-default bg-transparent text-text-muted",
              )}
            >
              <span className="text-xs font-semibold tracking-wide">
                {day.weekdayLabel}
              </span>
              <span className="mt-1 text-lg font-bold">{day.dayLabel}</span>
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        {BOOKING_TIME_SLOTS.map((slot) => {
          const isActive = selectedTime === slot;

          return (
            <button
              key={slot}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedTime(slot)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors duration-200",
                isActive
                  ? "border-accent-primary bg-accent-primary text-white"
                  : "border-border-default bg-bg-surface text-text-primary hover:border-accent-primary",
              )}
            >
              {slot}
            </button>
          );
        })}
      </div>

      <div className="flex justify-end pt-2">
        <Button
          type="button"
          onClick={handleBookAppointment}
          className="min-h-12 rounded-full bg-accent-primary px-8 text-base font-semibold text-white hover:bg-accent-primary/90"
        >
          Book an appointment
        </Button>
      </div>
    </section>
  );
}
