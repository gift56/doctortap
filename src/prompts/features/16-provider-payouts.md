# Overview
This specification details the structural design and interface rules for the provider financial distribution dashboard (`app/(provider)/payouts/page.tsx`) derived from the workspace. It delivers an intuitive, light-mode interface layout that combines practice balance cards, a dynamic Paystack destination bank settlement management component, and a clear chronological ledger tracking history.

---

## Technical Specifications & UI Layout

### 1. Global Provider Shell Dependency
* **Layout State:** Must perfectly preserve the global provider sidebar navigation and header status layout controls.
* **Active Navigation State:** The `Payouts` sidebar link item must map to the active primary focus token state (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`), rendering cleanly as active while all other navigation nodes return to standard text rules.

### 2. Main Payouts Content Grid Workspace
* **Layout Container:** Wrapped inside the standard scrolling content body panel (`p-8 space-y-6 max-w-7xl mx-auto w-full`).
* **Header Typography Block:** Matches your active layout code explicitly:
  * Master Title: `Payouts` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Paystack destinations, booking payouts, and revenue data.` (`text-sm text-text-secondary mt-1`).

---

## Revenue Summary Cards Grid
Positioned directly underneath the section header block, display a responsive layout row tracking practice liquidity parameters (`grid grid-cols-1 md:grid-cols-3 gap-6 mt-6`):

1. **Card 1: Available Balance (Ready for Settlement)**
   * Style: `bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm`
   * Text Details: Label `Withdrawable Balance` over big tracking number text `NGN 4,500.00` (`text-2xl font-bold text-text-primary`). Includes a secondary action trigger link element labeled `Request Instant Payout` (`mt-3 w-full bg-accent-primary hover:opacity-90 text-white text-xs font-semibold py-2 rounded-md text-center transition-all cursor-pointer block`).
2. **Card 2: Pending Processing Revenue**
   * Text Details: Label `Pending Escrow Clearance` over numbers text `NGN 1,000.00` (`text-2xl font-bold text-text-secondary`).
3. **Card 3: Cumulative Lifetime Practice Gross**
   * Text Details: Label `Total Practice Earnings` over numbers text `NGN 24,000.00` (`text-2xl font-bold text-text-primary`).

---

## Two-Column Distribution Management Engine
Below the metric headers, the dashboard layout divides dynamically to manage active withdrawal accounts side-by-side with incoming ledgers (`grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8`).

### Left Side Component: Paystack Settlement Destination (5-Column Span)
A focused administrative card configuration framework for updating bank accounts (`bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm space-y-4`):
* **Card Section Header:** Displays text title `Settlement Destination` (`text-sm font-bold text-text-primary`).
* **Active Status Container:** A light container displaying current bank verification states (`bg-bg-base border border-border-default p-4 rounded-lg flex items-start gap-3`):
  * Renders a verified check token indicator text reading `Paystack Destination Connected` (`text-xs font-bold text-text-primary`).
  * Displays account subtext detail strings: `Nepal Investment Mega Bank • ****9921` (`text-xs text-text-secondary mt-1`).
* **Account Update Switch:** An secondary operational action button labeled `Update Bank Account` (`w-full border border-border-default text-text-primary hover:border-accent-primary hover:bg-bg-base text-xs font-semibold py-2.5 rounded-lg text-center transition-all cursor-pointer`).

### Right Side Component: Historical Settlement Logs (7-Column Span)
A crisp layout grid monitoring historical funding dispatches into the practitioner's personal account:
* **Table Wrapper Element:** `bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm`.
* **Sub-Header Padding:** `px-6 py-4 border-b border-border-default bg-bg-base/50 flex items-center justify-between`. Tracks title text `Distribution Ledger` (`text-sm font-bold text-text-primary`).
* **Table Structural Formats (`components/ui/table.tsx`):**
  * Columns: `Reference ID`, `Initiated Date`, `Amount Net`, `Status Flag`.
  * **Status Pill Components:**
    * *Paid:* `bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full`
    * *In-Transit/Processing:* `bg-amber-50 border border-amber-200 text-amber-700 text-[10px] font-semibold px-2 py-0.5 rounded-full`

---

## Local Mock Payout Ledger Array
Populate and test data cycles layout lists loop processes seamlessly using this local model:

```typescript
export const MOCK_PROVIDER_PAYOUTS = [
  {
    reference: "PAY-9001-26",
    date: "2026-05-25",
    amount: "NGN 8,000.00",
    status: "PAID"
  },
  {
    reference: "PAY-7821-26",
    date: "2026-05-10",
    amount: "NGN 11,500.00",
    status: "PAID"
  },
  {
    reference: "PAY-0042-26",
    date: "2026-05-30",
    amount: "NGN 4,500.00",
    status: "PROCESSING"
  }
];

```

---

## Verification Criteria

* [ ] Financial currency tracking counters format output accurately using Nepalese Rupee symbols (`NGN`) matching currency formats across the provider app.
* [ ] Processing payout badges feature distinctly colored amber tint treatments separate from green fully settled tags.
* [ ] All action toggles utilize design system color variables cleanly with **zero raw dark mode artifacts or deep background colors leaking onto viewports**.
* [ ] The horizontal multi-column table wraps fluidly within a horizontal overflow constraint context block (`overflow-x-auto`) to guarantee zero text bounding-box overflows on small device displays.

```