import { PageHeading } from "@/components/page-heading/page-heading";

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <PageHeading
        title="About DoctorTap"
        description="Connecting patients with verified healthcare providers through secure virtual consultations."
      />
    </section>
  );
}
