import type { Metadata } from "next";

import { AboutHeroSection } from "@/components/public/about/about-hero-section";
import { AboutPageJsonLd } from "@/components/public/about/about-page-json-ld";
import { WhyChooseUsSection } from "@/components/public/about/why-choose-us-section";
import { buildAboutPageMetadata } from "@/lib/seo/about-page-metadata";
import { getSiteUrl } from "@/lib/seo/site-url";

export const metadata: Metadata = buildAboutPageMetadata();

export default function AboutPage() {
  return (
    <>
      <AboutPageJsonLd siteUrl={getSiteUrl()} />
      <AboutHeroSection />
      <WhyChooseUsSection />
    </>
  );
}
