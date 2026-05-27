# Overview

DoctorTap uses a structured **Next.js App Router layout grouping system** to split public-facing marketplace loops, critical authentication structures, doctor dashboard portals, and back-office administrative consoles. This ensures strict layout isolation, separate security contexts, and distinct system boundaries between public content, clinical tools, and platform management tools.

All pages are grouped using explicit route groups (`(public)`, `(auth)`, `(patient)`, `(provider)`, `(admin)`) to isolate distinct UI shells while sharing optimized design tokens.

---

## Page Grouping Strategy

The platform is divided into five major application domains:

1. **Public Engine (Marketing, Doctor Discovery, & Public Reviews)**
2. **Authentication Pages (Dedicated Auth Shell)**
3. **Patient Dashboard (Protected Booking & Consultation Log)**
4. **Provider Portal (Protected Doctor Calendar Control, Medical Queue, & Charts)**
5. **Admin Console (Protected Global System Vetting, Platform Economics, & User Management)**

Each domain exposes its own isolated layout, structural sidebar/navbar navigation, and interface behaviors.

---

## 1. Public Marketplace Group `(public)`

### Purpose
Handles the core marketing footprint, pricing matrices, doctor discovery engine, and public doctor profiles.

### Pages Included
* `/` → Landing page (`page.tsx`)
* `/search` → Advanced doctor discovery and specialty filtering directory
* `/doctor/[id]` → Doctor profile views, availability timelines, and patient feedback feeds

### Layout: `app/(public)/layout.tsx`
Shared UI includes:
* Global clean navigation bar (fixed transparent header with backdrop blur metrics)
* Comprehensive footer layout (specialty navigation indexes, compliance linkages, and legal credits)

---

## 2. Authentication Pages Group `(auth)`

### Purpose
Provides clean, isolated user registration and sign-in experiences for all platform roles.

### Pages Included
* `/login` → Single entry login router
* `/register` → Patient account creation interface
* `/register/provider` → Deep practitioner licensing, identification intake, and vetting profile pipeline

---

## 3. Patient Dashboard Group `(patient)`

### Purpose
The secure, private workspace for patients to schedule clinical virtual consultations, update medical records, and process medical fees.

### Pages Included
* `/patient/dashboard` → Health summary view, upcoming consultations, and dynamic prescription logs
* `/patient/appointments` → Complete historical consultation records and active booking pipeline
* `/patient/billing` → Payment card setup, invoice tracking, and digital medical statement printouts

---

## 4. Provider Portal / Doctor Dashboard Group `(provider)`

### Purpose
The high-density clinical and operational workspace built specifically for verified doctors to organize their digital practices, adjust calendar intervals, evaluate patient charts, and conduct virtual consultations.

### Pages Included
* `/provider/dashboard` → Doctor queue summary, daily slot intervals, and operational balance metrics
* `/provider/calendar` → Advanced availability adjustments, recurring blockage toggling, and calendar sync parameters
* `/provider/patients` → HIPAA-aligned global patient charts index, diagnostic update logs, and clinical record editing views
* `/provider/payouts` → Paystack bank destination links, completed booking payout charts, and operational revenue data

### Layout: `app/(provider)/layout.tsx`
Shared UI includes:
* High-density professional left sidebar module (Doctor-specific actions)
* Top operational status control header (Toggle presence states: "Online for immediate calls" vs "Offline")

---

## 5. Admin Console Group `(admin)`

### Purpose
The secure platform control tower where system administrators vet pending doctor credentials, manage disputes, override platform parameters, and track platform-wide Paystack payout batches.

### Pages Included
* `/admin/dashboard` → System health monitoring, active session volume, and high-level financial tickers
* `/admin/verification` → Doctor credentials vetting pipeline (reviewing medical licenses and identities)
* `/admin/users` → Multi-role global directory list (patients, doctors, and system accounts management)
* `/admin/payouts` → Consolidated practitioner payables processing engine and escrow ledger tracking

### Layout: `app/(admin)/layout.tsx`
Shared UI includes:
* High-security left administrative control panel
* Global system status strip (showing active background worker jobs and system alerts)
* Dense data table views optimized for massive bulk actions

---

## Layout Relationship Diagram


```

app/
├── (public)/
│     ├── page.tsx
│     ├── search/
│     └── layout.tsx
│
├── (auth)/
│     ├── login/
│     └── layout.tsx
│
├── (patient)/
│     ├── patient/dashboard/
│     └── layout.tsx
│
├── (provider)/
│     ├── provider/dashboard/ (Earnings, Patient queue feed)
│     ├── provider/calendar/ (Doctor's appointment schedule)
│     └── layout.tsx
│
└── (admin)/
├── admin/dashboard/
├── admin/verification/
└── layout.tsx

```

---

## Styling & UX Rules

* **All environments enforce dark mode explicitly[cite: 9].**
* Public domains favor clean typographic spacing and container layouts[cite: 6, 9].
* Patient portals maximize clean interaction and ease of operation[cite: 6, 9].
* Provider and Admin tools enforce ultra-compact data grids, legible tracking metrics, and structured lists optimized for fast data parsing[cite: 6, 9].

---

## Check When Done

✔ All system endpoints resolve safely into `(public)`, `(auth)`, `(patient)`, `(provider)`, or `(admin)` layout directories
✔ Each group initializes its structural shell without leaking element styles to other sections
✔ Router parameters handle structural mapping clean and error-free
