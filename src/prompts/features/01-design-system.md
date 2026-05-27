Read `AGENTS.md` before starting.

## Overview

This file outlines the requirements and tracking state for the global design system, typography assets, and atomic UI primitives for DoctorTap.

## Typography & Font Strategy
- **Font Files:** Physical font files for `Plus Jakarta Sans` and `JetBrains Mono` must be placed directly into the `public/fonts/` folder.
- **Layout Integration:** Font families are loaded via `next/font/google` rules or inside `app/layout.tsx` and mapped to CSS variables.
- **Variables:** - Sans-Serif (UI text): `--font-sans`
  - Monospace (Code/Technical metrics): `--font-mono`

## Theme Configuration (Tailwind CSS v4)
- All design system tokens, color parameters, and font variables must be configured directly inside the Tailwind `@theme` directive within `app/globals.css`.
- **Prohibition:** Do not inject variable defaults into native CSS standard `:root` blocks.
- **Dark Theme Tokens:** Ensure background definitions (`--bg-base`, `--bg-surface`), text scales (`--text-primary`, `--text-muted`), and borders use dark theme values by default to maintain the medical-grade technical workspace design language.

## Helper Utilities
- **Location:** `lib/utils.ts`
- **Primitives:** Must export a reusable `cn(...inputs: ClassValue[])` helper combining `clsx` and `twMerge` to cleanly handle conditional Tailwind overrides.

## UI Primitive Components List
The following primitives must be initialized via `shadcn/ui` or configured manually under `components/ui/` using the established design tokens. Once generated, they are treated as protected files:

- [ ] Button
- [ ] Card
- [ ] Dialog
- [ ] Input
- [ ] Tabs
- [ ] Textarea
- [ ] ScrollArea
- [ ] Pagination
- [ ] Skeleton (`Selekon`)
- [ ] Sonner
- [ ] Select
- [ ] Table
- [ ] Badge
- [ ] Avatar
- [ ] Accordion
- [ ] `lucide-react` (Dependency installation)

## Verification Criteria
1. All UI primitives import cleanly across layouts without compilation or syntax faults.
2. The `cn()` helper accurately dynamic-merges conflicting style utilities.
3. No default light-mode presentation values leak or bleed into layout renders.