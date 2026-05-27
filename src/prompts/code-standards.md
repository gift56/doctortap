# Code Standards

## General

- **Single-Purpose Modules:** Keep modules small, isolated, and focused on a single logical responsibility.
- **Root-Cause Resolution:** Fix root-level structural or architectural failures immediately; do not layer temporary workarounds or hacks.
- **Separation of Concerns:** Do not mix unrelated domains or concerns within a single React component, database execution script, or route handler.
- Respect the system boundaries defined in `architecture-context.md`.

## TypeScript

- **Strict Type Checking:** Enforce strict compilation configurations globally across the full-stack codebase.
- **No Implicit Any:** Explicitly forbid the use of the `any` type keyword—leverage explicit interfaces or narrowly scoped types for total safety.
- **Defensive Edge Validation:** Treat all raw external inputs or multi-role payloads as unsafe; validate them at the system perimeter before parsing or passing data downstream.
- Use `interface` for object contracts.

## Next.js (App Router)

- **Server-First Architecture:** Default all pages, layouts, and data fetching blocks to React Server Components to minimize bundle size.
- **Explicit Client Directive:** Inject the `'use client'` statement at the top of a file only when handling state, browser hooks, or explicit user interactivity elements.
- **Streamlined Route Modules:** Keep route handlers focused on a single runtime task—abstract heavy business operations out into individual backend service files.

## Styling

- **Tokenized UI Constraints:** Consume variables exclusively through Tailwind utility classes mapping to defined tokens—never implement hardcoded hex values.
- **Radius Compliance:** Enforce the exact responsive border-radius architectural scale specified within the global `ui-context.md` file.
- **Scannable Layout Markups:** Build highly responsive layouts using structural CSS grid or flex containers directly matching verified viewport wireframes.

## API Routes

- **Pre-execution Verification:** Parse and strictly validate incoming route arguments, search parameters, or payloads via structural schemas before processing.
- **Session and Ownership Verification:** Validate that session tokens are active and check cross-resource metadata ownership prior to executing any underlying database mutation.
- **Predictable Error Blocks:** Catch all lifecycle execution failures explicitly and format error blocks to use consistent JSON contract responses.

## Data and Storage

- **Relational Metadata Mapping:** Store system relationships, appointments, provider calendars, and analytics structures strictly inside the PostgreSQL engine.
- **Unstructured Blob Offloading:** Upload health document attachments, medical diagnostic PDFs, and profile images directly to third-party cloud storage bucket platforms.
- **Zero Raw Blob Ingestion:** Never store large binary representations, unoptimized images, or unparsed file bodies inside relational tables.

## File Organization

- `app/` — Houses framework route groupings, layout hierarchies, server actions, page components, and specialized API handlers.
- `components/` — Houses modular frontend atomic blocks, shared section layouts, custom hooks interfaces, and verified UI primitives.
- `lib/` — Houses client engine wrappers, abstraction utility wrappers, formatting math, and reusable full-stack configuration constants.
- `server/` — Houses server-only transaction flows, access constraint checks, operational queries, and secure system write loops.
- `prisma/` — Houses the unified relational database object schema code, script migration tracking, and baseline platform configuration seeds.