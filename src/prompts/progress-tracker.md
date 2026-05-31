# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- Complete — Admin account & system settings workspace (Feature 24)

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
  - Added `src/lib/doctors/get-doctor-by-id.ts`, `booking-calendar.ts`, and `format-appointment-fee.ts` for profile lookup, week-day carousel data, and `NGN` fee formatting.
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

- Feature 13 (`features/13-provider-dashboard.md`):
  - Rebuilt provider shell: left sidebar (`w-64`, token-only active/secondary nav links) and merged header strip (`DoctorTap` + `Provider` badge, operational status toggle, Clerk `SignOutButton` logout).
  - Built provider dashboard at `src/app/(provider)/provider/dashboard/page.tsx`: three metric cards (`NGN 1000` earnings, `2` appointments, `5` patients) and `Latest Bookings` feed.
  - Added `src/lib/provider/provider-dashboard.ts` with mock metrics and queue rows; `provider-dashboard-metrics.tsx`, `provider-latest-bookings.tsx`, and `queue-row.tsx` (reject action toast placeholder).
  - Removed standalone `provider-status-header.tsx`; presence toggle lives in `provider-header.tsx`.
  - Added provider dashboard SEO: `buildProviderDashboardMetadata` (`src/lib/seo/provider-dashboard-metadata.ts`) and `ProviderDashboardJsonLd` with `noindex` for the authenticated portal route.
  - Verified production build succeeds (`npm run build`, `/provider/dashboard` static).

- Feature 14 (`features/14-provider-calendar.md`):
  - Built provider calendar at `src/app/(provider)/provider/calendar/page.tsx`: split-screen scheduling workspace (`lg:grid-cols-12`), header typography block, mini month grid, batch slot generator (start/end selects, 30/45/60 min intervals), and active slots grid.
  - Added `src/lib/provider/provider-calendar.ts` with `MOCK_PROVIDER_SLOTS`, slot generation/merge helpers, and calendar month/week utilities.
  - Added `src/components/provider/calendar/provider-calendar-workspace.tsx`, `slot-pill.tsx` (active delete-on-hover pills; booked slots locked with muted styling).
  - Calendar sidebar active state via existing pathname-driven `ProviderSidebar` (`/provider/calendar`).
  - Added provider calendar SEO: `buildProviderCalendarMetadata` (`src/lib/seo/provider-calendar-metadata.ts`) and `ProviderCalendarJsonLd` with `noindex` for the authenticated portal route.
  - Verified production build succeeds (`npm run build`, `/provider/calendar` static).

- Feature 15 (`features/15-patients-ui.md`):
  - Built provider patients directory at `src/app/(provider)/provider/patients/page.tsx`: header typography block, search/filter toolbar (name/ID/condition lookup, sort by recent activity/name/total visits, status filter), and responsive three-column patient card grid.
  - Added `src/lib/provider/provider-patients.ts` with type-safe `MOCK_PROVIDER_PATIENTS`, visit-count map for sort, and client-side filter/sort helpers.
  - Added `src/components/provider/patients/patient-card.tsx` (profile row, diagnosis flag, Active Treatment/Discharged badges, chart/history action placeholders) and `provider-patients-workspace.tsx` (search + dual select controls, filtered grid).
  - Patients sidebar active state via existing pathname-driven `ProviderSidebar` (`/provider/patients`).
  - Added provider patients SEO: `buildProviderPatientsMetadata` (`src/lib/seo/provider-patients-metadata.ts`) and `ProviderPatientsJsonLd` with `noindex` for the authenticated portal route.
  - Extended patients directory: URL-synced filters (`search`, `sort`, `status`, `page`) via `ProviderPatientFiltersProvider`, 28 mock patients with 15-per-page pagination, analytics charts (`BaseChart` + `ProviderPatientsCharts`), and `capitalize` select labels.
  - Verified production build succeeds (`npm run build`, `/provider/patients` dynamic with search params).

- Provider components folder cleanup:
  - Grouped feature modules under `src/components/provider/{calendar,dashboard,patients,payouts}/`; shared shell (`provider-layout`, header, sidebar, bottom nav) remains at the provider root.

- Feature 16 (`features/16-provider-payouts.md`):
  - Built provider payouts workspace at `src/app/(provider)/provider/payouts/page.tsx`: header typography block, three revenue summary cards (`NGN 4,500.00` withdrawable, `NGN 1,000.00` pending escrow, `NGN 24,000.00` lifetime earnings), Paystack settlement destination panel, and distribution ledger table.
  - Added `src/lib/provider/provider-payouts.ts` with `MOCK_PROVIDER_PAYOUTS`, settlement bank constants, and status formatting helpers.
  - Added `src/components/provider/payouts/` (`provider-payouts-workspace`, summary cards, settlement destination, distribution ledger table, instant payout/update bank action placeholders).
  - Payouts sidebar active state via existing pathname-driven `ProviderSidebar` (`/provider/payouts`); ledger table wrapped in `overflow-x-auto` for small viewports; PAID/PROCESSING status pills use emerald/amber treatments per spec.
  - Added provider payouts SEO: `buildProviderPayoutsMetadata` (`src/lib/seo/provider-payouts-metadata.ts`) and `ProviderPayoutsJsonLd` with `noindex` for the authenticated portal route.
  - Extended distribution ledger: URL-synced `?page=` pagination (5 per page) via `parseProviderPayoutsPage` / `paginateProviderPayouts`, `ProviderPayoutsPagination` link toolbar, 12 mock ledger rows, and page-aware SEO metadata/canonical URLs.
  - Verified production build succeeds (`npm run build`, `/provider/payouts` dynamic with search params).

- Feature 17 (`features/17-provider-profile.md`):
  - Built provider profile settings workspace at `src/app/(provider)/provider/profile/page.tsx`: `Profile Settings` header block, `Public Practice Details` card (avatar + change photo action, two-column form for name/council ID/specialty/experience, bio textarea), and `Practice Pricing Rules` card with `₨`-prefixed base consultation fee input.
  - Added `src/lib/provider/provider-profile.ts` with `MOCK_PROVIDER_PROFILE` (Dr. Ram Nepal, NMC-8821B, General Physician, 8 years, `1000.00` fee), `REGIONAL_CURRENCY_SYMBOL`, and specialty options from shared mock data.
  - Added `src/components/provider/profile/` (`provider-profile-workspace`, `provider-profile-json-ld`) with cancel/save and photo-upload toast placeholders until DB and cloud storage integration.
  - Profile sidebar active state via existing pathname-driven `ProviderSidebar` (`/provider/profile`); responsive form grid collapses to single column below `640px`.
  - Added provider profile SEO: `buildProviderProfileMetadata` (`src/lib/seo/provider-profile-metadata.ts`) and `ProviderProfileJsonLd` with `noindex` for the authenticated portal route.
  - Verified production build succeeds (`npm run build`, `/provider/profile` static).

- Feature 18 (`features/18-admin-dashboard.md`):
  - Admin shell retains the original grouped layout (top header bar, left sidebar with active rail, bottom nav on mobile); dashboard workspace content added without changing the shared admin layout structure.
  - Built admin system dashboard at `src/app/(admin)/admin/dashboard/page.tsx`: `System dashboard` header block, three telemetry metric cards (`24` doctors, `142` appointments, `380` patients), and `Recent Consultations` ledger table with emerald/amber status pills and `NGN` amounts.
  - Added `src/lib/admin/admin-dashboard.ts` with aggregate constants and `MOCK_ADMIN_TELEMETRY`; added `src/components/admin/dashboard/` (`admin-dashboard-metrics`, `admin-recent-consultations-table`, `admin-dashboard-json-ld`).
  - Dashboard sidebar active state via existing pathname-driven `AdminSidebar` (`/admin/dashboard`); metric grid collapses to single column below `md`; ledger table wrapped in `overflow-x-auto` for compact viewports.
  - Added admin dashboard SEO: `buildAdminDashboardMetadata` (`src/lib/seo/admin-dashboard-metadata.ts`) and `AdminDashboardJsonLd` with `noindex` for the authenticated portal route.
  - Verified production build succeeds (`npm run build`, `/admin/dashboard` static).

- Feature 19 (`features/19-admin-verification.md`):
  - Built admin provider verification workspace at `src/app/(admin)/admin/verification/page.tsx`: `Provider Verification` header block, three onboarding metrics cards (`8` pending, `24` approved, `32` total registrations), and stacked verification application queue with approve/reject actions.
  - Added `src/lib/admin/admin-verification.ts` with `MOCK_PENDING_VERIFICATIONS` (8 pending rows), filter/sort/pagination helpers, and aggregate metric constants; added `src/lib/admin/parse-verification-filters.ts` for URL `search`, `specialty`, `sort`, and `page` parsing.
  - Added `src/components/admin/verification/` (`verification-card`, `admin-verification-metrics`, `admin-verification-workspace`, `admin-verification-filters-provider`, `admin-verification-pagination`, `admin-verification-json-ld`).
  - Verification sidebar active state via existing pathname-driven `AdminSidebar` (`/admin/verification`); request cards use token-only surfaces with red reject and emerald approve controls; layout collapses to vertical stacks below `lg`.
  - Added admin verification SEO: `buildAdminVerificationMetadata` (`src/lib/seo/admin-verification-metadata.ts`) and `AdminVerificationJsonLd` with `noindex` for the authenticated portal route.
  - Extended verification queue: URL-synced search/specialty/sort/page filters, 5-per-page pagination, and page-aware SEO metadata/canonical URLs.
  - Verified production build succeeds (`npm run build`, `/admin/verification` dynamic with search params).

- Feature 20 (`features/20-admin-appointments.md`):
  - Built admin global appointments workspace at `src/app/(admin)/admin/appointments/page.tsx`: `Global Appointments` header block, URL-synced status/tier filter toolbar, high-density appointment ledger table with VIP/Premium tier badges and `₨` consultation fees, and prev/next pagination (`Showing 1-10 of 142 appointments`).
  - Added `src/lib/admin/admin-appointments.ts` with `MOCK_ADMIN_APPOINTMENTS_PAGE_1`, 142-row mock dataset, filter/pagination helpers, and `ADMIN_APPOINTMENTS_PAGE_SIZE` (10); added `src/lib/admin/parse-appointment-filters.ts` for URL `status`, `tier`, and `page` parsing.
  - Added `src/components/admin/appointments/` (`admin-appointments-workspace`, filters provider, table, pagination, json-ld); filter toolbar and table sheet use white card surfaces (`bg-white`).
  - Appointments sidebar active state via existing pathname-driven `AdminSidebar` (`/admin/appointments`); table wrapped in `overflow-x-auto` for compact viewports.
  - Added admin appointments SEO: `buildAdminAppointmentsMetadata` (`src/lib/seo/admin-appointments-metadata.ts`) and `AdminAppointmentsJsonLd` with `noindex` and page-aware canonical URLs.
  - Updated `ADMIN_NAV_ITEMS` and `ADMIN_ROUTES` with `/admin/appointments` between Verification and Users.
  - Extended appointments workspace: shadcn `Select` filters, numbered pagination (Prev / page numbers / Next), `NGN` fee formatting, row-click appointment details dialog with `BaseChart` analytics, and smooth scroll-to-top on page change via `#admin-main-content`.

- Feature 21 (`features/21-admin-doctors.md`):
  - Built admin doctors management workspace at `src/app/(admin)/admin/doctors/page.tsx`: `Doctors Management` header block, URL-synced search/specialty/status filter toolbar, `Add Doctor Account` link to `/admin/doctors/new`, high-density doctors directory table with `₨` consultation fees, prev/next pagination (`Showing 1-10 of 24 doctors`), and side drawer details overlay.
  - Added `src/lib/admin/admin-doctors.ts` with `MOCK_ADMIN_DOCTORS_PAGE_1`, 24-row mock dataset, filter/pagination helpers, and `ADMIN_DOCTORS_PAGE_SIZE` (10); added `src/lib/admin/parse-doctor-filters.ts` for URL `search`, `specialty`, `status`, and `page` parsing.
  - Added `src/components/admin/doctors/` (`admin-doctors-workspace`, filters provider, table, pagination, details drawer, json-ld); filter toolbar and table use token surfaces (`bg-bg-surface`).
  - Doctors sidebar active state via existing pathname-driven `AdminSidebar` (`/admin/doctors`); table wrapped in `overflow-x-auto` for compact viewports; `View Details` opens right-side drawer with credentials and session logs.
  - Added admin doctors SEO: `buildAdminDoctorsMetadata` and `buildAdminDoctorsNewMetadata` (`src/lib/seo/admin-doctors-metadata.ts`) with `AdminDoctorsJsonLd` / `AdminDoctorsNewJsonLd` and `noindex` page-aware canonical URLs.
  - Updated `ADMIN_NAV_ITEMS` and `ADMIN_ROUTES`: replaced legacy `Users` nav node with `Doctors` (`Stethoscope` icon) between Appointments and Payouts; added `/admin/doctors/new` provisioning placeholder page.
  - Verified production build succeeds (`npm run build`, `/admin/doctors` dynamic with search params).
  - Refined doctors workspace: white filter/table card surfaces, shadcn pagination with `accent-primary` active page, `NGN` consultation fees, scrollable details drawer with doctor profile section (avatar + bio), and tighter mobile padding (`p-3`).

- Feature 22 (`features/22-admin-add-doctor.md`):
  - Built admin doctor provisioning wizard at `src/app/(admin)/admin/doctors/new/page.tsx`: `Provision New Doctor` header block, three-step progress tracker (`Login Info`, `Clinical Identity`, `Practice Rates`), step-scoped validation, and white workspace canvas with tight mobile padding (`px-3`).
  - Added `src/components/core/form-fields.tsx` (`InputField`, `TextAreaField`) with token-driven error borders and messages.
  - Added `src/components/admin/doctors/hooks/use-doctor-stepper.ts` with Zod `doctorCreationSchema`, react-hook-form resolver, and per-step `trigger` boundaries.
  - Added `src/components/admin/doctors/new/` (`admin-doctor-provisioning-workspace`, `admin-doctors-new-json-ld`, `doctor-profile-photo-upload`): step connectors, plain-language labels/placeholders, taller inputs, clinical identity profile photo upload (JPG/PNG/WebP, max 1.5 MB client validation), credential step, clinical identity grid (`sm:grid-cols-2`), `NGN`-prefixed fee input, bio textarea, Back/Continue/Complete footer controls, and submit success toast placeholder until Clerk + Prisma integration.
  - Installed `react-hook-form`, `zod`, and `@hookform/resolvers`.
  - Updated admin add-doctor SEO: `buildAdminDoctorsNewMetadata` title/description aligned to provisioning copy; `AdminDoctorsNewJsonLd` with `noindex`.
  - Verified production build succeeds (`npm run build`, `/admin/doctors/new` static with client wizard island).

- Feature 23 (`features/23-admin-payouts.md`):
  - Built admin platform payouts workspace at `src/app/(admin)/admin/payouts/page.tsx`: `Platform Payouts & Escrow` header block, three global financial metric cards (`₨` escrow, pending queue, lifetime settled), two-column operations layout (awaiting clearance settlement ticket + system dispatches ledger table).
  - Added `src/lib/admin/admin-payouts.ts` with `MOCK_ADMIN_PAYOUT_LEDGER`, `MOCK_ADMIN_PENDING_PAYOUT`, aggregate `₨` constants, and gateway status formatting helpers.
  - Added `src/components/admin/payouts/` (`admin-payouts-workspace`, `admin-payouts-metrics`, `admin-pending-payout-request`, `admin-pending-payout-actions`, `admin-system-dispatches-table`, `admin-payouts-json-ld`); Hold/Release Funds actions surface Sonner toasts until Paystack integration.
  - Payouts sidebar active state via existing pathname-driven `AdminSidebar` (`/admin/payouts`); ledger table wrapped in `overflow-x-auto` for compact viewports; Dispatched/Failed status pills use emerald/rose treatments per spec.
  - Added admin payouts SEO: `buildAdminPayoutsMetadata` (`src/lib/seo/admin-payouts-metadata.ts`) and `AdminPayoutsJsonLd` with `noindex` for the authenticated portal route.
  - Extended payouts workspace: white card/table surfaces, `NGN` currency formatting, URL-synced `?page=` pagination (5 rows per page, 12 mock ledger rows), row-click `AdminDispatchDetailsDialog` with Release Funds/Cancel/Close for pending dispatches, compact mobile padding (`p-3`).
  - Verified production build succeeds (`npm run build`, `/admin/payouts` dynamic with search params).

- Feature 24 (`features/24-admin-settings.md`):
  - Rebuilt admin top header (`src/components/admin/admin-header.tsx`): token-driven utility bar (`bg-bg-surface`, `px-8 py-4`), Clerk `SignOutButton` logout moved into shadcn `DropdownMenu` avatar trigger (`admin-header-user-menu.tsx`) with `System Administrator` label, `Profile Settings` link to `/admin/settings`, and logout action; settings route intentionally excluded from sidebar nav.
  - Built admin settings workspace at `src/app/(admin)/admin/settings/page.tsx`: `Account & System Settings` header block, three card sections (`Personal Profile Identity`, `Credential Management`, `Application Information`), react-hook-form + Zod validation via reusable `InputField`/`TextAreaField`, and Cancel/Apply footer controls with toast placeholders until DB integration.
  - Added `src/lib/admin/admin-settings.ts` with `MOCK_ADMIN_SETTINGS` defaults (`Admin Supervisor`, `system.admin@doctortap.com`, `DoctorTap Platform`); added `src/components/admin/settings/` (`admin-settings-workspace`, `admin-settings-json-ld`).
  - Installed shadcn `dropdown-menu` primitive (`src/components/ui/dropdown-menu.tsx`).
  - Added admin settings SEO: `buildAdminSettingsMetadata` (`src/lib/seo/admin-settings-metadata.ts`) and `AdminSettingsJsonLd` with `noindex` for the authenticated portal route.
  - Updated `ADMIN_ROUTES` with `/admin/settings`.
  - Verified production build succeeds (`npm run build`, `/admin/settings` static with client form island).

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
- **Domain layout folders:** Layout chrome lives in `src/components/{auth,public,patient,provider,admin}/`; provider feature UI is grouped under `src/components/provider/{calendar,dashboard,patients,payouts,profile}/` with shared shell components at the provider root; shared UI such as `PageHeading` lives outside in `src/components/page-heading/`.
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
- **Provider dashboard workspace (Feature 13):** `/provider/dashboard` renders mock practice metrics (`NGN` earnings, appointment/patient counts) and a latest-bookings queue from `lib/provider/provider-dashboard.ts`; sidebar/header shell uses pathname-driven active nav and inline online/offline toggle; queue reject uses client toast placeholder until Prisma.
- **Provider calendar workspace (Feature 14):** `/provider/calendar` renders mock availability from `lib/provider/provider-calendar.ts` with date-keyed slot state, mini month picker, batch slot generator, weekly copy action, and `SlotPill` delete/booked UX; SEO uses `noindex` metadata and JSON-LD like other portal routes until Prisma sync.
- **Provider patients directory (Feature 15):** `/provider/patients` renders mock patient cards from `lib/provider/provider-patients.ts` with URL-synced search/sort/status/page filters, 15-per-page pagination, `BaseChart` analytics panel, `PatientCard` diagnosis and status badges, and chart/history toast placeholders; SEO uses `noindex` metadata and JSON-LD like other portal routes until Prisma sync.
- **Provider payouts workspace (Feature 16):** `/provider/payouts` renders mock revenue summary cards and paginated `MOCK_PROVIDER_PAYOUTS` ledger from `lib/provider/provider-payouts.ts` (URL `?page=` sync, 5 rows per page) with Paystack settlement destination panel, emerald/amber status pills, horizontal table overflow guard, and instant payout/update bank toast placeholders; SEO uses page-aware `noindex` metadata and JSON-LD like other portal routes until Paystack integration.
- **Provider profile settings (Feature 17):** `/provider/profile` renders mock practitioner profile data from `lib/provider/provider-profile.ts` with `Public Practice Details` and `Practice Pricing Rules` cards, `₨`-prefixed base fee input, specialty select from shared mock specialties, and cancel/save/photo-upload toast placeholders; SEO uses `noindex` metadata and JSON-LD like other portal routes until Prisma and cloud storage integration.
- **Admin system dashboard (Feature 18):** `/admin/dashboard` renders mock platform telemetry from `lib/admin/admin-dashboard.ts` (doctor/appointment/patient aggregates and `MOCK_ADMIN_TELEMETRY` consultation ledger) with token-only metric cards, emerald/amber status pills, and `NGN` processing amounts; uses the existing admin grouped layout shell; SEO uses `noindex` metadata and JSON-LD like other portal routes until Prisma sync.
- **Admin provider verification (Feature 19):** `/admin/verification` renders mock onboarding metrics and `MOCK_PENDING_VERIFICATIONS` queue from `lib/admin/admin-verification.ts` with URL-synced search/specialty/sort/page filters (5 rows per page), `VerificationCard` license document links, and approve/reject toast placeholders; SEO uses page-aware `noindex` metadata and JSON-LD like other portal routes until Prisma sync.
- **Admin global appointments (Feature 20):** `/admin/appointments` renders mock platform booking ledger from `lib/admin/admin-appointments.ts` (142 rows, URL-synced `status`/`tier`/`page` filters, 10 rows per page) with white filter/table card surfaces, VIP/Premium amber tier badges, `₨` fee formatting, emerald/amber/red status pills, and prev/next pagination footer; SEO uses page-aware `noindex` metadata and JSON-LD like other portal routes until Prisma sync.
- **Admin doctors management (Feature 21):** `/admin/doctors` renders mock practitioner directory from `lib/admin/admin-doctors.ts` (24 rows, URL-synced `search`/`specialty`/`status`/`page` filters, 10 rows per page) with `Add Doctor Account` provisioning link, emerald/red status pills, `NGN` fee formatting, prev/next pagination footer, and side drawer profile overlay; SEO uses page-aware `noindex` metadata and JSON-LD like other portal routes until Prisma sync.
- **Admin add doctor wizard (Feature 22):** `/admin/doctors/new` renders a three-step react-hook-form + Zod provisioning wizard from `components/admin/doctors/hooks/use-doctor-stepper.ts` and `components/admin/doctors/new/` with reusable `form-fields` primitives, step connector lines, plain-language field labels/placeholders, `NGN`-prefixed consultation fee input, specialty select from shared mock specialties, white card surfaces, compact mobile container padding, and Complete submit toast placeholder until Clerk and Prisma integration; SEO uses `noindex` metadata and JSON-LD like other portal routes.
- **Admin platform payouts (Feature 23):** `/admin/payouts` renders mock global escrow metrics and paginated `MOCK_ADMIN_PAYOUT_LEDGER` from `lib/admin/admin-payouts.ts` with `NGN` currency formatting, white card surfaces, awaiting-clearance settlement ticket (Dr. Ram Nepal), dispatch details modal with pending Release/Cancel actions, and system dispatches table with emerald/amber/rose gateway status pills; SEO uses page-aware `noindex` metadata and JSON-LD like other portal routes until Paystack integration.
- **Admin account & system settings (Feature 24):** `/admin/settings` renders mock root supervisor profile and application metadata from `lib/admin/admin-settings.ts` with three card sections (profile identity, credential rotation, application information), react-hook-form + Zod validation via shared `form-fields` primitives, Cancel/Apply toast placeholders, and header avatar dropdown navigation (not sidebar); SEO uses `noindex` metadata and JSON-LD like other portal routes until Prisma and Clerk credential sync.

## Session Notes

- All grouped routes compile as static placeholders except `/doctors`, `/doctors/[id]`, `/patient/dashboard`, `/sign-in`, and `/sign-up` (dynamic); `/patient/appointments`, `/patient/billing`, `/provider/dashboard`, `/provider/calendar`, `/provider/profile`, `/admin/dashboard`, `/admin/doctors/new`, and `/admin/settings` are static with client islands; `/provider/patients`, `/provider/payouts`, `/admin/verification`, `/admin/appointments`, `/admin/payouts`, and `/admin/doctors` are dynamic via `searchParams` with client filter/pagination islands.
- Provider presence toggle is a client island in `components/provider/provider-header.tsx`; route protection is active via Clerk proxy.
- Resume with Prisma + PostgreSQL scaffolding from `architecture-context.md`.
