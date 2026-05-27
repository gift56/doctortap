# DoctorTap

DoctorTap is an on-demand, web-based medical appointment scheduling and provider discovery platform. It connects patients who need fast, reliable consultations with healthcare professionals who manage modern practices—replacing opaque provider lists, blind waiting rooms, and fragmented scheduling with public discovery, real-time slot booking, role-specific dashboards, and an administrative hub for onboarding verified practitioners.

---

## What DoctorTap Does

| Audience | Capabilities |
| -------- | ------------ |
| **Patients** | Browse doctors and specialties, book time slots, manage appointments, update profiles, and (planned) upload medical documents with strict access controls. |
| **Doctors** | Manage availability, view appointment queues, and access patient records only when a valid booking link exists. |
| **Administrators** | Review platform metrics, manage the doctor directory, vet new providers, and oversee system-wide appointment logs. |

### Core goals

1. **Seamless real-time booking** — Conflict-free scheduling with no double-booking.
2. **High-trust onboarding** — Admin validation of medical credentials before profiles go live.
3. **Unified health ecosystem** — Discovery, booking, communication, and basic records in one web experience.

### Primary user flow

1. Visitor explores the marketing homepage and doctor directory.
2. User signs up or logs in with a role-aware identity (`PATIENT`, `DOCTOR`, `ADMIN`).
3. Patient selects a doctor, picks a slot on a weekly calendar, and confirms.
4. Patient tracks bookings in a personal dashboard; doctors manage slots and encounters; admins operate the global console.

---

## Features (Product Scope)

### Patient (discovery & engagement)

- Dynamic marketing homepage with specialties and featured doctors
- Searchable provider directory with availability badges
- Per-doctor booking pages with interactive weekly slot selection
- Personal workspace: profile, appointment history, cancellations

### Doctor (practice management)

- Availability matrix (hours, blocks, time off)
- Appointment triage queue (pending → confirmed → completed / canceled)
- Encounter records for patients with active or past bookings

### Admin (platform oversight)

- Metrics dashboard (doctors, patients, activity)
- Provider registration and credential validation pipeline
- Global appointment and schedule logs

### Out of scope (initial release)

- Full billing / insurance adjudication
- Native iOS / Android apps (responsive web first)
- E-prescription pharmacy integration
- AI medical scribing or ambient consultation recording

---

## Tech Stack

### Implemented today

| Layer | Technology |
| ----- | ---------- |
| Framework | [Next.js 16](https://nextjs.org) (App Router) + TypeScript |
| UI | [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) (base-nova) |
| Icons | [Lucide React](https://lucide.dev) |
| Fonts | Plus Jakarta Sans, JetBrains Mono via `next/font/google` |
| Lint / format | [Biome](https://biomejs.dev) |
| Toasts | [Sonner](https://sonner.emilkowal.ski) |

### Planned (documented, not yet wired)

| Layer | Technology |
| ----- | ---------- |
| Auth | [Clerk](https://clerk.com) — sessions, roles, middleware |
| Database | [Prisma](https://www.prisma.io) + PostgreSQL |
| Storage | ImageKit — medical files and profile images |
| Validation | [Zod](https://zod.dev) |
| Client state | React Query + Zustand |
| Deployment | [Vercel](https://vercel.com) |

---

## Project Status

**Current phase:** UI foundation (design system complete).

| Done | Next |
| ---- | ---- |
| Next.js baseline and placeholder home page | Clerk authentication |
| Light-theme design tokens in `globals.css` | Prisma + PostgreSQL |
| shadcn/ui primitives under `components/ui/` | Public marketing homepage |
| `cn()` utility, fonts, Sonner toasts | App Router page groups per `02-page-grouping.md` |

See [`src/prompts/progress-tracker.md`](src/prompts/progress-tracker.md) for the live implementation log.

---

## Route Architecture (Planned)

The app uses Next.js **route groups** to isolate layouts and security contexts:

| Group | Purpose | Example routes |
| ----- | ------- | ---------------- |
| `(public)` | Marketing, discovery, public profiles | `/`, `/search`, `/doctor/[id]` |
| `(auth)` | Login and registration | `/login`, `/register`, `/register/provider` |
| `(patient)` | Patient dashboard | `/patient/dashboard`, `/patient/appointments`, `/patient/billing` |
| `(provider)` | Doctor portal | `/provider/dashboard`, `/provider/calendar`, `/provider/patients` |
| `(admin)` | Admin console | `/admin/dashboard`, `/admin/doctors`, `/admin/appointments` |

Details: [`src/prompts/features/02-page-grouping.md`](src/prompts/features/02-page-grouping.md).

---

## Repository Structure

```
doctortap/
├── public/
│   ├── fonts/              # WOFF2 assets + index.ts (next/font/google exports)
│   └── icon.png
├── src/
│   ├── app/
│   │   ├── layout.tsx      # Root layout, font variables, Providers
│   │   ├── page.tsx        # Placeholder home (smoke-test UI)
│   │   └── globals.css     # Tailwind v4 @theme tokens (light mode)
│   ├── components/
│   │   ├── ui/             # shadcn/ui primitives (protected — use CLI to add)
│   │   └── providers.tsx   # Client providers (e.g. Sonner)
│   ├── lib/
│   │   └── utils.ts        # cn() — clsx + tailwind-merge
│   └── prompts/            # Product, architecture, UI, and feature specs
├── components.json         # shadcn configuration
├── AGENTS.md               # AI / contributor onboarding rules
└── package.json
```

### Path aliases

| Alias | Resolves to |
| ----- | ----------- |
| `@/*` | `./src/*` |
| `@/fonts` | `./public/fonts/index.ts` |

---

## Design System

- **Theme:** Light mode only — clean medical workspace with white/neutral surfaces and teal (`#00a396`) accents.
- **Tokens:** Defined in `src/app/globals.css` via `@theme` / `@theme inline` (no `:root` variable injection).
- **Typography:** Plus Jakarta Sans (`--font-sans`), JetBrains Mono (`--font-mono`).
- **Components:** Use Tailwind utilities bound to tokens (`bg-bg-base`, `text-text-primary`, etc.) — avoid hardcoded hex in components.

Full spec: [`src/prompts/ui-context.md`](src/prompts/ui-context.md).

### UI primitives available

Button, Card, Dialog, Input, Tabs, Textarea, ScrollArea, Pagination, Skeleton, Sonner, Select, Table, Badge, Avatar, Accordion.

Add more via:

```bash
npx shadcn@latest add <component>
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm (or pnpm / yarn / bun)

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run Biome checks |
| `npm run format` | Format with Biome |

### Environment variables

Not required for the current foundation. Future integrations will need Clerk, database, and ImageKit keys—documented in `architecture-context.md` when scaffolding lands.

---

## Development Guidelines

Contributors and AI agents should read context files **in this order** before implementing features:

1. [`src/prompts/project-overview.md`](src/prompts/project-overview.md) — product goals and scope
2. [`src/prompts/architecture-context.md`](src/prompts/architecture-context.md) — stack, boundaries, invariants
3. [`src/prompts/ui-context.md`](src/prompts/ui-context.md) — theme and component rules
4. [`src/prompts/code-standards.md`](src/prompts/code-standards.md) — TypeScript and Next.js conventions
5. [`src/prompts/ai-workflow-rules.md`](src/prompts/ai-workflow-rules.md) — delivery workflow
6. [`src/prompts/progress-tracker.md`](src/prompts/progress-tracker.md) — current status

Update `progress-tracker.md` after each meaningful change. See [`AGENTS.md`](AGENTS.md) for the full agent checklist.

### Key architectural invariants

- One availability slot → at most one confirmed appointment
- Doctors are admin-verified before appearing in public search
- Patients cannot access other users’ medical data
- Doctors see records only with a valid appointment relationship
- All DB access goes through server-side Prisma wrappers with Zod validation
- Role boundaries enforced in middleware and route handlers

---

## Fonts

Font configuration lives in [`public/fonts/index.ts`](public/fonts/index.ts):

```ts
import { plusJakartaSans, jetbrainsMono } from "@/fonts";
```

Imported in [`src/app/layout.tsx`](src/app/layout.tsx) and applied as CSS variables on `<html>`.

---

## Deploy

The target platform is **Vercel**. After `npm run build`:

```bash
npm run start
```

Or connect the repository to Vercel for automatic deployments on push.

---

## License

Private project (`"private": true` in `package.json`). Add a license file if the repository is opened or distributed.
