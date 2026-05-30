"use client";

import { Plus } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PROVIDER_CALENDAR_TIME_OPTIONS,
  PROVIDER_SLOT_INTERVAL_MINUTES,
  type ProviderSlotInterval,
} from "@/lib/provider/provider-calendar";
import { cn } from "@/lib/utils";

interface ProviderCalendarSlotGeneratorProps {
  startTime: string;
  endTime: string;
  intervalMinutes: ProviderSlotInterval;
  onStartTimeChange: (value: string) => void;
  onEndTimeChange: (value: string) => void;
  onIntervalChange: (interval: ProviderSlotInterval) => void;
  onGenerate: () => void;
}

export function ProviderCalendarSlotGenerator({
  startTime,
  endTime,
  intervalMinutes,
  onStartTimeChange,
  onEndTimeChange,
  onIntervalChange,
  onGenerate,
}: ProviderCalendarSlotGeneratorProps) {
  return (
    <div className="space-y-4 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm">
      <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <label
            htmlFor="provider-slot-start"
            className="text-xs font-medium text-text-secondary"
          >
            From
          </label>
          <Select
            value={startTime}
            onValueChange={(value) => {
              if (value) onStartTimeChange(value);
            }}
          >
            <SelectTrigger
              id="provider-slot-start"
              className="h-10 w-full border-border-default bg-bg-surface text-text-primary"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROVIDER_CALENDAR_TIME_OPTIONS.map((time) => (
                <SelectItem key={`start-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="provider-slot-end"
            className="text-xs font-medium text-text-secondary"
          >
            To
          </label>
          <Select
            value={endTime}
            onValueChange={(value) => {
              if (value) onEndTimeChange(value);
            }}
          >
            <SelectTrigger
              id="provider-slot-end"
              className="h-10 w-full border-border-default bg-bg-surface text-text-primary"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PROVIDER_CALENDAR_TIME_OPTIONS.map((time) => (
                <SelectItem key={`end-${time}`} value={time}>
                  {time}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-text-secondary">
            Interval
          </span>
          <div className="flex gap-2">
            {PROVIDER_SLOT_INTERVAL_MINUTES.map((interval) => {
              const isActive = intervalMinutes === interval;

              return (
                <button
                  key={interval}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => onIntervalChange(interval)}
                  className={cn(
                    "flex-1 cursor-pointer rounded-lg border px-2 py-2.5 text-xs font-semibold transition-all",
                    isActive
                      ? "border-accent-primary bg-accent-primary/10 text-accent-primary"
                      : "border-border-default text-text-primary hover:border-accent-primary",
                  )}
                >
                  {interval} Min
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onGenerate}
        className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-accent-primary px-6 py-2.5 text-sm font-medium text-white transition-all hover:opacity-90"
      >
        <Plus className="h-4 w-4" aria-hidden />
        Generate Time Slots
      </button>
    </div>
  );
}
