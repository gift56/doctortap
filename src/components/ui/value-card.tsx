import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface ValueCardProps {
  icon: LucideIcon;
  iconClassName: string;
  iconBgClassName: string;
  title: string;
  description: string;
  className?: string;
}

export function ValueCard({
  icon: Icon,
  iconClassName,
  iconBgClassName,
  title,
  description,
  className,
}: ValueCardProps) {
  return (
    <article
      className={cn(
        "transform rounded-xl border border-border-default bg-bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-primary hover:shadow-lg",
        className,
      )}
    >
      <div
        className={cn(
          "mb-4 flex h-12 w-12 items-center justify-center rounded-lg",
          iconBgClassName,
        )}
      >
        <Icon className={cn("h-6 w-6", iconClassName)} aria-hidden />
      </div>
      <h3 className="mb-2 text-sm font-bold tracking-wider text-text-primary uppercase">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-text-secondary">{description}</p>
    </article>
  );
}
