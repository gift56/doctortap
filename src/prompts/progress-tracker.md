# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Complete — Doctor profile & booking UI (Feature 05)

## Current Goal

- Scaffold core stack from `architecture-context.md` (Clerk auth, Prisma + PostgreSQL).

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
  - Updated public header: `MyDoctorApp` brand, `All Doctors` nav label, `Login` / `Create Account` actions.
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

## In Progress

- None.

## Next Up

- Scaffold core stack from `architecture-context.md` (Clerk auth, Prisma + PostgreSQL).

## Open Questions

- Database, auth, and API layers are documented but not yet initialized in the codebase.

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

## Session Notes

- All grouped routes compile as static placeholders except `/doctors` and `/doctors/[id]` (dynamic).
- Provider presence toggle is a client island (`components/provider/provider-status-header.tsx`); full auth-gated behavior waits on Clerk middleware.
- Resume with Clerk + Prisma scaffolding.
