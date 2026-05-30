import type { PatientProfile } from "@/lib/patient/patient-profile";

import { PatientEditProfileButton } from "@/components/patient/patient-edit-profile-button";

interface PatientProfileCardProps {
  profile: PatientProfile;
}

const PROFILE_FIELDS: {
  key: keyof PatientProfile;
  label: string;
}[] = [
  { key: "name", label: "Patient Name" },
  { key: "phone", label: "Primary Telecommunication Number" },
  { key: "address", label: "Medical Mailing Address" },
  { key: "bloodGroup", label: "Blood Group Variant" },
];

export function PatientProfileCard({ profile }: PatientProfileCardProps) {
  return (
    <section className="mt-8 w-full max-w-4xl rounded-xl border border-border-default bg-bg-surface p-6 sm:p-8">
      <dl className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {PROFILE_FIELDS.map(({ key, label }) => (
          <div key={key}>
            <dt className="text-sm font-medium text-text-secondary">{label}</dt>
            <dd className="mt-1 text-base text-text-primary">{profile[key]}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 border-t border-border-default pt-6">
        <PatientEditProfileButton />
      </div>
    </section>
  );
}
