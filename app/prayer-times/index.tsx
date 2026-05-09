"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { PrayerHeader } from "@/components/prayer-times/PrayerHeader";
import { PrayerTimesGrid } from "@/components/prayer-times/PrayerTimesGrid";
import { QiblaCard } from "@/components/prayer-times/QiblaCard";
import { styles } from "./style";
import { cn } from "@/lib/utils";

export default function PrayerTimesUI() {
  const {
    location,
    dates,
    prayerTimes,
    nextPrayer,
    countdown,
    loading,
    error,
  } = usePrayerTimes();

  if (loading) {
    return (
      <div className={cn(styles.container, "flex items-center justify-center")}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto"></div>
          <p className="text-primary font-serif italic text-xl animate-pulse">Seeking the sanctuary of time...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(styles.container, "flex items-center justify-center")}>
        <div className="max-w-md p-10 bg-surface-container-low rounded-[40px] text-center space-y-6 border border-error/10">
          <h2 className="text-3xl font-serif text-error italic">Location Required</h2>
          <p className="text-on-surface-variant font-sans leading-relaxed">
            To provide accurate prayer times, we need access to your location. Please enable location permissions in your browser.
          </p>
          <button 
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-primary text-on-primary rounded-full font-sans font-bold tracking-widest uppercase text-xs"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  if (!nextPrayer) return null;

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <PrayerHeader
          city={location.city}
          country={location.country}
          gregorianDate={dates.gregorian}
          hijriDate={dates.hijri}
          nextPrayerName={nextPrayer.name}
          countdown={countdown}
        />

        <PrayerTimesGrid
          times={prayerTimes}
          nextPrayerId={nextPrayer.id}
        />

        <QiblaCard direction={118.98} />
      </main>

      <Footer />
    </div>
  );
}
