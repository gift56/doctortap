"use client";

import { SignOutButton } from "@clerk/nextjs";
import { useState } from "react";

import { PROVIDER_ROUTES } from "@/config/constants/provider/routes";
import { cn } from "@/lib/utils";
import { AppLogo } from "../core/app-logo/app-logo";

export function ProviderHeader() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <header className="flex w-full shrink-0 items-center justify-between border-b border-border-default bg-bg-surface px-4 py-4 sm:px-8">
      <div className="flex min-w-0 items-center gap-2">
        <AppLogo path={PROVIDER_ROUTES.dashboard} />
      </div>

      <div className="flex shrink-0 flex-wrap items-center justify-end gap-3 sm:gap-6">
        <div className="flex items-center gap-2 sm:gap-3">
          <p className="hidden text-xs font-bold tracking-wider text-text-muted md:block">
            OPERATIONAL STATUS
          </p>
          <span
            className={cn(
              "text-xs font-semibold",
              isOnline ? "text-state-success" : "text-text-muted",
            )}
          >
            ● {isOnline ? "Online" : "Offline"}
          </span>
          <button
            type="button"
            onClick={() => setIsOnline((prev) => !prev)}
            className="rounded-md border border-border-default px-3 py-1 text-xs font-semibold transition-all hover:border-accent-primary"
          >
            Toggle
          </button>
        </div>

        <SignOutButton>
          <button
            type="button"
            className="rounded-md bg-accent-primary px-4 py-2 text-xs font-semibold text-white transition-all hover:opacity-90"
          >
            Logout
          </button>
        </SignOutButton>
      </div>
    </header>
  );
}
