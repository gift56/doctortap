# Overview
This specification details the structural design and interface rules for the secure root system provider verification workspace (`app/(admin)/admin/verification/page.tsx`). It outlines a modern, high-density credential review dashboard where platform administrators can audit incoming doctor registration identities, inspect medical council license documents, and securely approve or reject platform access.

---

## Technical Specifications & UI Layout

### 1. Global Admin Shell Dependency
* **Layout State:** Must perfectly preserve the persistent global admin vertical navigation sidebar and top header banner structure.
* **Active Navigation State:** The `Verification` sidebar link item must switch to the active primary focus token state (`bg-accent-primary/10 text-accent-primary font-semibold rounded-lg px-4 py-3 flex items-center gap-3`), with all other links dropping back to standard interactive text styles.

### 2. Main Verification Content Canvas
* **Layout Container:** Wrapped inside the central workspace viewport scrolling block (`p-8 space-y-6 max-w-7xl mx-auto w-full`).
* **Header Typographic Block:**
  * Master Title: `Provider Verification` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Review submitted medical council credentials, verify clinical licenses, and manage onboarding practitioner applications.` (`text-sm text-text-secondary mt-1`).

---

## Onboarding Metrics Banner
Positioned right below the header block, map a fast-scannable status metrics row using clean light-mode surfaces (`grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6`):

1. **Card 1: Pending Action**
   * Style: `bg-bg-surface border border-border-default p-4 rounded-xl shadow-sm`
   * Text Details: Label `Pending Review` over prominent accent text `8 Applications` (`text-xl font-bold text-amber-600`).
2. **Card 2: Verified Volume**
   * Text Details: Label `Approved Practitioners` over prominent accent text `24 Active` (`text-xl font-bold text-emerald-600`).
3. **Card 3: Total Submissions**
   * Text Details: Label `Total Global Registrations` over prominent accent text `32 Applications` (`text-xl font-bold text-text-primary`).

---

## Verification Application Queue Grid

The pending applicants are mapped using a stacked vertical master-detail block layout (`space-y-4 mt-6`). 

### Application Request Card Component (`components/admin/verification-card.tsx`)
Each container handles an unverified doctor's data using clean, high-contrast layouts (`bg-bg-surface border border-border-default hover:border-border-default p-6 rounded-xl shadow-sm transition-all flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6`):

* **Left Block: Practitioner Core Credentials**
  * Displays a vertical layout tracking medical profile data:
    * Doctor Name: `Dr. Anjali Sharma` (`text-base font-bold text-text-primary`).
    * Specialty & Experience tag: `Cardiologist • 12 Yrs Experience` (`text-xs text-text-secondary mt-0.5`).
    * Unique ID & License block: `NMC Reg No: NMC-4421D` (`text-xs font-mono text-text-muted mt-1 bg-bg-base px-2 py-0.5 rounded border border-border-default w-max`).

* **Middle Block: Document Audit Drawer**
  * Provides administrators direct link triggers to inspect uploaded biometric materials:
    * Interactive Attachment Badge: Link trigger labeled `📄 View Medical_License.pdf` (`text-xs font-medium text-accent-primary bg-accent-primary/5 hover:bg-accent-primary/10 px-3 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all border border-accent-primary/10 cursor-pointer`).

* **Right Block: Administrative Action Decision Row**
  * A horizontal grouping of deterministic action elements handling platform status updates (`flex items-center gap-3 shrink-0`):
    * **Reject Option:** A secondary execution button reading `Reject` (`border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold px-4 py-2 rounded-md transition-all cursor-pointer`).
    * **Approve Option:** A primary high-contrast action button reading `Approve & Verify` (`bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-md shadow-sm transition-all cursor-pointer`).

---

## Local Mock Verification Queue Constants
Initialize your interface template loops during front-end composition using this data array:

```typescript
export const MOCK_PENDING_VERIFICATIONS = [
  {
    id: "REQ-002",
    name: "Dr. Anjali Sharma",
    specialty: "Cardiologist",
    experience: "12 Yrs",
    councilId: "NMC-4421D",
    documentUrl: "/docs/license-anjali.pdf",
    submittedAt: "2026-05-30"
  },
  {
    id: "REQ-005",
    name: "Dr. Bikram Shah",
    specialty: "Pediatrician",
    experience: "6 Yrs",
    councilId: "NMC-9081A",
    documentUrl: "/docs/license-bikram.pdf",
    submittedAt: "2026-05-29"
  }
];

```

---

## Verification Criteria

* [ ] Active selector styling attributes highlight the `Verification` routing element clearly within the left-hand navigation panel.
* [ ] Reject and Approve buttons are explicitly color-coded with semantic states (red text for reject, emerald background for approval) to avoid administrative click errors.
* [ ] All interactive item surfaces utilize the design system's local theme tokens with zero raw background values or dark mode leaks.
* [ ] The horizontal layout structure shifts fluidly into vertical stacks on narrow viewport sizes (`< 1024px`) to preserve element readability.

```