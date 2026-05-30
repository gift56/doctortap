# Overview

This specification covers the implementation of the main patient scheduling overview list (`app/(patient)/appointments/page.tsx`) explicitly matching the visual formatting, typography structure, and individual action rows shown in `screenshots/image_689cbe.png`.

---

## Technical Specifications & UI Layout

### 1. "My Appointments" Data-Dense List Feed

* **Header Structure:** Left-aligned semantic title block reading exactly `My Appointments` (`text-xl font-bold text-text-primary border-b border-border-default pb-4 mb-6`).
* **Stack Framework:** A linear vertical stack container mapping out appointment entities (`space-y-4`).

### 2. Appointment Structural Row Primitive (`components/appointment-row.tsx`)

Each individual card follows a clean 3-section horizontal distribution framework layout (`flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-bg-surface border border-border-default rounded-xl gap-4`):

#### A. Left Side: Provider Information Split

* **Avatar Wrapper:** Precise circular portrait frame tracking the doctor profile photo (`w-20 h-20 rounded-lg overflow-hidden bg-bg-base border border-border-default shrink-0`).
* **Metadata Group:** Vertical flex stack detailing parameters:
* **Doctor Name:** High-contrast text name (`text-base font-bold text-text-primary`). Example: `Dr. Ganesh Lama`.
* **Specialty:** Light, clean descriptor label (`text-xs text-text-secondary`). Example: `General physician`.
* **Clinic Address Field Block:** Left-aligned physical tracking info exactly as modeled:
`Address: [Floor/Complex Location], [City/Region Name], Nepal` (`text-xs text-text-secondary mt-2 leading-relaxed`).



#### B. Middle Section: Date & Timing Logs

* Displays scheduling coordinates using highly distinct labels:
* `Date & Time: 20-4-2026 | 10:30 AM` (`text-xs font-medium text-text-primary bg-bg-base px-3 py-1.5 rounded-md border border-border-default`).



#### C. Right Side: Conditional Operational Action Matrix

Action workflows are contextually mapped across row items exactly matching the three states visible in `image_689cbe.png`:

1. **State A: Unpaid Pending Entry (e.g., Row 1)**
* Single right-aligned button primitive labeled `Cancel appointment` (`bg-transparent border border-border-default text-text-secondary hover:bg-state-error/10 hover:text-state-error px-4 py-2 rounded-md text-xs font-medium transition-all`).


2. **State B: Payment Required Entry (e.g., Row 2)**
* Vertical action layout stack containing:
* Primary action button labeled `Pay here` using your bright brand primary style definitions (`bg-accent-primary hover:opacity-90 text-white px-6 py-2 rounded-md text-xs font-medium w-full text-center`).
* Secondary action text button underneath reading `Cancel appointment`.




3. **State C: Fully Settled Entry (e.g., Row 3)**
* Vertical action layout stack containing:
* A disabled status badge container labeled `Paid` using green tint states (`bg-state-success/10 border border-state-success text-state-success px-6 py-2 rounded-md text-xs font-semibold w-full text-center cursor-default select-none`).
* Secondary action text button underneath reading `Cancel appointment`.





---

## Verification Criteria

* [ ] The horizontal flex layouts collapse fluidly into clean, structured vertical items on narrow mobile viewports (`< 640px`) to maximize data readability.
* [ ] Buttons map precisely to the target style definitions (Teal Brand vs Light Border Actions).
* [ ] No database state handlers are implemented yet; content maps completely to type-safe constants.

```

The specifications for your patient interface modules are locked and loaded. Let me know when you are ready to transition to the doctor panel dashboard layouts!

```