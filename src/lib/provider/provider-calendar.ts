import { format, isBefore, parseISO, startOfDay } from "date-fns";

export interface ProviderAvailabilitySlot {
  id: string;
  time: string;
  isBooked: boolean;
}

export const MOCK_PROVIDER_SLOTS = {
  selectedDate: "2026-06-01",
  slots: [
    { id: "slot-1", time: "08:00 AM", isBooked: false },
    { id: "slot-2", time: "08:30 AM", isBooked: false },
    { id: "slot-3", time: "09:00 AM", isBooked: true },
    { id: "slot-4", time: "09:30 AM", isBooked: false },
    { id: "slot-5", time: "10:00 AM", isBooked: false },
    { id: "slot-6", time: "10:30 AM", isBooked: false },
  ],
} as const satisfies {
  selectedDate: string;
  slots: ProviderAvailabilitySlot[];
};

export const PROVIDER_SLOT_INTERVAL_MINUTES = [30, 45, 60] as const;

export type ProviderSlotInterval =
  (typeof PROVIDER_SLOT_INTERVAL_MINUTES)[number];

const TIME_OPTIONS: string[] = [];
for (let hour = 6; hour <= 21; hour += 1) {
  for (const minute of [0, 30]) {
    if (hour === 21 && minute === 30) break;
    const period = hour >= 12 ? "PM" : "AM";
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const paddedMinute = String(minute).padStart(2, "0");
    TIME_OPTIONS.push(
      `${String(displayHour).padStart(2, "0")}:${paddedMinute} ${period}`,
    );
  }
}

export const PROVIDER_CALENDAR_TIME_OPTIONS = TIME_OPTIONS;

export const PROVIDER_CALENDAR_DEFAULT_START = "08:00 AM";
export const PROVIDER_CALENDAR_DEFAULT_END = "12:00 PM";
export const PROVIDER_CALENDAR_DEFAULT_INTERVAL: ProviderSlotInterval = 30;

export function getStartOfToday(): Date {
  return startOfDay(new Date());
}

export function isoDateToLocalDate(isoDate: string): Date {
  return parseISO(isoDate);
}

export function localDateToIsoDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function isPastIsoDate(isoDate: string, today = getStartOfToday()): boolean {
  return isBefore(startOfDay(isoDateToLocalDate(isoDate)), today);
}

export function resolveInitialSelectedIsoDate(today = getStartOfToday()): string {
  const todayIso = localDateToIsoDate(today);
  const mockIso = MOCK_PROVIDER_SLOTS.selectedDate;
  return isPastIsoDate(mockIso, today) ? todayIso : mockIso;
}

export function formatProviderSelectedDateLabel(isoDate: string): string {
  const date = isoDateToLocalDate(isoDate);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getWeekIsoDatesForDate(isoDate: string): string[] {
  const date = isoDateToLocalDate(isoDate);
  const dayOfWeek = date.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(date);
  monday.setDate(date.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + index);
    return localDateToIsoDate(current);
  });
}

function parseTime12h(time: string): number {
  const match = time.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return 0;

  let hours = Number(match[1]);
  const minutes = Number(match[2]);
  const period = match[3].toUpperCase();

  if (period === "PM" && hours !== 12) hours += 12;
  if (period === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

function formatTime12h(totalMinutes: number): string {
  const hours24 = Math.floor(totalMinutes / 60) % 24;
  const minutes = totalMinutes % 60;
  const period = hours24 >= 12 ? "PM" : "AM";
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  return `${String(hours12).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function generateAvailabilitySlots(
  startTime: string,
  endTime: string,
  intervalMinutes: ProviderSlotInterval,
): ProviderAvailabilitySlot[] {
  const start = parseTime12h(startTime);
  const end = parseTime12h(endTime);
  if (end <= start) return [];

  const slots: ProviderAvailabilitySlot[] = [];
  let cursor = start;
  let index = 0;

  while (cursor + intervalMinutes <= end) {
    slots.push({
      id: `generated-${Date.now()}-${index}`,
      time: formatTime12h(cursor),
      isBooked: false,
    });
    cursor += intervalMinutes;
    index += 1;
  }

  return slots;
}

export function mergeAvailabilitySlots(
  existing: ProviderAvailabilitySlot[],
  incoming: ProviderAvailabilitySlot[],
): ProviderAvailabilitySlot[] {
  const seen = new Set(existing.map((slot) => slot.time));
  const merged = [...existing];

  for (const slot of incoming) {
    if (seen.has(slot.time)) continue;
    seen.add(slot.time);
    merged.push(slot);
  }

  return merged.sort(
    (a, b) => parseTime12h(a.time) - parseTime12h(b.time),
  );
}

export function createSlotId(): string {
  return `slot-${crypto.randomUUID()}`;
}
