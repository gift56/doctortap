import {
  CalendarDays,
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const ADMIN_ROUTES = {
  dashboard: "/admin/dashboard",
  verification: "/admin/verification",
  appointments: "/admin/appointments",
  doctors: "/admin/doctors",
  doctorsNew: "/admin/doctors/new",
  users: "/admin/users",
  payouts: "/admin/payouts",
  settings: "/admin/settings",
} as const;

export type AdminRouteKey = keyof typeof ADMIN_ROUTES;

export interface AdminNavItem {
  href: (typeof ADMIN_ROUTES)[AdminRouteKey];
  label: string;
  icon: LucideIcon;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  {
    href: ADMIN_ROUTES.dashboard,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: ADMIN_ROUTES.verification,
    label: "Verification",
    icon: ShieldCheck,
  },
  {
    href: ADMIN_ROUTES.appointments,
    label: "Appointments",
    icon: CalendarDays,
  },
  {
    href: ADMIN_ROUTES.doctors,
    label: "Doctors",
    icon: Stethoscope,
  },
  {
    href: ADMIN_ROUTES.payouts,
    label: "Payouts",
    icon: Wallet,
  },
];

export function isAdminNavActive(pathname: string, href: string): boolean {
  if (href === ADMIN_ROUTES.dashboard) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
