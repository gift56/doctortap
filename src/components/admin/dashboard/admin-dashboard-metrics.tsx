import Image from "next/image";

import {
  ADMIN_APPOINTMENT_COUNT,
  ADMIN_DOCTOR_COUNT,
  ADMIN_PATIENT_COUNT,
} from "@/lib/admin/admin-dashboard";

const metricCardClassName =
  "flex items-center gap-3 rounded-xl border border-border-default bg-bg-base p-4 shadow-sm sm:gap-4 sm:p-6";

const METRIC_ICONS = {
  doctors: "/svgs/physician.svg",
  appointments: "/svgs/provider/appointments.svg",
  patients: "/svgs/provider/patients.svg",
} as const;

function MetricIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="flex size-14 shrink-0 items-center justify-center rounded-xl bg-accent-primary/10 sm:size-16">
      <Image
        src={src}
        alt={alt}
        width={66}
        height={65}
        className="size-10 sm:size-12"
      />
    </div>
  );
}

export function AdminDashboardMetrics() {
  return (
    <div className="mt-2 grid grid-cols-1 gap-3 sm:mt-6 sm:gap-6 md:grid-cols-3">
      <article className={metricCardClassName}>
        <MetricIcon src={METRIC_ICONS.doctors} alt="Total doctors" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Total Doctors
          </p>
          <p className="text-2xl font-bold text-text-primary">
            {ADMIN_DOCTOR_COUNT}
          </p>
        </div>
      </article>

      <article className={metricCardClassName}>
        <MetricIcon src={METRIC_ICONS.appointments} alt="Total appointments" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Total Appointments
          </p>
          <p className="text-2xl font-bold text-text-primary">
            {ADMIN_APPOINTMENT_COUNT}
          </p>
        </div>
      </article>

      <article className={metricCardClassName}>
        <MetricIcon src={METRIC_ICONS.patients} alt="Total patients" />
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
            Total Patients
          </p>
          <p className="text-2xl font-bold text-text-primary">
            {ADMIN_PATIENT_COUNT}
          </p>
        </div>
      </article>
    </div>
  );
}
