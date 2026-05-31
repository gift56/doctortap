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
      <div className="flex min-h-0 min-w-0 flex-1">
        <AdminSidebar />
        <main
          id="admin-main-content"
          className="min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden pb-20 sm:pb-24 lg:pb-6"
        >
          {children}
        </main>
      </div>
      <AdminBottomNav />
    </div>
  );
}
