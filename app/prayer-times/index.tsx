"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePrayerTimes } from "@/hooks/use-prayer-times";
import { PrayerHeader } from "@/components/prayer-times/PrayerHeader";
import { PrayerTimesGrid } from "@/components/prayer-times/PrayerTimesGrid";
import { QiblaCard } from "@/components/prayer-times/QiblaCard";
import { styles } from "./style";

export default function PrayerTimesUI() {
  const {
    location,
    dates,
    prayerTimes,
    nextPrayer,
    countdown,
  } = usePrayerTimes();

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
