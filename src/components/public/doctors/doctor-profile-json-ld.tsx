import type { Doctor } from "@/config/mock-data";
import { formatAppointmentFee } from "@/lib/doctors/format-appointment-fee";

interface DoctorProfileJsonLdProps {
  doctor: Doctor;
  siteUrl: string;
}

export function DoctorProfileJsonLd({
  doctor,
  siteUrl,
}: DoctorProfileJsonLdProps) {
  const profileUrl = `${siteUrl}/doctors/${doctor.id}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: `Dr. ${doctor.name}`,
    image: doctor.avatarUrl,
    url: profileUrl,
    description: doctor.biography,
    medicalSpecialty: doctor.specialty,
    knowsAbout: doctor.specialty,
    priceRange: formatAppointmentFee(doctor.appointmentFee),
    offers: {
      "@type": "Offer",
      price: String(doctor.appointmentFee),
      priceCurrency: "NPR",
      description: "Appointment consultation fee",
      url: profileUrl,
    },
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: profileUrl,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
      name: "Book an appointment",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
