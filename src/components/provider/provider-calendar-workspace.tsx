"use client";

import { ProviderCalendarDatePicker } from "@/components/provider/provider-calendar-date-picker";
import { ProviderCalendarSlotGenerator } from "@/components/provider/provider-calendar-slot-generator";
import { ProviderCalendarSlotsGrid } from "@/components/provider/provider-calendar-slots-grid";
import { useProviderCalendar } from "@/hooks/use-provider-calendar";

export function ProviderCalendarWorkspace() {
  const {
    today,
    selectedDay,
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
  } = useProviderCalendar();

  return (
    <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-12">
      <div className="lg:col-span-4">
        <ProviderCalendarDatePicker
          selectedDay={selectedDay}
          today={today}
          onSelectDay={handleSelectDay}
          onApplyWeek={handleApplyWeek}
        />
      </div>

      <div className="lg:col-span-8">
        <ProviderCalendarSlotGenerator
          startTime={startTime}
          endTime={endTime}
          intervalMinutes={intervalMinutes}
          onStartTimeChange={setStartTime}
          onEndTimeChange={setEndTime}
          onIntervalChange={setIntervalMinutes}
          onGenerate={handleGenerateSlots}
        />

        <ProviderCalendarSlotsGrid
          selectedDateLabel={selectedDateLabel}
          slots={activeSlots}
          onDeleteSlot={handleDeleteSlot}
        />
      </div>
    </div>
  );
}
