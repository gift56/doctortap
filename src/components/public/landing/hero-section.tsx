import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ScrollReveal } from "@/components/public/scroll-reveal";
import { DOCTORS, LANDING_IMAGES } from "@/config/mock-data";
import { PUBLIC_ROUTES } from "@/config/constants/public/routes";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const socialProofAvatars = DOCTORS.slice(0, 4);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <ScrollReveal>
        <div className="relative overflow-hidden rounded-xl bg-accent-primary">
          <div className="grid items-center gap-8 md:grid-cols-2 md:gap-6">
            <div className="relative z-10 flex flex-col gap-5 md:gap-6 px-6 py-8 sm:px-8 sm:py-10">
              <h1 className="text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Book Appointment With Trusted Doctors
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
                Simply browse through our extensive list of trusted doctors,
                schedule your appointment hassle-free.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex -space-x-2">
                  {socialProofAvatars.map((doctor) => (
                    <div
                      key={doctor.id}
                      className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-accent-primary ring-2 ring-primary-foreground/20 sm:h-10 sm:w-10"
                    >
                      <Image
                        src={doctor.avatarUrl}
                        alt=""
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-primary-foreground/90">
                  Trusted by thousands of patients
                </p>
              </div>

              <Link
                href={PUBLIC_ROUTES.doctors}
                className={cn(
                  "inline-flex w-fit items-center gap-2 rounded-full group bg-primary-foreground px-5 py-3 text-sm font-semibold text-accent-primary transition-opacity hover:opacity-90",
                )}
              >
                Book appointment
                <ArrowRight
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300"
                  aria-hidden
                />
              </Link>
            </div>

            <div className="relative flex justify-center md:justify-end sm:pt-14">
              <div className="relative aspect-4/3 w-full max-w-md md:max-w-none md:-mr-4 lg:-mr-8">
                <Image
                  src={LANDING_IMAGES.heroDoctorGroup}
                  alt="Team of trusted doctors"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain object-bottom"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
