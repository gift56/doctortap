import { DOCTORS, type Doctor } from "@/config/mock-data";

export function getDoctorById(id: string): Doctor | undefined {
  return DOCTORS.find((doctor) => doctor.id === id);
}

export function getRelatedDoctors(
  doctorId: string,
  specialty: string,
  limit = 5,
): Doctor[] {
  return DOCTORS.filter(
    (doctor) => doctor.id !== doctorId && doctor.specialty === specialty,
  ).slice(0, limit);
}
