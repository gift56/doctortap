"use client";

import { Search } from "lucide-react";
import { useEffect, useMemo } from "react";

import { AdminVerificationPagination } from "@/components/admin/verification/admin-verification-pagination";
import { VerificationCard } from "@/components/admin/verification/verification-card";
import {
  AdminVerificationFiltersProvider,
  useAdminVerificationFilters,
} from "@/components/admin/verification/admin-verification-filters-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminVerificationFilterState } from "@/hooks/use-admin-verification-filters";
import {
  ADMIN_VERIFICATION_SPECIALTIES,
  filterAndSortPendingVerifications,
  MOCK_PENDING_VERIFICATIONS,
  paginatePendingVerifications,
  type AdminVerificationSort,
} from "@/lib/admin/admin-verification";

const SORT_OPTIONS: { value: AdminVerificationSort; label: string }[] = [
  { value: "submitted-desc", label: "Sort By: Newest Submission" },
  { value: "submitted-asc", label: "Sort By: Oldest Submission" },
  { value: "name", label: "Name A-Z" },
];

const SPECIALTY_OPTIONS = [
  { value: "all", label: "All Specialties" },
  ...ADMIN_VERIFICATION_SPECIALTIES.map((specialty) => ({
    value: specialty,
    label: specialty,
  })),
];

function getSortLabel(value: AdminVerificationSort): string {
  return SORT_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function getSpecialtyLabel(value: string): string {
  return (
    SPECIALTY_OPTIONS.find((option) => option.value === value)?.label ?? value
  );
}

interface AdminVerificationWorkspaceProps {
  initialFilters: AdminVerificationFilterState;
}

function AdminVerificationWorkspaceContent() {
  const { search, specialty, sort, page, setSearch, setSpecialty, setSort, setPage } =
    useAdminVerificationFilters();

  const filteredRequests = useMemo(
    () =>
      filterAndSortPendingVerifications(
        MOCK_PENDING_VERIFICATIONS,
        search,
        specialty,
        sort,
      ),
    [search, specialty, sort],
  );

  const { items, totalPages, currentPage } = useMemo(
    () => paginatePendingVerifications(filteredRequests, page),
    [filteredRequests, page],
  );

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [currentPage, page, setPage]);

  return (
    <>
      <div className="mt-4 flex flex-col items-center justify-between gap-3 rounded-xl border border-border-default bg-bg-base p-3 shadow-sm sm:mt-6 sm:gap-4 sm:p-4 sm:flex-row">
        <div className="relative w-full sm:w-96">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-text-secondary"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by name, request ID, or council number..."
            className="w-full rounded-lg border border-border-default bg-bg-base py-2 pr-4 pl-10 text-sm transition-all focus:border-accent-primary focus:outline-none"
          />
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Select
            value={specialty}
            onValueChange={(value) => {
              if (value) setSpecialty(value);
            }}
          >
            <SelectTrigger className="h-10 w-full min-w-48 border-border-default bg-bg-base text-sm text-text-primary sm:w-52">
              <SelectValue className="capitalize">
                {getSpecialtyLabel(specialty)}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {SPECIALTY_OPTIONS.map((option) => (
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
            value={sort}
            onValueChange={(value) => {
              if (value) setSort(value as AdminVerificationSort);
            }}
          >
            <SelectTrigger className="h-10 w-full min-w-48 border-border-default bg-bg-base text-sm text-text-primary sm:w-56">
              <SelectValue className="capitalize">{getSortLabel(sort)}</SelectValue>
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
        </div>
      </div>

      <div className="mt-4 space-y-3 sm:mt-6 sm:space-y-4">
        {items.length === 0 ? (
          <p className="rounded-xl border border-border-default bg-bg-base p-6 text-center text-sm text-text-secondary">
            No verification applications match your filters.
          </p>
        ) : (
          items.map((request) => (
            <VerificationCard key={request.id} request={request} />
          ))
        )}
      </div>

      <AdminVerificationPagination
        currentPage={currentPage}
        totalPages={totalPages}
        filters={{ search, specialty, sort }}
      />
    </>
  );
}

export function AdminVerificationWorkspace({
  initialFilters,
}: AdminVerificationWorkspaceProps) {
  return (
    <AdminVerificationFiltersProvider initialFilters={initialFilters}>
      <AdminVerificationWorkspaceContent />
    </AdminVerificationFiltersProvider>
  );
}
