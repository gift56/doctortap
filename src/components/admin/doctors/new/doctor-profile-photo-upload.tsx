"use client";

import { User } from "lucide-react";
import { useEffect, useId, useState } from "react";
import type { UseFormSetValue } from "react-hook-form";

import type { DoctorFormValues } from "@/components/admin/doctors/hooks/use-doctor-stepper";
import { FieldLabel } from "@/components/core/field-label";
import {
  ACCEPTED_DOCTOR_PROFILE_PHOTO_TYPES,
  MAX_DOCTOR_PROFILE_PHOTO_BYTES,
  MAX_DOCTOR_PROFILE_PHOTO_LABEL,
  formatDoctorProfilePhotoSize,
  isAcceptedDoctorProfilePhotoType,
} from "@/lib/admin/doctor-profile-photo";
import { showErrorToast } from "@/lib/toast";
import { cn } from "@/lib/utils";

interface DoctorProfilePhotoUploadProps {
  setValue: UseFormSetValue<DoctorFormValues>;
  errorMessage?: string;
}

function isValidImageFile(file: File): boolean {
  if (file.type && isAcceptedDoctorProfilePhotoType(file.type)) {
    return true;
  }

  const extension = file.name.split(".").pop()?.toLowerCase();
  return extension === "jpg" || extension === "jpeg" || extension === "png" || extension === "webp";
}

export function DoctorProfilePhotoUpload({
  setValue,
  errorMessage,
}: DoctorProfilePhotoUploadProps) {
  const inputId = useId();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    return () => {
      if (previewUrl?.startsWith("blob:")) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!isValidImageFile(file)) {
      showErrorToast("Please upload a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > MAX_DOCTOR_PROFILE_PHOTO_BYTES) {
      showErrorToast(
        `Image must be ${MAX_DOCTOR_PROFILE_PHOTO_LABEL} or smaller (${formatDoctorProfilePhotoSize(file.size)} selected).`,
      );
      return;
    }

    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }

    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setFileName(file.name);
    setValue("avatarPreview", objectUrl, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("avatarFileName", file.name, { shouldDirty: true });
  };

  const handleRemove = () => {
    if (previewUrl?.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setFileName("");
    setValue("avatarPreview", "", {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setValue("avatarFileName", "", { shouldDirty: true });
  };

  return (
    <div className="w-full space-y-1.5 sm:col-span-2">
      <FieldLabel htmlFor={inputId} label="Doctor picture" required />
      <div
        className={cn(
          "flex min-h-25 items-center gap-4 rounded-xl border bg-bg-base/40 px-4 py-4",
          errorMessage
            ? "border-red-500"
            : "border-border-default",
        )}
      >
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border-default bg-bg-base">
          {previewUrl ? (
            // eslint-disable-next-line @next/next/no-img-element -- blob preview URLs are local-only
            <img
              src={previewUrl}
              alt={fileName ? `${fileName} preview` : "Doctor profile preview"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-text-muted">
              <User className="h-9 w-9" strokeWidth={1.5} aria-hidden />
            </div>
          )}
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <label
            htmlFor={inputId}
            className="cursor-pointer text-sm font-semibold text-text-primary transition-colors hover:text-accent-primary"
          >
            Upload doctor picture
          </label>
          <p className="text-xs text-text-muted">
            JPG, PNG, or WebP · max {MAX_DOCTOR_PROFILE_PHOTO_LABEL}
          </p>
          {previewUrl && fileName ? (
            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className="truncate text-xs text-text-secondary">
                {fileName}
              </span>
              <button
                type="button"
                onClick={handleRemove}
                className="cursor-pointer text-xs font-semibold text-accent-primary hover:underline"
              >
                Remove
              </button>
            </div>
          ) : null}
        </div>

        <input
          id={inputId}
          type="file"
          accept={ACCEPTED_DOCTOR_PROFILE_PHOTO_TYPES.join(",")}
          className="sr-only"
          aria-invalid={errorMessage ? true : undefined}
          aria-required
          onChange={handleFileChange}
        />
      </div>
      {errorMessage ? (
        <p className="text-xs font-medium text-red-500" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
