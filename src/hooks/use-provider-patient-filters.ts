import type {
  ProviderPatientSort,
  ProviderPatientStatusFilter,
} from "@/lib/provider/provider-patients";

export interface ProviderPatientFilterState {
  search: string;
  sort: ProviderPatientSort;
  status: ProviderPatientStatusFilter;
  page: number;
}
