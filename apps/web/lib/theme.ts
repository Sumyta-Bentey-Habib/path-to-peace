/**
 * Design system tokens and shared style snippets.
 * These can be used inside the 's' helper objects.
 */

export const theme = {
  colors: {
    primary: "text-primary",
    primaryBg: "bg-primary",
    onPrimary: "text-on-primary",
    surface: "bg-surface",
    surfaceVariant: "text-on-surface-variant",
    outline: "border-outline-variant/30",
  },
  typography: {
    heading: "text-4xl font-serif font-bold",
    subheading: "text-lg font-medium",
    label: "text-sm font-bold",
    body: "text-base font-medium",
    caption: "text-xs font-medium",
  },
  breakpoints: {
    mobile: "",
    tablet: "md:",
    desktop: "lg:",
    wide: "xl:",
  },
  spacing: {
    formGap: "space-y-6",
    inputPadding: "py-4 px-4",
    cardPadding: "p-8 md:p-12",
  },
  utils: {
    flexCenter: "flex items-center justify-center",
    glass: "glassmorphism ghost-border",
    transition: "transition-all duration-300",
  }
};

/**
 * Common style presets for quick use
 */
export const styles = {
  formInput: {
    width: "w-full",
    background: "bg-surface-container-low",
    border: "border border-outline-variant/30",
    borderRadius: "rounded-2xl",
    padding: "py-4 pl-12 pr-4",
    focus: "focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary",
    transition: "transition-all",
  }
};
