import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Briefcase, Mail, MapPin, Phone } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  PUBLIC_CONTACT_CAREERS,
  PUBLIC_CONTACT_OFFICE,
  PUBLIC_FOOTER_CONTACT,
} from "@/config/constants/public/routes";
import { cn } from "@/lib/utils";

const CONTACT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1576766125535-b04e15fd0273?q=80&w=1200&auto=format&fit=crop";

interface ContactDetailItemProps {
  icon: typeof MapPin;
  label: string;
  children: ReactNode;
}

function ContactDetailItem({ icon: Icon, label, children }: ContactDetailItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10">
        <Icon className="h-4 w-4 text-accent-primary" aria-hidden="true" />
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-text-primary">{label}</p>
        <div className="text-sm leading-relaxed text-text-secondary">{children}</div>
      </div>
    </div>
  );
}

export function ContactHeroSection() {
  const phoneHref = `tel:${PUBLIC_FOOTER_CONTACT.phone.replace(/[^\d+]/g, "")}`;

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-center text-3xl font-light tracking-wide text-text-muted">
        CONTACT <span className="font-bold text-text-primary">US</span>
      </h1>

      <div className="mt-12 grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="relative aspect-square w-full min-h-72 overflow-hidden rounded-2xl border border-border-default shadow-xl sm:min-h-80 lg:min-h-0">
          <Image
            src={CONTACT_HERO_IMAGE}
            alt="Healthcare professional providing patient care in a clinical setting"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-10 lg:py-2">
          <div className="space-y-6">
            <h2 className="text-lg font-semibold tracking-wider text-text-primary uppercase">
              Our Office
            </h2>

            <div className="space-y-5">
              <ContactDetailItem icon={MapPin} label="Address">
                <p>{PUBLIC_CONTACT_OFFICE.addressLines[0]}</p>
                <p>{PUBLIC_CONTACT_OFFICE.addressLines[1]}</p>
              </ContactDetailItem>

              <ContactDetailItem icon={Phone} label="Telephone">
                <a
                  href={phoneHref}
                  className="transition-colors hover:text-accent-primary"
                >
                  {PUBLIC_FOOTER_CONTACT.phone}
                </a>
              </ContactDetailItem>

              <ContactDetailItem icon={Mail} label="Email">
                <a
                  href={`mailto:${PUBLIC_FOOTER_CONTACT.email}`}
                  className="transition-colors hover:text-accent-primary"
                >
                  {PUBLIC_FOOTER_CONTACT.email}
                </a>
              </ContactDetailItem>
            </div>
          </div>

          <div className="space-y-4 border-t border-border-default pt-10">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-primary/10">
                <Briefcase
                  className="h-4 w-4 text-accent-primary"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-3">
                <h2 className="text-lg font-semibold tracking-wider text-text-primary uppercase">
                  Careers at DoctorTap
                </h2>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Learn more about our teams and job openings.
                </p>
                <Link
                  href={`mailto:${PUBLIC_CONTACT_CAREERS.email}`}
                  className={cn(
                    buttonVariants({ variant: "outline", size: "sm" }),
                    "mt-2 inline-flex",
                  )}
                >
                  Explore Jobs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
