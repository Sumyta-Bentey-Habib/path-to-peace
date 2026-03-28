"use client";

import { useState, useEffect, useMemo } from "react";
import prayerTimesData from "@/lib/data/prayer_times.json";

export interface PrayerTime {
  id: string;
  name: string;
  time: string;
  icon: string;
}

export function usePrayerTimes() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const location = prayerTimesData.location;
  const dates = prayerTimesData.date;
  const prayerTimes = (prayerTimesData.times as PrayerTime[]);

  const nextPrayer = useMemo(() => {
    const now = currentTime.getHours() * 60 + currentTime.getMinutes();

    // Convert HH:mm to minutes from midnight
    const timesInMinutes = prayerTimes.map((pt) => {
      const [hours, minutes] = pt.time.split(":").map(Number);
      return { ...pt, totalMinutes: hours * 60 + minutes };
    });

    // Find the first prayer after now
    const next = timesInMinutes.find((pt) => pt.totalMinutes > now);

    // If no prayer is after now (it's late), next is Fajr of tomorrow
    return next || timesInMinutes[0];
  }, [currentTime, prayerTimes]);

  const countdown = useMemo(() => {
    if (!nextPrayer) return "";

    const [h, m] = nextPrayer.time.split(":").map(Number);
    const targetDate = new Date();
    targetDate.setHours(h, m, 0, 0);

    // If it's early next morning (after Isha), add 1 day
    if (currentTime > targetDate) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const diffMs = targetDate.getTime() - currentTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${diffHours}h ${diffMins}m`;
  }, [currentTime, nextPrayer]);

  return {
    location,
    dates,
    prayerTimes,
    nextPrayer,
    countdown,
    currentTimeString: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
  };
}
