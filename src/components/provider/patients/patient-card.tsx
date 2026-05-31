"use client";

import { PatientViewDetailsButton } from "@/components/provider/patients/patient-details-dialog";
import {
  formatProviderPatientLastVisit,
  getProviderPatientInitials,
  type ProviderPatient,
} from "@/lib/provider/provider-patients";
import { showWarningToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface PatientCardProps {
  patient: ProviderPatient;
}

export function PatientCard({ patient }: PatientCardProps) {
  const { id, name, age, gender, lastVisit, diagnosis, status } = patient;
  const isActive = status === "ACTIVE";

  return (
    <article className="flex h-full flex-col justify-between rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm transition-all duration-200 hover:border-accent-primary/50">
      <div>
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border border-border-default bg-bg-base">
            <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-text-secondary">
              {getProviderPatientInitials(name)}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="text-base font-bold text-text-primary">{name}</p>
              <span
                className={cn(
                  "rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                  isActive
                    ? "border-state-success/20 bg-state-success/10 text-state-success"
                    : "border-border-default bg-bg-base text-text-secondary",
                )}
              >
                {isActive ? "Active Treatment" : "Discharged"}
              </span>
            </div>
            <p className="mt-0.5 text-xs text-text-secondary">
              {age} Yrs • {gender}
            </p>
            <span className="mt-1.5 inline-block w-max rounded border border-border-default bg-bg-base px-2 py-0.5 font-mono text-[10px] text-text-secondary">
              {id}
            </span>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs text-text-secondary">
            Last Appointment:{" "}
            <span className="font-medium text-text-primary">
              {formatProviderPatientLastVisit(lastVisit)}
            </span>
          </p>
          <span className="mt-2 inline-block w-max rounded-md border border-accent-primary/10 bg-accent-primary/5 px-2.5 py-1 text-xs font-semibold text-text-primary">
            {diagnosis}
          </span>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-2 border-t border-border-default pt-4">
        <button
          type="button"
          className="cursor-pointer px-3 py-2 text-xs font-medium text-text-secondary transition-all hover:text-text-primary"
          onClick={() =>
            showWarningToast(
              "Medical history will be available after database integration.",
            )
          }
        >
          View Medical History
        </button>
        <PatientViewDetailsButton patient={patient} />
      </div>
    </article>
  );
}
