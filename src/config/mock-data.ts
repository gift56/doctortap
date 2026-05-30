export interface Specialty {
  id: string;
  name: string;
  slug: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  experienceYears: number;
  avatarUrl: string;
  availabilityStatus: "Available";
  credentials: string;
  biography: string;
  appointmentFee: number;
  verified: boolean;
}

export const BOOKING_TIME_SLOTS = [
  "8:00 am",
  "8:30 am",
  "9:00 am",
  "9:30 am",
  "10:00 am",
  "10:30 am",
  "11:00 am",
  "11:30 am",
] as const;

export type BookingTimeSlot = (typeof BOOKING_TIME_SLOTS)[number];

const DEFAULT_APPOINTMENT_FEE = 1000;

function withProfileFields(
  doctor: Omit<
    Doctor,
    "credentials" | "biography" | "appointmentFee" | "verified"
  >,
): Doctor {
  return {
    ...doctor,
    credentials: `MBBS - ${doctor.specialty}`,
    biography: `Dr. ${doctor.name} is a highly respected ${doctor.specialty.toLowerCase()} with ${doctor.experienceYears} years of experience in diagnosing and treating patients. They specialize in internal medicine and provide comprehensive care for acute and chronic conditions. Dr. ${doctor.name} practices at Bir Hospital, Clinic One, and Stupa Community Hospital.`,
    appointmentFee: DEFAULT_APPOINTMENT_FEE,
    verified: true,
  };
}

export const LANDING_IMAGES = {
  heroDoctorGroup: "/images/hero-image.png",
  ctaBannerDoctor: "/images/cta-image.png",
} as const;

export const SPECIALTIES: Specialty[] = [
  {
    id: "general-physician",
    name: "General Physician",
    slug: "general-physician",
  },
  { id: "gynecologist", name: "Gynecologist", slug: "gynecologist" },
  { id: "dermatologist", name: "Dermatologist", slug: "dermatologist" },
  { id: "pediatrician", name: "Pediatrician", slug: "pediatrician" },
  { id: "neurologist", name: "Neurologist", slug: "neurologist" },
  {
    id: "gastroenterologist",
    name: "Gastroenterologist",
    slug: "gastroenterologist",
  },
];

const DOCTOR_SEEDS: Omit<
  Doctor,
  "credentials" | "biography" | "appointmentFee" | "verified"
>[] = [
  {
    id: "1",
    name: "Ganesh Lama",
    specialty: "General Physician",
    experienceYears: 15,
    avatarUrl:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "2",
    name: "Sarah Mitchell",
    specialty: "Gynecologist",
    experienceYears: 12,
    avatarUrl:
      "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "3",
    name: "Michael Chen",
    specialty: "Dermatologist",
    experienceYears: 6,
    avatarUrl:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    specialty: "Pediatrician",
    experienceYears: 10,
    avatarUrl:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "5",
    name: "David Kumar",
    specialty: "Neurologist",
    experienceYears: 15,
    avatarUrl:
      "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    specialty: "Gastroenterologist",
    experienceYears: 9,
    avatarUrl:
      "https://images.unsplash.com/photo-1582750433449-648ed127bbfe?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "7",
    name: "James Wilson",
    specialty: "General Physician",
    experienceYears: 7,
    avatarUrl:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "8",
    name: "Priya Sharma",
    specialty: "Dermatologist",
    experienceYears: 5,
    avatarUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "9",
    name: "Robert Taylor",
    specialty: "Pediatrician",
    experienceYears: 11,
    avatarUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
  {
    id: "10",
    name: "Anna Martinez",
    specialty: "Neurologist",
    experienceYears: 13,
    avatarUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
    availabilityStatus: "Available",
  },
];

export const DOCTORS: Doctor[] = DOCTOR_SEEDS.map(withProfileFields);
