import { Button } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-12 sm:px-6 sm:py-20 md:py-24">
      <p className="font-mono text-sm text-text-muted">DoctorTap</p>
      <h1 className="text-center text-2xl font-semibold text-text-primary sm:text-3xl">
        Medical care, on your schedule
      </h1>
      <p className="max-w-lg text-center text-text-muted">
        Discover verified doctors, book virtual consultations, and manage your
        health in one place.
      </p>
      <Button>Get started</Button>
    </section>
  );
}
