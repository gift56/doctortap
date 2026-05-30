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
      href={`/doctor/${doctor.id}`}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border-default bg-bg-base transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-md",
        className,
      )}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-bg-surface">
        <Image
          src={doctor.avatarUrl}
          alt={doctor.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="space-y-1.5 p-4">
        <p className="flex items-center gap-1.5 text-xs font-medium text-state-success">
          <span className="text-sm leading-none" aria-hidden>
            ●
          </span>
          {doctor.availabilityStatus}
        </p>
        <p className="font-semibold text-text-primary">Dr. {doctor.name}</p>
        <p className="text-sm text-text-muted">{doctor.specialty}</p>
      </div>
    </Link>
  );
}
