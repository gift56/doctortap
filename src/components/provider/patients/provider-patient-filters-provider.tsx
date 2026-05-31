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

import type { ProviderPatientFilterState } from "@/hooks/use-provider-patient-filters";
import {
  buildProviderPatientFiltersQuery,
  parseProviderPatientFiltersFromSearchParams,
} from "@/lib/provider/parse-patient-filters";

interface ProviderPatientFiltersContextValue extends ProviderPatientFilterState {
  setSearch: (value: string) => void;
  setSort: (value: ProviderPatientFilterState["sort"]) => void;
  setStatus: (value: ProviderPatientFilterState["status"]) => void;
  setPage: (value: number) => void;
}

const ProviderPatientFiltersContext =
  createContext<ProviderPatientFiltersContextValue | null>(null);

interface ProviderPatientFiltersProviderProps {
  initialFilters: ProviderPatientFilterState;
  children: ReactNode;
}

export function ProviderPatientFiltersProvider({
  initialFilters,
  children,
}: ProviderPatientFiltersProviderProps) {
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
        parseProviderPatientFiltersFromSearchParams(
          Object.fromEntries(params.entries()),
        ),
      );
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const pushFilters = useCallback(
    (next: ProviderPatientFilterState) => {
      setFilters(next);
      const query = buildProviderPatientFiltersQuery(next);
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

  const setSort = useCallback(
    (value: ProviderPatientFilterState["sort"]) => {
      pushFilters({ ...filters, sort: value, page: 1 });
    },
    [filters, pushFilters],
  );

  const setStatus = useCallback(
    (value: ProviderPatientFilterState["status"]) => {
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

  const value = useMemo<ProviderPatientFiltersContextValue>(
    () => ({
      ...filters,
      setSearch,
      setSort,
      setStatus,
      setPage,
    }),
    [filters, setSearch, setSort, setStatus, setPage],
  );

  return (
    <ProviderPatientFiltersContext.Provider value={value}>
      {children}
    </ProviderPatientFiltersContext.Provider>
  );
}

export function useProviderPatientFilters() {
  const context = useContext(ProviderPatientFiltersContext);
  if (!context) {
    throw new Error(
      "useProviderPatientFilters must be used within ProviderPatientFiltersProvider",
    );
  }
  return context;
}
