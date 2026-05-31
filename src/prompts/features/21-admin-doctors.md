# Overview
This specification details the structural design and interface rules for the secure root system doctor directory management workspace (`app/(admin)/admin/doctors/page.tsx`). It outlines a highly analytical admin utility panel that tracks all active and pending medical practitioners on the platform, allowing administrators to search records, filter profiles by specialty or status, paginate through massive tables, and trigger creation pathways for creating new doctor accounts.

---

## Technical Specifications & UI Layout

### 1. Global Admin Sidebar & Shell Layout Update
* **Layout Structure:** Persistent vertical navigation sidebar positioned on the left side of viewports (`w-64 min-h-screen bg-bg-surface border-r border-border-default p-6 flex flex-col justify-between`).
* **Header Navigation Banner:** Top global layout bar displaying the main `DoctorTap` brand signature text paired with the `Admin` classification badge.
* **Updated Sidebar Node Triggers:** Swaps out the legacy "Users" node to establish the permanent "Doctors" management routing target:
  * **Dashboard:** Route `/admin/dashboard`
  * **Verification:** Route `/admin/verification`
  * **Appointments:** Route `/admin/appointments`
  * **Doctors:** Route `/admin/doctors` → **[NEW Active Pill State]** (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`).
  * **Payouts:** Route `/admin/payouts`

### 2. Main Workspace Container Layout
* **Layout Container:** Main scrolling panel canvas area (`p-8 space-y-6 max-w-7xl mx-auto w-full`).
* **Header Typographic Framework:**
  * Master Title: `Doctors Management` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Create doctor profiles, provision login credentials, review active medical accounts, and view practice logs.` (`text-sm text-text-secondary mt-1`).

---

## Action Controls & URL Filter Toolbar

Positioned right below the header elements, this block houses the search matrix, filter utilities, and the primary creation entry point button (`flex flex-col gap-4 bg-bg-surface border border-border-default p-4 rounded-xl shadow-sm mt-6`).

### Top Row: High-Impact Creation Trigger
* **Add Doctor Account Action Button:** Positioned prominently to facilitate systemic account provisioning (`w-full sm:w-max ml-auto bg-accent-primary hover:opacity-90 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer`). Clicking this links directly to `/admin/doctors/new` where the administrator can build new practitioner logins.

### Bottom Row: Browser Query Filters
Refines displayed datasets cleanly by appending matching key-value pairs directly to the active search string query parameters (`?specialty=VALUE&status=VALUE`):
* **Search Input Container:** Icon-led quick lookup bar (`relative w-full sm:w-80`). Placeholder text reads `Search doctors by name or ID...` (`pl-9 pr-4 py-1.5 text-xs bg-bg-base border border-border-default rounded-md w-full focus:outline-none focus:border-accent-primary`).
* **Dropdown Filters Group:**
  * *Specialty Selector Dropdown:* Updates browser query string variables to `?specialty=all`, `?specialty=general-physician`, or `?specialty=cardiologist`.
  * *Account Status Selector:* Updates browser query string variables to `?status=all`, `?status=active`, or `?status=suspended`.

---

## High-Density Master Doctors Directory Table

* **Table Wrapper Primitive:** `bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm`.
* **Table Structural Schema (`components/ui/table.tsx`):**
  * Columns: `Doctor ID`, `Practitioner Name`, `Medical Council ID`, `Assigned Specialty`, `Consult Fee`, `Account Status`, `Actions Window`.
  * **Interactive Actions Element Layer:**
    * *View Details Trigger Button:* A low-impact interactive link reading `View Details` (`text-accent-primary hover:underline text-xs font-semibold cursor-pointer`). Clicking this action safely summons a side sliding drawer overlay profiling that practitioner's core logs, credential records, and historic patient sessions.

---

## Component-Driven Pagination Controls Interface
Positioned at the absolute baseline of the data table sheet, a dedicated layout row handles navigating through multi-record lists safely without clipping screen boundaries:

* **Pagination Container Shell:** Balanced footer container element (`flex items-center justify-between border-t border-border-default px-6 py-4 bg-bg-base/30`).
* **Total Counter Text:** Shows dataset volume tracking strings reading `Showing 1-10 of 24 doctors` (`text-xs font-medium text-text-secondary`).
* **Interactive Button Pagers Block:** Right-aligned interactive navigation element wrappers (`flex items-center gap-2`):
  * *Previous Page Trigger:* (`border border-border-default text-text-secondary hover:bg-bg-surface hover:text-text-primary text-xs font-semibold px-3 py-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all`). Updates URL parameters to `?page=[current - 1]`.
  * *Next Page Trigger:* Active forward clicker wrapper page layout button item. Updates URL parameters to `?page=[current + 1]`.

---

## Local Mock Multi-Record Dataset Constants
Initialize and test client interaction routing pipelines smoothly using this multi-page schema structure:

```typescript
export const MOCK_ADMIN_DOCTORS_PAGE_1 = [
  {
    id: "DOC-8821",
    name: "Dr. Ram Nepal",
    councilId: "NMC-8821B",
    specialty: "General Physician",
    fee: "₨ 1,000.00",
    status: "ACTIVE"
  },
  {
    id: "DOC-4421",
    name: "Dr. Anjali Sharma",
    councilId: "NMC-4421D",
    specialty: "Cardiologist",
    fee: "₨ 2,500.00",
    status: "ACTIVE"
  },
  {
    id: "DOC-9081",
    name: "Dr. Bikram Shah",
    councilId: "NMC-9081A",
    specialty: "Pediatrician",
    fee: "₨ 1,500.00",
    status: "SUSPENDED"
  }
];

```

---

## Verification Criteria

* [ ] Active selector styling attributes highlight the renamed `Doctors` routing element clearly within the left-hand navigation panel.
* [ ] Clicking the primary action button successfully hooks into the proper credentials provisioning pathway route (`/admin/doctors/new`).
* [ ] Pager buttons correctly reflect disabled styling rules (`disabled:opacity-50`) when viewing extreme lower bounds (Page 1) or extreme upper bounds of the data array.
* [ ] Financial counters consistently implement currency tokens (`₨`) layout parameters matching baseline code criteria across all dashboards.
* [ ] The horizontal layout data grid wraps safely within structural overflow parameters (`overflow-x-auto`) to protect responsive mobile views.

```