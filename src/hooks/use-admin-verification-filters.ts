import type { AdminVerificationSort } from "@/lib/admin/admin-verification";

export interface AdminVerificationFilterState {
  search: string;
  specialty: string;
  sort: AdminVerificationSort;
  page: number;
}
