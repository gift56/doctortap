"use client";

import Image from "next/image";
import type { ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { AdminDoctorDetailProfile } from "@/lib/admin/admin-doctors";
import {
  ADMIN_DOCTOR_CURRENCY_SYMBOL,
  formatAdminDoctorStatus,
} from "@/lib/admin/admin-doctors";
import { cn } from "@/lib/utils";

interface AdminDoctorDetailsDrawerProps {
  doctor: AdminDoctorDetailProfile | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const activeBadgeClassName =
  "rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700";

const suspendedBadgeClassName =
  "rounded-full border border-red-200 bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700";

function statusBadgeClassName(status: AdminDoctorDetailProfile["status"]) {
  return status === "ACTIVE" ? activeBadgeClassName : suspendedBadgeClassName;
}

export function AdminDoctorDetailsDrawer({
  doctor,
  open,
  onOpenChange,
}: AdminDoctorDetailsDrawerProps) {
  if (!doctor) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="fixed top-0 right-0 left-auto flex h-svh max-h-svh w-full max-w-md translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-none border-y-0 border-r-0 border-l border-border-default bg-white p-0 shadow-xl data-open:slide-in-from-right data-closed:slide-out-to-right sm:max-w-md"
      >
        <DialogHeader className="shrink-0 space-y-0 border-b border-border-default px-4 py-4 text-left sm:px-6">
          <DialogTitle className="text-lg font-bold text-text-primary">
            {doctor.name}
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            {doctor.id} • {doctor.specialty}
          </DialogDescription>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-6">
          <div className="space-y-6">
            <section className="space-y-3">
              <SectionHeading>Doctor profile</SectionHeading>
              <div className="rounded-xl border border-border-default bg-white p-4 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border-default bg-bg-base">
                    <Image
                      src={doctor.avatarUrl}
                      alt={doctor.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="text-sm font-bold text-text-primary">
                      {doctor.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {doctor.specialty} • {doctor.yearsOfExperience} years
                      experience
                    </p>
                    <p className="text-xs font-medium text-text-primary">
                      Base fee: {ADMIN_DOCTOR_CURRENCY_SYMBOL}{" "}
                      {doctor.baseConsultationFee}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">
                  {doctor.bio}
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <SectionHeading>Core profile</SectionHeading>
              <div className="grid grid-cols-1 gap-3">
                <DetailField label="Doctor ID" value={doctor.id} />
                <DetailField
                  label="Medical Council ID"
                  value={doctor.councilId}
                />
                <DetailField label="Consult Fee" value={doctor.fee} />
                <DetailField label="Email" value={doctor.email} />
                <DetailField label="Phone" value={doctor.phone} />
                <DetailField
                  label="Experience"
                  value={`${doctor.yearsOfExperience} years`}
                />
                <DetailField
                  label="Account Status"
                  value={
                    <span
                      className={cn(
                        "inline-flex",
                        statusBadgeClassName(doctor.status),
                      )}
                    >
                      {formatAdminDoctorStatus(doctor.status)}
                    </span>
                  }
                />
              </div>
            </section>

            <section className="space-y-3">
              <SectionHeading>Credential records</SectionHeading>
              <ul className="space-y-2 rounded-lg border border-border-default bg-white p-3">
                {doctor.credentials.map((credential) => (
                  <li key={credential} className="text-sm text-text-primary">
                    {credential}
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <SectionHeading>Historic patient sessions</SectionHeading>
              <div className="space-y-2">
                {doctor.sessions.map((session) => (
                  <div
                    key={session.id}
                    className="rounded-lg border border-border-default bg-white px-3 py-2.5"
                  >
                    <p className="text-sm font-semibold text-text-primary">
                      {session.patient}
                    </p>
                    <p className="mt-1 text-xs text-text-secondary">
                      {session.id} • {session.schedule}
                    </p>
                    <p className="mt-1 text-xs font-medium text-text-primary">
                      {session.fee}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
      {children}
    </h3>
  );
}

function DetailField({
  label,
  value,
}: {
  label: string;
  value: ReactNode;
}) {
  return (
    <div className="rounded-lg border border-border-default bg-white px-3 py-2.5">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </p>
      <div className="mt-1 text-sm font-medium text-text-primary">{value}</div>
    </div>
  );
}
