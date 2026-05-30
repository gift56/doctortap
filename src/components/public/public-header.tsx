"use client";

import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { AppLogo } from "@/components/core/app-logo/app-logo";
import { MobileNavDrawer } from "@/components/core/mobile-nav-drawer";
import { buttonVariants } from "@/components/ui/button";
import {
  PUBLIC_NAV_ITEMS,
  PUBLIC_ROUTES,
  isPublicNavActive,
} from "@/config/constants/public/routes";
import { cn } from "@/lib/utils";

export function PublicHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border-default/80 bg-bg-base/95 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <AppLogo path={PUBLIC_ROUTES.home} className="min-w-0 shrink" />

          <nav className="hidden items-center gap-1 md:flex">
            {PUBLIC_NAV_ITEMS.map((item) => {
              const active = isPublicNavActive(pathname, item.href);
              // const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "text-accent-primary"
                      : "text-text-muted hover:text-text-primary",
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {/* <Icon className="h-4 w-4 shrink-0" aria-hidden /> */}
                  {item.label}
                  {active ? (
                    <span
                      className="absolute inset-x-2 -bottom-2.25 h-0.5 rounded-full bg-accent-primary"
                      aria-hidden
                    />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Link
              href={PUBLIC_ROUTES.login}
              className={cn(
                "text-sm transition-colors",
                isPublicNavActive(pathname, PUBLIC_ROUTES.login)
                  ? "font-medium text-accent-primary"
                  : "text-text-muted hover:text-text-primary",
              )}
            >
              Login
            </Link>
            <Link
              href={PUBLIC_ROUTES.register}
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-md px-3",
              )}
            >
              Create Account
            </Link>
          </div>

          <button
            type="button"
            className="rounded-md p-2 text-text-primary md:hidden"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <MobileNavDrawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        title="Menu"
      >
        <nav className="flex flex-col gap-1">
          {PUBLIC_NAV_ITEMS.map((item) => {
            const active = isPublicNavActive(pathname, item.href);
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-primary/10 text-accent-primary"
                    : "text-text-primary hover:bg-bg-surface",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-6 flex flex-col gap-3 border-t border-border-default pt-6">
          <Link
            href={PUBLIC_ROUTES.login}
            onClick={() => setMenuOpen(false)}
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "w-full justify-center",
            )}
          >
            Login
          </Link>
          <Link
            href={PUBLIC_ROUTES.register}
            onClick={() => setMenuOpen(false)}
            className={cn(buttonVariants({ size: "sm" }), "w-full justify-center")}
          >
            Create Account
          </Link>
        </div>
      </MobileNavDrawer>
    </>
  );
}
