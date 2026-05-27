"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

export function ProviderStatusHeader() {
  const [isOnline, setIsOnline] = useState(false);

  return (
    <header className="flex flex-col gap-2 border-b border-border-default bg-bg-base px-4 py-3 sm:h-12 sm:flex-row sm:items-center sm:justify-between sm:py-0">
      <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
        Operational status
      </p>
      <div className="flex items-center justify-between gap-2 sm:justify-end">
        <span
          className={cn(
            "h-2 w-2 rounded-full",
            isOnline ? "bg-state-success" : "bg-text-muted",
          )}
          aria-hidden
        />
        <span className="text-sm text-text-primary">
          {isOnline ? "Online for immediate calls" : "Offline"}
        </span>
        <button
          type="button"
          onClick={() => setIsOnline((prev) => !prev)}
          className="rounded-md border border-border-default px-2.5 py-1 text-xs font-medium text-text-primary hover:bg-bg-surface"
        >
          Toggle
        </button>
      </div>
    </header>
  );
}
