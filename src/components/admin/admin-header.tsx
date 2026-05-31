import Link from "next/link";

import { AppLogo } from "@/components/core/app-logo/app-logo";
import { buttonVariants } from "@/components/ui/button";
import { ADMIN_ROUTES } from "@/config/constants/admin/routes";
import { cn } from "@/lib/utils";

export function AdminHeader() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-border-default bg-bg-base px-3 sm:h-16 sm:px-6">
      <AppLogo path={ADMIN_ROUTES.dashboard} badge="Admin" className="min-w-0" />
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
