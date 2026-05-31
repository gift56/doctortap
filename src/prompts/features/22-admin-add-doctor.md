# Overview

This specification details the frontend architecture, reusable form primitives, custom state hooks, and stepper layout rules for the administrative provider provisioning workspace (`app/(admin)/admin/doctors/new/page.tsx`). It details a structured step-by-step wizard that empowers system managers to cleanly provision fresh practitioner profiles, configure base practice parameters, and generate secure account login credentials.

---

## Architecture Components

To preserve a clean codebase, the multi-step form utilizes dedicated structural components located within the administrative domain folder tree.

### 1. Reusable Form Primitives (`components/core/form-fields.tsx`)

A collection of strongly typed, clean light-mode form wrapper components designed to pipe validation error states automatically:

```typescript
import { UseFormRegister, FieldError } from "react-hook-form";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

// Reusable Input Field Component
export function InputField({ label, name, register, error, ...props }: InputFieldProps) {
  return (
    <div className="w-full space-y-1.5">
      <label className="text-xs font-semibold text-text-secondary block">{label}</label>
      <input
        {...register(name)}
        {...props}
        className={cn("w-full px-3 py-2 text-sm bg-bg-surface border rounded-lg focus:outline-none transition-all",error ? "border-red-500 focus:border-red-500" : "border-border-default focus:border-accent-primary")}
      />
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  error?: FieldError;
}

// Reusable Textarea Field Component
export function TextAreaField({ label, name, register, error, ...props }: TextAreaFieldProps) {
  return (
    <div className="w-full space-y-1.5">
      <label className="text-xs font-semibold text-text-secondary block">{label}</label>
      <textarea
        {...register(name)}
        {...props}
        rows={props.rows || 4}
        className={cn("*:w-full px-3 py-2 text-sm bg-bg-surface border rounded-lg focus:outline-none transition-all resize-none",error ? "border-red-500 focus:border-red-500" : "border-border-default focus:border-accent-primary")}
      />
      {error && <p className="text-xs font-medium text-red-500 mt-1">{error.message}</p>}
    </div>
  );
}

```

### 2. Custom Flow State Hook (`components/admin/doctors/use-doctor-stepper.ts`)

Encapsulates localized validation execution boundaries, multi-step progress, and formatting triggers inside a clean custom hook module:

```typescript
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Comprehensive multi-step account orchestration validation schema
export const doctorCreationSchema = z.object({
  // Step 1: Login Credentials
  email: z.string().email("Please supply a valid corporate email address"),
  password: z
    .string()
    .min(8, "Temporary credentials must contain at least 8 characters"),

  // Step 2: Clinical Details
  name: z.string().min(2, "Practitioner structural name string required"),
  address1: z.string().min(2, "Practitioner structural name string required"),
  address2: z.string().optional(),
  councilId: z.string().min(4, "Valid Medical Council ID is required"),
  specialty: z
    .string()
    .min(1, "Please choose a key medical assignment channel"),
  experience: z.coerce
    .number()
    .min(0, "Invalid experience total context integer"),

  // Step 3: Rates & Background
  fee: z.coerce
    .number()
    .min(100, "Base consultation fees must be at least NGN 100"),
  bio: z
    .string()
    .min(10, "Please outline a brief clinical overview summary statement"),
});

export type DoctorFormValues = z.infer<typeof doctorCreationSchema>;

export function useDoctorStepper() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const methods = useForm<DoctorFormValues>({
    resolver: zodResolver(doctorCreationSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      councilId: "",
      address1: "",
      specialty: "",
      experience: 0,
      fee: 1000,
      bio: "",
    },
  });

  const stepFields: Record<number, (keyof DoctorFormValues)[]> = {
    1: ["email", "password"],
    2: ["name", "councilId", "specialty", "address1", "address2", "experience"],
    3: ["fee", "bio"],
  };

  const handleNext = async () => {
    const fieldsToValidate = stepFields[currentStep];
    const isStepValid = await methods.trigger(fieldsToValidate);
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  return { currentStep, totalSteps, methods, handleNext, handlePrev };
}
```

---

## Technical Specifications & UI Layout (`page.tsx`)

### 1. Main Form Layout Canvas

- **Container Frame:** Centers content blocks cleanly for focused multi-step entries (`max-w-2xl mx-auto px-6 py-10 space-y-8`).
- **Header Typographic Block:** Left-aligned administrative typography configuration stack:
- Master Title: `Provision New Doctor` (`text-2xl font-bold text-text-primary tracking-tight`).
- Caption Subtext: `Setup global authentication credentials, assign medical licenses, and define consulting parameters.` (`text-sm text-text-secondary mt-1`).

---

### 2. Multi-Step Progress Tracker Component

A clean, horizontal progress track showing the step state immediately below the title section:

- **Visual Row Framework:** `flex items-center justify-between relative w-full mb-8 border-b border-border-default pb-4`.
- **Step Milestone Node State Wrapper:** (`flex items-center gap-3`):
- **Active Step Indicator:** A round accent tag layout bubble (`w-7 h-7 rounded-full bg-accent-primary text-white text-xs font-bold flex items-center justify-center`). Labeled with structural numeric constants `1`, `2`, or `3`.
- **Inactive Step Indicator:** Fallback circle element state (`w-7 h-7 rounded-full bg-bg-base border border-border-default text-text-secondary text-xs font-medium flex items-center justify-center`).
- **Step Label Text:** Dynamic descriptor tags (`text-xs font-semibold text-text-primary` for active states, or `text-text-muted` for remaining nodes).
- _Step 1 label:_ `Login Info`
- _Step 2 label:_ `Clinical Identity`
- _Step 3 label:_ `Practice Rates`

---

### 3. Wizard Section Views Layout

The active form block displays components based on the progress tracker state (`space-y-6 bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm`):

#### View Step 1: Secure Account Credentials Provisioning

- **Input Block 1:** `InputField` tracking full account email access configurations.
- **Input Block 2:** `InputField` targeting safe alphanumeric temporary registration password values (`type="password"`).

#### View Step 2: Clinical Identity & Council Registration Details

- **Form Layout Structure Grid:** Dual column parameters stream (`grid grid-cols-1 sm:grid-cols-2 gap-5`).
- **Input Blocks:** Renders `InputField` mapping practitioners' professional titles, unique council validation certificates, specialized medical directory tags, and verified experience integers.

#### View Step 3: Base Practice Consultation Rates & Bio Summary

- **Input Block 1:** Financial input configuration prefixing standard country symbols (`NGN`) to declare base appointment costs.
- **Input Block 2:** `TextAreaField` housing general textual summaries outlining practice focus scopes.

---

## Action Controls Wizard Footer

A bottom utility row handling navigation controls across the step flow container framework (`flex items-center justify-between border-t border-border-default pt-6 mt-8`):

- **Left Action Group (Previous step control):** A button reading `Back` (`border border-border-default text-text-secondary hover:bg-bg-base text-xs font-semibold px-4 py-2 rounded-lg transition-all cursor-pointer`). Visible only when `currentStep > 1`, otherwise hidden.
- **Right Action Group (Advance / Finish step controls):**
- _Next Step Action Trigger:_ Visible when `currentStep < totalSteps`. Renders a crisp action button labeled `Continue` (`bg-accent-primary hover:opacity-90 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all shadow-sm cursor-pointer`).
- _Submit Registration Action Trigger:_ Renders when evaluating the final view page state. Displays a high-contrast execution asset button labeled `Complete Profile Creation` (`bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2 rounded-lg transition-all shadow-sm cursor-pointer`).

---

## Verification Criteria

- [ ] Advancing to a subsequent view segment executes validation passes limited strictly to fields visible within the current step container.
- [ ] Form primitives process error updates safely without breaking structural layout boundaries or introducing text layout jitter.
- [ ] Financial entry items cleanly format the proper native system currency text representations (`NGN`).
- [ ] The full form container changes structural columns cleanly when resized to thin device window configurations (`< 640px`).

```</DoctorFormValues></HTMLTextAreaElement></HTMLInputElement>

```
