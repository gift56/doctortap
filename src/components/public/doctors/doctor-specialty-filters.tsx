"use client";

import { SPECIALTIES } from "@/config/mock-data";
import { useDoctorFilters } from "@/components/public/doctors/doctor-filters-provider";
import { cn } from "@/lib/utils";

interface DoctorSpecialtyFiltersProps {
  layout: "sidebar" | "mobile";
}

function SpecialtyOption({
  label,
  isActive,
  onSelect,
}: {
  label: string;
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "cursor-pointer select-none rounded-md border border-border-default bg-bg-surface px-4 py-3 text-sm text-text-primary transition-all hover:border-accent-primary",
        isActive &&
          "border-accent-primary bg-accent-primary font-medium text-white shadow-md",
      )}
    >
      {label}
    </button>
  );
}

export function DoctorSpecialtyFilters({
  layout,
}: DoctorSpecialtyFiltersProps) {
  const { specialty, setSpecialty } = useDoctorFilters();

  const options = [
    { slug: "", label: "All Specialties" },
    ...SPECIALTIES.map((item) => ({ slug: item.slug, label: item.name })),
  ];

  if (layout === "mobile") {
    return (
      <div
        className="mb-4 flex gap-2 overflow-x-auto py-2 whitespace-nowrap snap-x no-scrollbar md:hidden"
        role="group"
        aria-label="Filter by specialty"
      >
        {options.map((option) => (
          <div key={option.slug || "all"} className="shrink-0 snap-start">
            <SpecialtyOption
              label={option.label}
              isActive={specialty === option.slug}
              onSelect={() => setSpecialty(option.slug)}
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <aside
      className="hidden flex-col gap-2 md:flex"
      aria-label="Filter by specialty"
    >
      {options.map((option) => (
        <SpecialtyOption
          key={option.slug || "all"}
          label={option.label}
          isActive={specialty === option.slug}
          onSelect={() => setSpecialty(option.slug)}
        />
      ))}
    </aside>
  );
}
