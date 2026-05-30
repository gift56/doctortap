"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  PATIENT_NAV_ITEMS,
  PATIENT_ROUTES,
  isPatientNavActive,
} from "@/config/constants/patient/routes";
import { cn } from "@/lib/utils";

const activeNavClass =
  "bg-accent-primary/10 text-accent-primary font-medium px-4 py-1.5 rounded-md";
const inactiveNavClass =
  "text-text-secondary hover:text-text-primary px-4 py-1.5 transition-all";

export function PatientHeader() {
  const pathname = usePathname();

  return (
    <header className="relative flex w-full shrink-0 items-center justify-between border-b border-border-default bg-bg-surface px-4 py-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <Link
          href={PATIENT_ROUTES.dashboard}
          className="text-base font-bold tracking-tight text-text-primary"
        >
          DoctorTap
        </Link>
        <span className="rounded-full border border-border-default bg-bg-base px-2 py-0.5 text-xs font-medium text-text-secondary">
          Patient
        </span>
      </div>

      <nav
        className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex"
        aria-label="Patient portal"
      >
        {PATIENT_NAV_ITEMS.map((item) => {
          const active = isPatientNavActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-md text-sm",
                active ? activeNavClass : inactiveNavClass,
              )}
              aria-current={active ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex shrink-0 items-center justify-end">
        <UserButton />
      </div>
    </header>
  );
}
