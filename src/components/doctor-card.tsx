import Image from "next/image";
import Link from "next/link";

import type { Doctor } from "@/config/mock-data";
import { cn } from "@/lib/utils";

interface DoctorCardProps {
  doctor: Doctor;
  className?: string;
}

export function DoctorCard({ doctor, className }: DoctorCardProps) {
  return (
    <Link
      href={`/doctors/${doctor.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border-default bg-bg-base transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-border-default">
        <Image
          src={doctor.avatarUrl}
          alt={doctor.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 inline-flex items-center gap-1 rounded-full bg-bg-base/80 px-2 py-1 text-xs font-semibold text-state-success backdrop-blur-sm">
          <span aria-hidden>●</span>
          {doctor.availabilityStatus}
        </span>
      </div>
      <div className="px-2 pb-4">
        <p className="mt-3 text-lg font-bold tracking-tight text-text-primary">
          Dr. {doctor.name}
        </p>
        <p className="mt-1 px-0 text-sm text-text-muted">{doctor.specialty}</p>
      </div>
    </Link>
  );
}
