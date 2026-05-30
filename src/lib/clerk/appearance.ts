import type { ClerkAppearanceTheme } from "@clerk/shared/types";

export const clerkAppearance: ClerkAppearanceTheme = {
  variables: {
    colorPrimary: "var(--accent-primary)",
    colorBackground: "var(--bg-base)",
    colorBorder: "var(--border-default)",
    colorInputBackground: "var(--bg-surface)",
    colorInputText: "var(--text-primary)",
    colorText: "var(--text-primary)",
    colorTextSecondary: "var(--text-secondary)",
    borderRadius: "0.75rem",
  },
  elements: {
    card: "border border-border-default bg-bg-base shadow-sm",
    formButtonPrimary:
      "bg-accent-primary text-white font-medium hover:opacity-90 rounded-xl transition-all",
    socialButtonsBlockButton:
      "border border-border-default bg-bg-surface shadow-sm",
  },
};
