"use server";

export async function fetchPrayerTimesServer(lat: number, lng: number) {
  try {
    const response = await fetch(
      `https://api.aladhan.com/v1/timings/today?latitude=${lat}&longitude=${lng}&method=2`
    );
    if (!response.ok) throw new Error("Failed to fetch prayer times");
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching prayer times on server:", error);
    return null;
  }
}
