import type { ReactNode } from "react";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminBottomNav } from "@/components/admin/admin-bottom-nav";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex h-dvh w-full flex-col overflow-hidden bg-bg-surface">
      <AdminHeader />
      <div className="flex min-h-0 flex-1">
        <AdminSidebar />
        <main className="min-h-0 flex-1 overflow-y-auto p-4 pb-24 sm:p-6 lg:pb-6">
          {children}
        </main>
      </div>
      <AdminBottomNav />
    </div>
  );
}
