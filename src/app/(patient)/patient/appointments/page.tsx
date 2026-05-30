import type { Metadata } from "next";

import { AppointmentRow } from "@/components/appointment-row";
import { PatientAppointmentsJsonLd } from "@/components/patient/patient-appointments-json-ld";
import { PatientAppointmentsPagination } from "@/components/patient/patient-appointments-pagination";
import {
  PATIENT_APPOINTMENTS,
  paginatePatientAppointments,
  parsePatientAppointmentsPage,
} from "@/lib/patient/patient-appointments";
import { buildPatientAppointmentsMetadata } from "@/lib/seo/patient-appointments-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface PatientAppointmentsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: PatientAppointmentsPageProps): Promise<Metadata> {
  const params = await searchParams;
  const page = parsePatientAppointmentsPage(params);
  return buildPatientAppointmentsMetadata(page);
}

export default async function PatientAppointmentsPage({
  searchParams,
}: PatientAppointmentsPageProps) {
  const params = await searchParams;
  const requestedPage = parsePatientAppointmentsPage(params);
  const { items, totalPages, currentPage, totalItems } =
    paginatePatientAppointments(PATIENT_APPOINTMENTS, requestedPage);

  return (
    <>
      <PatientAppointmentsJsonLd
        appointments={items}
        currentPage={currentPage}
        totalItems={totalItems}
        siteUrl={getSiteUrl()}
      />
      <div className="mx-auto w-full max-w-5xl">
        <h1 className="mb-6 border-b border-border-default pb-4 text-xl font-bold text-text-primary">
          My Appointments
        </h1>
        <div className="space-y-4">
          {items.map((appointment) => (
            <AppointmentRow key={appointment.id} appointment={appointment} />
          ))}
        </div>
        <PatientAppointmentsPagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </>
  );
}
