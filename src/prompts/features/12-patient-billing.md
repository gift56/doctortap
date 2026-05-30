# Overview
This specification details the structural design and interface rules for the patient financial management workspace (`app/(patient)/billing/page.tsx`). Following the layout routing flow, it delivers a clean, light-themed billing layout panel featuring structural payment tier states, immediate receipt tracking links, and a historical lookup log of consultations paid via Paystack.

---

## Technical Specifications & UI Layout

### 1. Unified Patient Navigation Header Dependency
* **Header State:** Must share the exact global patient shell layout specified in `09-patient-profile.md.
* **Active Navigation State:** The `Billing` link item must switch cleanly to the active primary pill token configuration (`bg-accent-primary/10 text-accent-primary font-medium px-4 py-1.5 rounded-md`), with `Dashboard` and `Appointments` dropping back to standard interactive text states.

### 2. Main Financial Content Dashboard Layout
* **Layout Design:** A balanced, single-column content grid structure optimized for secure reading metrics (`max-w-5xl mx-auto px-6 py-10 space-y-8`).
* **Section Header Block:** Left-aligned typographic block reading:
  * Master Title: `Billing & Statements` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Manage your payment payment histories, download legal medical receipts, and review outstanding consultation fee balances.` (`text-sm text-text-secondary mt-1`).

---

## UI Components & Sub-Section Architecture

### Section 1: Financial Standing Overview (Summary Metric Cards)
A responsive horizontal grid row (`grid-cols-1 md:grid-cols-3 gap-6`) displaying real-time financial tracking metrics using local constants data arrays:

1. **Card 1: Outstanding Fees Balance**
   * Style: `bg-bg-surface border border-border-default p-6 rounded-xl`
   * Text Copy: `Outstanding Balance` (`text-xs font-semibold uppercase text-text-secondary`) over structural ticker text `NGN 0.00` (`text-2xl font-bold text-text-primary`).
2. **Card 2: Total Invested Capital**
   * Text Copy: `Total Paid Medical Fees` over dynamic aggregate ticker `NGN 3,000.00` (representing historical booking settlement logs).
3. **Card 3: Native Integration Target Gateway**
   * Text Copy: `Payment Processor` over a structural status badge reading `Paystack Active` (`bg-teal-50 border border-teal-200 text-teal-700 font-medium text-xs px-2.5 py-1 rounded-full w-max mt-2 flex items-center gap-1.5`).

### Section 2: Historical Transaction Ledger (Data Table Grid)
A clean, dense table layout mapping out complete historical interaction payment receipts safely:

* **Container Wrapper:** `bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm`.
* **Sub-Section Header Padding:** `px-6 py-4 border-b border-border-default bg-bg-base/50`. Includes section title: `Payment History` (`text-base font-bold text-text-primary`).
* **Table Primitive Layout (`components/ui/table.tsx`):**
  * Columns: `Invoice ID`, `Consulting Practitioner`, `Date Processed`, `Settled Amount`, `Status Tag`, `Actions`.
  * **Status Badge Variations:**
    * *Succeeded:* `bg-state-success/10 border border-state-success text-state-success text-xs font-medium px-2 py-0.5 rounded-full`
    * *Refused/Failed:* `bg-state-error/10 border border-state-error text-state-error text-xs font-medium px-2 py-0.5 rounded-full`
  * **Interactive Action Cell:** Renders a clean secondary action layout block labeled `Download PDF Receipt` (`text-accent-primary hover:underline text-xs font-semibold cursor-pointer flex items-center gap-1`).

---

## Local Mock Content Ledger (Mock Constants Mapping)
To populate the transaction list UI without background api services, map directly out of this core tracking configuration structure array:

```typescript
export const MOCK_BILLING_INVOICES = [
  {
    id: "INV-2026-089",
    doctorName: "Dr. Ganesh Lama",
    specialty: "General Physician",
    date: "2026-04-20",
    amount: "NGN 1000.00",
    status: "SUCCEEDED"
  },
  {
    id: "INV-2026-041",
    doctorName: "Dr. Bandana Khanal",
    specialty: "Gynecologist",
    date: "2026-04-03",
    amount: "NGN 1000.00",
    status: "SUCCEEDED"
  },
  {
    id: "INV-2026-012",
    doctorName: "Dr. Anil Kumar Bhatta",
    specialty: "Dermatologist",
    date: "2026-03-22",
    amount: "NGN 1000.00",
    status: "SUCCEEDED"
  }
];