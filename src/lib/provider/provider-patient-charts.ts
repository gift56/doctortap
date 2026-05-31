import type { BaseChartDataPoint } from "@/lib/charts/types";

import {
  PROVIDER_PATIENT_VISIT_COUNTS,
  type ProviderPatient,
} from "./provider-patients";

export interface ProviderPatientChartBundle {
  visitTrend: BaseChartDataPoint[];
  vitalsTrend: BaseChartDataPoint[];
  careMix: BaseChartDataPoint[];
}

const VISIT_MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
const VITAL_LABELS = ["BP", "Glucose", "Weight", "Pulse", "SpO2"];
const CARE_LABELS = ["Consult", "Follow-up", "Lab Review", "Other"];

function seedFromPatientId(id: string): number {
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
    value: base + ((seed + index * 17) % spread),
  }));
}

export function getProviderPatientChartData(
  patient: ProviderPatient,
): ProviderPatientChartBundle {
  const seed = seedFromPatientId(patient.id);
  const totalVisits = PROVIDER_PATIENT_VISIT_COUNTS[patient.id] ?? 4;
  const visitBase = Math.max(1, totalVisits - 3);

  return {
    visitTrend: buildSeries(VISIT_MONTH_LABELS, seed, visitBase, 5),
    vitalsTrend: buildSeries(VITAL_LABELS, seed + 11, 72 + (seed % 8), 18),
    careMix: [
      {
        label: "Consult",
        value: 30 + (seed % 20),
        color: "var(--accent-primary)",
      },
      {
        label: "Follow-up",
        value: 20 + ((seed + 3) % 15),
        color: "var(--state-success)",
      },
      {
        label: "Lab Review",
        value: 10 + ((seed + 7) % 12),
        color: "var(--text-secondary)",
      },
      {
        label: "Other",
        value: 5 + ((seed + 13) % 8),
        color:
          "color-mix(in oklch, var(--accent-primary) 50%, var(--text-primary))",
      },
    ],
  };
}
