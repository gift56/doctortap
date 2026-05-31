# Overview

This specification details the structural design and interface rules for the secure root system management workspace (`app/(admin)/admin/dashboard/page.tsx`). It outlines a high-level system monitoring platform for platform administrators to observe total active practitioners, aggregate platform appointment metrics, live user profiles, and review real-time systemic consultation activity feeds based on the administrative layout shell.

---

## Technical Specifications & UI Layout

### 1. Global Admin Sidebar & Shell Layout
* **Layout Structure:** Persistent vertical navigation sidebar positioned on the left side of viewports (`w-64 min-h-screen bg-bg-surface border-r border-border-default p-6 flex flex-col justify-between`).
* **Header Navigation Banner:** Top global layout bar displaying the main `DoctorTap` brand signature text paired immediately with a clean administrative classification badge reading exactly `Admin` (`text-xs font-medium px-2 py-0.5 rounded-full bg-bg-base text-text-secondary border border-border-default`).
* **Sidebar Node Triggers:** Implements system control routers cleanly matching the layout text links:
  * **Dashboard:** Route `/admin/dashboard` → Active pill focus token style (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`).
  * **Verification:** Route `/admin/verification` → Secondary link style (`text-text-secondary hover:text-text-primary px-4 py-3 flex items-center gap-3 transition-all`).
  * **Users:** Route `/admin/users` → Secondary link style.
  * **Payouts:** Route `/admin/payouts` → Secondary link style.

### 2. Main Administration Canvas Layout
* **Layout Container:** Wrapped inside the central workspace viewport scrolling block (`p-8 space-y-6 max-w-7xl mx-auto w-full`).
* **Header Typographic Framework:** Replicates your localized layout properties exactly:
  * Master Title: `System dashboard` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Health monitoring, session volume, and financial tickers.` (`text-sm text-text-secondary mt-1`).

---

## High-Density Telemetry Matrix (Overview Cards)

Positioned immediately below the system header block is a responsive row configuration monitoring real-time operational aggregates (`grid grid-cols-1 md:grid-cols-3 gap-6 mt-6`). To keep visual assets clean, these components reuse the established provider SVG icon assets:

1. **Card 1: Active Registered Medical Practitioners**
   * Style: `bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm flex items-center gap-4`
   * Visual Indicator: Left-aligned soft background bounding box mounting the provider profile group SVG asset.
   * Text Details: Context label `Total Doctors` (`text-xs font-semibold uppercase tracking-wider text-text-secondary`) overlaid by the operational aggregate string metrics `24` (`text-2xl font-bold text-text-primary`).
2. **Card 2: Cumulative Platform Booking Sessions**
   * Visual Indicator: Left-aligned background block mounting the provider book-open/calendar schedule SVG asset.
   * Text Details: Context label `Total Appointments` overlaid by the platform transaction aggregate volume `142`.
3. **Card 3: Consolidated System User Demographics**
   * Visual Indicator: Left-aligned background block mounting the provider patient-directory user SVG asset.
   * Text Details: Context label `Total Patients` overlaid by the global target client base volume `380`.

---

## System-Wide Recent Consultations Ledger

A data-dense table component tracking recent platform appointments to provide administrators with visibility over live transactional flow across the platform.

* **Container Primitive:** `bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm mt-8`.
* **Sub-Section Header Padding:** `px-6 py-4 border-b border-border-default bg-bg-base/50 flex items-center justify-between`. Tracks title text `Recent Consultations` (`text-base font-bold text-text-primary`).
* **Table Column Definitions (`components/ui/table.tsx`):**
  * Columns: `Session Ref`, `Patient Details`, `Assigned Doctor`, `Schedule Window`, `Processing Amount`, `System Status`.
  * **System Status Badge Modifiers:**
    * *Completed:* `bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium px-2.5 py-0.5 rounded-full w-max`
    * *Pending:* `bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium px-2.5 py-0.5 rounded-full w-max`

---

## Local Mock System State (Constants Mock Array)
Test internal template looping processes dynamically using this clean diagnostic dataset:

```typescript
export const MOCK_ADMIN_TELEMETRY = [
  {
    id: "APT-9921",
    patientName: "Ram Nepal",
    doctorName: "Dr. Ganesh Lama",
    date: "2026-05-31",
    time: "02:30 PM",
    amount: "NGN 1,000.00",
    status: "COMPLETED"
  },
  {
    id: "APT-9804",
    patientName: "Sita Shrestha",
    doctorName: "Dr. Bandana Khanal",
    date: "2026-05-31",
    time: "04:00 PM",
    amount: "NGN 1,000.00",
    status: "PENDING"
  },
  {
    id: "APT-9712",
    patientName: "Hari Prasad",
    doctorName: "Dr. Anil Kumar Bhatta",
    date: "2026-05-30",
    time: "11:15 AM",
    amount: "NGN 1,000.00",
    status: "COMPLETED"
  }
];

```

---

## Verification Criteria

* [ ] Active selector styling attributes highlight the `Dashboard` routing element clearly within the main system-level panel.
* [ ] Financial data metrics display correct regional currency symbols (`NGN`) matching configurations across patient and provider applications.
* [ ] Icon layers align perfectly with card parameters with zero dark-themed pixel values leaking onto viewports.
* [ ] The horizontal layout structure auto-collapses fluidly into single-column cards when adjusted to compact screen profiles (`< 1024px`).

```