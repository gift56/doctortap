# Overview
This specification details the structural design and interface rules for the global appointment monitoring ledger workspace (`app/(admin)/admin/appointments/page.tsx`). It outlines a centralized administrative tracking hub where system managers can monitor, filter, and paginate through every doctor-patient booking across the platform using URL-driven state sync constraints.

---

## Technical Specifications & UI Layout

### 1. Global Admin Sidebar & Shell Layout Update
* **Layout Structure:** Persistent vertical navigation sidebar positioned on the left side of viewports (`w-64 min-h-screen bg-bg-surface border-r border-border-default p-6 flex flex-col justify-between`).
* **Header Navigation Banner:** Top global layout bar displaying the main `DoctorTap` brand signature text paired with the `Admin` classification badge.
* **Updated Sidebar Node Triggers:** Seamlessly appends the new tracking link alongside your existing nodes:
  * **Dashboard:** Route `/admin/dashboard`
  * **Verification:** Route `/admin/verification`
  * **Appointments:** Route `/admin/appointments` → **[NEW Active Pill State]** (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`).
  * **Users:** Route `/admin/users`
  * **Payouts:** Route `/admin/payouts`

### 2. Main Workspace Container Layout
* **Layout Container:** Main scrolling panel canvas area (`p-8 space-y-6 max-w-7xl mx-auto w-full`).
* **Header Typographic Block:**
  * Master Title: `Global Appointments` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Real-time booking auditing, status tracking, and platform transaction volume logs.` (`text-sm text-text-secondary mt-1`).

---

## URL-Driven Filter Action Toolbar
To allow bookmarked states and fluid browser navigation, filtering relies strictly on updating the browser window search parameters (`?status=VALUE&tier=VALUE`):

* **Horizontal Control Row:** Positioned right below the header elements (`flex flex-col sm:flex-row items-center justify-between gap-4 bg-bg-surface border border-border-default p-4 rounded-xl shadow-sm mt-6`).
* **Interactive Selector Elements:**
  * *Status Dropdown Selector:* Updates browser query string to `?status=all`, `?status=completed`, `?status=pending`, or `?status=cancelled` (`bg-bg-base border border-border-default text-text-primary text-xs font-medium px-3 py-2 rounded-lg focus:border-accent-primary focus:outline-none`).
  * *Ticket Tier Dropdown Selector:* Filters session classifications updates browser query string to `?tier=regular`, `?tier=vip`, or `?tier=premium` (`bg-bg-base border border-border-default text-text-primary text-xs font-medium px-3 py-2 rounded-lg focus:border-accent-primary focus:outline-none`).

---

## High-Density Master Appointment Table

* **Table Wrapper Primitive:** `bg-bg-surface border border-border-default rounded-xl overflow-hidden shadow-sm mt-6`.
* **Table Structural Schema (`components/ui/table.tsx`):**
  * Columns: `Appointment ID`, `Patient Name`, `Assigned Doctor`, `Date & Time`, `Booking Tier`, `Consultation Fee`, `Status`.
  * **Tier Badges Format:** 
    * *Regular:* Standard layout styling text rules.
    * *VIP / Premium:* Highlighted subtle label tags (`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 border border-amber-200 text-amber-700`).

---

## Component-Driven Pagination Controls Interface
Positioned at the absolute baseline of the data table sheet, a dedicated layout row handles navigating through multi-record lists safely without clipping screen boundaries:

* **Pagination Container Shell:** Balanced footer container element (`flex items-center justify-between border-t border-border-default px-6 py-4 bg-bg-base/30`).
* **Total Counter Text:** Shows dataset volume tracking strings reading `Showing 1-10 of 142 appointments` (`text-xs font-medium text-text-secondary`).
* **Interactive Button Pagers Block:** Right-aligned interactive navigation element wrappers (`flex items-center gap-2`):
  * *Previous Page Trigger:* (`border border-border-default text-text-secondary hover:bg-bg-surface hover:text-text-primary text-xs font-semibold px-3 py-1.5 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all`). Updates URL parameters to `?page=[current - 1]`.
  * *Next Page Trigger:* Active forward clicker wrapper page layout button item. Updates URL parameters to `?page=[current + 1]`.

---

## Local Mock Multi-Record Dataset Constants
Initialize and test client interaction routing pipelines smoothly using this multi-page schema structure:

```typescript
export const MOCK_ADMIN_APPOINTMENTS_PAGE_1 = [
  {
    id: "APT-4421",
    patient: "Ram Nepal",
    doctor: "Dr. Ganesh Lama",
    schedule: "2026-06-01 • 09:30 AM",
    tier: "REGULAR",
    fee: "₨ 1,000.00",
    status: "PENDING"
  },
  {
    id: "APT-1092",
    patient: "Sita Shrestha",
    doctor: "Dr. Bandana Khanal",
    schedule: "2026-05-28 • 02:00 PM",
    tier: "VIP",
    fee: "₨ 2,500.00",
    status: "COMPLETED"
  },
  {
    id: "APT-0082",
    patient: "Hari Prasad",
    doctor: "Dr. Anil Bhatta",
    schedule: "2026-05-25 • 11:00 AM",
    tier: "PREMIUM",
    fee: "₨ 4,000.00",
    status: "CANCELLED"
  }
];

```

---

## Verification Criteria

* [ ] Clicking any dropdown selector option immediately appends or updates the target parameter variables directly within the window search string (`window.location.search`) without causing page flicker.
* [ ] Pager buttons correctly reflect disabled styling rules (`disabled:opacity-50`) when viewing extreme lower bounds (Page 1) or extreme upper bounds of the data array.
* [ ] Financial counters consistently implement currency tokens (`₨`) layout parameters matching baseline code criteria across all dashboards.
* [ ] The horizontal layout data grid wraps safely within structural overflow parameters (`overflow-x-auto`) to protect responsive mobile views.

```