export type AdminAppointmentStatusFilter =
  | "all"
  | "completed"
  | "pending"
  | "cancelled";

export type AdminAppointmentTierFilter = "all" | "regular" | "vip" | "premium";

export interface AdminAppointmentFilterState {
  status: AdminAppointmentStatusFilter;
  tier: AdminAppointmentTierFilter;
  page: number;
}
