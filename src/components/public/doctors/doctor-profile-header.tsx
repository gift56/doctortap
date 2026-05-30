import Image from "next/image";
import { BadgeCheck, Info } from "lucide-react";

import type { Doctor } from "@/config/mock-data";
import { formatAppointmentFee } from "@/lib/doctors/format-appointment-fee";

interface DoctorProfileHeaderProps {
  doctor: Doctor;
}

export function DoctorProfileHeader({ doctor }: DoctorProfileHeaderProps) {
  return (
    <article className="grid grid-cols-1 items-start gap-6 rounded-xl border border-border-default bg-bg-surface p-6 md:grid-cols-4">
      <div className="aspect-square overflow-hidden rounded-xl bg-accent-primary p-1 md:col-span-1">
        <div className="relative h-full w-full overflow-hidden rounded-lg bg-bg-base">
          <Image
            src={doctor.avatarUrl}
            alt={`Dr. ${doctor.name}`}
            fill
            sizes="(max-width: 768px) 100vw, 256px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="space-y-4 md:col-span-3">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Dr. {doctor.name}
          </h1>
          {doctor.verified ? (
            <BadgeCheck
              aria-label="Verified practitioner"
              className="h-5 w-5 shrink-0 text-state-success"
            />
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-sm text-text-muted">
          <span>{doctor.credentials}</span>
          <span
            aria-hidden
            className="hidden h-1 w-1 rounded-full bg-border-default sm:inline-block"
          />
          <span className="inline-flex items-center rounded-full border border-border-default bg-bg-base px-3 py-1 text-xs font-medium text-text-primary">
            {doctor.experienceYears} Years
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-text-primary">
            <Info aria-hidden className="h-4 w-4 text-text-muted" />
            About
          </h2>
          <p className="text-left text-sm leading-relaxed text-text-muted">
            {doctor.biography}
          </p>
        </div>

        <p className="text-sm font-semibold text-text-primary">
          Appointment fee:{" "}
          <span className="font-bold text-accent-primary">
            {formatAppointmentFee(doctor.appointmentFee)}
          </span>
        </p>
      </div>
    </article>
  );
}
