# Overview

This specification details the structural implementation of the secure practitioner workspace landing page (`app/(provider)/provider/dashboard/page.tsx`). It details a high-density clinical dashboard that maps historical platform earnings metrics, current patient appointment queues, and interactive operational status toggles into a polished, light-mode interface layout.

---

## Technical Specifications & UI Layout

### 1. Global Provider Left Sidebar Module
* **Navigation Framework:** Renders as a persistent vertical layout bar on large viewports (`w-64 min-h-screen bg-bg-surface border-r border-border-default p-6 flex flex-col justify-between`).
* **Sidebar Links Stack:** Integrates structural icon-text links matching your application shell:
  * **Dashboard:** Route `/provider/dashboard` → Set to active pill focus state (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`).
  * **Calendar:** Route `/provider/calendar` → Secondary interactive layout link (`text-text-secondary hover:text-text-primary px-4 py-3 flex items-center gap-3 transition-all`).
  * **Patients:** Route `/provider/patients` → Secondary link.
  * **Payouts:** Route `/provider/payouts` → Secondary link.
  * **Profile:** Route `/provider/profile` → Secondary link.

### 2. Header Status Strip & Control Row
* **Layout Design:** A clean, horizontal operational header container (`flex items-center justify-between border-b border-border-default bg-bg-surface px-8 py-4 w-full`).
* **Platform Identity (Left Side):** Displays the consolidated text log brand `DoctorTap` paired with an administrative indicator badge reading `Provider`.
* **Operational Status Matrix (Right Side):** Integrates the status controls visible in your app shell:
  * Displays text reading `OPERATIONAL STATUS` (`text-xs font-bold tracking-wider text-text-muted`).
  * **Interactive Presence Switch:** An inline tracking indicator showing connection states: `● Offline` or `● Online` with a companion toggle layout link button labeled `Toggle` (`border border-border-default hover:border-accent-primary text-xs font-semibold px-3 py-1 rounded-md transition-all`).
  * **Session Terminator Button:** A clean, high-contrast action block element reading `Logout` situated at the far right.

---

## High-Density Overview Section (Figma Metrics Mapping)

Positioned immediately inside the main scrolling body panel container (`p-8 space-y-8 max-w-7xl mx-auto w-full`).

### 1. High-Density Overview Metric Cards Grid
A responsive 3-column data-dense grid layout module (`grid-cols-1 md:grid-cols-3 gap-6`) pulling data from safe mock constant structures:

* **Card 1: Platform Practice Earnings**
  * Structure: `bg-bg-surface border border-border-default p-6 rounded-xl flex items-center gap-4`
  * Elements: Left-side rounded container canvas hosting a teal cash register or wallet icon. Right side displays descriptive label `Earnings` (`text-xs text-text-secondary font-medium`) over large metric text string `NGN 1000` (`text-2xl font-bold text-text-primary`).
* **Card 2: Booked Session Aggregates**
  * Elements: Displays a book or calendar icon variant tracking descriptive text label `Appointments` over bold numerical metric text `2`.
* **Card 3: Unique Client Profiles Ledger**
  * Elements: Displays a clinical practitioner or user-group icon variant tracking descriptive text label `Patients` over bold numerical metric text `5`.

### 2. "Latest Bookings" Feed Container
* **Layout Framework:** A dedicated vertical stack module card block (`bg-bg-surface border border-border-default rounded-xl p-6 mt-8 shadow-sm`).
* **Section Heading Title:** An icon-led container block reading exactly `Latest Bookings` (`text-sm font-bold text-text-primary flex items-center gap-2 border-b border-border-default pb-4 mb-4`).
* **Patient Row List Queue Wrapper (`components/provider/queue-row.tsx`):**
  Maps out incoming client sessions inside a sequential vertical array pipeline (`space-y-4`). Each data row features a clean horizontal distribution framework layout:
  * **Left Side Patient Metadata:** Small circular portrait frame wrapper tracking the patient's photo asset avatar (`w-10 h-10 rounded-full overflow-hidden bg-bg-base`). Flanked immediately by a text stack: Name reading `Ram Nepal` (`text-sm font-bold text-text-primary`), and booking coordinate date strings reading exactly `Booking on 21st April, 2026` (`text-xs text-text-secondary mt-0.5`).
  * **Right Side Rejection Action Trigger:** A clean, circular red safety button element displaying a close/cancel vector mark (`×`) styled explicitly for intuitive practice curation (`w-7 h-7 rounded-full bg-red-50 border border-red-100 text-red-500 hover:bg-red-500 hover:text-white flex items-center justify-center text-sm font-medium transition-all cursor-pointer`).

---

## Verification Criteria
- [ ] Left sidebar tracking links align correctly with active system path locations without rendering layout displacement flags.
- [ ] Financial data metrics display appropriate regional currency characters (`NGN`) matching currency symbols across patient modules.
- [ ] Every button component drawing interaction cues uses design tokens dynamically with zero dark mode background artifacts leaking onto viewports.
- [ ] The patient feed grid wraps seamlessly into clean vertical block cards on narrow mobile viewports (`< 768px`).