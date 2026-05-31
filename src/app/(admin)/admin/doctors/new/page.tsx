import type { Metadata } from "next";

import { AdminDoctorProvisioningWorkspace } from "@/components/admin/doctors/new/admin-doctor-provisioning-workspace";
import { AdminDoctorsNewJsonLd } from "@/components/admin/doctors/new/admin-doctors-new-json-ld";
import { buildAdminDoctorsNewMetadata } from "@/lib/seo/admin-doctors-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildAdminDoctorsNewMetadata();

export default function AdminDoctorsNewPage() {
  return (
    <>
      <AdminDoctorsNewJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-2xl space-y-8 bg-white px-3 py-6 sm:px-6 sm:py-10">
        <header>
          <h1 className="text-2xl font-bold text-text-primary">
            Provision New Doctor
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Setup global authentication credentials, assign medical licenses,
            and define consulting parameters.
          </p>
        </header>

        <AdminDoctorProvisioningWorkspace />
      </div>
    </>
  );
}
