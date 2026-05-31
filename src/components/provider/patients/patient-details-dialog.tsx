"use client";

import { useState } from "react";

import { BaseChart } from "@/components/base-chart/base-chart";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { getProviderPatientChartData } from "@/lib/provider/provider-patient-charts";
import {
  formatProviderPatientLastVisit,
  getProviderPatientInitials,
  type ProviderPatient,
} from "@/lib/provider/provider-patients";
import { cn } from "@/lib/utils";

interface PatientDetailsDialogProps {
  patient: ProviderPatient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PatientDetailsDialog({
  patient,
  open,
  onOpenChange,
}: PatientDetailsDialogProps) {
  const charts = getProviderPatientChartData(patient);
  const isActive = patient.status === "ACTIVE";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-3xl">
        <DialogHeader>
          <div className="flex items-start gap-3 pr-8">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border-default bg-bg-base text-sm font-semibold text-text-secondary">
              {getProviderPatientInitials(patient.name)}
            </div>
            <div className="min-w-0">
              <DialogTitle className="text-lg font-bold text-text-primary">
                {patient.name}
              </DialogTitle>
              <DialogDescription className="mt-1 text-text-secondary">
                {patient.id} • Last visit{" "}
                {formatProviderPatientLastVisit(patient.lastVisit)}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-md border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide",
              isActive
                ? "border-state-success/20 bg-state-success/10 text-state-success"
                : "border-border-default bg-bg-base text-text-secondary",
            )}
          >
            {isActive ? "Active Treatment" : "Discharged"}
          </span>
          <span className="rounded-md border border-accent-primary/10 bg-accent-primary/5 px-2.5 py-1 text-xs font-semibold text-text-primary">
            {patient.diagnosis}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <BaseChart
            type="line"
            title="Visit Trend (6 months)"
            data={charts.visitTrend}
            valueFormatter={(value) => `${value} visits`}
          />
          <BaseChart
            type="bar"
            title="Latest Vitals Index"
            data={charts.vitalsTrend}
            valueFormatter={(value) => `${value}`}
          />
          <BaseChart
            type="pie"
            title="Care Activity Mix"
            data={charts.careMix}
            className="md:col-span-2"
            valueFormatter={(value) => `${value} sessions`}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface PatientViewDetailsButtonProps {
  patient: ProviderPatient;
}

export function PatientViewDetailsButton({
  patient,
}: PatientViewDetailsButtonProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="cursor-pointer rounded-md bg-accent-primary px-4 py-2 text-xs font-medium text-white transition-all hover:opacity-90"
        onClick={() => setOpen(true)}
      >
        View Details
      </button>
      <PatientDetailsDialog
        patient={patient}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  );
}
