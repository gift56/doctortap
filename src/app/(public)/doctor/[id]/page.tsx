import { PageHeading } from "@/components/page-heading/page-heading";

interface DoctorProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function DoctorProfilePage({
  params,
}: DoctorProfilePageProps) {
  const { id } = await params;

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <PageHeading
        title="Doctor profile"
        description={`Availability, reviews, and booking for provider ${id}.`}
      />
    </section>
  );
}
