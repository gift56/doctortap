export type AdminDoctorSpecialtyFilter =
  | "all"
  | "general-physician"
  | "cardiologist";

export type AdminDoctorStatusFilter = "all" | "active" | "suspended";

export interface AdminDoctorFilterState {
  search: string;
  specialty: AdminDoctorSpecialtyFilter;
  status: AdminDoctorStatusFilter;
  page: number;
}
