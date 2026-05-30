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

import type { DoctorFilterState } from "@/hooks/use-doctor-filters";
import { buildDoctorFiltersQuery } from "@/lib/doctors/parse-search-params";

interface DoctorFiltersContextValue extends DoctorFilterState {
  setSearch: (value: string) => void;
  setSpecialty: (value: string) => void;
  setPage: (value: number) => void;
}

const DoctorFiltersContext = createContext<DoctorFiltersContextValue | null>(
  null,
);

interface DoctorFiltersProviderProps {
  initialFilters: DoctorFilterState;
  children: ReactNode;
}

export function DoctorFiltersProvider({
  initialFilters,
  children,
}: DoctorFiltersProviderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      setFilters({
        search: params.get("search") ?? "",
        specialty: params.get("specialty") ?? "",
        page: Math.max(
          1,
          Number.parseInt(params.get("page") ?? "1", 10) || 1,
        ),
      });
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const pushFilters = useCallback(
    (next: DoctorFilterState) => {
      setFilters(next);
      const query = buildDoctorFiltersQuery(next);
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
    (value: string) => {
      pushFilters({ ...filters, specialty: value, page: 1 });
    },
    [filters, pushFilters],
  );

  const setPage = useCallback(
    (value: number) => {
      pushFilters({ ...filters, page: value });
    },
    [filters, pushFilters],
  );

  const value = useMemo<DoctorFiltersContextValue>(
    () => ({
      ...filters,
      setSearch,
      setSpecialty,
      setPage,
    }),
    [filters, setSearch, setSpecialty, setPage],
  );

  return (
    <DoctorFiltersContext.Provider value={value}>
      {children}
    </DoctorFiltersContext.Provider>
  );
}

export function useDoctorFilters() {
  const context = useContext(DoctorFiltersContext);
  if (!context) {
    throw new Error("useDoctorFilters must be used within DoctorFiltersProvider");
  }
  return context;
}
