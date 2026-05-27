import type { ReactNode } from "react";

import { AdminLayout as AdminLayoutShell } from "@/components/admin/admin-layout";

export default function AdminLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}
