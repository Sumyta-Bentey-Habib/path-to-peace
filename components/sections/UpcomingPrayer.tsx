"use client";

import React from "react";
import { Clock, ArrowRight } from "lucide-react";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function UpcomingPrayer() {
  const { nextPrayer, countdown, loading, error } = usePrayerTimes();

  if (loading) {
    return (
      <div className="bg-surface-container-low/50 backdrop-blur-xl p-6 rounded-2xl border border-primary/5 min-w-[240px] animate-pulse">
        <div className="h-4 w-24 bg-primary/10 rounded mb-3"></div>
        <div className="h-8 w-32 bg-primary/20 rounded"></div>
      </div>
    );
  }

  if (error || !nextPrayer) return null;

  return (
    <Link 
      href="/prayer-times"
      className="group block bg-surface-container-lowest/95 backdrop-blur-xl p-6 rounded-2xl shadow-meditative border border-primary/5 transition-all hover:border-primary/20 hover:shadow-2xl"
    >
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-secondary font-serif italic text-sm font-bold tracking-wide">Upcoming Prayer</h4>
        <div className="p-2 rounded-full bg-primary/5 text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
          <Clock className="w-3.5 h-3.5" />
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-serif text-primary italic">
          {nextPrayer.name}
        </p>
        <div className="flex items-center gap-2">
          <p className="text-sm font-sans font-semibold text-on-surface-variant/60">
            Starts in <span className="text-primary">{countdown}</span>
          </p>
          <ArrowRight className="w-3 h-3 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
        </div>
      </div>
    </Link>
  );
}
