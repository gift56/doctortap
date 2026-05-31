import type { ProviderPatientFilterState } from "@/hooks/use-provider-patient-filters";
import type {
  ProviderPatientSort,
  ProviderPatientStatusFilter,
} from "@/lib/provider/provider-patients";

const SORT_VALUES: ProviderPatientSort[] = ["recent", "name", "visits"];
const STATUS_VALUES: ProviderPatientStatusFilter[] = [
  "all",
  "active",
  "discharged",
];

function parsePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function parseSort(value: string | undefined): ProviderPatientSort {
  if (value && SORT_VALUES.includes(value as ProviderPatientSort)) {
    return value as ProviderPatientSort;
  }
  return "recent";
}

function parseStatus(value: string | undefined): ProviderPatientStatusFilter {
  if (value && STATUS_VALUES.includes(value as ProviderPatientStatusFilter)) {
    return value as ProviderPatientStatusFilter;
  }
  return "all";
}

export function parseProviderPatientFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): ProviderPatientFilterState {
  return {
    search: typeof params.search === "string" ? params.search : "",
    sort: parseSort(typeof params.sort === "string" ? params.sort : undefined),
    status: parseStatus(
      typeof params.status === "string" ? params.status : undefined,
    ),
    page: parsePage(typeof params.page === "string" ? params.page : undefined),
  };
}

export function buildProviderPatientFiltersQuery(
  filters: ProviderPatientFilterState,
): string {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set("search", filters.search.trim());
  }
  if (filters.sort !== "recent") {
    params.set("sort", filters.sort);
  }
  if (filters.status !== "all") {
    params.set("status", filters.status);
  }
  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  return params.toString();
}
