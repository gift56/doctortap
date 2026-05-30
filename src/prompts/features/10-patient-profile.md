# Overview
This specification details the structural design and interface rules for the secure patient landing dashboard workspace (`app/(patient)/dashboard/page.tsx`) derived from `image_141e81.png`. It replaces standard profile placeholder templates with a dedicated clinical portal header layout and a responsive health metrics workspace while maintaining absolute theme token discipline.

---

## Technical Specifications & UI Layout

### 1. Global Patient Sub-Header & Navigation Layout
* **Layout Structure:** A horizontal navbar row positioned at the top of the portal (`flex items-center justify-between w-full border-b border-border-default bg-bg-surface px-6 py-4`).
* **Brand Block (Left Side):** Renders the consolidated brand identity text `DoctorTap` flanked immediately by a custom semantic actor badge string reading `Patient` (`text-xs font-medium px-2 py-0.5 rounded-full bg-bg-base text-text-secondary border border-border-default`).
* **Navigation Links Module (Center Side):** Matches the clear text-trigger elements seen in `image_141e81.png`. Links track routing destinations cleanly using relative navigation anchors:
  * **Dashboard / Profile:** (`app/(patient)/dashboard/page.tsx`) → Set to active pill style (`bg-accent-primary/10 text-accent-primary font-medium px-4 py-1.5 rounded-md`).
  * **Appointments:** (`app/(patient)/appointments/page.tsx`) → Standard layout trigger link (`text-text-secondary hover:text-text-primary px-4 py-1.5 transition-all`).
  * **Billing:** (`app/(patient)/billing/page.tsx`) → Standard layout trigger link (`text-text-secondary hover:text-text-primary px-4 py-1.5 transition-all`).
* **User Context Trigger (Right Side):** Mounts the circular profile avatar component frame cleanly right-aligned to finish the header layout boundaries.

### 2. Clinical Workspace Framework ("Health summary")
* **Header Block:** Left-aligned typographic container text layout matching your local configuration:
  * Master Title: `Health summary` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Upcoming consultations and prescription activity.` (`text-sm text-text-secondary mt-1`).

* **Information & Demographics Layout Grid:**
  * **Container Skin:** Positioned immediately underneath the workspace header, wrapped inside an independent modern card primitive (`max-w-4xl w-full bg-bg-surface border border-border-default p-8 rounded-xl mt-8`).
  * **Data Mapping Elements:** Displays a clean multi-column layout grid displaying type-safe client account metrics:
    * *Field Set:* Patient Name, Primary Telecommunication Number, Medical Mailing Address, and Blood Group Variant tags.
  * **Action Row Toggle:** Features a crisp, interactive data mutation switch labeled `Edit Profile` using clean secondary style attributes (`inline-flex items-center px-4 py-2 border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-white rounded-md text-sm font-medium transition-all duration-200 cursor-pointer`).

---

## Verification Criteria
- [ ] Sub-header navigation nodes precisely match the text layout pairs specified in `image_141e81.png` (`Dashboard`, `Appointments`, `Billing`).
- [ ] Active selector styling attributes swap contexts cleanly depending on the current active pathname.
- [ ] No un-tokenized pure white background values leak or bleed into the responsive layout canvas viewports.
- [ ] Content blocks collapse fluidly down into structured single-column arrangements on mobile breakpoints (`< 768px`).