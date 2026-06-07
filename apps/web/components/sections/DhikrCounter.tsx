"use client";

import React from "react";
import { Sparkles, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { DHIKR_PHRASES } from "./cta-constants";
import { useDhikrCounter } from "@/hooks/use-dhikr-counter";

export function DhikrCounter() {
  const {
    activeDhikrIdx,
    activeDhikr,
    count,
    completedCycles,
    isTapping,
    progressPercent,
    handleTap,
    handleReset,
    handleDhikrChange,
  } = useDhikrCounter();

  return (
    <div className="max-w-4xl mx-auto space-y-12 border-t border-t-outline-variant/10 pt-24">
      <div className="text-center space-y-4 max-w-xl mx-auto">
        <span className="px-3 py-1 bg-secondary-container/10 text-secondary border border-secondary/15 rounded-full text-[10px] font-black tracking-widest uppercase inline-block">
          Unique Interactive Feature
        </span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-tight">
          Daily Dhikr Sanctuary
        </h2>
        <p className="text-sm text-on-surface-variant/80 font-medium">
          Establish a moment of spiritual presence. Select a phrase of remembrance below and tap the counter to begin your Tasbih.
        </p>
      </div>

      <div className="bg-surface-container-low/60 border border-outline-variant/20 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
        {/* Subtle background blurs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

        <div className="relative space-y-10">
          {/* Phrase Tab Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white/40 backdrop-blur-sm border border-outline-variant/10 rounded-2xl">
            {DHIKR_PHRASES.map((dhikr, idx) => (
              <button
                key={dhikr.transliteration}
                onClick={() => handleDhikrChange(idx)}
                className={cn(
                  "px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer border-0 outline-none",
                  activeDhikrIdx === idx
                    ? "bg-primary text-white shadow-md shadow-primary/10 scale-102"
                    : "text-on-surface-variant/70 hover:bg-surface-container-high hover:text-primary"
                )}
              >
                {dhikr.transliteration}
              </button>
            ))}
          </div>

          {/* Dhikr Details */}
          <div className="text-center space-y-3 min-h-[100px] flex flex-col justify-center items-center">
            <h3 className="text-4xl font-serif font-bold text-primary leading-normal" dir="rtl">
              {activeDhikr.arabic}
            </h3>
            <p className="text-sm font-sans italic text-secondary font-medium">
              &ldquo;{activeDhikr.translation}&rdquo;
            </p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 max-w-md">
              Virtue: {activeDhikr.virtue}
            </p>
          </div>

          {/* Tap Circular Button Counter */}
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="relative flex items-center justify-center">
              {/* SVG Progress Circle Ring */}
              <svg className="w-52 h-52 transform -rotate-90">
                <circle
                  cx="104"
                  cy="104"
                  r="92"
                  className="stroke-surface-container-high fill-transparent"
                  strokeWidth="8"
                />
                <circle
                  cx="104"
                  cy="104"
                  r="92"
                  className="stroke-primary fill-transparent transition-all duration-300 ease-out"
                  strokeWidth="8"
                  strokeDasharray={2 * Math.PI * 92}
                  strokeDashoffset={2 * Math.PI * 92 * (1 - progressPercent / 100)}
                  strokeLinecap="round"
                />
              </svg>

              {/* Interactive Tapper Button */}
              <button
                onClick={handleTap}
                className={cn(
                  "absolute w-44 h-44 rounded-full bg-white border border-outline-variant/20 shadow-md flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none outline-none active:shadow-sm",
                  isTapping ? "scale-95 bg-primary/5 shadow-inner" : "hover:scale-102 hover:shadow-lg"
                )}
              >
                <span className="text-[10px] font-bold tracking-widest text-on-surface-variant/50 uppercase mb-1">
                  Recite
                </span>
                <span className="text-5xl font-serif font-bold text-primary tracking-tight">
                  {count}
                </span>
                <span className="text-[9px] font-bold text-primary/60 tracking-wider mt-1">
                  Goal: {activeDhikr.target}
                </span>
              </button>
            </div>

            {/* Stats & Actions */}
            <div className="flex items-center gap-12 text-xs">
              <div className="text-center">
                <span className="text-[10px] font-bold text-on-surface-variant/50 block uppercase tracking-widest">
                  Completed
                </span>
                <span className="text-base font-bold text-primary flex items-center gap-1 justify-center mt-1">
                  <Sparkles size={14} className="text-secondary" /> {completedCycles}
                </span>
              </div>

              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 px-4.5 py-2.5 bg-surface-container border border-outline-variant/25 hover:bg-surface-container-high text-on-surface-variant rounded-xl font-bold cursor-pointer transition-all border-0"
                title="Reset counter"
              >
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
