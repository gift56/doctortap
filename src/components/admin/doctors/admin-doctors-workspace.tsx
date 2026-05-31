"use client";

import { Plus, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo } from "react";

import { AdminDoctorsPagination } from "@/components/admin/doctors/admin-doctors-pagination";
import { AdminDoctorsTable } from "@/components/admin/doctors/admin-doctors-table";
import {
  AdminDoctorsFiltersProvider,
  useAdminDoctorsFilters,
} from "@/components/admin/doctors/admin-doctors-filters-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import type { AdminDoctorFilterState } from "@/hooks/use-admin-doctor-filters";
import {
  filterAdminDoctors,
  MOCK_ADMIN_DOCTORS,
  paginateAdminDoctors,
} from "@/lib/admin/admin-doctors";

const SPECIALTY_OPTIONS: {
  value: AdminDoctorFilterState["specialty"];
  label: string;
}[] = [
  { value: "all", label: "All Specialties" },
  { value: "general-physician", label: "General Physician" },
  { value: "cardiologist", label: "Cardiologist" },
];

const STATUS_OPTIONS: {
  value: AdminDoctorFilterState["status"];
  label: string;
}[] = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active" },
  { value: "suspended", label: "Suspended" },
];

function getSpecialtyLabel(value: AdminDoctorFilterState["specialty"]): string {
  return (
    SPECIALTY_OPTIONS.find((option) => option.value === value)?.label ?? value
  );
}

function getStatusLabel(value: AdminDoctorFilterState["status"]): string {
  return STATUS_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

interface AdminDoctorsWorkspaceProps {
  initialFilters: AdminDoctorFilterState;
}

function AdminDoctorsWorkspaceContent() {
  const { search, specialty, status, page, setSearch, setSpecialty, setStatus, setPage } =
    useAdminDoctorsFilters();

  const filteredDoctors = useMemo(
    () => filterAdminDoctors(MOCK_ADMIN_DOCTORS, search, specialty, status),
    [search, specialty, status],
  );

  const { items, totalPages, currentPage, rangeStart, rangeEnd, total } =
    useMemo(
      () => paginateAdminDoctors(filteredDoctors, page),
      [filteredDoctors, page],
    );

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [currentPage, page, setPage]);

  return (
    <>
      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border-default bg-white p-3 shadow-sm sm:mt-6 sm:gap-4 sm:p-4">
        <div className="flex w-full justify-end">
          <Link
            href={ADMIN_ROUTES.doctorsNew}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent-primary px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90 sm:ml-auto sm:w-max"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Add Doctor Account
          </Link>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-80">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-secondary"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search doctors by name or ID..."
              className="w-full rounded-md border border-border-default bg-bg-base py-1.5 pr-4 pl-9 text-xs focus:border-accent-primary focus:outline-none"
            />
          </div>

          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Select
              value={specialty}
              onValueChange={(value) => {
                if (value) {
                  setSpecialty(value as AdminDoctorFilterState["specialty"]);
                }
              }}
            >
              <SelectTrigger className="h-9 w-full min-w-40 border-border-default bg-bg-base text-xs font-medium text-text-primary sm:w-44">
                <SelectValue>{getSpecialtyLabel(specialty)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {SPECIALTY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={status}
              onValueChange={(value) => {
                if (value) {
                  setStatus(value as AdminDoctorFilterState["status"]);
                }
              }}
            >
              <SelectTrigger className="h-9 w-full min-w-40 border-border-default bg-bg-base text-xs font-medium text-text-primary sm:w-44">
                <SelectValue>{getStatusLabel(status)}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-border-default bg-white shadow-sm">
        <AdminDoctorsTable doctors={items} />
        <AdminDoctorsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          total={total}
          filters={{ search, specialty, status }}
        />
      </div>
    </>
  );
}

export function AdminDoctorsWorkspace({
  initialFilters,
}: AdminDoctorsWorkspaceProps) {
  return (
    <AdminDoctorsFiltersProvider initialFilters={initialFilters}>
      <AdminDoctorsWorkspaceContent />
    </AdminDoctorsFiltersProvider>
  );
}
