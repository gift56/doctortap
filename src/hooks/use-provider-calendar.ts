"use client";

import { useCallback, useMemo, useState } from "react";

import {
  MOCK_PROVIDER_SLOTS,
  PROVIDER_CALENDAR_DEFAULT_END,
  PROVIDER_CALENDAR_DEFAULT_INTERVAL,
  PROVIDER_CALENDAR_DEFAULT_START,
  createSlotId,
  formatProviderSelectedDateLabel,
  generateAvailabilitySlots,
  getStartOfToday,
  getWeekIsoDatesForDate,
  isPastIsoDate,
  localDateToIsoDate,
  mergeAvailabilitySlots,
  resolveInitialSelectedIsoDate,
  type ProviderAvailabilitySlot,
  type ProviderSlotInterval,
} from "@/lib/provider/provider-calendar";
import { showSuccessToast } from "@/lib/toast";

export function useProviderCalendar() {
  const today = useMemo(() => getStartOfToday(), []);

  const [selectedDate, setSelectedDate] = useState(() =>
    resolveInitialSelectedIsoDate(today),
  );
  const [startTime, setStartTime] = useState(PROVIDER_CALENDAR_DEFAULT_START);
  const [endTime, setEndTime] = useState(PROVIDER_CALENDAR_DEFAULT_END);
  const [intervalMinutes, setIntervalMinutes] = useState<ProviderSlotInterval>(
    PROVIDER_CALENDAR_DEFAULT_INTERVAL,
  );
  const [slotsByDate, setSlotsByDate] = useState<
    Record<string, ProviderAvailabilitySlot[]>
  >(() => ({
    [MOCK_PROVIDER_SLOTS.selectedDate]: MOCK_PROVIDER_SLOTS.slots.map(
      (slot) => ({ ...slot }),
    ),
  }));

  const selectedDay = useMemo(
    () => new Date(`${selectedDate}T12:00:00`),
    [selectedDate],
  );
  const activeSlots = slotsByDate[selectedDate] ?? [];
  const selectedDateLabel = formatProviderSelectedDateLabel(selectedDate);

  const updateSlotsForDate = useCallback(
    (
      isoDate: string,
      updater: (
        current: ProviderAvailabilitySlot[],
      ) => ProviderAvailabilitySlot[],
    ) => {
      setSlotsByDate((previous) => ({
        ...previous,
        [isoDate]: updater(previous[isoDate] ?? []),
      }));
    },
    [],
  );

  const handleSelectDay = useCallback(
    (day: Date | undefined) => {
      if (!day) return;

      const isoDate = localDateToIsoDate(day);
      if (isPastIsoDate(isoDate, today)) return;

      setSelectedDate(isoDate);
    },
    [today],
  );

  const handleGenerateSlots = useCallback(() => {
    const generated = generateAvailabilitySlots(
      startTime,
      endTime,
      intervalMinutes,
    ).map((slot) => ({ ...slot, id: createSlotId() }));

    if (generated.length === 0) {
      showSuccessToast("No slots fit in the selected time range.");
      return;
    }

    updateSlotsForDate(selectedDate, (current) =>
      mergeAvailabilitySlots(current, generated),
    );
    showSuccessToast(
      `Generated ${generated.length} slot${generated.length === 1 ? "" : "s"} for ${selectedDateLabel}.`,
    );
  }, [
    endTime,
    intervalMinutes,
    selectedDate,
    selectedDateLabel,
    startTime,
    updateSlotsForDate,
  ]);

  const handleApplyWeek = useCallback(() => {
    const weekDates = getWeekIsoDatesForDate(selectedDate).filter(
      (isoDate) => !isPastIsoDate(isoDate, today),
    );
    const template = activeSlots.map((slot) => ({ ...slot }));

    setSlotsByDate((previous) => {
      const next = { ...previous };
      for (const isoDate of weekDates) {
        next[isoDate] = template.map((slot) => ({
          ...slot,
          id: createSlotId(),
          isBooked: isoDate === selectedDate ? slot.isBooked : false,
        }));
      }
      return next;
    });

    showSuccessToast("Applied current slots to the full week.");
  }, [activeSlots, selectedDate, today]);

  const handleDeleteSlot = useCallback(
    (slotId: string) => {
      updateSlotsForDate(selectedDate, (current) =>
        current.filter((slot) => slot.id !== slotId),
      );
    },
    [selectedDate, updateSlotsForDate],
  );

  return {
    today,
    selectedDay,
    selectedDate,
    selectedDateLabel,
    activeSlots,
    startTime,
    setStartTime,
    endTime,
    setEndTime,
    intervalMinutes,
    setIntervalMinutes,
    handleSelectDay,
    handleGenerateSlots,
    handleApplyWeek,
    handleDeleteSlot,
  };
}
