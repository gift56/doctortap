import type { Metadata } from "next";

import { ProviderProfileJsonLd } from "@/components/provider/profile/provider-profile-json-ld";
import { ProviderProfileWorkspace } from "@/components/provider/profile/provider-profile-workspace";
import { buildProviderProfileMetadata } from "@/lib/seo/provider-profile-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildProviderProfileMetadata();

export default function ProviderProfilePage() {
  return (
    <>
      <ProviderProfileJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-10">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Profile Settings
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Update your public medical office profile, clinical consultation
            specialties, and manage practitioner account configurations.
          </p>
        </header>

        <ProviderProfileWorkspace />
      </div>
    </>
  );
}
