import { AdminHeaderUserMenu } from "@/components/admin/admin-header-user-menu";
import { AppLogo } from "@/components/core/app-logo/app-logo";
import { ADMIN_ROUTES } from "@/config/constants/admin/routes";

export function AdminHeader() {
  return (
    <header className="flex w-full shrink-0 items-center justify-between border-b border-border-default bg-bg-surface px-8 py-4">
      <AppLogo path={ADMIN_ROUTES.dashboard} badge="Admin" className="min-w-0" />
      <AdminHeaderUserMenu />
    </header>
  );
}
