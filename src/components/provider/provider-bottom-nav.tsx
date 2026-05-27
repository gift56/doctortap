"use client";

import { DashboardBottomNav } from "@/components/core/dashboard-bottom-nav";
import {
  PROVIDER_NAV_ITEMS,
  isProviderNavActive,
} from "@/config/constants/provider/routes";

export function ProviderBottomNav() {
  return (
    <DashboardBottomNav
      items={PROVIDER_NAV_ITEMS}
      isActive={isProviderNavActive}
    />
  );
}
