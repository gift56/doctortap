# Architecture Context

## Stack

| Layer            | Technology                               | Role                                                                                                               |
| ---------------- | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Framework        | Next.js App Router + TypeScript          | Full-stack application framework for frontend UI, backend APIs, layouts, server components, and routing             |
| API Layer        | Next.js Route Handlers (`app/api`)       | Backend API endpoints for appointments, dynamic slots, role sync, file upload authentication, and admin updates     |
| UI               | Tailwind CSS + shadcn/ui                 | Modern responsive UI system, accessible primitives, and consistent interaction patterns matching Figma typography  |
| Auth             | Clerk                                    | User authentication, session management, role metadata injection, and route middleware protection                 |
| Database         | Prisma + PostgreSQL                      | Relational database mapping, automated schema modeling, and type-safe transactional operations                     |
| Storage          | Imagekit                 | Secure document management for patient medical file uploads and optimized doctor profile photos                      |
| Validation       | Zod                                      | Strict schema validation across booking configurations, profile updates, and API incoming request payloads        |
| State Management | React Query + Zustand                    | Server state caching for slot status synchronizations and lightweight client-side filter state                   |
| Deployment       | Vercel                                   | Production hosting, global edge delivery, CI/CD pipeline automation, and serverless compute orchestration          |

---

## System Boundaries

* `app/` — Owns all user-facing layouts, page files, server actions, and route structures under the App Router convention
* `app/api/` — Owns all backend API route handlers managing booking states, webhook listening, document permissions, and role synchronizations
* `components/` — Owns modular frontend primitives, dashboard UI modules, calendar components, layout shells, and shadcn/ui atomic elements
* `lib/` — Owns core initializations including the Prisma client wrapper, Clerk utility abstractions, cloud storage helpers, and shared formatting logic
* `server/` — Owns server-only transactional logic, scheduling safety validations, query abstractions, and underlying database mutations
* `prisma/` — Owns the relational database schema design, migration history data, and platform seed scripts
* `types/` — Owns cross-layer TypeScript system types, payload interfaces, and custom role definitions
* `hooks/` — Owns reusable state hooks, query bindings, and reactive responsiveness utilities
* `config/` — Owns application navigation configurations, global system constants, and environment variables wrappers
* `public/` — Owns static brand assets, default placeholder avatars, and local asset bundles

---

## Storage Model

* **PostgreSQL Database**: Stores account associations, detailed doctor profiles, availability slots, real-time appointments, review ratings, and metadata logs
* **Cloud Storage**: Stores patient-provided medical documentation, prescription files, lab diagnostic uploads, and optimized provider profile pictures
* **Clerk Identity Graph**: Stores verified account credentials, active session tokens, and account-level system role data attributes
* **Edge Cache Engine**: Caches public doctor availability summaries and specialty listings for optimized loading performance

---

## Auth and Access Model

* Every user registers and logs in via an encrypted Clerk workflow integrated into the unified interface
* User roles (`PATIENT`, `DOCTOR`, `ADMIN`) are safely injected into Clerk user metadata during authentication setup and synced downstream
* Route-level middleware intercepts incoming traffic to guarantee that dashboard routes match user roles explicitly
* Patients are locked out of changing doctor schedules or accessing medical histories belonging to other accounts
* Doctors can read medical record attachments exclusively when a patient has a matching active or past booking slot with them
* Administrators hold overarching permissions across the platform directory, allowing them to review registration requests or create doctor accounts
* Database writes inside route handlers and server actions require mandatory user session checks prior to execution

---

## Invariants

1. A single availability slot can never be linked to more than one confirmed appointment simultaneously
2. Doctor visibility inside public search filters requires an active verified status confirmed by an admin check
3. Patient medical record access is granted to a doctor only if a validated appointment link exists between both parties
4. Data modification requests must validate user authorization levels on the server side prior to execution
5. No component on the client layer is permitted to issue direct reads or mutations to the database without a server wrapper
6. Database operations must execute through the unified type-safe Prisma provider layer
7. System workflows must strictly validate all input schemas using Zod prior to database operations
8. Deleting or modifying a confirmed booking slot must automatically transition the underlying availability object back to open status
9. Multi-role routing boundaries are hard-coded; route components must throw unauthorized responses if user roles do not match permission parameters
10. System time states and calendar synchronization loops must uniformly operate using standardized UTC date formats to eliminate time zone offsets