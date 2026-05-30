# Overview
This specification details the structural design and interface rules for the interactive provider scheduling workspace (`app/(provider)/provider/calendar/page.tsx`). It introduces a modern, high-performance availability engine where doctors can add, delete, and batch-generate active patient booking slots using fluid light-mode UI controls.

---

## Technical Specifications & UI Layout

### 1. Global Provider Shell Dependency
* **Layout State:** Must preserve the global provider sidebar navigation and header status strip specified in the provider dashboard system configuration.
* **Active Navigation State:** The `Calendar` sidebar item must switch to the active primary focus state (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`), with `Dashboard` dropping back to standard text styling tokens.

### 2. Main Calendar Content Grid Workspace
* **Layout Container:** Located inside the main scrolling panel workspace (`p-8 space-y-6 max-w-7xl mx-auto w-full`).
* **Header Typography Block:**
  * Master Title: `Calendar` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Availability adjustments, recurring blocks, and sync settings.` (`text-sm text-text-secondary mt-1`).

---

## Split-Screen Scheduling Interface (Advanced UI)

To create a clean and intuitive user experience, the space below the header is divided into an asymmetric two-column split layout grid (`grid-cols-1 lg:grid-cols-12 gap-8 mt-6`).

### Left Panel: Date Selector & Quick Toggles (4-Column Span)
* **Mini Calendar View Card:** Wrapped in a clean container (`bg-bg-surface border border-border-default p-4 rounded-xl shadow-sm`). 
  * Renders a compact month-grid view allowing the practitioner to click and isolate a specific target day.
  * **Selected Day State:** Fully highlighted (`bg-accent-primary text-white font-medium rounded-lg`).
* **Bulk Copy Utility Matrix:** A secondary button block panel positioned directly underneath the mini calendar view:
  * Action: `Apply current slots to entire week` (`w-full border border-border-default text-text-primary hover:border-accent-primary hover:bg-bg-base text-xs font-semibold py-2.5 rounded-lg text-center transition-all cursor-pointer mt-4`).

### Right Panel: Slot Configuration Engine (8-Column Span)
A powerful, interactive space dedicated completely to orchestrating session intervals for the selected calendar date.

#### Block A: Batch Slot Generator Form
* **Card Skin:** `bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm space-y-4`.
* **Form Layout Structure:** A responsive horizontal arrangement of control inputs (`grid grid-cols-1 sm:grid-cols-3 gap-4 items-end`):
  1. *Start Time Selection Dropdown:* Explicit light-themed dropdown container (`From: 08:00 AM`).
  2. *End Time Selection Dropdown:* Explicit dropdown container (`To: 12:00 PM`).
  3. *Interval Custom Duration:* Interactive slot split parameter input selector buttons (`30 Min`, `45 Min`, `60 Min`).
* **Submission Trigger Action Button:** Full-width or inline primary button layout reading `+ Generate Time Slots` (`bg-accent-primary hover:opacity-90 text-white font-medium text-sm px-6 py-2.5 rounded-lg transition-all cursor-pointer`).

#### Block B: The Active Slots Grid Canvas
* **Section Divider Text:** Displays `Generated Availability for [Selected Date String]` (`text-xs font-bold uppercase tracking-wider text-text-muted mt-6 mb-3`).
* **Grid Pattern Container:** A highly flexible display tracking system (`grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3`).
* **Interactive Slot Pill Component (`components/provider/slot-pill.tsx`):**
  Renders individual interactive tokens representing active windows of patient access matching your design guidelines:
  * **Default Active State Card:** `bg-bg-surface border border-accent-primary text-accent-primary font-medium text-xs px-3 py-2 rounded-lg flex items-center justify-between group transition-all shadow-sm`.
  * **Hover Mutation Reaction Layer:** When the doctor hovers over an active pill container, a red delete cross vector indicator asset (`×`) appears smoothly on the right side edge of the badge (`text-red-500 opacity-0 group-hover:opacity-100 font-bold ml-1.5 transition-opacity cursor-pointer`).

---

## Local Mock Scheduling State (Mock Constants Array)
Initialize your interface loop states using this highly clean data schema structure:

```typescript
export const MOCK_PROVIDER_SLOTS = {
  selectedDate: "2026-06-01", // Monday
  slots: [
    { id: "slot-1", time: "08:00 AM", isBooked: false },
    { id: "slot-2", time: "08:30 AM", isBooked: false },
    { id: "slot-3", time: "09:00 AM", isBooked: true }, // Should feature a light-gray disabled text look: "Booked"
    { id: "slot-4", time: "09:30 AM", isBooked: false },
    { id: "slot-5", time: "10:00 AM", isBooked: false },
    { id: "slot-6", time: "10:30 AM", isBooked: false }
  ]
};

```

---

## Verification Criteria

* [ ] Changing target focus arrays inside the left date container accurately cascades text display modifications across right-hand description strings.
* [ ] Booked slots (`isBooked: true`) render with locked, non-interactive layouts (`bg-bg-base border-border-default text-text-muted cursor-not-allowed`) with the interactive delete option safely unmounted.
* [ ] All interactive generation cells utilize the established CSS color variables with zero dark mode remnants or deep background colors leaking into viewports.
* [ ] The entire interactive scheduling mesh handles screen layout scaling smoothly, shifting to a stacked layout block configuration on narrow viewport view profiles (`< 1024px`).

```