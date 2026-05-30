export type AppointmentPaymentStatus =
  | "pending"
  | "payment_required"
  | "paid";

export interface PatientAppointment {
  id: string;
  doctorName: string;
  specialty: string;
  avatarUrl: string;
  addressLocation: string;
  cityRegion: string;
  dateLabel: string;
  timeLabel: string;
  paymentStatus: AppointmentPaymentStatus;
}

export const PATIENT_APPOINTMENTS_PAGE_SIZE = 10;

export function parsePatientAppointmentsPage(
  params: Record<string, string | string[] | undefined>,
): number {
  const raw = typeof params.page === "string" ? params.page : undefined;
  const parsed = Number.parseInt(raw ?? "1", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
}

export function paginatePatientAppointments(
  appointments: PatientAppointment[],
  page: number,
  pageSize: number = PATIENT_APPOINTMENTS_PAGE_SIZE,
) {
  const totalPages = Math.max(1, Math.ceil(appointments.length / pageSize));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: appointments.slice(start, start + pageSize),
    totalPages,
    currentPage: safePage,
    totalItems: appointments.length,
  };
}

export const PATIENT_APPOINTMENTS: PatientAppointment[] = [
  {
    id: "apt-1",
    doctorName: "Ganesh Lama",
    specialty: "General physician",
    avatarUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    addressLocation: "Bir Hospital Road, Kalimati",
    cityRegion: "Kathmandu",
    dateLabel: "20-4-2025",
    timeLabel: "10:30 AM",
    paymentStatus: "pending",
  },
  {
    id: "apt-2",
    doctorName: "Bandana Khanal",
    specialty: "Gynecologist",
    avatarUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    addressLocation: "Clinic One (2nd Floor), Teku",
    cityRegion: "Kathmandu",
    dateLabel: "21-4-2026",
    timeLabel: "8:00 AM",
    paymentStatus: "payment_required",
  },
  {
    id: "apt-3",
    doctorName: "Anil Kumar Bhatta",
    specialty: "General physician",
    avatarUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    addressLocation: "Bir Hospital Road, Kalimati",
    cityRegion: "Kathmandu",
    dateLabel: "24-4-2025",
    timeLabel: "11:00 AM",
    paymentStatus: "paid",
  },
];
