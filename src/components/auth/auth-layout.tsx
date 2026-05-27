import Link from "next/link";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-bg-surface px-6 py-12">
      <Link
        href="/"
        className="mb-8 text-sm font-semibold tracking-tight text-text-primary"
      >
        DoctorTap
      </Link>
      <div className="w-full max-w-md rounded-xl border border-border-default bg-bg-base p-8 shadow-sm">
        {children}
      </div>
    </div>
  );
}
