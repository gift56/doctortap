import {
  Calendar,
  LayoutDashboard,
  UserCircle,
  Users,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const PROVIDER_ROUTES = {
  dashboard: "/provider/dashboard",
  calendar: "/provider/calendar",
  patients: "/provider/patients",
  payouts: "/provider/payouts",
  profile: "/provider/profile",
} as const;

export type ProviderRouteKey = keyof typeof PROVIDER_ROUTES;

export interface ProviderNavItem {
  href: (typeof PROVIDER_ROUTES)[ProviderRouteKey];
  label: string;
  icon: LucideIcon;
}

export const PROVIDER_NAV_ITEMS: ProviderNavItem[] = [
  {
    href: PROVIDER_ROUTES.dashboard,
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: PROVIDER_ROUTES.calendar,
    label: "Calendar",
    icon: Calendar,
  },
  {
    href: PROVIDER_ROUTES.patients,
    label: "Patients",
    icon: Users,
  },
  {
    href: PROVIDER_ROUTES.payouts,
    label: "Payouts",
    icon: Wallet,
  },
  {
    href: PROVIDER_ROUTES.profile,
    label: "Profile",
    icon: UserCircle,
  },
];

export function isProviderNavActive(pathname: string, href: string): boolean {
  if (href === PROVIDER_ROUTES.dashboard) {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
