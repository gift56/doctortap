import type { BaseChartDataPoint } from "@/lib/charts/types";

import type { AdminAppointmentRow } from "./admin-appointments";

export interface AdminAppointmentChartBundle {
  bookingTrend: BaseChartDataPoint[];
  revenueBreakdown: BaseChartDataPoint[];
  sessionMix: BaseChartDataPoint[];
}

const BOOKING_MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function seedFromAppointmentId(id: string): number {
  return id.split("").reduce((sum, char, index) => {
    return sum + char.charCodeAt(0) * (index + 1);
  }, 0);
}

function buildSeries(
  labels: string[],
  seed: number,
  base: number,
  spread: number,
): BaseChartDataPoint[] {
  return labels.map((label, index) => ({
    label,
    value: base + ((seed + index * 13) % spread),
  }));
}

export function getAdminAppointmentChartData(
  appointment: AdminAppointmentRow,
): AdminAppointmentChartBundle {
  const seed = seedFromAppointmentId(appointment.id);
  const tierBase =
    appointment.tier === "PREMIUM" ? 4 : appointment.tier === "VIP" ? 3 : 2;

  return {
    bookingTrend: buildSeries(BOOKING_MONTH_LABELS, seed, tierBase, 6),
    revenueBreakdown: [
      {
        label: "Consultation",
        value: 55 + (seed % 20),
        color: "var(--accent-primary)",
      },
      {
        label: "Platform Fee",
        value: 12 + ((seed + 5) % 10),
        color: "var(--text-secondary)",
      },
      {
        label: "Add-ons",
        value: 8 + ((seed + 9) % 12),
        color: "var(--state-success)",
      },
    ],
    sessionMix: [
      {
        label: "Completed",
        value:
          appointment.status === "COMPLETED"
            ? 70 + (seed % 15)
            : 20 + (seed % 15),
        color: "var(--state-success)",
      },
      {
        label: "Pending",
        value:
          appointment.status === "PENDING"
            ? 55 + (seed % 20)
            : 15 + (seed % 10),
        color: "color-mix(in oklch, var(--accent-primary) 80%, white)",
      },
      {
        label: "Cancelled",
        value:
          appointment.status === "CANCELLED"
            ? 40 + (seed % 15)
            : 5 + (seed % 8),
        color: "color-mix(in oklch, var(--text-secondary) 70%, white)",
      },
    ],
  };
}
