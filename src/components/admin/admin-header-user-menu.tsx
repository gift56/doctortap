"use client";

import { SignOutButton } from "@clerk/nextjs";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import Link from "next/link";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ADMIN_ROUTES } from "@/config/constants/admin/routes";

export function AdminHeaderUserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer items-center gap-1 rounded-full border border-border-default bg-accent-primary/10 py-1 pr-1.5 pl-1 transition-all hover:bg-accent-primary/20">
        <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-accent-primary">
          AS
        </span>
        <ChevronDown className="h-4 w-4 text-text-muted" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="mt-2 w-56 rounded-lg border border-border-default bg-bg-base p-1 shadow-md animate-in fade-in-50 slide-in-from-top-1"
      >
        <span className="mb-1 block border-b border-border-default px-2.5 py-2 text-xs font-semibold text-text-muted">
          System Administrator
        </span>
        <Link
          href={ADMIN_ROUTES.settings}
          className="flex cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-text-primary transition-all hover:bg-bg-surface"
        >
          <Settings className="h-4 w-4 shrink-0" aria-hidden="true" />
          Profile Settings
        </Link>
        <SignOutButton>
          <button
            type="button"
            className="flex w-full cursor-pointer items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium text-red-600 transition-all hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
            Logout
          </button>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
