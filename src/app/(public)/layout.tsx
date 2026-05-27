import type { ReactNode } from "react";

import { PublicLayout as PublicLayoutShell } from "@/components/public/public-layout";

export default function PublicLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <PublicLayoutShell>{children}</PublicLayoutShell>;
}
