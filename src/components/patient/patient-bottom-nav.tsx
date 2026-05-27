"use client";

import { DashboardBottomNav } from "@/components/core/dashboard-bottom-nav";
import {
  PATIENT_NAV_ITEMS,
  isPatientNavActive,
} from "@/config/constants/patient/routes";

export function PatientBottomNav() {
  return (
    <DashboardBottomNav items={PATIENT_NAV_ITEMS} isActive={isPatientNavActive} />
  );
}
