"use client";

import React from "react";
import { MapPin, Calendar, Clock } from "lucide-react";

interface PrayerHeaderProps {
  city: string;
  country: string;
  gregorianDate: string;
  hijriDate: string;
  nextPrayerName: string;
  countdown: string;
}

export function PrayerHeader({
  city,
  country,
  gregorianDate,
  hijriDate,
  nextPrayerName,
  countdown,
}: PrayerHeaderProps) {
  return (
    <div className="space-y-12 mb-20 animate-in fade-in slide-in-from-top duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
        <div className="space-y-6 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-bold tracking-widest uppercase border border-primary/10">
            <MapPin className="w-3 h-3" />
            {city}, {country}
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-primary tracking-tight leading-tight">
            Prayer Times
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 pt-2">
            <div className="flex items-center gap-3 text-on-surface-variant/40">
              <Calendar className="w-4 h-4" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold tracking-widest uppercase">{gregorianDate}</p>
                <p className="text-[11px] font-serif italic text-primary/60">{hijriDate}</p>
              </div>
            </div>
            
            <div className="hidden md:block h-8 w-px bg-outline-variant/20" />
            
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-secondary-container/20 text-on-secondary-container">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/40">Next Prayer: {nextPrayerName}</p>
                <p className="text-xl font-serif italic text-primary">In {countdown}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-low/50 p-6 rounded-3xl border border-outline-variant/10 backdrop-blur-sm self-start md:self-end">
           <p className="text-[9px] font-bold tracking-widest uppercase text-on-surface-variant/30 mb-2">Calculation Method</p>
           <p className="text-[11px] font-medium text-on-surface-variant/70 italic">Islamic Society of North America (ISNA)</p>
        </div>
      </div>
    </div>
  );
}
