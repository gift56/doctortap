export const MAX_DOCTOR_PROFILE_PHOTO_BYTES = Math.floor(1.5 * 1024 * 1024);

export const MAX_DOCTOR_PROFILE_PHOTO_LABEL = "1.5 MB";

export const ACCEPTED_DOCTOR_PROFILE_PHOTO_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export function isAcceptedDoctorProfilePhotoType(type: string): boolean {
  return (ACCEPTED_DOCTOR_PROFILE_PHOTO_TYPES as readonly string[]).includes(
    type,
  );
}

export function formatDoctorProfilePhotoSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
