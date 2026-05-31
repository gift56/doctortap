export const ADMIN_VERIFICATION_PENDING_COUNT = 8;
export const ADMIN_VERIFICATION_APPROVED_COUNT = 24;
export const ADMIN_VERIFICATION_TOTAL_COUNT = 32;

export const ADMIN_VERIFICATION_PAGE_SIZE = 5;

export type AdminVerificationSort = "submitted-desc" | "submitted-asc" | "name";

export interface PendingVerificationRequest {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  councilId: string;
  documentUrl: string;
  documentName: string;
  submittedAt: string;
}

export const MOCK_PENDING_VERIFICATIONS: PendingVerificationRequest[] = [
  {
    id: "REQ-002",
    name: "Dr. Anjali Sharma",
    specialty: "Cardiologist",
    experience: "12 Yrs",
    councilId: "NMC-4421D",
    documentUrl: "/docs/license-anjali.pdf",
    documentName: "Medical_License.pdf",
    submittedAt: "2026-05-30",
  },
  {
    id: "REQ-005",
    name: "Dr. Bikram Shah",
    specialty: "Pediatrician",
    experience: "6 Yrs",
    councilId: "NMC-9081A",
    documentUrl: "/docs/license-bikram.pdf",
    documentName: "Medical_License.pdf",
    submittedAt: "2026-05-29",
  },
  {
    id: "REQ-008",
    name: "Dr. Priya Karki",
    specialty: "Dermatologist",
    experience: "9 Yrs",
    councilId: "NMC-3310C",
    documentUrl: "/docs/license-priya.pdf",
    documentName: "Medical_License.pdf",
    submittedAt: "2026-05-28",
  },
  {
    id: "REQ-011",
    name: "Dr. Nabin Thapa",
    specialty: "Orthopedic Surgeon",
    experience: "15 Yrs",
    councilId: "NMC-7722F",
    documentUrl: "/docs/license-nabin.pdf",
    documentName: "Medical_License.pdf",
    submittedAt: "2026-05-27",
  },
  {
    id: "REQ-014",
    name: "Dr. Sunita Gurung",
    specialty: "Gynecologist",
    experience: "11 Yrs",
    councilId: "NMC-5590E",
    documentUrl: "/docs/license-sunita.pdf",
    documentName: "Medical_License.pdf",
    submittedAt: "2026-05-26",
  },
  {
    id: "REQ-017",
    name: "Dr. Arjun Rai",
    specialty: "Neurologist",
    experience: "7 Yrs",
    councilId: "NMC-1188B",
    documentUrl: "/docs/license-arjun.pdf",
    documentName: "Medical_License.pdf",
    submittedAt: "2026-05-25",
  },
  {
    id: "REQ-020",
    name: "Dr. Meera Adhikari",
    specialty: "Psychiatrist",
    experience: "5 Yrs",
    councilId: "NMC-6644A",
    documentUrl: "/docs/license-meera.pdf",
    documentName: "Medical_License.pdf",
    submittedAt: "2026-05-24",
  },
  {
    id: "REQ-023",
    name: "Dr. Kiran Pokhrel",
    specialty: "General Physician",
    experience: "10 Yrs",
    councilId: "NMC-9903G",
    documentUrl: "/docs/license-kiran.pdf",
    documentName: "Medical_License.pdf",
    submittedAt: "2026-05-23",
  },
];

export const ADMIN_VERIFICATION_SPECIALTIES = Array.from(
  new Set(MOCK_PENDING_VERIFICATIONS.map((item) => item.specialty)),
).sort();

function matchesSearch(item: PendingVerificationRequest, search: string): boolean {
  const query = search.trim().toLowerCase();
  if (!query) return true;

  return (
    item.name.toLowerCase().includes(query) ||
    item.id.toLowerCase().includes(query) ||
    item.councilId.toLowerCase().includes(query) ||
    item.specialty.toLowerCase().includes(query)
  );
}

export function filterAndSortPendingVerifications(
  items: PendingVerificationRequest[],
  search: string,
  specialty: string,
  sort: AdminVerificationSort,
): PendingVerificationRequest[] {
  const filtered = items.filter((item) => {
    if (specialty !== "all" && item.specialty !== specialty) {
      return false;
    }
    return matchesSearch(item, search);
  });

  const sorted = [...filtered];

  sorted.sort((left, right) => {
    if (sort === "name") {
      return left.name.localeCompare(right.name);
    }

    const leftTime = new Date(left.submittedAt).getTime();
    const rightTime = new Date(right.submittedAt).getTime();

    return sort === "submitted-asc"
      ? leftTime - rightTime
      : rightTime - leftTime;
  });

  return sorted;
}

export function paginatePendingVerifications<T>(
  items: T[],
  page: number,
  pageSize: number = ADMIN_VERIFICATION_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    currentPage,
    totalItems: items.length,
  };
}

export function parseAdminVerificationPage(
  params: Record<string, string | string[] | undefined>,
): number {
  const raw = typeof params.page === "string" ? params.page : undefined;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
