"use client";

import { useEffect, useMemo } from "react";

import { DoctorCard } from "@/components/doctor-card";
import {
  DoctorFiltersProvider,
  useDoctorFilters,
} from "@/components/public/doctors/doctor-filters-provider";
import { DoctorSearchInput } from "@/components/public/doctors/doctor-search-input";
import { DoctorSpecialtyFilters } from "@/components/public/doctors/doctor-specialty-filters";
import { DoctorsPaginationToolbar } from "@/components/public/doctors/doctors-pagination-toolbar";
import { DOCTORS } from "@/config/mock-data";
import type { DoctorFilterState } from "@/hooks/use-doctor-filters";
import {
  DOCTORS_PAGE_SIZE,
  filterDoctors,
  paginateDoctors,
} from "@/lib/doctors/filter-doctors";

interface DoctorsDirectoryProps {
  initialFilters: DoctorFilterState;
}

function DoctorsDirectoryContent() {
  const { search, specialty, page, setPage } = useDoctorFilters();

  const filtered = useMemo(
    () => filterDoctors(DOCTORS, { search, specialty }),
    [search, specialty],
  );

  const { items, totalPages, currentPage } = useMemo(
    () => paginateDoctors(filtered, page, DOCTORS_PAGE_SIZE),
    [filtered, page],
  );

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [currentPage, page, setPage]);

  return (
    <section className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-8 px-4 py-8 sm:px-6 md:grid-cols-4">
      <DoctorSpecialtyFilters layout="mobile" />

      <DoctorSpecialtyFilters layout="sidebar" />

      <div className="space-y-6 md:col-span-3">
        <DoctorSearchInput />

        {items.length > 0 ? (
          <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((doctor) => (
              <li key={doctor.id}>
                <DoctorCard doctor={doctor} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-xl border border-border-default bg-bg-surface px-4 py-10 text-center text-sm text-text-muted">
            No doctors match your search. Try another specialty or search term.
          </p>
        )}

        <DoctorsPaginationToolbar
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </section>
  );
}

export function DoctorsDirectory({ initialFilters }: DoctorsDirectoryProps) {
  return (
    <DoctorFiltersProvider initialFilters={initialFilters}>
      <DoctorsDirectoryContent />
    </DoctorFiltersProvider>
  );
}
