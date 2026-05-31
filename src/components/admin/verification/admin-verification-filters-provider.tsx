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

import type { AdminVerificationFilterState } from "@/hooks/use-admin-verification-filters";
import {
  buildAdminVerificationFiltersQuery,
  parseAdminVerificationFiltersFromSearchParams,
} from "@/lib/admin/parse-verification-filters";

interface AdminVerificationFiltersContextValue
  extends AdminVerificationFilterState {
  setSearch: (value: string) => void;
  setSpecialty: (value: string) => void;
  setSort: (value: AdminVerificationFilterState["sort"]) => void;
  setPage: (value: number) => void;
}

const AdminVerificationFiltersContext =
  createContext<AdminVerificationFiltersContextValue | null>(null);

interface AdminVerificationFiltersProviderProps {
  initialFilters: AdminVerificationFilterState;
  children: ReactNode;
}

export function AdminVerificationFiltersProvider({
  initialFilters,
  children,
}: AdminVerificationFiltersProviderProps) {
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
        parseAdminVerificationFiltersFromSearchParams(
          Object.fromEntries(params.entries()),
        ),
      );
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const pushFilters = useCallback(
    (next: AdminVerificationFilterState) => {
      setFilters(next);
      const query = buildAdminVerificationFiltersQuery(next);
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

  const setSort = useCallback(
    (value: AdminVerificationFilterState["sort"]) => {
      pushFilters({ ...filters, sort: value, page: 1 });
    },
    [filters, pushFilters],
  );

  const setPage = useCallback(
    (value: number) => {
      pushFilters({ ...filters, page: value });
    },
    [filters, pushFilters],
  );

  const value = useMemo<AdminVerificationFiltersContextValue>(
    () => ({
      ...filters,
      setSearch,
      setSpecialty,
      setSort,
      setPage,
    }),
    [filters, setSearch, setSpecialty, setSort, setPage],
  );

  return (
    <AdminVerificationFiltersContext.Provider value={value}>
      {children}
    </AdminVerificationFiltersContext.Provider>
  );
}

export function useAdminVerificationFilters() {
  const context = useContext(AdminVerificationFiltersContext);
  if (!context) {
    throw new Error(
      "useAdminVerificationFilters must be used within AdminVerificationFiltersProvider",
    );
  }
  return context;
}
