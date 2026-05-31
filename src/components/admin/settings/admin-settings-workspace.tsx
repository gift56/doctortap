"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { InputField, TextAreaField } from "@/components/core/form-fields";
import { MOCK_ADMIN_SETTINGS } from "@/lib/admin/admin-settings";
import { showSuccessToast, showWarningToast } from "@/lib/toast";

const adminSettingsSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required"),
    email: z.email("Enter a valid email address"),
    currentPassword: z.string(),
    newPassword: z.string(),
    brandTitle: z.string().min(2, "Brand title is required"),
    operationalNotice: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.newPassword.length > 0) {
      if (data.newPassword.length < 8) {
        ctx.addIssue({
          code: "custom",
          message: "New password must be at least 8 characters",
          path: ["newPassword"],
        });
      }
      if (!data.currentPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Current password is required to set a new password",
          path: ["currentPassword"],
        });
      }
    }
  });

type AdminSettingsFormValues = z.infer<typeof adminSettingsSchema>;

const defaultValues: AdminSettingsFormValues = {
  fullName: MOCK_ADMIN_SETTINGS.fullName,
  email: MOCK_ADMIN_SETTINGS.email,
  currentPassword: "",
  newPassword: "",
  brandTitle: MOCK_ADMIN_SETTINGS.brandTitle,
  operationalNotice: MOCK_ADMIN_SETTINGS.operationalNotice,
};

export function AdminSettingsWorkspace() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminSettingsFormValues>({
    resolver: zodResolver(adminSettingsSchema),
    mode: "onChange",
    defaultValues,
  });

  const onSubmit = handleSubmit(() => {
    showSuccessToast(
      "Account and system settings saved locally. Database sync coming soon.",
    );
  });

  const handleCancel = () => {
    reset(defaultValues);
    showWarningToast("Unsaved settings changes were discarded.");
  };

  return (
    <form onSubmit={onSubmit} className="w-full min-w-0 space-y-6" noValidate>
      <section className="w-full min-w-0 space-y-6 rounded-xl border border-border-default bg-bg-base p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
          Personal Profile Identity
        </h2>
        <div className="grid min-w-0 grid-cols-1 gap-6 sm:grid-cols-2">
          <InputField
            label="Full Name"
            name="fullName"
            register={register}
            error={errors.fullName}
            required
          />
          <InputField
            label="Contact Email"
            name="email"
            type="email"
            register={register}
            error={errors.email}
            required
          />
        </div>
      </section>

      <section className="w-full min-w-0 space-y-4 rounded-xl border border-border-default bg-bg-base p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
          Credential Management
        </h2>
        <InputField
          label="Current Password"
          name="currentPassword"
          type="password"
          register={register}
          error={errors.currentPassword}
          autoComplete="current-password"
        />
        <InputField
          label="New Password"
          name="newPassword"
          type="password"
          register={register}
          error={errors.newPassword}
          autoComplete="new-password"
        />
      </section>

      <section className="w-full min-w-0 space-y-4 rounded-xl border border-border-default bg-bg-base p-6 shadow-sm">
        <h2 className="text-sm font-bold uppercase tracking-wider text-text-primary">
          Application Information
        </h2>
        <InputField
          label="Brand Title"
          name="brandTitle"
          register={register}
          error={errors.brandTitle}
          required
        />
        <div className="min-w-0">
          <TextAreaField
            label="Operational Notice"
            name="operationalNotice"
            register={register}
            error={errors.operationalNotice}
            optional
            placeholder="Deployment operational notices, platform disclaimer texts, or core service alerts visible across client applications."
          />
        </div>
      </section>

      <div className="flex w-full min-w-0 items-center justify-end gap-4 border-t border-border-default pt-6">
        <button
          type="button"
          onClick={handleCancel}
          className="cursor-pointer px-4 py-2 text-xs font-semibold text-text-secondary transition-all hover:text-text-primary"
        >
          Cancel Changes
        </button>
        <button
          type="submit"
          className="cursor-pointer rounded-lg bg-accent-primary px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:opacity-90"
        >
          Apply Updates
        </button>
      </div>
    </form>
  );
}
