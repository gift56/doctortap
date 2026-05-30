import type { ReactNode } from "react";

import { PatientBottomNav } from "@/components/patient/patient-bottom-nav";
import { PatientHeader } from "@/components/patient/patient-header";

interface PatientLayoutProps {
  children: ReactNode;
}

export function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-bg-surface">
      <PatientHeader />
      <main className="min-h-0 flex-1 overflow-y-auto bg-bg-base p-4 pb-24 sm:p-6 md:pb-6">
        {children}
      </main>
      <PatientBottomNav />
    </div>
  );
}
