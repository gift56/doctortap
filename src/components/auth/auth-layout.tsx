import { BadgeCheck, CalendarClock, FolderLock, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

import { AppLogo } from "@/components/core/app-logo/app-logo";
import { cn } from "@/lib/utils";

const AUTH_FEATURES: {
  icon: LucideIcon;
  label: string;
  iconClassName: string;
  iconBgClassName: string;
}[] = [
  {
    icon: BadgeCheck,
    label: "Verified Practitioners",
    iconClassName: "text-accent-primary",
    iconBgClassName: "bg-accent-primary/10",
  },
  {
    icon: CalendarClock,
    label: "Instant Scheduling",
    iconClassName: "text-state-success",
    iconBgClassName: "bg-state-success/10",
  },
  {
    icon: FolderLock,
    label: "Digital Health Vault",
    iconClassName: "text-accent-primary",
    iconBgClassName: "bg-accent-primary/10",
  },
];

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen grid-cols-1 bg-bg-base md:grid-cols-12">
      <aside className="hidden flex-col justify-between border-r border-border-default bg-bg-surface p-12 md:col-span-5 md:flex">
        <AppLogo brandName="DOCTORTAP" />

        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-2xl font-semibold leading-snug text-text-primary">
              Book Appointment With Trusted Doctors
            </p>
            <p className="text-sm leading-relaxed text-text-secondary">
              Join thousands of patients who manage their care in one secure
              place.
            </p>
          </div>

          <ul className="space-y-4">
            {AUTH_FEATURES.map(({ icon: Icon, label, iconClassName, iconBgClassName }) => (
              <li key={label} className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg",
                    iconBgClassName,
                  )}
                >
                  <Icon className={cn("h-5 w-5", iconClassName)} aria-hidden />
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="flex items-center gap-2 text-xs text-text-muted">
          <ShieldCheck className="h-4 w-4 shrink-0 text-accent-primary" aria-hidden />
          Secure healthcare access for patients and providers.
        </p>
      </aside>

      <div className="col-span-12 flex items-center justify-center bg-bg-base p-6 md:col-span-7">
        {children}
      </div>
    </div>
  );
}
