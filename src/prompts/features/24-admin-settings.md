# 24-admin-settings.md

## Overview
This specification details the structural design and component rules for the global admin profile configuration workspace (`app/(admin)/admin/settings/page.tsx`). It details a modular settings dashboard that allows root system managers to update structural security keys, alter administrator account profiles, adjust application information metadata tokens, and manage administrative credentials securely.

---

## Architecture Components & Layout Updates

### 1. Updated Global Top Header Nav Bar (Shadcn Dropdown Integration)
Instead of adding an option to the sidebar navigation tree, mount an interactive user avatar node inside the top utility bar header layout container (`flex items-center justify-between w-full border-b border-border-default px-8 py-4 bg-bg-surface`):
* **Left Sub-layout:** Retains the `DoctorTap` brand mark text alongside the persistent `Admin` badge element.
* **Right Sub-layout (Shadcn Trigger Node):** Replaces the legacy plain logout block with an integrated primitive dropdown shell (`components/ui/dropdown-menu.tsx`):
  * **Dropdown Trigger:** An interactive, high-contrast circular profile avatar container (`w-9 h-9 rounded-full bg-accent-primary/10 border border-border-default flex items-center justify-center text-xs font-bold text-accent-primary hover:bg-accent-primary/20 transition-all cursor-pointer`).
  * **Dropdown Content Overlay Menu (Shadcn Primitive Content Sheet):** Populates when triggered dynamically on click (`w-56 mt-2 rounded-lg border border-border-default bg-bg-surface p-1 shadow-md animate-in fade-in-50 slide-in-from-top-1`):
    * *Menu Header Label:* Displays current account tier metadata details reading `System Administrator` (`text-xs font-semibold text-text-muted px-2.5 py-2 block border-b border-border-default mb-1`).
    * *Interactive Item Node 1:* Link routing explicitly to settings layout page labeled `⚙️ Profile Settings` (`flex items-center gap-2 text-xs font-medium text-text-primary hover:bg-bg-base rounded-md px-2.5 py-2 transition-all cursor-pointer`).
    * *Interactive Item Node 2:* Action trigger execution block labeled `🚪 Logout` (`flex items-center gap-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-md px-2.5 py-2 transition-all cursor-pointer`).

---

## Technical Specifications & UI Layout (`page.tsx`)

### 1. Main Settings Container Layout
* **Layout Container:** Wrapped inside a single-column layout column architecture optimized for clean input field management (`max-w-3xl mx-auto px-6 py-10 space-y-8 w-full`).
* **Header Typographic Framework:**
  * Master Title: `Account & System Settings` (`text-2xl font-bold text-text-primary tracking-tight`).
  * Caption Subtext: `Modify root supervisor credentials, rotate temporary security passwords, and manage global system information profiles.` (`text-sm text-text-secondary mt-1`).

---

## Form Component Sub-Section Architecture
The workspace form array divides configurations into individual administrative card modules separated explicitly by categories (`space-y-6`).

### Section 1: Root Administrator Profile
Wrapped inside an organizational settings panel container layout (`bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm space-y-6`):
* **Section Label Title:** `Personal Profile Identity` (`text-sm font-bold text-text-primary uppercase tracking-wider`).
* **Form Inputs Grid:** Dual column data row layout array (`grid grid-cols-1 sm:grid-cols-2 gap-6`):
  * *Field Component 1:* `InputField` capturing admin full name configurations (`Default value: Admin Supervisor`).
  * *Field Component 2:* `InputField` displaying the secure master account monitoring contact email box (`Default value: system.admin@doctortap.com`).

### Section 2: Security & Password Rotation Form
A tracking container handling credential encryption updates securely using React Hook Form and Zod field evaluation metrics (`bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm space-y-4`):
* **Section Label Title:** `Credential Management` (`text-sm font-bold text-text-primary uppercase tracking-wider`).
* **Input Parameters:** Stacked vertical input array components processing credential variables safely:
  * *Field Component 1:* `InputField` processing current system password entry configurations (`type="password"`).
  * *Field Component 2:* `InputField` processing brand-new secure alphanumeric credentials generation values (`type="password"`).

### Section 3: Global Application Meta Information
Allows platform owners to adjust branding descriptors and environmental configurations easily (`bg-bg-surface border border-border-default p-6 rounded-xl shadow-sm space-y-4`):
* **Section Label Title:** `Application Information` (`text-sm font-bold text-text-primary uppercase tracking-wider`).
* **Application Meta Configuration Parameters:**
  * *Field Component 1:* `InputField` editing global brand title references (`Default value: DoctorTap Platform`).
  * *Field Component 2:* `TextAreaField` housing deployment operational notices, platform disclaimer texts, or core service alerts visible across client applications.

---

## Action Controls Operations Row
Render a crisp, right-aligned utility button row at the absolute base layout boundary of the settings form viewports to provide clear confirmation controls (`flex items-center justify-end gap-4 border-t border-border-default pt-6 mt-8`):

* **Action Trigger 1 (Discard entries):** A low-impact fallback reset switch text reading `Cancel Changes` (`text-text-secondary hover:text-text-primary text-xs font-semibold px-4 py-2 transition-all cursor-pointer`).
* **Action Trigger 2 (Persist configurations):** A high-contrast execution asset button labeled `Apply Updates` (`bg-accent-primary hover:opacity-90 text-white text-xs font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm cursor-pointer`).

---

## Verification Criteria
- [ ] Clicking the new header user avatar successfully prompts open the integrated Shadcn Dropdown component sheet layout instantly without altering window scrolling contexts.
- [ ] Form input boxes integrate with validation parameters cleanly using focus states (`focus:border-accent-primary`), turning to red validation error tokens safely upon receiving flawed data.
- [ ] No un-tokenized hardcoded canvas properties bleed into layout parameters, ensuring layout integrity across all viewport layers.
- [ ] Multi-column horizontal data element frames collapse cleanly into structural vertical card arrays when resized to compact portable layout dimensions (`< 640px`).