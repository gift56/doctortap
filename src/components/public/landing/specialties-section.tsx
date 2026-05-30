import Image from "next/image";
import Link from "next/link";

import { ScrollReveal } from "@/components/public/scroll-reveal";
import { SPECIALTIES } from "@/config/mock-data";
import { PUBLIC_ROUTES } from "@/config/constants/public/routes";
import { cn } from "@/lib/utils";

const SPECIALTY_ICON_PATHS: Record<string, string> = {
  "general-physician": "/svgs/physician.svg",
  gynecologist: "/svgs/gynecologist.svg",
  dermatologist: "/svgs/dermatologist.svg",
  pediatrician: "/svgs/pediatrician.svg",
  neurologist: "/svgs/neurologist.svg",
  gastroenterologist: "/svgs/gastroenterologist.svg",
};

export function SpecialtiesSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
          Find by Speciality
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
          Simply browse through our list of trusted healthcare professionals and
          find the right specialist for your needs.
        </p>
      </ScrollReveal>

      <ul className="mt-10 flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-10">
        {SPECIALTIES.map((specialty, index) => {
          const iconPath =
            SPECIALTY_ICON_PATHS[specialty.id] ?? "/svgs/physician.svg";

          return (
            <li key={specialty.id}>
              <ScrollReveal delay={index * 80}>
                <Link
                  href={`${PUBLIC_ROUTES.doctors}?specialty=${specialty.slug}`}
                  className="group flex w-24 flex-col items-center gap-3 sm:w-34"
                >
                  <span
                    className={cn(
                      "flex h-16 w-16 items-center justify-center transition-[transform,box-shadow] duration-300",
                      "group-hover:scale-105 sm:size-30",
                    )}
                  >
                    <Image
                      src={iconPath}
                      alt=""
                      width={72}
                      height={72}
                      className="h-full w-full object-contain"
                      aria-hidden
                    />
                  </span>
                  <span className="text-center text-xs font-medium text-text-primary sm:text-sm">
                    {specialty.name}
                  </span>
                </Link>
              </ScrollReveal>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
