import {
  Calendar,
  CreditCard,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

export const PATIENT_ROUTES = {
  dashboard: "/patient/dashboard",
  appointments: "/patient/appointments",
  billing: "/patient/billing",
} as const;

export type PatientRouteKey = keyof typeof PATIENT_ROUTES;

export interface PatientNavItem {
  href: (typeof PATIENT_ROUTES)[PatientRouteKey];
  label: string;
  icon: LucideIcon;
}

export const PATIENT_NAV_ITEMS: PatientNavItem[] = [
  {
    href: PATIENT_ROUTES.dashboard,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: PATIENT_ROUTES.appointments,
    label: "Appointments",
    icon: Calendar,
  },
  {
    href: PATIENT_ROUTES.billing,
    label: "Billing",
    icon: CreditCard,
  },
];

export function isPatientNavActive(pathname: string, href: string): boolean {
  if (href === PATIENT_ROUTES.dashboard) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
