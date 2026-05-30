import type { Doctor } from "@/config/mock-data";
import { SPECIALTIES } from "@/config/mock-data";

export const DOCTORS_PAGE_SIZE = 6;

export function filterDoctors(
  doctors: Doctor[],
  filters: { search: string; specialty: string },
): Doctor[] {
  const normalizedSearch = filters.search.trim().toLowerCase();

  return doctors.filter((doctor) => {
    const matchesSearch =
      !normalizedSearch ||
      doctor.name.toLowerCase().includes(normalizedSearch) ||
      doctor.specialty.toLowerCase().includes(normalizedSearch);

    const specialtyName = SPECIALTIES.find(
      (item) => item.slug === filters.specialty,
    )?.name;

    const matchesSpecialty =
      !filters.specialty || doctor.specialty === specialtyName;

    return matchesSearch && matchesSpecialty;
  });
}

export function paginateDoctors<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    currentPage: safePage,
    totalItems: items.length,
  };
}
