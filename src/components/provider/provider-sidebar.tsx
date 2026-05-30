"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  PROVIDER_NAV_ITEMS,
  isProviderNavActive,
} from "@/config/constants/provider/routes";
import { cn } from "@/lib/utils";

const activeNavClass =
  "bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3";
const inactiveNavClass =
  "text-text-secondary hover:text-text-primary px-4 py-3 flex items-center gap-3 transition-all";

export function ProviderSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen w-64 shrink-0 flex-col justify-between border-r border-border-default bg-bg-surface p-6 lg:flex">
      <nav className="flex flex-col gap-1">
        {PROVIDER_NAV_ITEMS.map((item) => {
          const active = isProviderNavActive(pathname, item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                active ? activeNavClass : inactiveNavClass,
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" aria-hidden />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
