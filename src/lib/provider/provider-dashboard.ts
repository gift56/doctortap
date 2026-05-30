export const PROVIDER_PLATFORM_EARNINGS = "₨ 1000";

export const PROVIDER_APPOINTMENT_COUNT = 2;

export const PROVIDER_PATIENT_COUNT = 5;

export interface ProviderQueueBooking {
  id: string;
  patientName: string;
  bookingDateLabel: string;
  avatarUrl: string;
}

export const MOCK_PROVIDER_QUEUE_BOOKINGS: ProviderQueueBooking[] = [
  {
    id: "booking-1",
    patientName: "Ram Nepal",
    bookingDateLabel: "Booking on 21st April, 2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  },
  {
    id: "booking-2",
    patientName: "Sita Gurung",
    bookingDateLabel: "Booking on 22nd April, 2026",
    avatarUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop",
  },
];
