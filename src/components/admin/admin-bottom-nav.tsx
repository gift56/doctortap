"use client";

import { DashboardBottomNav } from "@/components/core/dashboard-bottom-nav";
import {
  ADMIN_NAV_ITEMS,
  isAdminNavActive,
} from "@/config/constants/admin/routes";

export function AdminBottomNav() {
  return (
    <DashboardBottomNav items={ADMIN_NAV_ITEMS} isActive={isAdminNavActive} />
  );
}
