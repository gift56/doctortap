# UI Context

## Theme

Light mode base with professional healthcare-focused deep accents. The visual language is a clean, medical-grade web workspace leveraging stark white or neutral-gray background layers to maximize text readability, contrasted with vivid deep teal accents for primary interactions and crisp emerald highlights for provider availability signals as shown in image_668580.png and image_668885.png.

## Colors

All layout structures must strictly bind to the following CSS tokens via Tailwind CSS utility wrappers; manual hardcoded hex values are strictly forbidden in frontend markup files.

| Role            | CSS Variable       | Value     |
| --------------- | ------------------ | --------- |
| Page background | `--bg-base`        | `#ffffff` |
| Surface         | `--bg-surface`     | `#f8fafc` |
| Primary text    | `--text-primary`   | `#0f172a` |
| Muted text      | `--text-muted`     | `#64748b` |
| Primary accent  | `--accent-primary` | `#00a396` |
| Border          | `--border-default` | `#e2e8f0` |
| Error           | `--state-error`    | `#ef4444` |
| Success         | `--state-success`  | `#22c55e` |

## Typography

| Role      | Font                | Variable      |
| --------- | ------------------- | ------------- |
| UI text   | Plus Jakarta Sans   | `--font-sans` |
| Code/mono | JetBrains Mono      | `--font-mono` |

## Border Radius

| Context           | Class            |
| ----------------- | ---------------- |
| Inline / small UI | `rounded-md`     |
| Cards / panels    | `rounded-xl`     |
| Modals / overlays | `rounded-2xl`    |

## Component Library

The client dashboard primitives rely completely on shadcn/ui configured on top of Tailwind CSS. Elements are contained dynamically inside `components/ui/`. Components must be added using the official shadcn CLI to prevent bespoke, untracked atomic code creation.

## Layout Patterns

- **Public Marketing Layout:** Top fixed-height branding header containing core platform links (Home, Doctors, About, Contact) accompanied by a bottom border separator, leading into full-width landing sections as detailed in image_668580.png.
- **Directory Grid Pattern:** Left-aligned vertical filter panel with sticky positioning beside a responsive multi-column flex grid containing compact provider cards with avatar slots.
- **Admin Management Console:** Full-viewport fluid dashboard wrapping an unyielding left-side navigation column, separating data feeds via explicit border markers, and handling operational updates through uniform center-stacked sheets.
- **Dialog Overlays:** Absolute-centered interface view block overlays using subtle backdrop-blur wrappers (`backdrop-blur-sm`) to cleanly capture patient cancellation tasks or onboarding workflows.

## Icons

Lucide React is the designated iconography standard library. Code definitions are strictly constrained to line stroke properties. Sizing defaults are declared via fixed utilities: `h-4 w-4` for inline labels and metadata symbols, and `h-5 w-5` inside isolated click components.
"""

# Save file to disk
file_path = "ui-context.md"
with open(file_path, "w", encoding="utf-8") as f:
    f.write(markdown_content)

print(f"File successfully created at {file_path}")

```

```text
File successfully created at ui-context.md


```

The `ui-context.md` template is populated and matching your Figma references (image_668580.png and image_668885.png).

```markdown
# UI Context

## Theme

Light mode base with professional healthcare-focused deep accents. The visual language is a clean, medical-grade web workspace leveraging stark white or neutral-gray background layers to maximize text readability, contrasted with vivid deep teal accents for primary interactions and crisp emerald highlights for provider availability signals as shown in image_668580.png and image_668885.png.

## Colors

All layout structures must strictly bind to the following CSS tokens via Tailwind CSS utility wrappers; manual hardcoded hex values are strictly forbidden in frontend markup files.

| Role            | CSS Variable       | Value     |
| --------------- | ------------------ | --------- |
| Page background | `--bg-base`        | `#ffffff` |
| Surface         | `--bg-surface`     | `#f8fafc` |
| Primary text    | `--text-primary`   | `#0f172a` |
| Muted text      | `--text-muted`     | `#64748b` |
| Primary accent  | `--accent-primary` | `#00a396` |
| Border          | `--border-default` | `#e2e8f0` |
| Error           | `--state-error`    | `#ef4444` |
| Success         | `--state-success`  | `#22c55e` |

## Typography

| Role      | Font                | Variable      |
| --------- | ------------------- | ------------- |
| UI text   | Plus Jakarta Sans   | `--font-sans` |
| Code/mono | JetBrains Mono      | `--font-mono` |

## Border Radius

| Context           | Class            |
| ----------------- | ---------------- |
| Inline / small UI | `rounded-md`     |
| Cards / panels    | `rounded-xl`     |
| Modals / overlays | `rounded-2xl`    |

## Component Library

The client dashboard primitives rely completely on shadcn/ui configured on top of Tailwind CSS. Elements are contained dynamically inside `components/ui/`. Components must be added using the official shadcn CLI to prevent bespoke, untracked atomic code creation.

## Layout Patterns

- **Public Marketing Layout:** Top fixed-height branding header containing core platform links (Home, Doctors, About, Contact) accompanied by a bottom border separator, leading into full-width landing sections as detailed in image_668580.png.
- **Directory Grid Pattern:** Left-aligned vertical filter panel with sticky positioning beside a responsive multi-column flex grid containing compact provider cards with avatar slots.
- **Admin Management Console:** Full-viewport fluid dashboard wrapping an unyielding left-side navigation column, separating data feeds via explicit border markers, and handling operational updates through uniform center-stacked sheets.
- **Dialog Overlays:** Absolute-centered interface view block overlays using subtle backdrop-blur wrappers (`backdrop-blur-sm`) to cleanly capture patient cancellation tasks or onboarding workflows.

## Icons

Lucide React is the designated iconography standard library. Code definitions are strictly constrained to line stroke properties. Sizing defaults are declared via fixed utilities: `h-4 w-4` for inline labels and metadata symbols, and `h-5 w-5` inside isolated click components.