import type { AdminVerificationFilterState } from "@/hooks/use-admin-verification-filters";
import type { AdminVerificationSort } from "@/lib/admin/admin-verification";

const SORT_VALUES: AdminVerificationSort[] = [
  "submitted-desc",
  "submitted-asc",
  "name",
];

function parsePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function parseSort(value: string | undefined): AdminVerificationSort {
  if (value && SORT_VALUES.includes(value as AdminVerificationSort)) {
    return value as AdminVerificationSort;
  }
  return "submitted-desc";
}

export function parseAdminVerificationFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): AdminVerificationFilterState {
  return {
    search: typeof params.search === "string" ? params.search : "",
    specialty:
      typeof params.specialty === "string" && params.specialty !== "all"
        ? params.specialty
        : "all",
    sort: parseSort(typeof params.sort === "string" ? params.sort : undefined),
    page: parsePage(typeof params.page === "string" ? params.page : undefined),
  };
}

export function buildAdminVerificationFiltersQuery(
  filters: AdminVerificationFilterState,
): string {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set("search", filters.search.trim());
  }
  if (filters.specialty !== "all") {
    params.set("specialty", filters.specialty);
  }
  if (filters.sort !== "submitted-desc") {
    params.set("sort", filters.sort);
  }
  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  return params.toString();
}
