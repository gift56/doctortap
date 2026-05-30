"use client";

import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface ProviderCalendarDatePickerProps {
  selectedDay: Date;
  today: Date;
  onSelectDay: (day: Date | undefined) => void;
  onApplyWeek: () => void;
}

export function ProviderCalendarDatePicker({
  selectedDay,
  today,
  onSelectDay,
  onApplyWeek,
}: ProviderCalendarDatePickerProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-border-default bg-bg-surface p-4 shadow-sm">
        <Calendar
          mode="single"
          selected={selectedDay}
          onSelect={onSelectDay}
          disabled={{ before: today }}
          showOutsideDays
          className="w-full [--cell-size:2.25rem]"
          formatters={{
            formatWeekdayName: (date) =>
              date.toLocaleDateString("en-US", { weekday: "short" }),
          }}
          classNames={{
            month: "flex w-full flex-col gap-3",
            month_grid: "w-full table-fixed border-collapse",
            weekdays: "border-0",
            weekday:
              "w-[14.285%] p-0 text-center text-[11px] font-semibold text-text-muted",
            week: "border-0",
            month_caption: "text-sm font-semibold text-text-primary",
            today: "rounded-lg bg-bg-base text-text-primary",
            disabled: "text-text-muted/40 opacity-40",
            day: cn(
              "p-0 text-center",
              "[&_button[data-selected-single=true]]:rounded-lg",
              "[&_button[data-selected-single=true]]:bg-accent-primary",
              "[&_button[data-selected-single=true]]:text-white",
            ),
          }}
        />
      </div>

      <button
        type="button"
        onClick={onApplyWeek}
        className="w-full cursor-pointer rounded-lg border border-border-default py-2.5 text-center text-xs font-semibold text-text-primary transition-all hover:border-accent-primary hover:bg-bg-base"
      >
        Apply current slots to entire week
      </button>
    </div>
  );
}
