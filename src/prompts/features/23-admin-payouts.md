# Overview
This specification details the structural design and interface rules for the global platform revenue distribution and vendor settlement workspace (`app/(admin)/admin/payouts/page.tsx`). It outlines a centralized administrative workspace for tracking cross-platform transaction statistics, managing pending payout validation requests, and auditing historical bank transfers dispatched to medical practitioners.

---

## Technical Specifications & UI Layout

### 1. Global Admin Shell Dependency
* **Layout State:** Must perfectly preserve the persistent global admin vertical navigation sidebar and top header banner structure.
* **Active Navigation State:** The `Payouts` sidebar link item must switch to the active primary focus token state (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`), with all other links dropping back to standard interactive text styles.

### 2. Main Platform Payouts Canvas
* **Layout Container:** Wrapped inside the central workspace viewport scrolling block (`p-8 space-y-6 max-w-7xl mx-auto w-full`).
* **Header Typographic Block:**
  * Master Title: `Platform Payouts & Escrow` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Audit cross-platform transaction pipelines, process pending doctor settlements, and manage active Paystack distributions.` (`text-sm text-text-secondary mt-1`).

---

## Global System Financial Metrics
Positioned right below the section header block, map a responsive layout row tracking high-density systemic liquidity parameters (`grid grid-cols-1 md:grid-cols-3 gap-6 mt-6`):

1. **Card 1: Total Escrow Volume**
   * Style: `bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm`
   * Text Details: Label `Global Escrow Holding` over prominent data text `₨ 125,000.00` (`text-2xl font-bold text-text-primary`). Includes an alert subtext tag reading `Awaiting clinical clearance cycles` (`text-xs text-text-muted mt-1`).
2. **Card 2: Pending Processing Settlements**
   * Text Details: Label `Pending Approval Queue` over prominent accent text `₨ 18,500.00` (`text-2xl font-bold text-amber-600`).
3. **Card 3: Lifetime Dispatched Payouts**
   * Text Details: Label `Total Settled Transferred` over data text `₨ 840,000.00` (`text-2xl font-bold text-text-primary`).

---

## Two-Column Operations Layout
Below the metric headers, the dashboard layout divides dynamically to manage active withdrawal verification side-by-side with incoming ledgers (`grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8`).

### Left Side Component: Pending Doctor Payout Requests (5-Column Span)
A stacked vertical workflow column detailing doctors currently awaiting manual administrative batch authorization:
* **Container Primative:** `space-y-4 lg:col-span-5`.
* **Section Heading Label:** `Awaiting Clearance` (`text-sm font-bold text-text-secondary uppercase tracking-wider`).
* **Settlement Ticket Card:** High-contrast review card component (`bg-bg-surface border border-border-default p-4 rounded-xl shadow-sm space-y-4`):
  * **Top Summary Row:** Displays recipient details `Dr. Ram Nepal` alongside requested amount `₨ 4,500.00` (`text-sm font-bold text-text-primary`).
  * **Account Metadata Container:** Soft-coded display parameters box (`bg-bg-base border border-border-default p-3 rounded-lg text-xs space-y-1 text-text-secondary`):
    * Destination: `Nepal Investment Mega Bank • ****9921`
    * Verified Profile Ref: `DOC-8821`
  * **Authorization Button Layout Row:** Dual command buttons enabling instant action triggers (`grid grid-cols-2 gap-3`):
    * *Hold Action:* (`border border-border-default text-text-secondary hover:bg-bg-base text-xs font-semibold py-2 rounded-md text-center transition-all cursor-pointer`).
    * *Release Funds Action:* (`bg-accent-primary hover:opacity-90 text-white text-xs font-semibold py-2 rounded-md text-center transition-all shadow-sm cursor-pointer`).

### Right Side Component: Master System Transfer Ledger (7-Column Span)
A comprehensive global data sheet logging all chronological settlement operations across the platform infrastructure:
* **Table Card Primitive:** `bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm lg:col-span-7`.
* **Sub-Header Padding:** `px-6 py-4 border-b border-border-default bg-bg-base/50 flex items-center justify-between`. Tracks title text `System Dispatches` (`text-sm font-bold text-text-primary`).
* **Table Structural Formats (`components/ui/table.tsx`):**
  * Columns: `Batch Ref`, `Beneficiary`, `Date Settled`, `Amount Net`, `Gateway Status`.
  * **Status Badge Modifiers:**
    * *Dispatched:* `bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full`
    * *Failed:* `bg-rose-50 border border-rose-200 text-rose-700 text-[10px] font-semibold px-2 py-0.5 rounded-full`

---

## Local Mock Platform Financial Ledger Array
Populate and test multi-record looping components using this clean administrative dataset:

```typescript
export const MOCK_ADMIN_PAYOUT_LEDGER = [
  {
    batchRef: "TXN-ADMIN-881",
    beneficiary: "Dr. Ram Nepal",
    date: "2026-05-28",
    amount: "₨ 8,000.00",
    status: "DISPATCHED"
  },
  {
    batchRef: "TXN-ADMIN-812",
    beneficiary: "Dr. Anjali Sharma",
    date: "2026-05-24",
    amount: "₨ 14,000.00",
    status: "DISPATCHED"
  },
  {
    batchRef: "TXN-ADMIN-799",
    beneficiary: "Dr. Bikram Shah",
    date: "2026-05-20",
    amount: "₨ 3,500.00",
    status: "FAILED"
  }
];

```

---

## Verification Criteria

* [ ] Active selector styling attributes highlight the `Payouts` routing element clearly within the left-hand navigation panel.
* [ ] Financial currency tracking counters format output accurately using regional Rupee symbols (`₨`) matching currency structures across the entire workspace.
* [ ] Operational buttons utilize safe color styles with zero dark-themed raw background canvas values leaking onto viewports.
* [ ] The horizontal multi-column table wraps fluidly within a horizontal overflow constraint context block (`overflow-x-auto`) to guarantee zero text bounding-box overflows on small device displays.

```