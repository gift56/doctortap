import type { ReactNode } from "react";

import { ProviderLayout as ProviderLayoutShell } from "@/components/provider/provider-layout";

export default function ProviderLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <ProviderLayoutShell>{children}</ProviderLayoutShell>;
}
