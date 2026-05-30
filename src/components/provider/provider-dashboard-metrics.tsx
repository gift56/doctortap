import Image from "next/image";

import {
  PROVIDER_APPOINTMENT_COUNT,
  PROVIDER_PATIENT_COUNT,
  PROVIDER_PLATFORM_EARNINGS,
} from "@/lib/provider/provider-dashboard";

const metricCardClassName =
  "flex items-center gap-4 rounded-xl border border-border-default bg-bg-surface p-6";

const METRIC_ICONS = {
  earnings: "/svgs/provider/earning.svg",
  appointments: "/svgs/provider/appointments.svg",
  patients: "/svgs/provider/patients.svg",
} as const;

function MetricIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={66}
      height={65}
      className="size-16 shrink-0"
    />
  );
}

export function ProviderDashboardMetrics() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <article className={metricCardClassName}>
        <MetricIcon src={METRIC_ICONS.earnings} alt="Earnings" />
        <div>
          <p className="text-2xl font-bold text-text-primary">
            {PROVIDER_PLATFORM_EARNINGS}
          </p>
          <p className="text-xs font-medium text-text-secondary">Earnings</p>
        </div>
      </article>

      <article className={metricCardClassName}>
        <MetricIcon src={METRIC_ICONS.appointments} alt="Appointments" />
        <div>
          <p className="text-2xl font-bold text-text-primary">
            {PROVIDER_APPOINTMENT_COUNT}
          </p>
          <p className="text-xs font-medium text-text-secondary">
            Appointments
          </p>
        </div>
      </article>

      <article className={metricCardClassName}>
        <MetricIcon src={METRIC_ICONS.patients} alt="Patients" />
        <div>
          <p className="text-2xl font-bold text-text-primary">
            {PROVIDER_PATIENT_COUNT}
          </p>
          <p className="text-xs font-medium text-text-secondary">Patients</p>
        </div>
      </article>
    </div>
  );
}
