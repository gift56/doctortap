import type { ReactNode } from "react";

import { PatientLayout as PatientLayoutShell } from "@/components/patient/patient-layout";

export default function PatientLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <PatientLayoutShell>{children}</PatientLayoutShell>;
}
