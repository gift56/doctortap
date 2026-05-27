# Progress Tracker

Update this file after every meaningful implementation
change.

## Current Phase

- In progress — UI foundation (design system)

## Current Goal

- Establish the global design system, typography, theme tokens, and shadcn/ui primitives before feature screens.

## Completed

- Next.js boilerplate reset (`features/reset-nextjs.md`):
  - Stripped `src/app/globals.css` down to the Tailwind directive only (`@import "tailwindcss";`).
  - Removed public SVG assets (`vercel.svg`, `file.svg`, `window.svg`). No favicon was present in `public/` to preserve.
  - Replaced `src/app/page.tsx` with a minimal centered placeholder rendering "Doctor Tap WEBSITE".
  - Verified production build succeeds (`npm run build`).
- Design system foundation (`features/01-design-system.md`):
  - Added Plus Jakarta Sans and JetBrains Mono `woff2` files under `public/fonts/`.
  - `public/fonts/index.ts` exports `plusJakartaSans` and `jetbrainsMono` via `next/font/google`; layout imports from `@/fonts`.
  - Configured light-mode tokens from `ui-context.md` in `src/app/globals.css` via Tailwind v4 `@theme` / `@theme inline` only (no `:root` defaults).
  - Added `cn()` helper in `src/lib/utils.ts` (`clsx` + `tailwind-merge`).
  - Initialized shadcn/ui and added primitives: Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea, Pagination, Skeleton, Sonner, Select, Table, Badge, Avatar, Accordion.
  - Installed `lucide-react`; added `Providers` with forced light theme and `Toaster`.
  - Verified production build succeeds (`npm run build`).

## In Progress

- None.

## Next Up

- Scaffold core stack from `architecture-context.md` (Clerk auth, Prisma + PostgreSQL).
- Build the public marketing homepage per `project-overview.md`.
- Apply page grouping from `features/02-page-grouping.md`.

## Open Questions

- Database, auth, and API layers are documented but not yet initialized in the codebase.

## Architecture Decisions

- **Minimal reset baseline:** Keep the starter app stripped to a single Tailwind import and a placeholder home page until feature work begins, avoiding carryover from create-next-app boilerplate.
- **No public SVG assets yet:** Removed default Next.js/Vercel SVGs; brand assets will be added intentionally when UI work starts.
- **Light-default theme in `@theme`:** Semantic and shadcn tokens match `ui-context.md` and live in Tailwind `@theme inline` blocks; `:root` injection is avoided.
- **Public fonts module:** `public/fonts/index.ts` + WOFF2 assets; `@/fonts` path alias; `next/font/google` in layout.
- **shadcn/ui base-nova:** Primitives generated via the official CLI into `components/ui/` and treated as protected files.

## Session Notes

- Design system primitives compile cleanly; home page smoke-tests `Button` and token utilities.
- Font config lives in `public/fonts/index.ts`; layout imports `@/fonts`.
- Resume with Clerk + Prisma scaffolding, then the public marketing homepage.
