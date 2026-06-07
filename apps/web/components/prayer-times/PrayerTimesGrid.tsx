"use client";

import React from "react";
import { Sunrise, Sun, SunDim, SunMedium, Sunset, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrayerTime {
  id: string;
  name: string;
  time: string;
}

interface PrayerTimesGridProps {
  times: PrayerTime[];
  nextPrayerId: string;
  currentPrayerId?: string | null;
}

const prayerIcons: Record<string, React.ReactNode> = {
  fajr: <Sunrise className="w-5 h-5" />,
  sunrise: <Sun className="w-5 h-5" />,
  dhuhr: <SunDim className="w-5 h-5" />,
  asr: <SunMedium className="w-5 h-5" />,
  maghrib: <Sunset className="w-5 h-5" />,
  isha: <Moon className="w-5 h-5" />,
};

export function PrayerTimesGrid({ times, nextPrayerId, currentPrayerId }: PrayerTimesGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-32 animate-in fade-in slide-in-from-bottom duration-1000">
      {times.map((prayer) => {
        const isCurrent = prayer.id === currentPrayerId;
        const isNext = prayer.id === nextPrayerId;
        
        return (
          <div
            key={prayer.id}
            className={cn(
              "relative group p-8 rounded-[40px] flex flex-col items-center justify-between text-center transition-all duration-700 h-64 border",
              isCurrent
                ? "bg-primary text-on-primary shadow-2xl shadow-primary/30 border-primary scale-105 z-10"
                : isNext
                ? "bg-white border-2 border-primary/40 text-primary shadow-md hover:shadow-lg z-10"
                : "bg-surface-container-low/50 hover:bg-surface-container text-on-surface-variant border-outline-variant/10 hover:shadow-xl hover:translate-y-[-8px]"
            )}
          >
            {isCurrent && (
               <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary-container shadow-lg shadow-black/20 text-[9px] font-bold tracking-widest uppercase animate-bounce">
                  Now
               </div>
            )}
            
            {!isCurrent && isNext && (
               <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 shadow-sm text-[9px] font-bold tracking-widest uppercase">
                  Upcoming
               </div>
            )}
            
            <div className={cn(
              "p-4 rounded-3xl transition-transform duration-500 group-hover:scale-110",
              isCurrent ? "bg-white/10" : "bg-primary/5 text-primary"
            )}>
              {prayerIcons[prayer.id]}
            </div>

            <div className="space-y-1">
              <h3 className={cn(
                "text-sm font-bold tracking-widest uppercase",
                isCurrent ? "text-on-primary/60" : "text-on-surface-variant/40"
              )}>
                {prayer.name}
              </h3>
              <p className={cn(
                "text-3xl md:text-4xl font-serif italic",
                isCurrent ? "text-white" : "text-primary"
              )}>
                {prayer.time}
              </p>
            </div>

            {isCurrent && (
              <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse" />
            )}
            {!isCurrent && isNext && (
              <div className="w-2 h-2 rounded-full bg-primary/40 animate-ping" />
            )}
          </div>
        );
      })}
    </div>
  );
}
