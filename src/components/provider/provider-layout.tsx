import type { ReactNode } from "react";

import { ProviderBottomNav } from "@/components/provider/provider-bottom-nav";
import { ProviderHeader } from "@/components/provider/provider-header";
import { ProviderSidebar } from "@/components/provider/provider-sidebar";
import { ProviderStatusHeader } from "@/components/provider/provider-status-header";

interface ProviderLayoutProps {
  children: ReactNode;
}

export function ProviderLayout({ children }: ProviderLayoutProps) {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-bg-surface">
      <ProviderHeader />
      <div className="flex min-h-0 flex-1">
        <ProviderSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <ProviderStatusHeader />
          <main className="min-h-0 flex-1 overflow-y-auto p-4 pb-24 sm:p-6 lg:pb-6">
            {children}
          </main>
        </div>
      </div>
      <ProviderBottomNav />
    </div>
  );
}
