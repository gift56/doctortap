# Overview

This specification details the end-to-end integration of Clerk authentication across the application infrastructure. It establishes a secure, professional, split-panel light-themed interface context, handles route protection using a src/level `proxy.ts`, handles state-driven user management layouts, and ensures authenticated traffic lands directly on the custom patient dashboard tracking loops.

---

## Technical Specifications & Configuration

### 1. Root Layout Integration (`app/layout.tsx`)
* **Provider Wrapper:** Wrap the application's HTML body configuration completely inside the `ClerkProvider` context.
* **Light Theme Override:** Import the explicit `experimental__simple` or baseline base light styling structures from `@clerk/nextjs`. Override internal layout colors dynamically using your design system's local CSS color utility tokens. Do not hardcode raw values:

```typescript
import { ClerkProvider } from '@clerk/nextjs';

// Inside your Root Layout component:
<ClerkProvider 'bg-accent-primary 'border 'shadow-sm 'var(--accent-primary)', 'var(--bg-base)', 'var(--bg-surface)', 'var(--border-default)', 'var(--text-primary)', 'var(--text-secondary)', // Dense Teal White/light accent appearance="{{" border border-border-default card: charcoal/black colorBackground: colorBorder: colorInputBackground: colorInputText: colorPrimary: colorText: colorTextSecondary: elements: font-medium formButtonPrimary: hover:bg-accent-primary-hover hover:bg-bg-base', rounded-xl', socialButtonsBlockButton: surface text text-white token transition-all', variables: { } }, }}>
  {children}
</ClerkProvider>

```

### 2. Global Route Guard & Verification Matrix (`src/proxy.ts`)

* **Location:** Must sit directly at the project root (`src/proxy.ts`). Do not initialize or include a standard `middleware.ts` file in the `src/` or `app/` sub-directories.
* **Public Route Boundaries:** Expose only the dedicated public auth path variables via your existing environment variables:
* `NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in`
* `NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up`


* **Route Protection Matrix:**
* **Authenticated State:** If a valid session token exists, calling the root path `/` must instantly redirect the active user to the secure client panel: `/patient/dashboard`.
* **Unauthenticated State:** If an active session token is missing, intercept the connection loop immediately and force-redirect traffic cleanly back to the onboarding path: `/sign-in`. Protect all other system file paths by default.



---

## UI Layout Specifications

### 1. Clean Two-Panel Light Onboarding Layout (`app/(auth)/layout.tsx`)

* **Large Breakpoints (`md:` and above):** A sharp, asymmetrical two-panel grid layout (`grid-cols-1 md:grid-cols-12 min-h-screen bg-bg-base`).
* **Left Branding Panel (Span 5):**
* Background color uses a clean, light, token-driven aesthetic (`bg-bg-surface border-r border-border-default p-12 flex flex-col justify-between`).
* *Top Section:* Renders the compact text logo block `MyDoctorApp` or its companion icon element.
* *Center Section:* Clean, legible typography block displaying your core tagline: `"Book Appointment With Trusted Doctors"`, followed by a minimalist, short text-only list outlining platform features (e.g., Verified Practitioners, Instant Scheduling, Digital Health Vault).
* *Rule:* **No gradients, complex illustration cards, or high-density container cards can be rendered in this structural space.**


* **Right Authentication Panel (Span 7):**
* A minimalist white content canvas area (`flex items-center justify-center p-6 bg-bg-base`).
* Houses the corresponding core Clerk primitive form cleanly centered in the middle of the viewport.




* **Small Breakpoints (`< 768px`):**
* Collapse the left branding layout panel completely (`hidden`).
* Render the central Clerk component form view only (`col-span-12`), maximizing interaction efficiency on mobile phone screens.



### 2. Core Auth Routing Nodes

* **Sign-In Workspace Page (`app/(auth)/sign-in/[[...sign-in]]/page.tsx`):**
* Mounts the standard `<SignIn />` component with zero extra wrapper elements.


* **Sign-Up Workspace Page (`app/(auth)/sign-up/[[...sign-up]]/page.tsx`):**
* Mounts the standard `<SignUp />` component with zero extra wrapper elements.



### 3. Structural Context Navbar Integration

* **User Context Button:** Mount Clerk’s built-in `<UserButton afterSignOutUrl="/sign-in" />` primitive directly inside the right side action container of the main layout application header navbar.
* **Visual Rules:** Keep Clerk's internal menu parameters running cleanly as defaults without overwriting component profiles. The button boundary layout must render crisp, circular avatar frameworks matching your local navigation tokens.

---

## Verification Criteria

* [ ] `proxy.ts` exists cleanly at the system root boundary folder structure.
* [ ] Every functional system directory route is fully protected by default except specified public validation paths.
* [ ] Both sign-in and sign-up panels pull styling variables exclusively from CSS color variables, with **zero hardcoded hex values or deep mode canvas elements remaining**.
* [ ] `ClerkProvider` wraps the layout route safely without breaking tree components.
* [ ] Authenticated root redirects land the patient safely onto `/patient/dashboard`.
* [ ] Running the baseline console command `npm run build` flags zero types or layout compilation errors.

```

```