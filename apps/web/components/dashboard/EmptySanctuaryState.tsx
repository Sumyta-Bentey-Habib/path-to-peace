"use client";

import React from "react";
import Link from "next/link";

interface EmptySanctuaryStateProps {
    icon: React.ReactNode;
    title: string;
    desc: string;
    btnText: string;
    btnHref: string;
}

export function EmptySanctuaryState({
    icon,
    title,
    desc,
    btnText,
    btnHref
}: EmptySanctuaryStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto animate-in fade-in duration-500">
            <div className="w-16 h-16 rounded-3xl bg-surface-container flex items-center justify-center mb-5">
                {icon}
            </div>
            <h4 className="text-lg font-bold text-primary mb-2 font-serif">{title}</h4>
            <p className="text-sm text-on-surface-variant/80 leading-relaxed mb-6 font-medium">{desc}</p>
            <Link 
                href={btnHref} 
                className="px-5 py-2.5 bg-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md shadow-primary/10 hover:bg-primary-container transition-all hover:scale-105 active:scale-95"
            >
                {btnText}
            </Link>
        </div>
    );
}
