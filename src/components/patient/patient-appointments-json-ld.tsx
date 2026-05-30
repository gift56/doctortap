import { PATIENT_ROUTES } from "@/config/constants/patient/routes";
import {
  PATIENT_APPOINTMENTS_PAGE_SIZE,
  type PatientAppointment,
} from "@/lib/patient/patient-appointments";
import { PATIENT_APPOINTMENTS_PAGE_DESCRIPTION } from "@/lib/seo/patient-appointments-metadata";

interface PatientAppointmentsJsonLdProps {
  appointments: PatientAppointment[];
  currentPage: number;
  totalItems: number;
  siteUrl: string;
}

export function PatientAppointmentsJsonLd({
  appointments,
  currentPage,
  totalItems,
  siteUrl,
}: PatientAppointmentsJsonLdProps) {
  const pageUrl =
    currentPage > 1
      ? `${siteUrl}${PATIENT_ROUTES.appointments}?page=${currentPage}`
      : `${siteUrl}${PATIENT_ROUTES.appointments}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "My Appointments",
    description: PATIENT_APPOINTMENTS_PAGE_DESCRIPTION,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: totalItems,
      itemListElement: appointments.map((appointment, index) => ({
        "@type": "ListItem",
        position: (currentPage - 1) * PATIENT_APPOINTMENTS_PAGE_SIZE + index + 1,
        item: {
          "@type": "MedicalAppointment",
          name: `Appointment with Dr. ${appointment.doctorName}`,
          description: `${appointment.specialty} — ${appointment.dateLabel} | ${appointment.timeLabel}`,
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
