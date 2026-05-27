"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  ADMIN_NAV_ITEMS,
  isAdminNavActive,
} from "@/config/constants/admin/routes";
import { cn } from "@/lib/utils";

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-60 shrink-0 flex-col border-r border-border-default bg-bg-base lg:flex">
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {ADMIN_NAV_ITEMS.map((item) => {
          const active = isAdminNavActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-accent-primary/10 text-accent-primary"
                  : "text-text-muted hover:bg-bg-surface hover:text-text-primary",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {item.label}
              {active ? (
                <span
                  className="absolute inset-y-1 right-0 w-1 rounded-l-full bg-accent-primary"
                  aria-hidden
                />
              ) : null}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
