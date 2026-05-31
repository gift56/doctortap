"use client";

import { Fragment } from "react";

import { FieldLabel } from "@/components/core/field-label";
import { InputField, TextAreaField } from "@/components/core/form-fields";
import {
  useDoctorStepper,
  type DoctorFormValues,
} from "@/components/admin/doctors/hooks/use-doctor-stepper";
import { DoctorProfilePhotoUpload } from "@/components/admin/doctors/new/doctor-profile-photo-upload";
import { SPECIALTIES } from "@/config/mock-data";
import { cn } from "@/lib/utils";
import { showSuccessToast } from "@/lib/toast";

const STEPS = [
  { id: 1, label: "Login Info" },
  { id: 2, label: "Clinical Identity" },
  { id: 3, label: "Practice Rates" },
] as const;

const selectFieldClass =
  "min-h-11 w-full rounded-lg border bg-bg-surface px-3 py-3 text-sm transition-all focus:outline-none border-border-default focus:border-accent-primary";

const feeInputClass =
  "min-h-11 w-full rounded-lg border bg-bg-surface py-3 pr-3 pl-12 text-sm transition-all focus:outline-none";

export function AdminDoctorProvisioningWorkspace() {
  const { currentStep, totalSteps, methods, handleNext, handlePrev } =
    useDoctorStepper();

  const {
    register,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = methods.handleSubmit((data) => {
    showSuccessToast(
      `Doctor profile for ${data.name} queued locally. Clerk and database sync coming soon.`,
    );
  });

  return (
    <form onSubmit={onSubmit} className="space-y-8" noValidate>
      <div className="mb-8 flex w-full items-center border-b border-border-default pb-4">
        {STEPS.map((step, index) => {
          const isActive = currentStep === step.id;
          const isComplete = currentStep > step.id;
          const connectorActive = currentStep > step.id;

          return (
            <Fragment key={step.id}>
              <div className="flex shrink-0 items-center gap-3">
                <div
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                    isActive || isComplete
                      ? "bg-accent-primary text-white"
                      : "border border-border-default bg-bg-base font-medium text-text-secondary",
                  )}
                >
                  {step.id}
                </div>
                <span
                  className={cn(
                    "whitespace-nowrap text-xs font-semibold",
                    isActive ? "text-text-primary" : "text-text-muted",
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-px min-w-6 flex-1 sm:mx-4",
                    connectorActive
                      ? "bg-accent-primary"
                      : "bg-border-default",
                  )}
                  aria-hidden
                />
              )}
            </Fragment>
          );
        })}
      </div>

      <div className="space-y-6 rounded-xl border border-border-default bg-white p-4 shadow-sm sm:p-6">
        {currentStep === 1 && (
          <div className="space-y-5">
            <InputField<DoctorFormValues>
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="doctor@hospital.com"
              register={register}
              error={errors.email}
              required
            />
            <InputField<DoctorFormValues>
              label="Password"
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              register={register}
              error={errors.password}
              required
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <DoctorProfilePhotoUpload
              setValue={setValue}
              errorMessage={errors.avatarPreview?.message}
            />
            <InputField<DoctorFormValues>
              label="Doctor Name"
              name="name"
              placeholder="Dr. Jane Doe"
              register={register}
              error={errors.name}
              required
            />
            <InputField<DoctorFormValues>
              label="Council ID"
              name="councilId"
              placeholder="NMC-8821B"
              register={register}
              error={errors.councilId}
              required
            />
            <div className="w-full space-y-1.5">
              <FieldLabel htmlFor="doctor-specialty" label="Specialty" required />
              <select
                id="doctor-specialty"
                aria-invalid={errors.specialty ? true : undefined}
                aria-required
                {...register("specialty")}
                className={cn(
                  selectFieldClass,
                  errors.specialty && "border-red-500 focus:border-red-500",
                )}
                defaultValue=""
              >
                <option value="" disabled>
                  Choose a specialty
                </option>
                {SPECIALTIES.map((specialty) => (
                  <option key={specialty.id} value={specialty.name}>
                    {specialty.name}
                  </option>
                ))}
              </select>
              {errors.specialty ? (
                <p className="text-xs font-medium text-red-500" role="alert">
                  {errors.specialty.message}
                </p>
              ) : null}
            </div>
            <InputField<DoctorFormValues>
              label="Years of Experience"
              name="experience"
              type="number"
              min={0}
              placeholder="e.g. 8"
              register={register}
              registerOptions={{ valueAsNumber: true }}
              error={errors.experience}
              required
            />
            <InputField<DoctorFormValues>
              label="Address Line 1"
              name="address1"
              placeholder="Street address, city"
              register={register}
              error={errors.address1}
              required
            />
            <InputField<DoctorFormValues>
              label="Address Line 2"
              name="address2"
              placeholder="Suite, floor (optional)"
              register={register}
              error={errors.address2}
              optional
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="w-full space-y-1.5">
              <FieldLabel htmlFor="doctor-fee" label="Consultation Fee" required />
              <div className="relative">
                <span className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs font-semibold text-text-muted">
                  NGN
                </span>
                <input
                  id="doctor-fee"
                  aria-invalid={errors.fee ? true : undefined}
                  aria-required
                  {...register("fee", { valueAsNumber: true })}
                  type="number"
                  min={100}
                  placeholder="1000"
                  className={cn(
                    feeInputClass,
                    errors.fee
                      ? "border-red-500 focus:border-red-500"
                      : "border-border-default focus:border-accent-primary",
                  )}
                />
              </div>
              {errors.fee ? (
                <p className="text-xs font-medium text-red-500" role="alert">
                  {errors.fee.message}
                </p>
              ) : null}
            </div>
            <TextAreaField<DoctorFormValues>
              label="Bio"
              name="bio"
              placeholder="Short summary of practice focus and experience"
              register={register}
              error={errors.bio}
              required
            />
          </div>
        )}

        <div className="mt-8 flex items-center justify-between border-t border-border-default pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handlePrev}
              className="cursor-pointer rounded-lg border border-border-default px-4 md:px-6 py-2 min-h-12 text-xs font-semibold text-text-secondary transition-all hover:bg-bg-base"
            >
              Back
            </button>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-2">
            {currentStep < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                className="cursor-pointer rounded-lg bg-accent-primary px-5 py-2 min-h-12 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90"
              >
                Continue
              </button>
            ) : (
              <button
                type="submit"
                className="cursor-pointer rounded-lg bg-emerald-600 px-5 py-2 min-h-12 text-xs font-semibold text-white shadow-sm transition-all hover:bg-emerald-700"
              >
                Complete Profile Creation
              </button>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
