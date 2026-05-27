import Link from "next/link";

import { AppLogo } from "@/components/core/app-logo/app-logo";
import {
  PUBLIC_FOOTER_COMPANY_LINKS,
  PUBLIC_FOOTER_CONTACT,
  PUBLIC_FOOTER_DESCRIPTION,
  PUBLIC_ROUTES,
} from "@/config/constants/public/routes";

export function PublicFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border-default bg-bg-base">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-3 md:gap-8">
        <div className="space-y-4">
          <AppLogo path={PUBLIC_ROUTES.home} />
          <p className="max-w-sm text-sm leading-relaxed text-text-muted">
            {PUBLIC_FOOTER_DESCRIPTION}
          </p>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-wide text-accent-primary uppercase">
            Company
          </p>
          <ul className="space-y-2.5">
            {PUBLIC_FOOTER_COMPANY_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-muted transition-colors hover:text-accent-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-wide text-accent-primary uppercase">
            Get in touch
          </p>
          <ul className="space-y-2.5 text-sm text-text-muted">
            <li>
              <a
                href={`tel:${PUBLIC_FOOTER_CONTACT.phone.replace(/[^\d+]/g, "")}`}
                className="transition-colors hover:text-accent-primary"
              >
                {PUBLIC_FOOTER_CONTACT.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${PUBLIC_FOOTER_CONTACT.email}`}
                className="transition-colors hover:text-accent-primary"
              >
                {PUBLIC_FOOTER_CONTACT.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border-default px-6 py-5">
        <p className="text-center text-xs text-text-muted">
          Copyright {year} @DoctorTap — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
