# Overview

This specification details the dynamic presentation layout for the dedicated practitioner profile page (`app/(public)/doctors/[id]/page.tsx`) modeled on `screenshots/image_754c1f.png`. It combines static biography sheets with a modern scheduling carousel matrix.

---

## Technical Specifications & UI Layout

### 1. Unified Information Header Card

- **Layout Design:** A clean, horizontal multi-column structure (`grid-cols-1 md:grid-cols-4 gap-6 items-start bg-bg-surface border border-border-default p-6 rounded-xl`).
- **Left Image Block (1 Column Span):**
- Displays a square photo frame featuring a high-contrast teal accent canvas backplane background behind the practitioner portrait (`bg-accent-primary rounded-xl aspect-square overflow-hidden p-1`).

- **Right Content Dashboard (3 Columns Span):**
- **Title Row:** Full name text typography (`Dr. Ganesh Lama`) flanked by an explicit green verified emblem asset badge.
- **Credentials Pill:** Inline display string showing academic credentials alongside professional tenure parameters (`MBBS - General Physician`, `15 Years`).
- **Biography Text Block:** Left-aligned summary block showing detailed credentials and background information.
- **Financial Ticker:** Clear currency marker layout showcasing standard diagnostic booking fees (`Appointment fee: ₨ 1000`) styled with explicit color contrasts.

### 2. Advanced Interactive Slot Booking Interface

- **Date Carousel Bar:**
- Displays a horizontal carousel tracking consecutive calendar days (`MON 10` through `SUN 16`).
- **Modern Navigation State:** Inactive day cells use standard layouts (`border border-border-default bg-transparent text-text-muted`). The active selection pops cleanly (`bg-accent-primary border-accent-primary text-white shadow-md transform scale-105`).

- **Time Grid Selector:**
- Displays a grid of available time intervals (`8:00 am`, `8:30 am`, `9:00 am`, etc.).
- **Interactivity:** Selected slots change color layout metrics instantly to match system confirmation states (`bg-accent-primary text-white`).

- **Submission Trigger:** A centered, full-width or distinct tracking button container displaying `Book an appointment`.

### 3. "Related Doctors" Carousel / Bottom Grid

- **Layout:** Displays a lower row grid section (`Top Doctors to Book` design archetype) displaying alternative clinical professionals within the matching domain specialty.

---

## Verification Criteria

- [ ] Date carousel variables cleanly highlight user selections without state lag.
- [ ] Mock system strings enforce strict text formatting matching the currency tokens in `screenshots/image_754c1f.png`.
- [ ] Form submission actions pass verified date strings and timing coordinates correctly.
