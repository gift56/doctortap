"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { AppLogo } from "@/components/core/app-logo/app-logo";
import { buttonVariants } from "@/components/ui/button";
import {
  PATIENT_NAV_ITEMS,
  PATIENT_ROUTES,
  isPatientNavActive,
} from "@/config/constants/patient/routes";
import { cn } from "@/lib/utils";

export function PatientHeader() {
  const pathname = usePathname();

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-border-default bg-bg-base px-4 sm:h-16 sm:px-6">
      <AppLogo path={PATIENT_ROUTES.dashboard} badge="Patient" className="min-w-0" />

      <nav className="hidden items-center gap-1 lg:flex">
        {PATIENT_NAV_ITEMS.map((item) => {
          const active = isPatientNavActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                active
                  ? "bg-accent-primary/10 text-accent-primary"
                  : "text-text-muted hover:bg-bg-surface hover:text-text-primary",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <Link
        href="/login"
        className={cn(
          buttonVariants({ size: "sm" }),
          "shrink-0 rounded-full px-4 sm:px-6",
        )}
      >
        Logout
      </Link>
    </header>
  );
}
