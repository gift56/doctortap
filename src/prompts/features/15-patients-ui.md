# Overview
This specification details the structural design and interface rules for the secure provider patient directory workspace (`app/(provider)/provider/patients/page.tsx`). It details a high-density clinical lookup directory that allows medical practitioners to efficiently search, sort, and review patient charts, diagnostic history summaries, and historical clinical visit logs within a polished, light-mode dashboard grid.

---

## Technical Specifications & UI Layout

### 1. Global Provider Shell Dependency
* **Layout State:** Must preserve the global provider sidebar navigation and header status strip seamlessly.
* **Active Navigation State:** The `Patients` sidebar link item must switch to the active primary focus state (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`), with all other sidebar links dropping back to standard interactive text styling states.

### 2. Main Directory Content Grid Workspace
* **Layout Container:** Main scrolling panel canvas area (`p-8 space-y-6 max-w-7xl mx-auto w-full`).
* **Header Typography Block:** 
  * Master Title: `Patients` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Patient charts index, diagnostic logs, and clinical records.` (`text-sm text-text-secondary mt-1`).

---

## Patient Directory Filter & Search Row
To support high-volume clinical work, place a horizontal utility control toolbar row immediately below the header (`flex flex-col sm:flex-row items-center justify-between gap-4 bg-bg-surface border border-border-default p-4 rounded-xl shadow-sm mt-6`):

* **Search Input Container (Left Side):** A modern, icon-led lookup bar (`relative w-full sm:w-96`). Features an inline search loupe icon paired with a placeholder text state reading `Search patients by name, ID, or condition...` (`pl-10 pr-4 py-2 text-sm bg-bg-base border border-border-default rounded-lg focus:outline-none focus:border-accent-primary w-full transition-all`).
* **Filter Actions Dropdown Stack (Right Side):** A pair of clean selective controls:
  * *Sort Selector Dropdown:* Interactive component tracking choices (`Sort By: Recent Activity`, `Name A-Z`, `Total Visits`).
  * *Status Selector Dropdown:* Refines view states (`All Statuses`, `Active Treatment`, `Discharged`).

---

## Data-Dense Patient Index Grid Layout

The main content panel maps active client listings through a multi-column card pattern framework (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6`). 

### Patient Information Card Component (`components/provider/patient-card.tsx`)
Each container card maps structural medical overview metrics dynamically using the design system's local theme tokens (`bg-bg-surface border border-border-default hover:border-accent-primary/50 p-6 rounded-xl transition-all duration-200 shadow-sm flex flex-col justify-between h-full`):

* **Top Profile Row:** 
  * Features a circular medical patient avatar thumbnail frame (`w-12 h-12 rounded-full bg-bg-base border border-border-default overflow-hidden shrink-0`).
  * Flanked by a vertical typography block: Name (`text-base font-bold text-text-primary`), Age/Gender Variant metadata reading `29 Yrs • Male` (`text-xs text-text-secondary mt-0.5`), and a custom unique ID string badge element (`text-[10px] font-mono bg-bg-base px-2 py-0.5 rounded border border-border-default text-text-secondary w-max`).
* **Middle Section (Clinical Summaries):**
  A structural text layout box displaying critical health overview metrics:
  * *Last Appointment:* `May 28, 2026` (`text-xs text-text-secondary`).
  * *Primary Diagnosis Flag:* `Chronic Hypertension` (`text-xs font-semibold text-text-primary bg-accent-primary/5 border border-accent-primary/10 px-2.5 py-1 rounded-md w-max mt-2`).
* **Bottom Action Drawer Row:**
  A horizontal distribution row tracking detailed clinical workflow access loops (`flex items-center justify-between border-t border-border-default pt-4 mt-6 gap-2`):
  * **Secondary Link Option:** A clear button reading `View Medical History` (`text-text-secondary hover:text-text-primary text-xs font-medium px-3 py-2 transition-all`).
  * **Primary Action Option:** A primary button reading `Open Chart` (`bg-accent-primary hover:opacity-90 text-white text-xs font-medium px-4 py-2 rounded-md transition-all`).

---

## Local Mock Patient Schema Constants
Populate your interface loops immediately during front-end construction using this type-safe configuration array:

```typescript
export const MOCK_PROVIDER_PATIENTS = [
  {
    id: "PT-8821",
    name: "Ram Nepal",
    age: 29,
    gender: "Male",
    lastVisit: "2026-05-21",
    diagnosis: "General Checkup",
    status: "ACTIVE"
  },
  {
    id: "PT-4412",
    name: "Sita Shrestha",
    age: 34,
    gender: "Female",
    lastVisit: "2026-05-19",
    diagnosis: "Type 2 Diabetes Management",
    status: "ACTIVE"
  },
  {
    id: "PT-0911",
    name: "Hari Prasad",
    age: 45,
    gender: "Male",
    lastVisit: "2026-04-12",
    diagnosis: "Acute Bronchitis",
    status: "DISCHARGED"
  }
];

```

---

## Verification Criteria

* [ ] Changing input parameters within the filter bar dynamically cascades view updates safely without layout stuttering.
* [ ] No raw, un-tokenized element components or hardcoded background values break light theme design parameters.
* [ ] High-contrast visual distinctions separate different workflow elements smoothly (e.g., Active Treatment vs Discharged badges).
* [ ] The structural layout adapts fluidly across various viewport sizes, downshifting into single column streams on small screens (`< 768px`).

```