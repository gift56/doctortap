import type { Metadata } from "next";

import type { Doctor } from "@/config/mock-data";
import { formatAppointmentFee } from "@/lib/doctors/format-appointment-fee";

export function buildDoctorProfileMetadata(doctor: Doctor): Metadata {
  const title = `Dr. ${doctor.name} — ${doctor.specialty}`;
  const description = `Book an appointment with Dr. ${doctor.name}, ${doctor.credentials}. ${doctor.experienceYears} years of experience. Appointment fee ${formatAppointmentFee(doctor.appointmentFee)}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      url: `/doctors/${doctor.id}`,
      images: [
        {
          url: doctor.avatarUrl,
          alt: `Dr. ${doctor.name}, ${doctor.specialty}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [doctor.avatarUrl],
    },
    alternates: {
      canonical: `/doctors/${doctor.id}`,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}
