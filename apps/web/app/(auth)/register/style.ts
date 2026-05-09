import { s } from "@/lib/styled-helper";
import { theme } from "@/lib/theme";

export const Header = s("div", {
  textAlign: "text-center",
  marginBottom: "mb-12",
});

export const IconBox = s("div", {
  display: "inline-flex",
  alignItems: "items-center",
  justifyContent: "justify-center",
  size: "w-16 h-16",
  borderRadius: "rounded-3xl",
  background: theme.colors.primaryBg,
  color: "text-secondary-container",
  marginBottom: "mb-6",
  shadow: "shadow-xl",
  ring: "ring-8 ring-primary/5",
});

export const Title = s("h1", {
  typography: theme.typography.heading,
  marginBottom: "mb-3",
});

export const Subtitle = s("p", {
  color: theme.colors.surfaceVariant,
  fontWeight: "font-medium",
});

export const FormGroup = s("div", {
  spacing: "space-y-2",
});

export const InputLabel = s("label", {
  typography: theme.typography.label,
  color: "text-primary/70",
  margin: "ml-1",
});

export const InputWrapper = s("div", {
  position: "relative",
  group: "group",
});

export const InputIcon = s("div", {
  position: "absolute",
  left: "left-4",
  top: "top-1/2",
  transform: "-translate-y-1/2",
  color: "text-primary/40",
  focus: "group-focus-within:text-primary",
  transition: theme.utils.transition,
});

export const FormInput = s("input", {
  width: "w-full",
  background: "bg-surface-container-low",
  border: theme.colors.outline,
  borderRadius: "rounded-2xl",
  padding: "py-4 pl-12 pr-4",
  color: "text-primary",
  placeholder: "placeholder:text-primary/20",
  focus: "focus:outline-none focus:ring-4 focus:ring-primary/5 focus:border-primary",
  transition: theme.utils.transition,
  fontWeight: "font-medium",
});

export const CheckboxGroup = s("div", {
  display: "flex",
  alignItems: "items-start",
  gap: "gap-3",
  padding: "px-1 py-2",
});

export const CheckboxInput = s("input", {
  marginTop: "mt-1",
  accent: theme.colors.primaryBg,
  borderRadius: "rounded",
});

export const CheckboxLabel = s("label", {
  typography: theme.typography.caption,
  color: theme.colors.surfaceVariant,
  lineHeight: "leading-relaxed",
});

export const SubmitButton = s("button", {
  width: "w-full",
  background: theme.colors.primaryBg,
  color: theme.colors.onPrimary,
  padding: "py-5",
  borderRadius: "rounded-2xl",
  fontWeight: "font-bold",
  display: "flex",
  alignItems: "items-center",
  justifyContent: "justify-center",
  gap: "gap-3",
  hover: {
    background: "hover:bg-primary-container"
  },
  shadow: "shadow-xl shadow-primary/20",
  active: "transform active:scale-95",
  transition: theme.utils.transition,
  disabled: "disabled:opacity-70",
  group: "group",
});

export const FooterDivider = s("div", {
  height: "h-[1px]",
  width: "w-full",
  background: "bg-outline-variant/20",
  marginBottom: "mb-8",
});

export const FooterText = s("p", {
  typography: theme.typography.body,
  color: theme.colors.surfaceVariant,
});
