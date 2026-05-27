import type { ReactNode } from "react";

import { AuthLayout as AuthLayoutShell } from "@/components/auth/auth-layout";

export default function AuthLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AuthLayoutShell>{children}</AuthLayoutShell>;
}
