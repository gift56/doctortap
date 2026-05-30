import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface AppLogoProps {
  path?: string;
  className?: string;
  badge?: string;
  brandName?: string;
}

export function AppLogo({
  path = "/",
  className,
  badge,
  brandName = "DoctorTap",
}: AppLogoProps) {
  return (
    <Link
      href={path}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <Image
        src="/icon.png"
        alt=""
        width={36}
        height={36}
        className="h-7 w-7 shrink-0 sm:h-9 sm:w-9"
        priority
      />
      <span className="text-base font-bold tracking-tight text-accent-primary sm:text-xl">
        {brandName}
      </span>
      {badge ? (
        <span className="hidden rounded-full border border-border-default bg-bg-base px-2.5 py-0.5 text-xs font-medium text-text-muted sm:inline-flex">
          {badge}
        </span>
      ) : null}
    </Link>
  );
}
