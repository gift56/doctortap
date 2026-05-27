import type { ReactNode } from "react";

import { PublicFooter } from "@/components/public/public-footer";
import { PublicHeader } from "@/components/public/public-header";

interface PublicLayoutProps {
  children: ReactNode;
}

export function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-bg-base">
      <PublicHeader />
      <main className="flex flex-1 flex-col pt-14 sm:pt-16">{children}</main>
      <PublicFooter />
    </div>
  );
}
