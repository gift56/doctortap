import { ADMIN_APPOINTMENT_COUNT } from "@/lib/admin/admin-dashboard";

export const ADMIN_APPOINTMENTS_PAGE_SIZE = 10;

export type AdminAppointmentTier = "REGULAR" | "VIP" | "PREMIUM";

export type AdminAppointmentStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface AdminAppointmentRow {
  id: string;
  patient: string;
  doctor: string;
  schedule: string;
  tier: AdminAppointmentTier;
  fee: string;
  status: AdminAppointmentStatus;
}

export const MOCK_ADMIN_APPOINTMENTS_PAGE_1: AdminAppointmentRow[] = [
  {
    id: "APT-4421",
    patient: "Ram Nepal",
    doctor: "Dr. Ganesh Lama",
    schedule: "2026-06-01 • 09:30 AM",
    tier: "REGULAR",
    fee: "NGN 1,000.00",
    status: "PENDING",
  },
  {
    id: "APT-1092",
    patient: "Sita Shrestha",
    doctor: "Dr. Bandana Khanal",
    schedule: "2026-05-28 • 02:00 PM",
    tier: "VIP",
    fee: "NGN 2,500.00",
    status: "COMPLETED",
  },
  {
    id: "APT-0082",
    patient: "Hari Prasad",
    doctor: "Dr. Anil Bhatta",
    schedule: "2026-05-25 • 11:00 AM",
    tier: "PREMIUM",
    fee: "NGN 4,000.00",
    status: "CANCELLED",
  },
];

const MOCK_PATIENTS = [
  "Ram Nepal",
  "Sita Shrestha",
  "Hari Prasad",
  "Anjali Sharma",
  "Bikram Shah",
  "Priya Karki",
  "Nabin Thapa",
  "Sunita Gurung",
  "Arjun Rai",
  "Maya Tamang",
];

const MOCK_DOCTORS = [
  "Dr. Ganesh Lama",
  "Dr. Bandana Khanal",
  "Dr. Anil Bhatta",
  "Dr. Anjali Sharma",
  "Dr. Bikram Shah",
  "Dr. Priya Karki",
];

const TIER_SEQUENCE: AdminAppointmentTier[] = ["REGULAR", "VIP", "PREMIUM"];
const STATUS_SEQUENCE: AdminAppointmentStatus[] = [
  "PENDING",
  "COMPLETED",
  "CANCELLED",
];

const TIER_FEES: Record<AdminAppointmentTier, string> = {
  REGULAR: "NGN 1,000.00",
  VIP: "NGN 2,500.00",
  PREMIUM: "NGN 4,000.00",
};

function buildMockAppointment(index: number): AdminAppointmentRow {
  const day = String((index % 28) + 1).padStart(2, "0");
  const month = index % 2 === 0 ? "05" : "06";
  const hour = (index % 12) + 8;
  const minute = index % 2 === 0 ? "00" : "30";
  const meridiem = hour >= 12 ? "PM" : "AM";
  const displayHour = hour > 12 ? hour - 12 : hour;
  const tier = TIER_SEQUENCE[index % TIER_SEQUENCE.length];
  const status = STATUS_SEQUENCE[index % STATUS_SEQUENCE.length];

  return {
    id: `APT-${String(1000 + index).padStart(4, "0")}`,
    patient: MOCK_PATIENTS[index % MOCK_PATIENTS.length],
    doctor: MOCK_DOCTORS[index % MOCK_DOCTORS.length],
    schedule: `2026-${month}-${day} • ${displayHour}:${minute} ${meridiem}`,
    tier,
    fee: TIER_FEES[tier],
    status,
  };
}

export const MOCK_ADMIN_APPOINTMENTS: AdminAppointmentRow[] = Array.from(
  { length: ADMIN_APPOINTMENT_COUNT },
  (_, index) => {
    if (index < MOCK_ADMIN_APPOINTMENTS_PAGE_1.length) {
      return MOCK_ADMIN_APPOINTMENTS_PAGE_1[index];
    }
    return buildMockAppointment(index);
  },
);

export function formatAdminAppointmentStatus(
  status: AdminAppointmentStatus,
): string {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export function formatAdminAppointmentTier(tier: AdminAppointmentTier): string {
  return tier.charAt(0) + tier.slice(1).toLowerCase();
}

export function filterAdminAppointments(
  appointments: AdminAppointmentRow[],
  status: string,
  tier: string,
): AdminAppointmentRow[] {
  return appointments.filter((appointment) => {
    const statusMatch =
      status === "all" ||
      appointment.status.toLowerCase() === status.toLowerCase();
    const tierMatch =
      tier === "all" ||
      appointment.tier.toLowerCase() === tier.toLowerCase();
    return statusMatch && tierMatch;
  });
}

export function paginateAdminAppointments(
  appointments: AdminAppointmentRow[],
  page: number,
) {
  const total = appointments.length;
  const totalPages = Math.max(1, Math.ceil(total / ADMIN_APPOINTMENTS_PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (currentPage - 1) * ADMIN_APPOINTMENTS_PAGE_SIZE;
  const endIndex = startIndex + ADMIN_APPOINTMENTS_PAGE_SIZE;

  return {
    items: appointments.slice(startIndex, endIndex),
    total,
    totalPages,
    currentPage,
    rangeStart: total === 0 ? 0 : startIndex + 1,
    rangeEnd: Math.min(endIndex, total),
  };
}

export function parseAdminAppointmentsPage(
  params: Record<string, string | string[] | undefined>,
): number {
  const value = typeof params.page === "string" ? params.page : undefined;
  const parsed = Number.parseInt(value ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}
