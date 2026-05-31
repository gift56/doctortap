import { SPECIALTIES } from "@/config/mock-data";

export const REGIONAL_CURRENCY_SYMBOL = "NGN";

export interface ProviderProfileData {
  fullName: string;
  councilId: string;
  specialty: string;
  yearsOfExperience: number;
  bio: string;
  baseConsultationFee: string;
  avatarUrl: string;
}

export const PROVIDER_SPECIALTY_OPTIONS = SPECIALTIES.map(
  (specialty) => specialty.name,
);

export const MOCK_PROVIDER_PROFILE: ProviderProfileData = {
  fullName: "Dr. Ram Nepal",
  councilId: "NMC-8821B",
  specialty: "General Physician",
  yearsOfExperience: 8,
  bio: "Dr. Ram Nepal is a board-certified general physician with eight years of clinical experience across outpatient and hospital settings. He focuses on preventive care, chronic disease management, and patient education.",
  baseConsultationFee: "1000.00",
  avatarUrl:
    "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=128&h=128&fit=crop&crop=face",
};
