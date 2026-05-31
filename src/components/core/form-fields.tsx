import type {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { FieldLabel } from "@/components/core/field-label";
import { cn } from "@/lib/utils";

interface InputFieldProps<TFieldValues extends FieldValues>
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  registerOptions?: RegisterOptions<TFieldValues, Path<TFieldValues>>;
  error?: FieldError;
  required?: boolean;
  optional?: boolean;
}

export function InputField<TFieldValues extends FieldValues>({
  label,
  name,
  register,
  registerOptions,
  error,
  required = false,
  optional = false,
  id,
  ...props
}: InputFieldProps<TFieldValues>) {
  const inputId = id ?? String(name);

  return (
    <div className="w-full space-y-1.5">
      <FieldLabel
        htmlFor={inputId}
        label={label}
        required={required}
        optional={optional}
      />
      <input
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        {...register(name, registerOptions)}
        {...props}
        className={cn(
          "min-h-11 w-full rounded-lg border bg-bg-surface px-3 py-3 text-sm transition-all placeholder:text-text-muted focus:outline-none",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-border-default focus:border-accent-primary",
        )}
      />
      {error ? (
        <p className="text-xs font-medium text-red-500" role="alert">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}

interface TextAreaFieldProps<TFieldValues extends FieldValues>
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "name"> {
  label: string;
  name: Path<TFieldValues>;
  register: UseFormRegister<TFieldValues>;
  error?: FieldError;
  required?: boolean;
  optional?: boolean;
}

export function TextAreaField<TFieldValues extends FieldValues>({
  label,
  name,
  register,
  error,
  required = false,
  optional = false,
  id,
  ...props
}: TextAreaFieldProps<TFieldValues>) {
  const inputId = id ?? String(name);

  return (
    <div className="w-full space-y-1.5">
      <FieldLabel
        htmlFor={inputId}
        label={label}
        required={required}
        optional={optional}
      />
      <textarea
        id={inputId}
        aria-invalid={error ? true : undefined}
        aria-required={required || undefined}
        {...register(name)}
        {...props}
        rows={props.rows ?? 4}
        className={cn(
          "min-h-30 w-full resize-none rounded-lg border bg-bg-surface px-3 py-3 text-sm transition-all placeholder:text-text-muted focus:outline-none",
          error
            ? "border-red-500 focus:border-red-500"
            : "border-border-default focus:border-accent-primary",
        )}
      />
      {error ? (
        <p className="text-xs font-medium text-red-500" role="alert">
          {error.message}
        </p>
      ) : null}
    </div>
  );
}
