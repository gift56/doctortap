import { Home, Info, Mail, Stethoscope, type LucideIcon } from "lucide-react";

export const PUBLIC_ROUTES = {
  home: "/",
  doctors: "/doctors",
  about: "/about",
  contact: "/contact",
  login: "/login",
  register: "/register",
} as const;

export type PublicRouteKey = keyof typeof PUBLIC_ROUTES;

export interface PublicNavItem {
  href: typeof PUBLIC_ROUTES.home | typeof PUBLIC_ROUTES.doctors | typeof PUBLIC_ROUTES.about | typeof PUBLIC_ROUTES.contact;
  label: string;
  icon: LucideIcon;
}

export const PUBLIC_NAV_ITEMS: PublicNavItem[] = [
  { href: PUBLIC_ROUTES.home, label: "Home", icon: Home },
  { href: PUBLIC_ROUTES.doctors, label: "Doctors", icon: Stethoscope },
  { href: PUBLIC_ROUTES.about, label: "About", icon: Info },
  { href: PUBLIC_ROUTES.contact, label: "Contact", icon: Mail },
];

export const PUBLIC_FOOTER_DESCRIPTION =
  "DoctorTap is a trusted platform for managing doctor appointments efficiently and securely. We are committed to improving healthcare access by connecting patients with trusted doctors and ensuring a seamless experience for everyone.";

export const PUBLIC_FOOTER_COMPANY_LINKS = [
  { href: PUBLIC_ROUTES.home, label: "Home" },
  { href: PUBLIC_ROUTES.doctors, label: "Doctors" },
  { href: PUBLIC_ROUTES.about, label: "About Us" },
  { href: PUBLIC_ROUTES.contact, label: "Contact Us" },
] as const;

export const PUBLIC_FOOTER_CONTACT = {
  phone: "+977-1-5543210",
  email: "info@doctortap.com",
} as const;

export function isPublicNavActive(pathname: string, href: string): boolean {
  if (href === PUBLIC_ROUTES.home) {
    return pathname === href;
  }
  if (href === PUBLIC_ROUTES.doctors) {
    return (
      pathname === href ||
      pathname.startsWith("/doctors/") ||
      pathname.startsWith("/doctor/")
    );
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
