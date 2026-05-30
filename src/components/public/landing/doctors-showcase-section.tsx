import Link from "next/link";

import { DoctorCard } from "@/components/doctor-card";
import { ScrollReveal } from "@/components/public/scroll-reveal";
import { DOCTORS } from "@/config/mock-data";
import { PUBLIC_ROUTES } from "@/config/constants/public/routes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function DoctorsShowcaseSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
          Top Doctors to Book
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted sm:text-base">
          Simply browse through our extensive list of trusted doctors and book
          your appointment with ease.
        </p>
      </ScrollReveal>

      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {DOCTORS.map((doctor, index) => (
          <li key={doctor.id}>
            <ScrollReveal
              delay={(index % 4) * 70 + Math.floor(index / 4) * 100}
            >
              <DoctorCard doctor={doctor} />
            </ScrollReveal>
          </li>
        ))}
      </ul>

      <ScrollReveal className="mt-10 flex justify-center" delay={120}>
        <Link
          href={PUBLIC_ROUTES.doctors}
          className={cn(
            buttonVariants({ variant: "secondary", size: "sm" }),
            "min-h-11 rounded-full hover:bg-accent-primary hover:text-white transition-all duration-300 px-10 text-xs font-semibold tracking-widest uppercase",
          )}
        >
          MORE
        </Link>
      </ScrollReveal>
    </section>
  );
}
