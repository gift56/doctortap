import type { DoctorFilterState } from "@/hooks/use-doctor-filters";
import { SPECIALTIES } from "@/config/mock-data";

function parsePage(value: string | undefined): number {
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function parseDoctorFiltersFromSearchParams(
  params: Record<string, string | string[] | undefined>,
): DoctorFilterState {
  const search = typeof params.search === "string" ? params.search : "";
  const specialty =
    typeof params.specialty === "string" ? params.specialty : "";
  const page = parsePage(
    typeof params.page === "string" ? params.page : undefined,
  );

  return { search, specialty, page };
}

export function getSpecialtyLabel(slug: string): string | undefined {
  return SPECIALTIES.find((item) => item.slug === slug)?.name;
}

export function buildDoctorFiltersQuery(
  filters: DoctorFilterState,
): string {
  const params = new URLSearchParams();

  if (filters.search.trim()) {
    params.set("search", filters.search.trim());
  }
  if (filters.specialty) {
    params.set("specialty", filters.specialty);
  }
  if (filters.page > 1) {
    params.set("page", String(filters.page));
  }

  return params.toString();
}
