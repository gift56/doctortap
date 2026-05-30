# Overview
This specification details the design, search infrastructure, and interactive state rules for the public directory workspace (`app/(public)/doctors/page.tsx`) derived from `screenshots/image_754c1c.png`. It integrates an active sidebar specialty filter matrix, an instantaneous search layer bound directly to browser URL query parameters, and a tokenized layout pagination tracking toolbar.

---

## Technical Specifications & UI Layout

### 1. Unified Filter and Search Control Architecture
To preserve link-sharing states and ensure optimal browser history navigation, all search inputs and category toggles sync directly with URL parameters using a custom structural hook.

* **Custom Hook (`hooks/use-doctor-filters.ts`):**
  * Reads current search terms (`?search=`) and specialty selections (`?specialty=`) safely out of Next.js navigation utilities (`useSearchParams`, `useRouter`, `usePathname`).
  * Implements non-blocking push state transitions to keep multi-criteria data filtering fast and responsive.
  * Replaces default inputs with immediate, real-time URL state synchronization.

* **Search Input Primitives Component:**
  * Located immediately above the results layout matrix.
  * Features a modern, styled input bar layout (`flex items-center gap-2 max-w-md w-full bg-bg-surface border border-border-default px-3 py-2 rounded-md focus-within:border-accent-primary transition-all`).
  * Employs a clean inline search vector icon alongside an instantaneous input box reading directly from the `useDoctorFilters` string state.

### 2. Modern Side-by-Side Grid Layout
* **Container Structure:** A balanced asymmetric framework layout (`grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4 py-8`).
* **Left Filter Sidebar (1 Column Span):**
  * Features a vertical stack of specialty selection filters matching the layout configuration in `screenshots/image_754c1c.png`.
  * **Modern Polish:** Wrap options inside micro-interactive custom selection plates (`bg-bg-surface border border-border-default hover:border-accent-primary rounded-md transition-all px-4 py-3 cursor-pointer select-none text-sm text-text-primary`).
  * **Active State:** The current targeted selection scales to flag status changes cleanly (`bg-accent-primary text-white font-medium shadow-md border-accent-primary`).
* **Right Results Area (3 Columns Span):**
  * **Active Grid Module:** Displays a responsive, fluid card layout (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`).
  * **Data-Dense Pagination Toolbar (`components/ui/pagination.tsx`):**
    * Positioned immediately below the results grid.
    * Features a clean, centered interface row (`flex items-center justify-center gap-2 mt-12 py-4`).
    * Includes semantic layout control buttons (`Prev`, interactive numbered page cells `1`, `2`, `3`, and `Next`).
    * Inherits active states clearly (`bg-accent-primary text-white font-semibold rounded-md`) with deactivated fallback parameters for edge boundaries.

### 3. Component Design & Styling Rules
* **Doctor Listing Card (`components/doctor-card.tsx`):**
  * **Top Section:** Image container wrapper with crisp border aspect boundaries (`aspect-square overflow-hidden rounded-t-xl bg-border-default relative`). Fits professional, high-resolution clinical stock photos.
  * **Availability Tag:** An immediate inline pill indicator layout featuring a bright green status circle (`● Available`) utilizing design tokens (`text-state-success text-xs font-semibold bg-bg-base/80 px-2 py-1 rounded-full backdrop-blur-sm`).
  * **Profile Strings:** The physician's clear display name text (`text-lg font-bold tracking-tight text-text-primary mt-3 px-2`) positioned immediately over their specific specialty.
* **Responsive Refinement:** On mobile breakpoints (`max-width: 768px`), the left vertical sidebar transforms into a horizontally scrolling slider track (`flex overflow-x-auto whitespace-nowrap snap-x py-2 no-scrollbar gap-2 mb-4`) positioned above the search bars for easier thumb scrolling.

---

## Verification Criteria
- [ ] The custom search hook initializes and pushes valid search parameters cleanly to the browser address line without reloading the layout wrapper.
- [ ] Changing page arrays via the pagination primitive recalculates card tracking loops instantly.
- [ ] All interactive elements (sidebar cards, search inputs, paging buttons) draw styles dynamically from the core `@theme` configuration context.
- [ ] No default layout elements or light background fields bleed into mobile viewport profiles.