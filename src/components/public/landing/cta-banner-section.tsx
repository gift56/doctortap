import Image from "next/image";
import Link from "next/link";

import { ScrollReveal } from "@/components/public/scroll-reveal";
import { LANDING_IMAGES } from "@/config/mock-data";
import { PUBLIC_ROUTES } from "@/config/constants/public/routes";
import { cn } from "@/lib/utils";

export function CtaBannerSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 pb-12 sm:px-6 sm:py-10 sm:pb-16">
      <ScrollReveal className="overflow-visible">
        <div className="relative overflow-visible pt-6 sm:pt-8 md:pt-10">
          <div className="relative z-0 flex min-h-44 items-center rounded-xl bg-accent-primary px-6 py-7 sm:min-h-48 sm:px-10 sm:py-8 md:min-h-52 md:px-12 lg:min-h-95">
            <div className="relative z-10 flex max-w-[52%] flex-col gap-4 sm:max-w-[48%] sm:gap-5 md:max-w-sm lg:max-w-md">
              <h2 className="text-xl font-bold leading-tight text-primary-foreground sm:text-2xl md:text-3xl lg:text-4xl lg:leading-[1.2]">
                Book Appointment
                <br />
                With 100+ Trusted Doctors
              </h2>
              <Link
                href={PUBLIC_ROUTES.register}
                className={cn(
                  "inline-flex w-fit rounded-full bg-primary-foreground px-6 py-2.5 text-sm font-semibold text-accent-primary transition-opacity hover:opacity-90 sm:px-7 sm:py-3",
                )}
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="pointer-events-none absolute right-2 bottom-0 z-10 h-[145%] w-[48%] max-w-64 sm:right-4 sm:max-w-80 md:right-6 md:h-[150%] md:max-w-96 lg:max-w-md xl:max-w-lg">
            <div className="relative h-full w-full origin-bottom">
              <Image
                src={LANDING_IMAGES.ctaBannerDoctor}
                alt="Smiling healthcare professional"
                fill
                sizes="(max-width: 640px) 48vw, (max-width: 1024px) 384px, 512px"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
