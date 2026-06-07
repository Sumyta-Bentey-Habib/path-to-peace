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
      // Fetch both prayer times and reverse geocoding info in parallel to keep page loading fast
      const [azanRes, geoRes] = await Promise.allSettled([
        fetch(`https://api.aladhan.com/v1/timings/today?latitude=${lat}&longitude=${lng}&method=1&school=1`),
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`)
      ]);

      if (azanRes.status === "rejected") {
        throw azanRes.reason;
      }

      const response = azanRes.value;
      if (!response.ok) throw new Error("Failed to fetch prayer times");
      
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

      // Default to timezone-based names
      let city = meta.timezone.split("/")[1]?.replace("_", " ") || "Your Location";
      let country = meta.timezone.split("/")[0] || "";

      // If geocoding succeeded, extract more accurate info
      if (geoRes.status === "fulfilled" && geoRes.value.ok) {
        try {
          const geoData = await geoRes.value.json();
          city = geoData.city || geoData.locality || geoData.principalSubdivision || city;
          country = geoData.countryName || country;
        } catch (e) {
          console.error("Failed to parse geo response:", e);
        }
      }

      setCityInfo({ city, country });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching prayer times:", err);
      setError("Failed to fetch prayer times.");
      setLoading(false);
    }
  };

  const timesMap = useMemo(() => {
    if (prayerTimes.length === 0) return null;
    const map: Record<string, number> = {};
    prayerTimes.forEach((pt) => {
      const [hours, minutes] = pt.time.split(":").map(Number);
      map[pt.id] = hours * 60 + minutes;
    });
    return map;
  }, [prayerTimes]);

  const currentPrayer = useMemo(() => {
    if (prayerTimes.length === 0 || !timesMap) return null;

    const now = currentTime.getHours() * 60 + currentTime.getMinutes();
    
    const fajr = timesMap["fajr"];
    const sunrise = timesMap["sunrise"];
    const dhuhr = timesMap["dhuhr"];
    const asr = timesMap["asr"];
    const maghrib = timesMap["maghrib"];
    const isha = timesMap["isha"];

    // Fajr: from Fajr start until Sunrise
    if (now >= fajr && now < sunrise) {
      return prayerTimes.find((p) => p.id === "fajr") || null;
    }
    // Dhuhr: from Dhuhr start until Asr
    if (now >= dhuhr && now < asr) {
      return prayerTimes.find((p) => p.id === "dhuhr") || null;
    }
    // Asr: from Asr start until Maghrib
    if (now >= asr && now < maghrib) {
      return prayerTimes.find((p) => p.id === "asr") || null;
    }
    // Maghrib: from Maghrib start until Isha
    if (now >= maghrib && now < isha) {
      return prayerTimes.find((p) => p.id === "maghrib") || null;
    }
    // Isha: from Isha start until Fajr of next day
    if (now >= isha || now < fajr) {
      return prayerTimes.find((p) => p.id === "isha") || null;
    }

    return null; // No current prayer (e.g. between sunrise and dhuhr)
  }, [currentTime, prayerTimes, timesMap]);

  const nextPrayer = useMemo(() => {
    if (prayerTimes.length === 0 || !timesMap) return null;

    const now = currentTime.getHours() * 60 + currentTime.getMinutes();

    const fajr = timesMap["fajr"];
    const dhuhr = timesMap["dhuhr"];
    const asr = timesMap["asr"];
    const maghrib = timesMap["maghrib"];
    const isha = timesMap["isha"];

    if (now < fajr) {
      return prayerTimes.find((p) => p.id === "fajr") || null;
    }
    if (now >= fajr && now < dhuhr) {
      return prayerTimes.find((p) => p.id === "dhuhr") || null;
    }
    if (now >= dhuhr && now < asr) {
      return prayerTimes.find((p) => p.id === "asr") || null;
    }
    if (now >= asr && now < maghrib) {
      return prayerTimes.find((p) => p.id === "maghrib") || null;
    }
    if (now >= maghrib && now < isha) {
      return prayerTimes.find((p) => p.id === "isha") || null;
    }
    // After Isha, the next prayer is Fajr
    return prayerTimes.find((p) => p.id === "fajr") || null;
  }, [currentTime, prayerTimes, timesMap]);

  const countdown = useMemo(() => {
    if (!nextPrayer) return "";

    const [h, m] = nextPrayer.time.split(":").map(Number);
    const targetDate = new Date(currentTime);
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
    currentPrayer,
    countdown,
    loading,
    error,
    currentTimeString: currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
}
