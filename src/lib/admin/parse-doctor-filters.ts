import type {
  AdminDoctorFilterState,
  AdminDoctorSpecialtyFilter,
  AdminDoctorStatusFilter,
} from "@/hooks/use-admin-doctor-filters";

const SPECIALTY_VALUES: AdminDoctorSpecialtyFilter[] = [
  "all",
  "general-physician",
  "cardiologist",
];

const STATUS_VALUES: AdminDoctorStatusFilter[] = ["all", "active", "suspended"];

function parsePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function parseSpecialty(
  value: string | undefined,
): AdminDoctorSpecialtyFilter {
  if (
    value &&
    SPECIALTY_VALUES.includes(value as AdminDoctorSpecialtyFilter)
  ) {
    return value as AdminDoctorSpecialtyFilter;
  }
  return "all";
}

function parseStatus(value: string | undefined): AdminDoctorStatusFilter {
  if (value && STATUS_VALUES.includes(value as AdminDoctorStatusFilter)) {
    return value as AdminDoctorStatusFilter;
  }
  return "all";
}

export function parseAdminDoctorFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): AdminDoctorFilterState {
  return {
    search: typeof params.search === "string" ? params.search : "",
    specialty: parseSpecialty(
      typeof params.specialty === "string" ? params.specialty : undefined,
    ),
    status: parseStatus(
      typeof params.status === "string" ? params.status : undefined,
    ),
    page: parsePage(typeof params.page === "string" ? params.page : undefined),
  };
}

export function buildAdminDoctorFiltersQuery(
  filters: AdminDoctorFilterState,
): string {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set("search", filters.search.trim());
  }
  if (filters.specialty !== "all") {
    params.set("specialty", filters.specialty);
  }
  if (filters.status !== "all") {
    params.set("status", filters.status);
  }
  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  return params.toString();
}
