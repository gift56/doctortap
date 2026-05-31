import type {
  AdminAppointmentFilterState,
  AdminAppointmentStatusFilter,
  AdminAppointmentTierFilter,
} from "@/hooks/use-admin-appointment-filters";

const STATUS_VALUES: AdminAppointmentStatusFilter[] = [
  "all",
  "completed",
  "pending",
  "cancelled",
];

const TIER_VALUES: AdminAppointmentTierFilter[] = [
  "all",
  "regular",
  "vip",
  "premium",
];

function parsePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

function parseStatus(value: string | undefined): AdminAppointmentStatusFilter {
  if (value && STATUS_VALUES.includes(value as AdminAppointmentStatusFilter)) {
    return value as AdminAppointmentStatusFilter;
  }
  return "all";
}

function parseTier(value: string | undefined): AdminAppointmentTierFilter {
  if (value && TIER_VALUES.includes(value as AdminAppointmentTierFilter)) {
    return value as AdminAppointmentTierFilter;
  }
  return "all";
}

export function parseAdminAppointmentFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): AdminAppointmentFilterState {
  return {
    status: parseStatus(
      typeof params.status === "string" ? params.status : undefined,
    ),
    tier: parseTier(typeof params.tier === "string" ? params.tier : undefined),
    page: parsePage(typeof params.page === "string" ? params.page : undefined),
  };
}

export function buildAdminAppointmentFiltersQuery(
  filters: AdminAppointmentFilterState,
): string {
  const params = new URLSearchParams();

  if (filters.status !== "all") {
    params.set("status", filters.status);
  }
  if (filters.tier !== "all") {
    params.set("tier", filters.tier);
  }
  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  return params.toString();
}
