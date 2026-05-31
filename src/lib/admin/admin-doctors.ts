import type { AdminDoctorSpecialtyFilter } from "@/hooks/use-admin-doctor-filters";

export const ADMIN_DOCTORS_PAGE_SIZE = 10;
export const ADMIN_DOCTORS_COUNT = 24;

export const ADMIN_DOCTOR_CURRENCY_SYMBOL = "NGN";

export type AdminDoctorStatus = "ACTIVE" | "SUSPENDED";

export interface AdminDoctorRow {
  id: string;
  name: string;
  councilId: string;
  specialty: string;
  specialtySlug: AdminDoctorSpecialtyFilter | "pediatrician" | "dermatologist";
  fee: string;
  status: AdminDoctorStatus;
}

export interface AdminDoctorSessionLog {
  id: string;
  patient: string;
  schedule: string;
  fee: string;
}

export interface AdminDoctorDetailProfile extends AdminDoctorRow {
  email: string;
  phone: string;
  yearsOfExperience: number;
  bio: string;
  avatarUrl: string;
  baseConsultationFee: string;
  credentials: string[];
  sessions: AdminDoctorSessionLog[];
}

export const MOCK_ADMIN_DOCTORS_PAGE_1: AdminDoctorRow[] = [
  {
    id: "DOC-8821",
    name: "Dr. Ram Nepal",
    councilId: "NMC-8821B",
    specialty: "General Physician",
    specialtySlug: "general-physician",
    fee: `${ADMIN_DOCTOR_CURRENCY_SYMBOL} 1,000.00`,
    status: "ACTIVE",
  },
  {
    id: "DOC-4421",
    name: "Dr. Anjali Sharma",
    councilId: "NMC-4421D",
    specialty: "Cardiologist",
    specialtySlug: "cardiologist",
    fee: `${ADMIN_DOCTOR_CURRENCY_SYMBOL} 2,500.00`,
    status: "ACTIVE",
  },
  {
    id: "DOC-9081",
    name: "Dr. Bikram Shah",
    councilId: "NMC-9081A",
    specialty: "Pediatrician",
    specialtySlug: "pediatrician",
    fee: `${ADMIN_DOCTOR_CURRENCY_SYMBOL} 1,500.00`,
    status: "SUSPENDED",
  },
];

const MOCK_NAMES = [
  "Dr. Ram Nepal",
  "Dr. Anjali Sharma",
  "Dr. Bikram Shah",
  "Dr. Priya Karki",
  "Dr. Nabin Thapa",
  "Dr. Sunita Gurung",
  "Dr. Arjun Rai",
  "Dr. Maya Tamang",
];

const SPECIALTY_SEQUENCE: {
  label: string;
  slug: AdminDoctorRow["specialtySlug"];
  fee: string;
}[] = [
  {
    label: "General Physician",
    slug: "general-physician",
    fee: `${ADMIN_DOCTOR_CURRENCY_SYMBOL} 1,000.00`,
  },
  {
    label: "Cardiologist",
    slug: "cardiologist",
    fee: `${ADMIN_DOCTOR_CURRENCY_SYMBOL} 2,500.00`,
  },
  {
    label: "Pediatrician",
    slug: "pediatrician",
    fee: `${ADMIN_DOCTOR_CURRENCY_SYMBOL} 1,500.00`,
  },
  {
    label: "Dermatologist",
    slug: "dermatologist",
    fee: `${ADMIN_DOCTOR_CURRENCY_SYMBOL} 1,800.00`,
  },
];

function buildMockDoctor(index: number): AdminDoctorRow {
  const specialty = SPECIALTY_SEQUENCE[index % SPECIALTY_SEQUENCE.length];
  const status: AdminDoctorStatus = index % 5 === 0 ? "SUSPENDED" : "ACTIVE";

  return {
    id: `DOC-${String(8800 + index)}`,
    name: MOCK_NAMES[index % MOCK_NAMES.length],
    councilId: `NMC-${String(8800 + index)}${index % 2 === 0 ? "B" : "A"}`,
    specialty: specialty.label,
    specialtySlug: specialty.slug,
    fee: specialty.fee,
    status,
  };
}

export const MOCK_ADMIN_DOCTORS: AdminDoctorRow[] = Array.from(
  { length: ADMIN_DOCTORS_COUNT },
  (_, index) => {
    if (index < MOCK_ADMIN_DOCTORS_PAGE_1.length) {
      return MOCK_ADMIN_DOCTORS_PAGE_1[index];
    }
    return buildMockDoctor(index);
  },
);

export function formatAdminDoctorStatus(status: AdminDoctorStatus): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function filterAdminDoctors(
  doctors: AdminDoctorRow[],
  search: string,
  specialty: AdminDoctorSpecialtyFilter,
  status: string,
): AdminDoctorRow[] {
  const query = search.trim().toLowerCase();

  return doctors.filter((doctor) => {
    const specialtyMatch =
      specialty === "all" || doctor.specialtySlug === specialty;
    const statusMatch =
      status === "all" || doctor.status.toLowerCase() === status.toLowerCase();
    const searchMatch =
      !query ||
      doctor.name.toLowerCase().includes(query) ||
      doctor.id.toLowerCase().includes(query) ||
      doctor.councilId.toLowerCase().includes(query);

    return specialtyMatch && statusMatch && searchMatch;
  });
}

export function paginateAdminDoctors(doctors: AdminDoctorRow[], page: number) {
  const total = doctors.length;
  const totalPages = Math.max(1, Math.ceil(total / ADMIN_DOCTORS_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * ADMIN_DOCTORS_PAGE_SIZE;
  const endIndex = startIndex + ADMIN_DOCTORS_PAGE_SIZE;

  return {
    items: doctors.slice(startIndex, endIndex),
    total,
    totalPages,
    currentPage,
    rangeStart: total === 0 ? 0 : startIndex + 1,
    rangeEnd: Math.min(endIndex, total),
  };
}

export function parseAdminDoctorsPage(
  params: Record<string, string | string[] | undefined>,
): number {
  const value = typeof params.page === "string" ? params.page : undefined;
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

const DOCTOR_AVATAR_URLS = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=128&h=128&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=128&h=128&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1622253692010-333fbd72b5f9?w=128&h=128&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=128&h=128&fit=crop&crop=face",
];

function buildDoctorEmail(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/^dr\.?\s*/i, "")
    .replace(/\s+/g, ".");
  return `${slug}@doctortap.health`;
}

function extractFeeAmount(fee: string): string {
  const match = fee.match(/[\d,]+\.?\d*/);
  return match ? match[0].replace(/,/g, "") : "1000.00";
}

export function getAdminDoctorDetailProfile(
  doctor: AdminDoctorRow,
): AdminDoctorDetailProfile {
  const numericId = Number.parseInt(doctor.id.replace(/\D/g, ""), 10) || 0;
  const yearsOfExperience = 4 + (numericId % 12);

  return {
    ...doctor,
    email: buildDoctorEmail(doctor.name),
    phone: `+977 98${String(1000000 + (numericId % 9000000)).slice(0, 7)}`,
    yearsOfExperience,
    avatarUrl: DOCTOR_AVATAR_URLS[numericId % DOCTOR_AVATAR_URLS.length],
    baseConsultationFee: extractFeeAmount(doctor.fee),
    bio: `${doctor.name} is a board-certified ${doctor.specialty.toLowerCase()} with ${yearsOfExperience} years of clinical experience across outpatient and hospital settings. They focus on preventive care, chronic disease management, and patient education.`,
    credentials: [
      `Medical Council ID: ${doctor.councilId}`,
      "MBBS — Tribhuvan University Institute of Medicine",
      "Annual clinical practice license (verified)",
    ],
    sessions: [
      {
        id: `APT-${numericId + 11}`,
        patient: "Ram Nepal",
        schedule: "2026-06-01 • 09:30 AM",
        fee: doctor.fee,
      },
      {
        id: `APT-${numericId + 24}`,
        patient: "Sita Shrestha",
        schedule: "2026-05-28 • 02:00 PM",
        fee: doctor.fee,
      },
      {
        id: `APT-${numericId + 37}`,
        patient: "Hari Prasad",
        schedule: "2026-05-25 • 11:00 AM",
        fee: doctor.fee,
      },
    ],
  };
}
