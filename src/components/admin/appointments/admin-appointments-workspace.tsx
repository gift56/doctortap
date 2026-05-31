"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";

import { AdminAppointmentsPagination } from "@/components/admin/appointments/admin-appointments-pagination";
import { AdminAppointmentsTable } from "@/components/admin/appointments/admin-appointments-table";
import {
  AdminAppointmentsFiltersProvider,
  useAdminAppointmentsFilters,
} from "@/components/admin/appointments/admin-appointments-filters-provider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AdminAppointmentFilterState } from "@/hooks/use-admin-appointment-filters";
import {
  filterAdminAppointments,
  MOCK_ADMIN_APPOINTMENTS,
  paginateAdminAppointments,
} from "@/lib/admin/admin-appointments";

const STATUS_OPTIONS: {
  value: AdminAppointmentFilterState["status"];
  label: string;
}[] = [
  { value: "all", label: "All Statuses" },
  { value: "completed", label: "Completed" },
  { value: "pending", label: "Pending" },
  { value: "cancelled", label: "Cancelled" },
];

const TIER_OPTIONS: {
  value: AdminAppointmentFilterState["tier"];
  label: string;
}[] = [
  { value: "all", label: "All Tiers" },
  { value: "regular", label: "Regular" },
  { value: "vip", label: "VIP" },
  { value: "premium", label: "Premium" },
];

function getStatusLabel(value: AdminAppointmentFilterState["status"]): string {
  return STATUS_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function getTierLabel(value: AdminAppointmentFilterState["tier"]): string {
  return TIER_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

function scrollAdminMainToTop() {
  document.getElementById("admin-main-content")?.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

interface AdminAppointmentsWorkspaceProps {
  initialFilters: AdminAppointmentFilterState;
}

function AdminAppointmentsWorkspaceContent() {
  const { status, tier, page, setStatus, setTier, setPage } =
    useAdminAppointmentsFilters();
  const previousPageRef = useRef(page);

  const filteredAppointments = useMemo(
    () => filterAdminAppointments(MOCK_ADMIN_APPOINTMENTS, status, tier),
    [status, tier],
  );

  const { items, totalPages, currentPage, rangeStart, rangeEnd, total } =
    useMemo(
      () => paginateAdminAppointments(filteredAppointments, page),
      [filteredAppointments, page],
    );

  useEffect(() => {
    if (currentPage !== page) {
      setPage(currentPage);
    }
  }, [currentPage, page, setPage]);

  useEffect(() => {
    if (previousPageRef.current !== page) {
      scrollAdminMainToTop();
      previousPageRef.current = page;
    }
  }, [page]);

  const handlePageNavigate = useCallback(() => {
    scrollAdminMainToTop();
  }, []);

  return (
    <>
      <div
        className="mt-6 flex flex-col items-center justify-between gap-4 rounded-xl border border-border-default bg-white p-4 shadow-sm sm:flex-row"
        id="appointment-filter-context"
      >
        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
          <Select
            value={status}
            onValueChange={(value) => {
              if (value) {
                setStatus(value as AdminAppointmentFilterState["status"]);
              }
            }}
          >
            <SelectTrigger className="h-10 w-full min-w-40 border-border-default bg-bg-base text-xs font-medium text-text-primary sm:w-44">
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

          <Select
            value={tier}
            onValueChange={(value) => {
              if (value) {
                setTier(value as AdminAppointmentFilterState["tier"]);
              }
            }}
          >
            <SelectTrigger className="h-10 w-full min-w-40 border-border-default bg-bg-base text-xs font-medium text-text-primary sm:w-44">
              <SelectValue>{getTierLabel(tier)}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {TIER_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-xl border border-border-default bg-white shadow-sm">
        <AdminAppointmentsTable appointments={items} />
        <AdminAppointmentsPagination
          currentPage={currentPage}
          totalPages={totalPages}
          rangeStart={rangeStart}
          rangeEnd={rangeEnd}
          total={total}
          filters={{ status, tier }}
          onPageNavigate={handlePageNavigate}
        />
      </div>
    </>
  );
}

export function AdminAppointmentsWorkspace({
  initialFilters,
}: AdminAppointmentsWorkspaceProps) {
  return (
    <AdminAppointmentsFiltersProvider initialFilters={initialFilters}>
      <AdminAppointmentsWorkspaceContent />
    </AdminAppointmentsFiltersProvider>
  );
}
