import { DOCTORS, SPECIALTIES } from "@/config/mock-data";
import type { DoctorFilterState } from "@/hooks/use-doctor-filters";
import { filterDoctors } from "@/lib/doctors/filter-doctors";
import { getSpecialtyLabel } from "@/lib/doctors/parse-search-params";

interface DoctorsDirectoryJsonLdProps {
  filters: DoctorFilterState;
  siteUrl: string;
}

export function DoctorsDirectoryJsonLd({
  filters,
  siteUrl,
}: DoctorsDirectoryJsonLdProps) {
  const filtered = filterDoctors(DOCTORS, filters);
  const specialtyName = filters.specialty
    ? getSpecialtyLabel(filters.specialty)
    : undefined;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: specialtyName
      ? `${specialtyName} Doctors`
      : "Doctor Directory",
    description:
      "Browse verified healthcare providers and book appointments on DoctorTap.",
    url: `${siteUrl}/doctors`,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: filtered.length,
      itemListElement: filtered.map((doctor, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/doctors/${doctor.id}`,
        item: {
          "@type": "Physician",
          name: `Dr. ${doctor.name}`,
          medicalSpecialty: doctor.specialty,
          image: doctor.avatarUrl,
        },
      })),
    },
    about: SPECIALTIES.map((specialty) => ({
      "@type": "MedicalSpecialty",
      name: specialty.name,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
