"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";

import type { AdminAppointmentFilterState } from "@/hooks/use-admin-appointment-filters";
import {
  buildAdminAppointmentFiltersQuery,
  parseAdminAppointmentFiltersFromSearchParams,
} from "@/lib/admin/parse-appointment-filters";

interface AdminAppointmentsFiltersContextValue
  extends AdminAppointmentFilterState {
  setStatus: (value: AdminAppointmentFilterState["status"]) => void;
  setTier: (value: AdminAppointmentFilterState["tier"]) => void;
  setPage: (value: number) => void;
}

const AdminAppointmentsFiltersContext =
  createContext<AdminAppointmentsFiltersContextValue | null>(null);

interface AdminAppointmentsFiltersProviderProps {
  initialFilters: AdminAppointmentFilterState;
  children: ReactNode;
}

export function AdminAppointmentsFiltersProvider({
  initialFilters,
  children,
}: AdminAppointmentsFiltersProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setFilters(
        parseAdminAppointmentFiltersFromSearchParams(
          Object.fromEntries(params.entries()),
        ),
      );
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const pushFilters = useCallback(
    (next: AdminAppointmentFilterState) => {
      setFilters(next);
      const query = buildAdminAppointmentFiltersQuery(next);
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const setStatus = useCallback(
    (value: AdminAppointmentFilterState["status"]) => {
      pushFilters({ ...filters, status: value, page: 1 });
    },
    [filters, pushFilters],
  );

  const setTier = useCallback(
    (value: AdminAppointmentFilterState["tier"]) => {
      pushFilters({ ...filters, tier: value, page: 1 });
    },
    [filters, pushFilters],
  );

  const setPage = useCallback(
    (value: number) => {
      pushFilters({ ...filters, page: value });
    },
    [filters, pushFilters],
  );

  const value = useMemo<AdminAppointmentsFiltersContextValue>(
    () => ({
      ...filters,
      setStatus,
      setTier,
      setPage,
    }),
    [filters, setStatus, setTier, setPage],
  );

  return (
    <AdminAppointmentsFiltersContext.Provider value={value}>
      {children}
    </AdminAppointmentsFiltersContext.Provider>
  );
}

export function useAdminAppointmentsFilters() {
  const context = useContext(AdminAppointmentsFiltersContext);
  if (!context) {
    throw new Error(
      "useAdminAppointmentsFilters must be used within AdminAppointmentsFiltersProvider",
    );
  }
  return context;
}
