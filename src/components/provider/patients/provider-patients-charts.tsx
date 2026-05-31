import { BaseChart } from "@/components/base-chart/base-chart";
import {
  MOCK_PROVIDER_PATIENT_STATUS_CHART,
  MOCK_PROVIDER_PATIENT_TOP_DIAGNOSES_CHART,
  MOCK_PROVIDER_PATIENT_VISITS_CHART,
} from "@/lib/provider/provider-patients";

export function ProviderPatientsCharts() {
  return (
    <section
      aria-label="Patient directory analytics"
      className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3"
    >
      <BaseChart
        type="area"
        title="Monthly Patient Visits"
        data={MOCK_PROVIDER_PATIENT_VISITS_CHART}
        valueFormatter={(value) => `${value} visits`}
      />
      <BaseChart
        type="bar"
        title="Top Diagnoses"
        data={MOCK_PROVIDER_PATIENT_TOP_DIAGNOSES_CHART}
        valueFormatter={(value) => `${value} patients`}
      />
      <BaseChart
        type="pie"
        title="Caseload by Status"
        data={MOCK_PROVIDER_PATIENT_STATUS_CHART}
        valueFormatter={(value) => `${value} patients`}
      />
    </section>
  );
}
