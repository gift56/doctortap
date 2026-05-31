"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

export const doctorCreationSchema = z.object({
  email: z.email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),

  avatarPreview: z.string().min(1, "Upload a profile photo"),
  avatarFileName: z.string().optional(),
  name: z.string().min(2, "Doctor name is required"),
  address1: z.string().min(2, "Address is required"),
  address2: z.string().optional(),
  councilId: z.string().min(4, "Council ID is required"),
  specialty: z.string().min(1, "Select a specialty"),
  experience: z.number().min(0, "Enter years of experience"),

  fee: z.number().min(100, "Fee must be at least NGN 100"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
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
      avatarPreview: "",
      avatarFileName: "",
      name: "",
      councilId: "",
      address1: "",
      address2: "",
      specialty: "",
      experience: 0,
      fee: 1000,
      bio: "",
    },
  });

  const stepFields: Record<number, (keyof DoctorFormValues)[]> = {
    1: ["email", "password"],
    2: [
      "avatarPreview",
      "name",
      "councilId",
      "specialty",
      "address1",
      "address2",
      "experience",
    ],
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
