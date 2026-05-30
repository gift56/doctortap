import { DoctorCard } from "@/components/doctor-card";
import type { Doctor } from "@/config/mock-data";

interface DoctorRelatedDoctorsProps {
  doctors: Doctor[];
}

export function DoctorRelatedDoctors({ doctors }: DoctorRelatedDoctorsProps) {
  if (doctors.length === 0) {
    return null;
  }

  return (
    <section className="space-y-8 pb-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
          Related Doctors
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <ul className="flex gap-6 overflow-x-auto pb-2 no-scrollbar sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-3 xl:grid-cols-5">
        {doctors.map((doctor) => (
          <li key={doctor.id} className="w-56 shrink-0 sm:w-auto">
            <DoctorCard doctor={doctor} />
          </li>
        ))}
      </ul>
    </section>
  );
}
