"use client";

import NextTopLoader from "nextjs-toploader";
import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <>
      <NextTopLoader
        color="var(--accent-primary)"
        showSpinner={false}
        height={3}
        shadow="0 0 10px var(--accent-primary),0 0 4px var(--accent-primary)"
      />
      {children}
      <Toaster />
    </>
  );
}
