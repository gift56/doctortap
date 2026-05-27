# AI Workflow Rules

## Approach

Build this project incrementally using a strict, spec-driven workflow. The system context files define exactly what to build, how to build it technically, and the exact state of feature implementation. The AI agent must always operate against these established specs—never infer, extrapolate, or invent product behavior or architecture from scratch.

## Scoping Rules

- **Feature Isolation:** Work exclusively on one isolated feature unit or UI component at a time.
- **Micro-Increments:** Prefer tiny, verifiable structural increments over broad, speculative, or multi-file architectural overhauls.
- **Boundary Discipline:** Do not combine modifications across unrelated system folder boundaries in a single execution loop.

## When to Split Work

Split an implementation step if it combines:
- **State Mixing:** Simultaneous frontend UI visual layout modifications and underlying backend/database service layer mutations.
- **Route Multiplication:** Defining or modifying multiple unrelated API route handlers within a single execution block.
- **Ambiguous Scope:** Coding features or conditions that are not explicitly documented in the accompanying context files.

*Rule of Thumb:* If an implementation step cannot be completely verified end-to-end via instant client interaction, the scope is too broad—split the task immediately.

## Handling Missing Requirements

- **Zero Invention:** Do not invent application logic, field parameters, or system behavioral branches not documented in the context layers.
- **Pre-emptive Clarification:** If a required flow is vague, update the relevant context document to finalize the logic *before* compiling application files.
- **Tracker Escalation:** If an implementation block exposes a critical missing requirement, log it cleanly as an open question in `progress-tracker.md` before writing code.

## Protected Files

Do not modify the following files or directories unless explicitly instructed:
- `components/ui/*` — Core generated shadcn UI atomic primitives must remain untouched to preserve CLI structural patterns.
- `node_modules/*` or third-party dependency configurations.
- Schema definitions inside `prisma/` unless specifically modifying a validated database layer step.

## Keeping Docs in Sync

Update the relevant context files immediately whenever implementation details alter:
- Core data models, structural API boundaries, or server actions.
- Storage routing models, permission layers, or authentication behaviors.
- File architecture organization or global component standards.
- Feature scope boundaries or user flow constraints.

## Before Moving to the Next Unit

1. **End-to-End Verification:** Ensure the current feature unit functions flawlessly within its target scope boundaries.
2. **Invariant Check:** Validate that no architectural invariant documented in `architecture-context.md` has been breached.
3. **Progress Logging:** Update `progress-tracker.md` explicitly to move completed blocks to the checked state.
4. **Compile Validation:** Run local type checking and build scripts to guarantee the workspace compiles cleanly without faults.