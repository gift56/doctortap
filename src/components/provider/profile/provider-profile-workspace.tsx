"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  MOCK_PROVIDER_PROFILE,
  PROVIDER_SPECIALTY_OPTIONS,
  REGIONAL_CURRENCY_SYMBOL,
  type ProviderProfileData,
} from "@/lib/provider/provider-profile";
import { showSuccessToast, showWarningToast } from "@/lib/toast";

const fieldInputClass =
  "w-full rounded-lg border border-border-default bg-bg-base px-3 py-2 text-sm text-text-primary transition-all focus:border-accent-primary focus:outline-none";

const fieldLabelClass =
  "mb-1.5 block text-xs font-semibold text-text-secondary";

function ProfileField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className={fieldLabelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function ProviderProfileWorkspace() {
  const [initialProfile] = useState<ProviderProfileData>(MOCK_PROVIDER_PROFILE);
  const [profile, setProfile] = useState<ProviderProfileData>(initialProfile);

  const handleCancel = () => {
    setProfile(initialProfile);
    showWarningToast("Unsaved profile changes were discarded.");
  };

  const handleSave = () => {
    showSuccessToast("Profile settings saved locally. Database sync coming soon.");
  };

  const handleChangePhoto = () => {
    showWarningToast(
      "Profile photo uploads will be available after cloud storage integration.",
    );
  };

  return (
    <div className="space-y-6">
      <section className="space-y-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm">
        <h2 className="text-base font-bold text-text-primary">
          Public Practice Details
        </h2>

        <div className="flex items-center gap-4">
          <div className="h-16 w-16 overflow-hidden rounded-full border border-border-default bg-bg-base">
            <Image
              src={profile.avatarUrl}
              alt={`${profile.fullName} profile photo`}
              width={64}
              height={64}
              className="h-full w-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleChangePhoto}
            className="cursor-pointer rounded-lg border border-border-default px-3 py-1.5 text-xs font-semibold text-text-primary transition-all hover:border-accent-primary"
          >
            Change Photo
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <ProfileField label="Full Name" htmlFor="provider-full-name">
            <input
              id="provider-full-name"
              type="text"
              value={profile.fullName}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  fullName: event.target.value,
                }))
              }
              className={fieldInputClass}
            />
          </ProfileField>

          <ProfileField label="Council ID" htmlFor="provider-council-id">
            <input
              id="provider-council-id"
              type="text"
              value={profile.councilId}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  councilId: event.target.value,
                }))
              }
              className={fieldInputClass}
            />
          </ProfileField>

          <ProfileField label="Specialty" htmlFor="provider-specialty">
            <Select
              value={profile.specialty}
              onValueChange={(value) => {
                if (value) {
                  setProfile((current) => ({ ...current, specialty: value }));
                }
              }}
            >
              <SelectTrigger
                id="provider-specialty"
                className="h-10 w-full border-border-default bg-bg-base text-sm text-text-primary"
              >
                <SelectValue>{profile.specialty}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {PROVIDER_SPECIALTY_OPTIONS.map((specialty) => (
                  <SelectItem key={specialty} value={specialty}>
                    {specialty}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </ProfileField>

          <ProfileField
            label="Years of Experience"
            htmlFor="provider-experience"
          >
            <input
              id="provider-experience"
              type="number"
              min={0}
              value={profile.yearsOfExperience}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  yearsOfExperience: Number(event.target.value) || 0,
                }))
              }
              className={fieldInputClass}
            />
          </ProfileField>
        </div>

        <ProfileField label="Bio" htmlFor="provider-bio">
          <Textarea
            id="provider-bio"
            value={profile.bio}
            onChange={(event) =>
              setProfile((current) => ({ ...current, bio: event.target.value }))
            }
            rows={4}
            className="min-h-24 resize-y border-border-default bg-bg-base text-sm text-text-primary focus-visible:border-accent-primary focus-visible:ring-0"
          />
        </ProfileField>
      </section>

      <section className="space-y-4 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm">
        <h2 className="text-base font-bold text-text-primary">
          Practice Pricing Rules
        </h2>

        <div>
          <label
            htmlFor="provider-base-fee"
            className="mb-1.5 block text-xs font-semibold text-text-secondary"
          >
            Base Consultation Fee
          </label>
          <div className="flex w-full overflow-hidden rounded-md border border-border-default">
            <span className="border-r border-border-default bg-bg-base px-3 py-2 text-sm text-text-muted">
              {REGIONAL_CURRENCY_SYMBOL}
            </span>
            <input
              id="provider-base-fee"
              type="text"
              inputMode="decimal"
              value={profile.baseConsultationFee}
              onChange={(event) =>
                setProfile((current) => ({
                  ...current,
                  baseConsultationFee: event.target.value,
                }))
              }
              className="w-full rounded-r-md border-0 bg-transparent px-3 py-2 text-sm text-text-primary focus:border-accent-primary focus:outline-none"
            />
          </div>
        </div>
      </section>

      <div className="mt-8 flex items-center justify-end gap-4 border-t border-border-default pt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="cursor-pointer px-4 py-2 text-sm font-medium text-text-secondary transition-all hover:text-text-primary"
        >
          Cancel Changes
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="cursor-pointer rounded-md bg-accent-primary px-6 py-2 text-sm font-medium text-white shadow-sm transition-all hover:opacity-90"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
