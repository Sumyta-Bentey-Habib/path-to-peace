import { s } from "@/lib/styled-helper";
import { theme } from "@/lib/theme";

export const Container = s("div", {
  minHeight: "min-h-screen",
  background: "bg-surface",
  selection: "selection:bg-secondary-container/30"
});

export const Main = s("main", {
  maxWidth: "max-w-7xl",
  margin: "mx-auto",
  padding: "px-8 pt-12 pb-24"
});

export const HeroSection = s("section", {
  display: "flex",
  flexDirection: "flex-col md:flex-row",
  alignItems: "items-center",
  justifyContent: "justify-between",
  marginBottom: "mb-20",
  gap: "gap-12"
});

export const HeroTextBox = s("div", {
  maxWidth: "max-w-xl",
  spacing: "space-y-6",
  textAlign: "text-center md:text-left"
});

export const MainTitle = s("h1", {
  fontSize: "text-6xl md:text-7xl",
  fontFamily: "font-serif"
});

export const HeroDesc = s("p", {
  fontSize: "text-lg",
  color: "text-on-surface-variant/80",
  lineHeight: "leading-relaxed",
  maxWidth: "max-w-md"
});

export const HeroImageBox = s("div", {
  position: "relative",
  size: "w-64 h-64 md:w-80 md:h-80"
});

export const FilterSection = s("section", {
  background: "bg-surface-container-low/50",
  padding: "p-4",
  borderRadius: "rounded-2xl",
  marginBottom: "mb-12",
  display: "flex",
  flexDirection: "flex-col md:flex-row",
  alignItems: "items-center",
  gap: "gap-4"
});

export const SearchWrapper = s("div", {
  position: "relative",
  width: "w-full md:w-96"
});

export const SearchInput = s("div", {
  position: "relative"
});

export const StoriesGrid = s("div", {
  display: "grid",
  gridCols: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
  gap: "gap-6",
  alignItems: "items-stretch"
});

export const FeaturedCard = s("div", {
  gridSpan: "lg:col-span-2 lg:row-span-2",
  background: "bg-[#003527]",
  color: "text-white",
  overflow: "overflow-hidden",
  group: "group",
  transition: "transition-all duration-500",
  display: "flex",
  flexDirection: "flex-col",
  justifyContent: "justify-end",
  padding: "p-8",
  position: "relative",
  minHeight: "min-h-[550px]",
  hover: {
    shadow: "shadow-2xl"
  }
});

export const FeaturedArabicTitle = s("div", {
  position: "absolute",
  top: "top-8",
  right: "right-8",
  color: "text-[#fed65b]",
  fontSize: "text-5xl",
  opacity: "opacity-40",
  groupHover: "group-hover:opacity-80",
  transition: "transition-opacity",
  fontFamily: "font-serif"
});

export const ProphetCard = s("div", {
  background: "bg-surface",
  shadow: "shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]",
  hover: {
    shadow: "shadow-meditative"
  },
  transition: "transition-all duration-300",
  border: "border border-outline-variant/10",
  padding: "p-6",
  display: "flex",
  flexDirection: "flex-col",
  justifyContent: "justify-between",
  group: "group",
  height: "h-[320px]"
});

export const ProphetIconBox = s("div", {
  padding: "p-3",
  background: "bg-surface-container-low",
  borderRadius: "rounded-xl",
  color: "text-primary",
  groupHover: "group-hover:bg-primary group-hover:text-on-primary",
  transition: "transition-colors duration-300"
});

export const CardArabicName = s("div", {
  fontSize: "text-2xl",
  fontFamily: "font-serif",
  color: "text-on-surface-variant/20",
  fontStyle: "italic",
  groupHover: "group-hover:text-on-surface-variant/40",
  transition: "transition-colors"
});

export const CardLink = s("div", {
  display: "flex",
  alignItems: "items-center",
  gap: "gap-2",
  fontSize: "text-[10px]",
  fontWeight: "font-bold",
  textTransform: "uppercase",
  letterSpacing: "tracking-widest",
  color: "text-primary/60",
  hover: {
    color: "text-primary"
  },
  transition: "transition-colors",
  marginTop: "mt-6"
});

// Story Detail Styles
export const DetailContainer = s("div", {
  minHeight: "min-h-screen",
  background: "bg-surface"
});

export const DetailHero = s("section", {
  position: "relative",
  padding: "py-24",
  background: "bg-[#003527]",
  color: "text-white",
  overflow: "overflow-hidden"
});

export const DetailHeroContent = s("div", {
  maxWidth: "max-w-7xl",
  margin: "mx-auto",
  padding: "px-8",
  position: "relative",
  zIndex: "z-10",
  display: "flex",
  flexDirection: "flex-col",
  alignItems: "items-center",
  textAlign: "text-center"
});

export const DetailArabicName = s("div", {
  fontSize: "text-7xl",
  fontFamily: "font-serif",
  color: "text-[#fed65b]",
  opacity: "opacity-40",
  marginBottom: "mb-6"
});

export const DetailTitle = s("h1", {
  fontSize: "text-5xl md:text-6xl",
  fontFamily: "font-serif",
  marginBottom: "mb-4"
});

export const DetailSubtitle = s("p", {
  fontSize: "text-xl",
  color: "text-surface-container-low/70",
  maxWidth: "max-w-2xl",
  lineHeight: "leading-relaxed"
});

export const DetailMain = s("main", {
  maxWidth: "max-w-4xl",
  margin: "mx-auto",
  padding: "px-8 py-20"
});

export const NarrativeSection = s("div", {
  spacing: "space-y-12"
});

export const LessonsCard = s("div", {
  background: "bg-surface-container-low/40",
  padding: "p-8",
  borderRadius: "rounded-3xl",
  border: "border border-outline-variant/10"
});

export const ReferenceCard = s("div", {
  background: "bg-primary/5",
  padding: "p-8",
  borderRadius: "rounded-3xl",
  border: "border border-primary/10"
});
