import { currentUser } from "@clerk/nextjs/server";
import type { Metadata } from "next";

import { PatientDashboardJsonLd } from "@/components/patient/patient-dashboard-json-ld";
import { PatientHealthSummaryHeader } from "@/components/patient/patient-health-summary-header";
import { PatientProfileCard } from "@/components/patient/patient-profile-card";
import { resolvePatientProfile } from "@/lib/patient/patient-profile";
import { buildPatientDashboardMetadata } from "@/lib/seo/patient-dashboard-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildPatientDashboardMetadata();

export default async function PatientDashboardPage() {
  const user = await currentUser();
  const profile = resolvePatientProfile(user);

  return (
    <>
      <PatientDashboardJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-5xl">
        <PatientHealthSummaryHeader />
        <PatientProfileCard profile={profile} />
      </div>
    </>
  );
}
