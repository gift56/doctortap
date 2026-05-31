import type { Metadata } from "next";

import { AdminSettingsJsonLd } from "@/components/admin/settings/admin-settings-json-ld";
import { AdminSettingsWorkspace } from "@/components/admin/settings/admin-settings-workspace";
import { buildAdminSettingsMetadata } from "@/lib/seo/admin-settings-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildAdminSettingsMetadata();

export default function AdminSettingsPage() {
  return (
    <>
      <AdminSettingsJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full min-w-0 max-w-7xl space-y-3 p-2 sm:space-y-6 sm:p-6 lg:p-8">
        <div className="mx-auto w-full min-w-0 max-w-3xl space-y-8">
          <header>
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
              Account & System Settings
            </h1>
            <p className="mt-1 text-sm text-text-secondary">
              Modify root supervisor credentials, rotate temporary security
              passwords, and manage global system information profiles.
            </p>
          </header>

          <AdminSettingsWorkspace />
        </div>
      </div>
    </>
  );
}
