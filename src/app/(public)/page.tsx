import { CtaBannerSection } from "@/components/public/landing/cta-banner-section";
import { DoctorsShowcaseSection } from "@/components/public/landing/doctors-showcase-section";
import { HeroSection } from "@/components/public/landing/hero-section";
import { SpecialtiesSection } from "@/components/public/landing/specialties-section";

export default function LandingPage() {
  return (
    <>
      <HeroSection />
      <SpecialtiesSection />
      <DoctorsShowcaseSection />
      <CtaBannerSection />
    </>
  );
}
