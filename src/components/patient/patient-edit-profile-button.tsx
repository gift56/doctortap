"use client";

import { showWarningToast } from "@/lib/toast";

export function PatientEditProfileButton() {
  return (
    <button
      type="button"
      className="inline-flex cursor-pointer items-center rounded-md border border-accent-primary px-4 py-2 text-sm font-medium text-accent-primary transition-all duration-200 hover:bg-accent-primary hover:text-white"
      onClick={() =>
        showWarningToast("Profile editing will be available after database integration.")
      }
    >
      Edit Profile
    </button>
  );
}
