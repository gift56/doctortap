# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Complete — Patient billing workspace (Feature 12)

## Current Goal

- Scaffold Prisma + PostgreSQL from `architecture-context.md`.

## Completed

- Boilerplate reset (`features/reset-nextjs.md`):
  - Stripped `src/app/globals.css` down to the Tailwind directive only (`@import "tailwindcss";`).
  - Removed public SVG assets (`vercel.svg`, `file.svg`, `window.svg`). No favicon was present in `public/` to preserve.
  - Replaced `src/app/page.tsx` with a minimal centered placeholder rendering "Doctor Tap WEBSITE".
  - Verified production build succeeds (`npm run build`).

- Feature 01:
  - Added Plus Jakarta Sans and JetBrains Mono `woff2` files under `public/fonts/`.
  - `public/fonts/index.ts` exports `plusJakartaSans` and `jetbrainsMono` via `next/font/google`; layout imports from `@/fonts`.
  - Configured light-mode tokens from `ui-context.md` in `src/app/globals.css` via Tailwind v4 `@theme` / `@theme inline` only (no `:root` defaults).
  - Added `cn()` helper in `src/lib/utils.ts` (`clsx` + `tailwind-merge`).
  - Initialized shadcn/ui and added primitives: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea, Pagination, Skeleton, Sonner, Select, Table, Badge, Avatar, Accordion.
  - Installed `lucide-react`; added `Providers` with forced light theme and `Toaster`.
  - Verified production build succeeds (`npm run build`).

- Feature 02:
  - Added five App Router route groups: `(public)`, `(auth)`, `(patient)`, `(provider)`, `(admin)` with isolated layout shells under `src/components/{auth,public,patient,provider,admin}/`.
  - Public routes: `/`, `/about`, `/contact`, `/doctors`, `/doctor/[id]` with fixed blur header nav and footer.
  - Auth routes: `/login`, `/register`, `/register/provider` with centered auth shell.
  - Patient routes: `/patient/dashboard`, `/patient/appointments`, `/patient/billing` with top navigation shell.
  - Provider routes: `/provider/dashboard`, `/provider/calendar`, `/provider/patients`, `/provider/payouts`, `/provider/profile` with left sidebar and online/offline status header.
  - Admin routes: `/admin/dashboard`, `/admin/verification`, `/admin/users`, `/admin/payouts` with admin sidebar and system status strip.
  - Removed root `src/app/page.tsx`; landing page lives at `src/app/(public)/page.tsx`.
  - Verified production build succeeds (`npm run build`, 22 routes).

- Feature 03 (`features/03-landing-page-ui.md`):
  - Added `src/config/mock-data.ts` with 6 specialties and 10 mock doctors (Unsplash avatars, all `Available`).
  - Built landing sections: hero banner, specialty selector, top doctors grid, and bottom CTA banner (`src/components/public/landing/`).
  - Added reusable `DoctorCard` (`src/components/doctor-card.tsx`) and `ScrollReveal` on-scroll fade/slide animations with staggered grid delays.
  - Wired Next.js `Link` routes: book appointment → `/doctors`, doctor cards → `/doctor/[id]`, MORE → `/doctors`, create account → `/register`.
  - Updated public header: `DoctorTap` brand, `All Doctors` nav label, `Login` / `Create Account` actions.
  - Configured `images.remotePatterns` for `images.unsplash.com` in `next.config.ts`.
  - Verified production build succeeds (`npm run build`).

- Feature 04 (`features/04-all-doctors-ui.md`):
  - Added `src/hooks/use-doctor-filters.ts` syncing `search`, `specialty`, and `page` URL params via `router.push` (no full reload).
  - Built public doctors directory at `src/app/(public)/doctors/page.tsx` with sidebar specialty filters, search bar, responsive card grid, and pagination toolbar.
  - Added `src/components/public/doctors/` (directory shell, search input, specialty filters, pagination toolbar) and `src/lib/doctors/filter-doctors.ts` for client-side filter/pagination over mock data.
  - Updated `DoctorCard` styling: image overlay availability pill, spec typography, `rounded-t-xl` image frame.
  - Added `no-scrollbar` utility in `globals.css` for mobile horizontal specialty slider.
  - Verified production build succeeds (`npm run build`).

- Feature 05 (`features/05-doctor-profile-booking.md`):
  - Extended `src/config/mock-data.ts` with profile fields (`credentials`, `biography`, `appointmentFee`, `verified`), `BOOKING_TIME_SLOTS`, and Dr. Ganesh Lama as the primary mock profile.
  - Added `src/lib/doctors/get-doctor-by-id.ts`, `booking-calendar.ts`, and `format-appointment-fee.ts` for profile lookup, week-day carousel data, and `₨` fee formatting.
  - Built doctor profile page at `src/app/(public)/doctors/[id]/page.tsx` with unified header card, interactive booking panel (date carousel + time grid + submit), and related-doctors section.
  - Added `src/components/public/doctors/` profile modules: `doctor-profile-header.tsx`, `doctor-booking-panel.tsx`, `doctor-related-doctors.tsx`.
  - Verified production build succeeds (`npm run build`).

- Feature 06 (`features/06-about-us-page.md`):
  - Added `--text-secondary` token in `src/app/globals.css` for body copy typography on marketing sections.
  - Built About Us page at `src/app/(public)/about/page.tsx` with hero split row (team image + narrative + vision) and value grid section.
  - Added `src/components/ui/value-card.tsx` with hover micro-interactions and lucide icon accents.
  - Added `src/components/public/about/about-hero-section.tsx` and `why-choose-us-section.tsx` (Efficiency, Convenience, Personalization cards).
  - Added About page SEO: `buildAboutPageMetadata` (`title`, `description`, Open Graph, Twitter, canonical) and `AboutPageJsonLd` schema.
  - Verified production build succeeds (`npm run build`).

- Feature 07 (`features/07-contact-us-page.md`):
  - Built Contact Us page at `src/app/(public)/contact/page.tsx` with hero split row (clinical image + office details + careers CTA).
  - Added `src/components/public/contact/contact-hero-section.tsx` with lucide icon contact rows and outline `Explore Jobs` mailto action.
  - Extended `src/config/constants/public/routes.ts` with `PUBLIC_CONTACT_OFFICE` address lines and `PUBLIC_CONTACT_CAREERS` email.
  - Added Contact page SEO: `buildContactPageMetadata` (`title`, `description`, `keywords`, Open Graph image, canonical) and `ContactPageJsonLd` schema.
  - Verified production build succeeds (`npm run build`).

- Feature 09 (`features/09-auth-integration.md`):
  - Wrapped root layout in `ClerkProvider` with token-driven `clerkAppearance` (`src/lib/clerk/appearance.ts`) using CSS variables only (no hardcoded hex in Clerk config).
  - Added `src/proxy.ts` with `clerkMiddleware`: only `/patient`, `/provider`, and `/admin` routes require auth; public marketing and auth pages remain open; authenticated `/` redirects to `/patient/dashboard`.
  - Rebuilt auth shell as a two-panel light layout (`src/components/auth/auth-layout.tsx`): branding panel (MyDoctorApp, tagline, feature list) hidden on mobile; Clerk form centered on the right.
  - Added Clerk catch-all routes: `/sign-in/[[...sign-in]]` and `/sign-up/[[...sign-up]]` mounting `<SignIn />` and `<SignUp />` with no extra wrappers.
  - Replaced patient header logout placeholder with `<UserButton />`; sign-out redirect configured via `ClerkProvider` and `NEXT_PUBLIC_CLERK_AFTER_SIGN_OUT_URL=/sign-in`.
  - Updated public route constants and header CTAs from `/login` and `/register` to `/sign-in` and `/sign-up`; added Clerk URL env vars to `.env`.
  - Removed legacy placeholder pages at `/login` and `/register`.
  - Verified production build succeeds (`npm run build`, 20 routes + proxy).

- Feature 10 (`features/10-patient-profile.md`):
  - Rebuilt patient sub-header (`src/components/patient/patient-header.tsx`): `DoctorTap` + `Patient` badge, centered nav links (`Dashboard`, `Appointments`, `Billing`) with pathname-driven active pill styling, and Clerk `<UserButton />` on the right; token-only `bg-bg-surface` header shell.
  - Built patient dashboard at `src/app/(patient)/patient/dashboard/page.tsx`: `Health summary` title block, demographics card (`Patient Name`, phone, address, blood group), and `Edit Profile` secondary action (toast until DB).
  - Added `src/lib/patient/patient-profile.ts` (`resolvePatientProfile`) merging Clerk account fields with mock clinical placeholders; added `patient-health-summary-header.tsx`, `patient-profile-card.tsx`, and `patient-edit-profile-button.tsx`.
  - Aligned mobile breakpoint: center nav from `md` (`768px`), bottom nav hidden from `md`; main workspace uses `bg-bg-base` with single-column profile grid below `md`.
  - Verified production build succeeds (`npm run build`, `/patient/dashboard` dynamic).
  - Added patient dashboard SEO: `buildPatientDashboardMetadata` (`src/lib/seo/patient-dashboard-metadata.ts`) and `PatientDashboardJsonLd` with `noindex` for the authenticated portal route.

- Feature 11 (`features/11-patient-appointments.md`):
  - Built patient appointments page at `src/app/(patient)/patient/appointments/page.tsx`: `My Appointments` title block and vertical appointment feed from type-safe mock constants.
  - Added `src/lib/patient/patient-appointments.ts` with three mock rows (pending, payment required, paid) matching `screenshots/image_689cbe.png`.
  - Added `src/components/appointment-row.tsx`: provider avatar/metadata, date & time badge, and conditional action matrix (cancel-only, pay + cancel, paid badge + cancel) with responsive `sm:` flex collapse.
  - Placeholder cancel/pay actions surface Sonner toasts until database integration.
  - Verified production build succeeds (`npm run build`, `/patient/appointments` static).

- Feature 12 (`features/12-patient-billing.md`):
  - Built patient billing page at `src/app/(patient)/patient/billing/page.tsx`: `Billing & Statements` title block, three summary metric cards (outstanding balance, total paid fees, Paystack status), and payment history table.
  - Added `src/lib/patient/patient-billing.ts` with `MOCK_BILLING_INVOICES` and aggregate fee helper (`NGN 3,000.00` from three succeeded rows).
  - Added `src/components/patient/patient-billing-summary-cards.tsx`, `patient-billing-history-table.tsx`, and `patient-billing-download-receipt-button.tsx` (shadcn `Table`, status badges, PDF download toast placeholder).
  - Billing nav active state uses existing pathname-driven patient header (`/patient/billing`).
  - Verified production build succeeds (`npm run build`, `/patient/billing` static).

## In Progress

- None.

## Next Up

- Scaffold Prisma + PostgreSQL from `architecture-context.md`.

## Open Questions

- Database and API layers are documented but not yet initialized in the codebase.

## Architecture Decisions

- **Minimal reset baseline:** Keep the starter app stripped to a single Tailwind import and a placeholder home page until feature work begins, avoiding carryover from create-next-app boilerplate.
- **No public SVG assets yet:** Removed default Next.js/Vercel SVGs; brand assets will be added intentionally when UI work starts.
- **Light-default theme in `@theme`:** Semantic and shadcn tokens match `ui-context.md` and live in Tailwind `@theme inline` blocks; `:root` injection is avoided.
- **Public fonts module:** `public/fonts/index.ts` + WOFF2 assets; `@/fonts` path alias; `next/font/google` in layout.
- **shadcn/ui base-nova:** Primitives generated via the official CLI into `components/ui/` and treated as protected files.
- **Domain layout folders:** Layout chrome lives in `src/components/{auth,public,patient,provider,admin}/`; shared UI such as `PageHeading` lives outside in `src/components/page-heading/`.
- **Landing mock data:** Marketing homepage reads from `src/config/mock-data.ts` until Prisma/DB integration; no backend dependency for Feature 03.
- **Scroll animations:** Lightweight `IntersectionObserver` client primitive (`ScrollReveal`) instead of adding a motion library; respects `motion-reduce`.
- **Doctors directory URL state:** `useDoctorFilters` owns `?search=`, `?specialty=`, and `?page=` for shareable filter/pagination; mock filtering in `lib/doctors/filter-doctors.ts` until API integration.
- **Doctor profile mock booking:** Profile pages read extended mock doctor records and client-side week/time selection; booking submit surfaces selected ISO date and time via Sonner toast until auth and API integration.
- **About page static content:** Marketing copy and value cards are hard-coded in section components; team hero image uses Unsplash remote asset per feature spec until Imagekit integration.
- **Contact page static content:** Office address, phone, email, and careers CTA are centralized in `config/constants/public/routes.ts`; hero image uses Unsplash remote asset per wireframe until Imagekit integration.
- **Clerk auth (Feature 09):** `src/proxy.ts` (not `middleware.ts`) protects dashboard route groups only (`/patient`, `/provider`, `/admin`); Clerk appearance uses design-system CSS variables; auth pages live at `/sign-in` and `/sign-up` with a split-panel onboarding layout.
- **Patient profile dashboard (Feature 10):** `/patient/dashboard` is a server-rendered health summary; demographics read Clerk identity fields with mock address/blood group until Prisma; header nav active state is pathname-driven; `Edit Profile` is a styled placeholder action.
- **Patient appointments list (Feature 11):** `/patient/appointments` renders mock appointment rows from `lib/patient/patient-appointments.ts`; `AppointmentRow` maps three payment states (pending, payment required, paid) with token-only styling; cancel/pay actions are client-side toast placeholders until Prisma.
- **Patient billing workspace (Feature 12):** `/patient/billing` renders financial summary cards and a mock invoice ledger from `lib/patient/patient-billing.ts`; succeeded/failed status badges and PDF receipt download use client toast placeholders until Paystack and storage integration.

## Session Notes

- All grouped routes compile as static placeholders except `/doctors`, `/doctors/[id]`, `/patient/dashboard`, `/sign-in`, and `/sign-up` (dynamic); `/patient/appointments` and `/patient/billing` are static with client islands per row/action.
- Provider presence toggle is a client island (`components/provider/provider-status-header.tsx`); route protection is active via Clerk proxy.
- Resume with Prisma + PostgreSQL scaffolding from `architecture-context.md`.
