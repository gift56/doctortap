# Overview

This specification covers the implementation of the public-facing Marketing Homepage (`app/(public)/page.tsx`). The page acts as the primary acquisition tunnel for DoctorTap, requiring a clean, medical-grade technical UI, high readability, responsive layouts, and zero light-mode bleed.

---

## Technical Specifications

### 1. Mock Data Constants (`config/mock-data.ts`)

To isolate this task from the backend database layer, the agent must read from a centralized mock constants file.

* **Specialties List:** An array of 6 items containing `id`, `name`, and `slug`.
* *Values:* General Physician, Gynecologist, Dermatologist, Pediatrician, Neurologist, Gastroenterologist.


* **Doctors Array:** Minimum of 8 doctor objects for the grid.
* *Fields:* `id`, `name`, `specialty`, `experienceYears`, `avatarUrl` (use reliable, high-resolution medical stock images from Unsplash via HTTPS), `availabilityStatus` (always set to `"Available"` for this phase).



### 2. Global Public Layout Dependency

* **Header / Navigation:** Must feature the logo (`MyDoctorApp` text brand or icon matching the top-left layout), navigation links (`Home`, `All Doctors`, `About`, `Contact`), and a prominent top-right action button (`Create Account` / `Login`).
* **Footer:** Clear columns for Company tracking links, Contact metadata information, and standard legal copyrights.

---

## Structural UI Sections & Layout Rules

### Section 1: Hero Banner Container

* **Layout:** Responsive flex-row or 2-column CSS Grid. Left side handles text content layout; right side renders the overlapping doctor group team asset.
* **Background Canvas:** Deep teal color token background (`--accent-primary` / `#00a396`) with rounded borders (`rounded-xl` / `0.75rem`).
* **Typography:** Large bold display header text (`Book Appointment With Trusted Doctors`), inline avatar row showing small overlapping social proof images, and a clean white client-action button labeled `Book appointment →`.

### Section 2: Specialty Selector ("Find by Speciality")

* **Header:** Centered text content layout block. Title text (`Find by Speciality`), followed by a small, fluid tracking sentence (`Simply browse through our list of trusted healthcare professionals...`).
* **Interactive Row:** A horizontal flex wrap or grid containing exactly 6 circular specialty slots.
* **Item Token Mapping:** Each slot features a circular container holding a minimalist clinical vector icon centered inside, with a small descriptive label immediately underneath.

### Section 3: Provider Showcase Grid ("Top Doctors to Book")

* **Header:** Centered layout element block containing the primary header text (`Top Doctors to Book`) and a muted tracking subtitle.
* **Grid Framework:** Responsive multi-column CSS grid (`grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4`) with standard padding values (`gap-6`).
* **Doctor Card Layout Primitive (`components/doctor-card.tsx`):**
* *Top Section:* Full width, aspect-ratio calibrated image wrapper displaying the provider avatar image.
* *Internal Metadata Block:* Left-aligned padding box containing an immediate green badge indicator (`● Available`), doctor's text name (`Dr. [Name]`), and specific medical specialty text designation.


* **Action Row:** A centered button element labeled `MORE` located below the card layout mesh grid to handle pagination routing.

### Section 4: Secondary Marketing Call-To-Action (CTA) Banner

* **Background Layout:** Uses the exact same rounded deep teal profile layer matrix seen in the upper layout section.
* **Content:** Left-aligned header text block reading `Book Appointment \n With 100+ Trusted Doctors`. Features a lower-left interactive white action block element labeled `Create account`.
* **Graphic Alignment:** Right-aligned vertical cut-out element showcasing a smiling practitioner matching the visual layout exactly.

---

## Fallback & Image Optimization Rules

* **Image Sourcing:** Use explicit medical stock image URLs from Unsplash with optimized asset parameters to prevent slow rendering times:
* *Main Doctor Group:* `https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=600&auto=format&fit=crop`
* *Lower Banner Doctor:* `https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop`
* *Individual Providers:* Clean professional clinic portraits matching corporate sizing constraints.


* **Theme Continuity:** Text labels or sub-containers must read tokens explicitly out of `--text-primary` or `--bg-surface`. **No white or un-tokenized light background spaces may appear anywhere on the viewport.**

---

## Check When Done

* [ ] The page resolves without layout shifts under responsive viewports.
* [ ] Specialty items map precisely to the mock tracking configurations.
* [ ] Image source strings load cleanly over HTTPS protocols without breakage.
* [ ] Clicking actions or routing pathways use Next.js link handlers correctly.