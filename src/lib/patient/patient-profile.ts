import type { User } from "@clerk/nextjs/server";

export interface PatientProfile {
  name: string;
  phone: string;
  address: string;
  bloodGroup: string;
}

/** Clinical fields until Prisma patient records are wired. */
const MOCK_PATIENT_CLINICAL = {
  address: "Ward 4, Bir Hospital Complex, Kathmandu, Nepal",
  bloodGroup: "O+",
} as const;

export function resolvePatientProfile(user: User | null): PatientProfile {
  const name =
    user?.fullName?.trim() ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim() ||
    "Patient";

  const phone =
    user?.primaryPhoneNumber?.phoneNumber ??
    user?.phoneNumbers?.[0]?.phoneNumber ??
    "Not provided";

  return {
    name,
    phone,
    address: MOCK_PATIENT_CLINICAL.address,
    bloodGroup: MOCK_PATIENT_CLINICAL.bloodGroup,
  };
}
