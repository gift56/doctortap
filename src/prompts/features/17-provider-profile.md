# Overview
This specification details the structural design and interface rules for the secure provider profile and practice settings workspace (`app/(provider)/provider/profile/page.tsx`). It establishes a comprehensive system configuration framework enabling medical practitioners to update their clinical registration credentials, set base consultation pricing structures, and manage personal profile metadata securely using local constants while maintaining absolute theme token discipline.

---

## Technical Specifications & UI Layout

### 1. Global Provider Shell Dependency
* **Layout State:** Must perfectly preserve the global provider sidebar navigation and header status layout controls.
* **Active Navigation State:** The `Profile` sidebar link item must map to the active primary focus token state (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`), rendering cleanly as active while all other navigation nodes drop back to standard text rules.

### 2. Main Profile Workspace Layout
* **Layout Container:** Wrapped inside a single, balanced content column architecture optimized for processing structured input fields (`max-w-4xl mx-auto px-6 py-10 space-y-8`).
* **Section Header Block:** Left-aligned typographic block reading:
  * Master Title: `Profile Settings` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Update your public medical office profile, clinical consultation specialties, and manage practitioner account configurations.` (`text-sm text-text-secondary mt-1`).

---

## UI Components & Sub-Section Architecture

The workspace body layout maps out an interface containing independent settings card blocks split clearly by configuration category (`space-y-6`).

### Section 1: Professional Clinical Directory Profile
Wrapped inside an administrative card component (`bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm space-y-6`):
* **Card Header Label:** `Public Practice Details` (`text-base font-bold text-text-primary`).
* **Avatar Configuration Badge:** A horizontal framework mounting a circular profile photo container (`w-16 h-16 rounded-full bg-bg-base border border-border-default overflow-hidden`) paired directly with a secondary upload modifier button reading `Change Photo` (`border border-border-default text-text-primary hover:border-accent-primary text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer`).
* **Input Parameters Form Layout:** A high-end two-column form element grid (`grid grid-cols-1 sm:grid-cols-2 gap-6`):
  * *Field 1:* Full Name Input Box (`Full Name: Dr. Ram Nepal`).
  * *Field 2:* Medical Council Registration Index ID (`Council ID: NMC-8821B`).
  * *Field 3:* Primary Specialty Selection Dropdown (`Specialty: General Physician`).
  * *Field 4:* Clinical Experience Integer Input Field (`Years of Experience: 8`).
* **Biography Textarea Box:** Full-width multiline string input field (`Bio`) allowing doctors to provide a descriptive overview of their clinical background.

### Section 2: Consultation & Booking Rate Configurations
A dedicated settings card allowing doctors to modify their active appointment parameters (`bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm space-y-4`):
* **Card Header Label:** `Practice Pricing Rules` (`text-base font-bold text-text-primary`).
* **Base Consult Rate Input Field:** An icon-prefix wrapper mapping regional pricing formats safely:
  * *Label:* `Base Consultation Fee` (`text-xs font-semibold text-text-secondary mb-1.5 block`).
  * *Input Container:* Houses a fixed leading prefix token string reading `NGN` (`bg-bg-base border-r border-border-default text-text-muted px-3 py-2 text-sm rounded-l-md`) attached to an active numerical string value field typing `1000.00` (`bg-transparent text-text-primary px-3 py-2 text-sm rounded-r-md border border-border-default w-full focus:outline-none focus:border-accent-primary`).

---

## Actions Control Interface Row
Positioned at the absolute base of the settings form viewports, render a crisp, right-aligned utility row ensuring explicit, affirmative cancellation or save actions (`flex items-center justify-end gap-4 border-t border-border-default pt-6 mt-8`):

* **Action 1 (Discard changes):** An secondary trigger link button reading `Cancel Changes` (`text-text-secondary hover:text-text-primary text-sm font-medium px-4 py-2 transition-all cursor-pointer`).
* **Action 2 (Persist variables):** A high-contrast execution block button labeled `Save Settings` (`bg-accent-primary hover:opacity-90 text-white text-sm font-medium px-6 py-2 rounded-md shadow-sm transition-all cursor-pointer`).

---

## Verification Criteria
- [ ] Financial entry structures include the explicit regional token representation symbol (`NGN`) matching currency configurations across both client and provider applications.
- [ ] Changing validation values within form component containers respects global focus rings (`focus:border-accent-primary`) cleanly.
- [ ] No un-tokenized light theme canvas values bleed, break layout rules, or introduce hardcoded style inconsistencies.
- [ ] Multi-column layout sheets rearrange dynamically into single-stack arrays when resized to narrow screen mobile viewports (`< 640px`).