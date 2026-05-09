"use client";

import { useState, useEffect, useMemo } from "react";

export interface PrayerTime {
  id: string;
  name: string;
  time: string;
  icon?: string;
}

export function usePrayerTimes() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [cityInfo, setCityInfo] = useState({ city: "Detecting...", country: "" });
  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([]);
  const [dates, setDates] = useState({ gregorian: "", hijri: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // 1. Listen for real-time location updates
  useEffect(() => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation is not supported by your browser.");
      setLoading(false);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ lat: latitude, lng: longitude });
      },
      (err) => {
        setError("Please allow location access to get prayer times.");
        setLoading(false);
      },
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // 2. Fetch Azan times whenever the location updates
  useEffect(() => {
    if (location) {
      fetchAzanTimes(location.lat, location.lng);
    }
  }, [location]);

  // 3. Update current time for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second for precise countdown
    return () => clearInterval(timer);
  }, []);

  const fetchAzanTimes = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://api.aladhan.com/v1/timings/today?latitude=${lat}&longitude=${lng}&method=2`
      );
      
      const data = await response.json();
      const timings = data.data.timings;
      const meta = data.data.meta;
      const date = data.data.date;

      const mappedTimes: PrayerTime[] = [
        { id: "fajr", name: "Fajr", time: timings.Fajr },
        { id: "sunrise", name: "Sunrise", time: timings.Sunrise },
        { id: "dhuhr", name: "Dhuhr", time: timings.Dhuhr },
        { id: "asr", name: "Asr", time: timings.Asr },
        { id: "maghrib", name: "Maghrib", time: timings.Maghrib },
        { id: "isha", name: "Isha", time: timings.Isha },
      ];

      setPrayerTimes(mappedTimes);
      setDates({
        gregorian: date.gregorian.date,
        hijri: `${date.hijri.day} ${date.hijri.month.en} ${date.hijri.year} AH`,
      });
      setCityInfo({
        city: meta.timezone.split("/")[1]?.replace("_", " ") || "Your Location",
        country: meta.timezone.split("/")[0] || "",
      });
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch prayer times.");
      setLoading(false);
    }
  };

  const nextPrayer = useMemo(() => {
    if (prayerTimes.length === 0) return null;

    const now = currentTime.getHours() * 60 + currentTime.getMinutes();

    const timesInMinutes = prayerTimes.map((pt) => {
      const [hours, minutes] = pt.time.split(":").map(Number);
      return { ...pt, totalMinutes: hours * 60 + minutes };
    });

    const next = timesInMinutes.find((pt) => pt.totalMinutes > now);
    return next || timesInMinutes[0];
  }, [currentTime, prayerTimes]);

  const countdown = useMemo(() => {
    if (!nextPrayer) return "";

    const [h, m] = nextPrayer.time.split(":").map(Number);
    const targetDate = new Date();
    targetDate.setHours(h, m, 0, 0);

    if (currentTime > targetDate) {
      targetDate.setDate(targetDate.getDate() + 1);
    }

    const diffMs = targetDate.getTime() - currentTime.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);

    if (diffHours > 0) return `${diffHours}h ${diffMins}m ${diffSecs}s`;
    return `${diffMins}m ${diffSecs}s`;
  }, [currentTime, nextPrayer]);

  return {
    location: cityInfo,
    coords: location,
    dates,
    prayerTimes,
    nextPrayer,
    countdown,
    loading,
    error,
    currentTimeString: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}
