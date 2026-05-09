import { s } from "@/lib/styled-helper";
import { theme } from "@/lib/theme";

export const Header = s("div", {
  textAlign: "text-center",
  marginBottom: "mb-10",
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
  focus: "focus:outline-none focus:ring-2 focus:ring-primary/10 focus:border-primary",
  transition: theme.utils.transition,
  fontWeight: "font-medium",
});

export const ForgotPassword = s("button", {
  fontSize: "text-xs",
  fontWeight: "font-bold",
  color: theme.colors.primary,
  hover: {
    color: "text-secondary-container"
  },
  transition: theme.utils.transition,
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
  shadow: "shadow-lg shadow-primary/10",
  active: "transform active:scale-95",
  transition: theme.utils.transition,
  disabled: "disabled:opacity-70",
  group: "group",
});

export const DividerSection = s("div", {
  marginTop: "mt-10",
});

export const DividerWrapper = s("div", {
  display: "flex",
  alignItems: "items-center",
  gap: "gap-4",
  marginBottom: "mb-8",
});

export const DividerLine = s("div", {
  height: "h-[1px]",
  flex: "flex-1",
  background: "bg-outline-variant/30",
});

export const DividerText = s("span", {
  typography: theme.typography.caption,
  color: "text-primary/30",
  textTransform: "uppercase",
  letterSpacing: "tracking-widest",
  fontWeight: "font-bold"
});

export const SocialGrid = s("div", {
  display: "grid",
  gridCols: "grid-cols-2",
  gap: "gap-4",
});

export const SocialButton = s("button", {
  display: "flex",
  alignItems: "items-center",
  justifyContent: "justify-center",
  gap: "gap-3",
  background: "bg-surface-container-low",
  border: theme.colors.outline,
  padding: "py-4",
  borderRadius: "rounded-xl",
  hover: {
    background: "hover:bg-surface"
  },
  transition: theme.utils.transition,
});

export const SocialIconGoogle = s("div", {
  size: "w-5 h-5",
  background: "bg-[#4285F4]",
  borderRadius: "rounded-full",
});

export const SocialIconGithub = s("div", {
  size: "w-5 h-5",
  background: theme.colors.primaryBg,
  borderRadius: "rounded-full",
});

export const ApplyText = s("p", {
  textAlign: "text-center",
  marginTop: "mt-8",
  typography: theme.typography.body,
  color: "text-primary/60",
});
