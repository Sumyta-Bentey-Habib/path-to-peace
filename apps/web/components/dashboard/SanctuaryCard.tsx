"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface SanctuaryCardProps {
    title: string;
    desc: string;
    icon: React.ReactNode;
    href: string;
    progress: number;
    progressColor: string;
}

export function SanctuaryCard({
    title,
    desc,
    icon,
    href,
    progress,
    progressColor
}: SanctuaryCardProps) {
    return (
        <Link href={href} className="group">
            <div className="bg-white p-6 rounded-[2rem] border border-border shadow-sm hover:shadow-meditative transition-all duration-300 relative overflow-hidden h-full flex flex-col">
                <div className="w-12 h-12 bg-surface-container rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div className="flex-1 text-left">
                    <h4 className="text-lg font-bold text-primary mb-1">{title}</h4>
                    <p className="text-xs text-on-surface-variant mb-6 font-medium">{desc}</p>
                </div>
                
                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60">
                        <span>Progress</span>
                        <span>{progress}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                        <div className={`h-full ${progressColor} rounded-full`} style={{ width: `${progress}%` }} />
                    </div>
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-surface-container rounded-full flex items-center justify-center text-primary">
                        <ChevronRight size={16} />
                    </div>
                </div>
            </div>
        </Link>
    );
}
