import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { DoctorBookingPanel } from "@/components/public/doctors/doctor-booking-panel";
import { DoctorProfileHeader } from "@/components/public/doctors/doctor-profile-header";
import { DoctorProfileJsonLd } from "@/components/public/doctors/doctor-profile-json-ld";
import { DoctorRelatedDoctors } from "@/components/public/doctors/doctor-related-doctors";
import {
  getDoctorById,
  getRelatedDoctors,
} from "@/lib/doctors/get-doctor-by-id";
import { buildDoctorProfileMetadata } from "@/lib/seo/doctor-profile-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

interface DoctorProfilePageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: DoctorProfilePageProps): Promise<Metadata> {
  const { id } = await params;
  const doctor = getDoctorById(id);

  if (!doctor) {
    return {
      title: "Doctor Not Found",
      robots: { index: false, follow: false },
    };
  }

  return buildDoctorProfileMetadata(doctor);
}

export default async function DoctorProfilePage({
  params,
}: DoctorProfilePageProps) {
  const { id } = await params;
  const doctor = getDoctorById(id);

  if (!doctor) {
    notFound();
  }

  const relatedDoctors = getRelatedDoctors(doctor.id, doctor.specialty);
  const siteUrl = getSiteUrl();

  return (
    <>
      <DoctorProfileJsonLd doctor={doctor} siteUrl={siteUrl} />
      <main className="mx-auto w-full max-w-6xl space-y-10 px-4 py-8 sm:px-6 sm:py-12">
        <DoctorProfileHeader doctor={doctor} />
        <DoctorBookingPanel doctorName={doctor.name} />
        <DoctorRelatedDoctors doctors={relatedDoctors} />
      </main>
    </>
  );
}
