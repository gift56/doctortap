import type { ReactNode } from "react";

import { ProviderBottomNav } from "@/components/provider/provider-bottom-nav";
import { ProviderHeader } from "@/components/provider/provider-header";
import { ProviderSidebar } from "@/components/provider/provider-sidebar";

interface ProviderLayoutProps {
  children: ReactNode;
}

export function ProviderLayout({ children }: ProviderLayoutProps) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-bg-base">
      <ProviderSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <ProviderHeader />
        <main className="min-h-0 flex-1 overflow-y-auto pb-24 lg:pb-0">
          {children}
        </main>
      </div>
      <ProviderBottomNav />
    </div>
  );
}
