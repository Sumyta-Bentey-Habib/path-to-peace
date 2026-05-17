"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";

interface JourneyItemProps {
    title: string;
    time: string;
    desc: string;
    status?: "completed" | "pending";
}

export function JourneyItem({
    title,
    time,
    desc,
    status = "completed"
}: JourneyItemProps) {
    return (
        <div className="flex gap-6 group">
            <div className="relative z-10">
                <div className="w-10 h-10 bg-white border-2 border-surface-container rounded-full flex items-center justify-center group-hover:border-primary transition-colors duration-300">
                    <CheckCircle2 size={18} className="text-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                </div>
            </div>
            <div className="flex-1 pt-0.5 text-left">
                <div className="flex items-center justify-between mb-1">
                    <h4 className="text-sm font-bold text-primary group-hover:text-secondary transition-colors">{title}</h4>
                    <span className="text-[10px] text-on-surface-variant/60 uppercase font-bold tracking-widest">{time}</span>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}
