# Overview
This specification details the structural implementation of the public-facing About Us view (`app/(public)/about/page.tsx`) derived from `screenshots/image_740c49.png`. It modernizes the baseline wireframe layout by infusing a high-end design token system, semantic `lucide-react` feature icons, micro-interactive hovering mechanics, and strict color consistency to avoid any un-tokenized light bleed.

---

## Structural UI Sections & Layout Rules

### Section 1: Hero Context Split Row ("ABOUT US")
* **Layout Grid:** A balanced asymmetric responsive grid (`grid-cols-1 md:grid-cols-5 gap-12 items-center max-w-7xl mx-auto px-6 py-12`).
* **Left Graphic Column (2-Column Span):**
  * Displays the core team asset portrait (`screenshots/image_740c49.png`).
  * **Frame Masking:** Structured with modern design continuity borders (`rounded-2xl overflow-hidden shadow-xl border border-border-default aspect-[4/3] relative`).
  * **Fallback Asset Sourcing:** High-resolution clinical stock asset via HTTPS:
    `https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop`
* **Right Narrative Column (3-Column Span):**
  * **Header Typography:** Large semantic title layout block (`text-3xl font-light tracking-wide text-text-muted`). The active segment stands out cleanly via explicit weights (`font-bold text-text-primary`), rendering exactly as: **ABOUT** <span class="text-text-primary font-bold">US</span>.
  * **Paragraph Blocks:** Multi-tier left-aligned text containers utilizing tracking configurations (`text-base leading-relaxed text-text-secondary space-y-4`). Holds the exact production copy pairs from `screenshots/image_740c49.png`.
  * **Vision Paragraph Module:** Sub-header block explicitly titled `Our Vision` using clear text layout attributes (`text-lg font-semibold text-text-primary mt-6 mb-2`), followed by the baseline platform text specification.

### Section 2: Core Value Grid Card Module ("WHY CHOOSE US")
The horizontal border wireframe block from `screenshots/image_740c49.png` is upgraded here into a modern, independent multi-column flex card arrangement.

* **Header Section:** Left-aligned text container reading **WHY** <span class="text-text-primary font-bold">CHOOSE US</span> using layout tokens (`text-xl tracking-wider text-text-muted uppercase mb-8`).
* **Value Grid Mesh:** A highly fluid responsive configuration layout (`grid-cols-1 md:grid-cols-3 gap-6`).
* **Card Component Architecture (`components/ui/value-card.tsx`):**
  Instead of generic row-border splits, each item lives in an isolated, modern container layout:
  `bg-bg-surface border border-border-default hover:border-accent-primary hover:shadow-lg rounded-xl p-6 transition-all duration-300 transform hover:-translate-y-1`

---

## Detailed Card Configurations & Value Copy Pairs

To make this page highly modern and interactive, each feature item is bound to a matching clinical icon design system node and colored subtle backplane accents using your design system tokens:

| Card Block Identifier | Semantic Lucide Icon Asset | Icon / Accent Border Tint Context | Production Text Copy (`screenshots/image_740c49.png`) |
| :--- | :--- | :--- | :--- |
| **EFFICIENCY:** | `Zap` | `text-accent-primary` / `bg-accent-primary/10` | "Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle." |
| **CONVENIENCE:** | `MapPin` | `text-[#3b82f6]` (Teal-Blue Variant) / `bg-[#3b82f6]/10` | "Access To A Network Of Trusted Healthcare Professionals In Your Area." |
| **PERSONALIZATION:** | `HeartPulse` | `text-[#ef4444]` (State-Crimson) / `bg-[#ef4444]/10` | "Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health." |

### Card Sub-Element Typography Rules
1. **Icon Wrapper Canvas:** The assigned icon is nested inside a small circular bounding box (`w-12 h-12 rounded-lg flex items-center justify-center mb-4`).
2. **Feature Heading Label:** Bold alphanumeric tracking text string matching the definition layouts (`text-sm font-bold tracking-wider text-text-primary uppercase mb-2`).
3. **Descriptive Summary Body:** Clean readability text strings matching structural parameters (`text-sm leading-relaxed text-text-secondary`).

---

## Verification Criteria
- [ ] No un-tokenized pure white canvas backgrounds or structural bleed can appear anywhere on the layout viewport.
- [ ] Feature container cards must transition cleanly when encountering micro-interactive hover states.
- [ ] The core typography layout string split ("ABOUT US" / "WHY CHOOSE US") correctly highlights the latter word weights.
- [ ] Responsive layouts transform seamlessly into single-column vertical block views on mobile breakpoints (`< 768px`).