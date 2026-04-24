import React from "react";
import { cn } from "./utils";

export const s = <T extends React.ElementType>(
  Tag: T,
  classes: any
): React.ComponentType<React.ComponentPropsWithoutRef<T> & { className?: string }> => {

  const processClasses = (input: any): string => {
    if (typeof input === "string") return input;
    if (!input) return "";

    return Object.entries(input)
      .map(([key, value]) => {
        if (typeof value === "string") return value;
        if (typeof value === "object" && value !== null) {
          // Handle nested breakpoints/states
          // Example: padding: { base: "p-4", md: "p-8", hover: "hover:p-10" }
          return Object.entries(value)
            .map(([prefix, val]) => {
              if (prefix === "base") return val;
              if (prefix === "hover" || prefix === "focus" || prefix === "active") return `${prefix}:${val}`;
              return `${prefix}:${val}`; // Default to breakpoint prefix (md, lg, etc)
            })
            .join(" ");
        }
        return "";
      })
      .filter(Boolean)
      .join(" ");
  };

  const baseClasses = processClasses(classes);

  const Component = React.forwardRef<any, any>(({ children, className, ...props }, ref) => {
    return React.createElement(
      Tag,
      {
        ...props,
        ref,
        className: cn(baseClasses, className as string),
      },
      children
    );
  });

  Component.displayName = `Styled(${
    typeof Tag === "string" ? Tag : (Tag as any).displayName || (Tag as any).name || "Component"
  })`;

  return Component as any;
};
