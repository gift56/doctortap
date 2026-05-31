import { cn } from "@/lib/utils";

interface FieldLabelProps {
  htmlFor?: string;
  label: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
}

export function FieldLabel({
  htmlFor,
  label,
  required = false,
  optional = false,
  className,
}: FieldLabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "flex flex-wrap items-center gap-1 text-xs font-semibold text-text-secondary",
        className,
      )}
    >
      <span>{label}</span>
      {required ? (
        <span className="text-red-500" aria-hidden>
          *
        </span>
      ) : null}
      {optional ? (
        <span className="font-normal text-text-muted">(optional)</span>
      ) : null}
      {required ? (
        <span className="sr-only">required</span>
      ) : optional ? (
        <span className="sr-only">optional</span>
      ) : null}
    </label>
  );
}
