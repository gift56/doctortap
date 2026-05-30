import type { Metadata } from "next";

import { ContactHeroSection } from "@/components/public/contact/contact-hero-section";
import { ContactPageJsonLd } from "@/components/public/contact/contact-page-json-ld";
import { buildContactPageMetadata } from "@/lib/seo/contact-page-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildContactPageMetadata();

export default function ContactPage() {
  return (
    <>
      <ContactPageJsonLd siteUrl={getSiteUrl()} />
      <ContactHeroSection />
    </>
  );
}
