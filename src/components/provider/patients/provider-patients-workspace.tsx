"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo } from "react";

import { PatientCard } from "@/components/provider/patients/patient-card";
import {
  ProviderPatientFiltersProvider,
  useProviderPatientFilters,
} from "@/components/provider/patients/provider-patient-filters-provider";
import { ProviderPatientsCharts } from "@/components/provider/patients/provider-patients-charts";
import { ProviderPatientsPagination } from "@/components/provider/patients/provider-patients-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ProviderPatientFilterState } from "@/hooks/use-provider-patient-filters";
import {
  MOCK_PROVIDER_PATIENTS,
  filterAndSortProviderPatients,
  paginateProviderPatients,
  type ProviderPatientSort,
  type ProviderPatientStatusFilter,
} from "@/lib/provider/provider-patients";

const SORT_OPTIONS: { value: ProviderPatientSort; label: string }[] = [
  { value: "recent", label: "Sort By: Recent Activity" },
  { value: "name", label: "Name A-Z" },
  { value: "visits", label: "Total Visits" },
];

const STATUS_OPTIONS: {
  value: ProviderPatientStatusFilter;
  label: string;
}[] = [
  { value: "all", label: "All Statuses" },
  { value: "active", label: "Active Treatment" },
  { value: "discharged", label: "Discharged" },
];

function getSortLabel(value: ProviderPatientSort): string {
  return SORT_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function getStatusLabel(value: ProviderPatientStatusFilter): string {
  return STATUS_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

interface ProviderPatientsWorkspaceProps {
  initialFilters: ProviderPatientFilterState;
}

function ProviderPatientsWorkspaceContent() {
  const { search, sort, status, page, setSearch, setSort, setStatus, setPage } =
    useProviderPatientFilters();

  const filteredPatients = useMemo(
    () =>
      filterAndSortProviderPatients(
        MOCK_PROVIDER_PATIENTS,
        search,
        sort,
        status,
      ),
    [search, sort, status],
  );

  const { items, totalPages, currentPage } = useMemo(
    () => paginateProviderPatients(filteredPatients, page),
    [filteredPatients, page],
  );

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [currentPage, page, setPage]);

  return (
    <>
      <ProviderPatientsCharts />

      <div className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-border-default bg-bg-surface p-4 shadow-sm sm:flex-row">
        <div className="relative w-full sm:w-96">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-secondary"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search patients by name, ID, or condition..."
            className="w-full rounded-lg border border-border-default bg-bg-base py-2 pr-4 pl-10 text-sm transition-all focus:border-accent-primary focus:outline-none"
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Select
            value={sort}
            onValueChange={(value) => {
              if (value) setSort(value as ProviderPatientSort);
            }}
          >
            <SelectTrigger className="h-10 w-full min-w-48 border-border-default bg-bg-base text-sm text-text-primary sm:w-52">
              <SelectValue className="capitalize">
                {getSortLabel(sort)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="capitalize"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={status}
            onValueChange={(value) => {
              if (value) {
                setStatus(value as ProviderPatientStatusFilter);
              }
            }}
          >
            <SelectTrigger className="h-10 w-full min-w-48 border-border-default bg-bg-base text-sm text-text-primary sm:w-48">
              <SelectValue className="capitalize">
                {getStatusLabel(status)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="capitalize"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {items.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      ) : (
        <p className="mt-6 text-center text-sm text-text-secondary">
          No patients match your current search or filter settings.
        </p>
      )}

      <ProviderPatientsPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </>
  );
}

export function ProviderPatientsWorkspace({
  initialFilters,
}: ProviderPatientsWorkspaceProps) {
  return (
    <ProviderPatientFiltersProvider initialFilters={initialFilters}>
      <ProviderPatientsWorkspaceContent />
    </ProviderPatientFiltersProvider>
  );
}
