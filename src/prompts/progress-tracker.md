# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress — App Router scaffolding (page grouping)

## Current Goal

- Scaffold core stack from `architecture-context.md` (Clerk auth, Prisma + PostgreSQL), then build the public marketing homepage per `project-overview.md`.

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

## In Progress

- None.

## Next Up

- Scaffold core stack from `architecture-context.md` (Clerk auth, Prisma + PostgreSQL).
- Build the public marketing homepage per `project-overview.md`.

## Open Questions

- Database, auth, and API layers are documented but not yet initialized in the codebase.

## Architecture Decisions

- **Minimal reset baseline:** Keep the starter app stripped to a single Tailwind import and a placeholder home page until feature work begins, avoiding carryover from create-next-app boilerplate.
- **No public SVG assets yet:** Removed default Next.js/Vercel SVGs; brand assets will be added intentionally when UI work starts.
- **Light-default theme in `@theme`:** Semantic and shadcn tokens match `ui-context.md` and live in Tailwind `@theme inline` blocks; `:root` injection is avoided.
- **Public fonts module:** `public/fonts/index.ts` + WOFF2 assets; `@/fonts` path alias; `next/font/google` in layout.
- **shadcn/ui base-nova:** Primitives generated via the official CLI into `components/ui/` and treated as protected files.
- **Domain layout folders:** Layout chrome lives in `src/components/{auth,public,patient,provider,admin}/`; shared UI such as `PageHeading` lives outside in `src/components/page-heading/`.

## Session Notes

- All grouped routes compile as static placeholders except `/doctor/[id]` (dynamic).
- Provider presence toggle is a client island (`components/provider/provider-status-header.tsx`); full auth-gated behavior waits on Clerk middleware.
- Resume with Clerk + Prisma scaffolding, then the public marketing homepage.
