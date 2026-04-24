import { s } from "@/lib/styled-helper";
import { theme } from "@/lib/theme";

export const Container = s("div", {
  minHeight: "min-h-screen",
  display: "flex",
  alignItems: "items-center",
  justifyContent: "justify-center",
  position: "relative",
  overflow: "overflow-hidden",
  background: theme.colors.surface,
});

export const BgImage = s("div", {
  position: "absolute",
  inset: "inset-0",
  zIndex: "z-0",
  backgroundSize: "bg-cover",
  backgroundPosition: "bg-center",
  transition: "transition-transform",
  duration: "duration-1000",
  transform: "scale-105",
});

export const BgOverlay = s("div", {
  position: "absolute",
  inset: "inset-0",
  zIndex: "z-1",
  background: "bg-gradient-to-tr from-primary/40 via-surface/40 to-transparent",
  backdropBlur: "backdrop-blur-[2px]",
});

export const OrnamentNav = s("div", {
  position: "absolute",
  top: "top-10",
  left: "left-10",
  zIndex: "z-10",
  display: {
    base: "hidden",
    lg: "block"
  }
});

export const NavLink = s("div", {
  display: "flex",
  alignItems: "items-center",
  gap: "gap-2",
  color: theme.colors.primary,
  group: "group",
});

export const NavIcon = s("div", {
  size: "w-10 h-10",
  borderRadius: "rounded-full",
  border: "border border-primary/20",
  display: "flex",
  alignItems: "items-center",
  justifyContent: "justify-center",
  transition: theme.utils.transition,
  hover: {
    background: theme.colors.primaryBg,
    color: theme.colors.onPrimary
  }
});

export const NavTitle = s("span", {
  fontFamily: "font-serif",
  fontWeight: "font-bold",
  fontSize: "text-xl",
  letterSpacing: "tracking-tight",
});

export const ContentWrapper = s("div", {
  position: "relative",
  zIndex: "z-10",
  width: "w-full",
  maxWidth: "max-w-lg",
  padding: "px-6",
  animation: "animate-in fade-in zoom-in-95",
  duration: "duration-700",
});

export const GlassCard = s("div", {
  style: theme.utils.glass,
  borderRadius: "rounded-[2.5rem]",
  padding: {
    base: "p-8",
    md: "p-12"
  },
  shadow: "shadow-meditative",
  overflow: "overflow-hidden",
  position: "relative",
});

export const StarOverlay = s("div", {
  position: "absolute",
  inset: "inset-0",
  style: "star-pattern",
  opacity: "opacity-10",
  pointerEvents: "pointer-events-none",
});
