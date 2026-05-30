export interface BookingDay {
  isoDate: string;
  weekdayLabel: string;
  dayLabel: string;
}

function toIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getBookingWeekDays(referenceDate = new Date()): BookingDay[] {
  const date = new Date(referenceDate);
  const dayOfWeek = date.getDay();
  const mondayOffset = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(date.getDate() + mondayOffset);

  return Array.from({ length: 7 }, (_, index) => {
    const current = new Date(monday);
    current.setDate(monday.getDate() + index);

    return {
      isoDate: toIsoDate(current),
      weekdayLabel: current
        .toLocaleDateString("en-US", { weekday: "short" })
        .toUpperCase(),
      dayLabel: String(current.getDate()),
    };
  });
}
