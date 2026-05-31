export const ADMIN_DOCTOR_COUNT = 24;

export const ADMIN_APPOINTMENT_COUNT = 142;

export const ADMIN_PATIENT_COUNT = 380;

export type AdminConsultationStatus = "COMPLETED" | "PENDING";

export interface AdminConsultationRow {
  id: string;
  patientName: string;
  doctorName: string;
  date: string;
  time: string;
  amount: string;
  status: AdminConsultationStatus;
}

export const MOCK_ADMIN_TELEMETRY: AdminConsultationRow[] = [
  {
    id: "APT-9921",
    patientName: "Ram Nepal",
    doctorName: "Dr. Ganesh Lama",
    date: "2026-05-31",
    time: "02:30 PM",
    amount: "NGN 1,000.00",
    status: "COMPLETED",
  },
  {
    id: "APT-9804",
    patientName: "Sita Shrestha",
    doctorName: "Dr. Bandana Khanal",
    date: "2026-05-31",
    time: "04:00 PM",
    amount: "NGN 1,000.00",
    status: "PENDING",
  },
  {
    id: "APT-9712",
    patientName: "Hari Prasad",
    doctorName: "Dr. Anil Kumar Bhatta",
    date: "2026-05-30",
    time: "11:15 AM",
    amount: "NGN 1,000.00",
    status: "COMPLETED",
  },
];

export function formatAdminConsultationStatus(
  status: AdminConsultationStatus,
): string {
  return status === "COMPLETED" ? "Completed" : "Pending";
}

export function formatAdminScheduleWindow(date: string, time: string): string {
  return `${date} · ${time}`;
}
