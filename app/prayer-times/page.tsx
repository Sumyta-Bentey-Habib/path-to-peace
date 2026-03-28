"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Custom Hook
import { usePrayerTimes, PrayerTime } from "@/hooks/use-prayer-times";

// Prayer-specific components
import { PrayerHeader } from "@/components/prayer-times/PrayerHeader";
import { PrayerTimesGrid } from "@/components/prayer-times/PrayerTimesGrid";
import { QiblaCard } from "@/components/prayer-times/QiblaCard";

export default function PrayerTimesPage() {
  const {
    location,
    dates,
    prayerTimes,
    nextPrayer,
    countdown,
  } = usePrayerTimes();

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary-container/30 transition-colors duration-500 overflow-x-hidden">
      <Navbar />

      <main className="max-w-[1600px] mx-auto px-6 lg:px-16 pt-24 pb-32">
        {/* Dynamic Prayer Header */}
        <PrayerHeader
          city={location.city}
          country={location.country}
          gregorianDate={dates.gregorian}
          hijriDate={dates.hijri}
          nextPrayerName={nextPrayer.name}
          countdown={countdown}
        />

        {/* Dynamic Prayer Times Grid */}
        <PrayerTimesGrid
          times={prayerTimes}
          nextPrayerId={nextPrayer.id}
        />

        {/* Dynamic Qibla Direction CTA */}
        <QiblaCard direction={118.98} />

        {/* Decorative Image (Optional but consistent) */}
        {/* <DecorativeImage /> */}

      </main>

      <Footer />
    </div>
  );
}
