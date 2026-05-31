import type { Metadata } from "next";

import { ProviderCalendarJsonLd } from "@/components/provider/calendar/provider-calendar-json-ld";
import { ProviderCalendarWorkspace } from "@/components/provider/calendar/provider-calendar-workspace";
import { buildProviderCalendarMetadata } from "@/lib/seo/provider-calendar-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildProviderCalendarMetadata();

export default function ProviderCalendarPage() {
  return (
    <>
      <ProviderCalendarJsonLd siteUrl={getSiteUrl()} />
      <div className="mx-auto w-full max-w-7xl space-y-6 p-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            Calendar
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Availability adjustments, recurring blocks, and sync settings.
          </p>
        </header>
        <ProviderCalendarWorkspace />
      </div>
    </>
  );
}
