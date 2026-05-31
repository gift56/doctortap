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

import type { AdminDoctorFilterState } from "@/hooks/use-admin-doctor-filters";
import {
  buildAdminDoctorFiltersQuery,
  parseAdminDoctorFiltersFromSearchParams,
} from "@/lib/admin/parse-doctor-filters";

interface AdminDoctorsFiltersContextValue extends AdminDoctorFilterState {
  setSearch: (value: string) => void;
  setSpecialty: (value: AdminDoctorFilterState["specialty"]) => void;
  setStatus: (value: AdminDoctorFilterState["status"]) => void;
  setPage: (value: number) => void;
}

const AdminDoctorsFiltersContext =
  createContext<AdminDoctorsFiltersContextValue | null>(null);

interface AdminDoctorsFiltersProviderProps {
  initialFilters: AdminDoctorFilterState;
  children: ReactNode;
}

export function AdminDoctorsFiltersProvider({
  initialFilters,
  children,
}: AdminDoctorsFiltersProviderProps) {
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
        parseAdminDoctorFiltersFromSearchParams(
          Object.fromEntries(params.entries()),
        ),
      );
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const pushFilters = useCallback(
    (next: AdminDoctorFilterState) => {
      setFilters(next);
      const query = buildAdminDoctorFiltersQuery(next);
      router.push(query ? `${pathname}?${query}` : pathname, { scroll: false });
    },
    [pathname, router],
  );

  const setSearch = useCallback(
    (value: string) => {
      pushFilters({ ...filters, search: value, page: 1 });
    },
    [filters, pushFilters],
  );

  const setSpecialty = useCallback(
    (value: AdminDoctorFilterState["specialty"]) => {
      pushFilters({ ...filters, specialty: value, page: 1 });
    },
    [filters, pushFilters],
  );

  const setStatus = useCallback(
    (value: AdminDoctorFilterState["status"]) => {
      pushFilters({ ...filters, status: value, page: 1 });
    },
    [filters, pushFilters],
  );

  const setPage = useCallback(
    (value: number) => {
      pushFilters({ ...filters, page: value });
    },
    [filters, pushFilters],
  );

  const value = useMemo<AdminDoctorsFiltersContextValue>(
    () => ({
      ...filters,
      setSearch,
      setSpecialty,
      setStatus,
      setPage,
    }),
    [filters, setSearch, setSpecialty, setStatus, setPage],
  );

  return (
    <AdminDoctorsFiltersContext.Provider value={value}>
      {children}
    </AdminDoctorsFiltersContext.Provider>
  );
}

export function useAdminDoctorsFilters() {
  const context = useContext(AdminDoctorsFiltersContext);
  if (!context) {
    throw new Error(
      "useAdminDoctorsFilters must be used within AdminDoctorsFiltersProvider",
    );
  }
  return context;
}
