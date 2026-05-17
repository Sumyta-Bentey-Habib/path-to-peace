"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

interface FeelingIconProps {
    name: string;
    size?: number;
    className?: string;
}

export function FeelingIcon({ name, size = 20, className = "" }: FeelingIconProps) {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) {
        // Fallback to Smile icon if the requested icon is invalid or missing
        return <LucideIcons.Smile size={size} className={className} />;
    }
    return <IconComponent size={size} className={className} />;
}
