export interface AdminSettingsData {
  fullName: string;
  email: string;
  brandTitle: string;
  operationalNotice: string;
}

export const MOCK_ADMIN_SETTINGS: AdminSettingsData = {
  fullName: "Admin Supervisor",
  email: "system.admin@doctortap.com",
  brandTitle: "DoctorTap Platform",
  operationalNotice: "",
};
