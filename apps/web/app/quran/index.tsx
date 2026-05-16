"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useQuran } from "@/hooks/use-quran";
import { SurahSidebar } from "@/components/quran/SurahSidebar";
import { QuranHeader } from "@/components/quran/QuranHeader";
import { BismillahBlock } from "@/components/quran/BismillahBlock";
import { AyahList } from "@/components/quran/AyahList";
import { DecorativeImage } from "@/components/quran/DecorativeImage";
import { styles } from "./style";
import { authClient, getAuthHeaders } from "@/lib/auth-client";

export default function QuranReaderUI() {
  const {
    activeSurahId,
    surahData,
    searchQuery,
    setSearchQuery,
    filteredSurahs,
    selectSurah,
  } = useQuran();

  const { data: session } = authClient.useSession();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch saved state for current activeSurahId
  useEffect(() => {
    if (!session) return;
    
    const checkSavedState = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items?type=quran`, {
          credentials: "include",
          headers: await getAuthHeaders()
        });
        if (response.ok) {
          const savedItems = await response.json();
          const alreadySaved = savedItems.some((item: any) => Number(item.itemId) === activeSurahId);
          setIsSaved(alreadySaved);
        }
      } catch (error) {
        console.error("Failed to fetch saved Quran state:", error);
      }
    };

    checkSavedState();
  }, [activeSurahId, session]);

  const handleToggleSave = async () => {
    if (!session || loading) return;
    setLoading(true);

    try {
      if (isSaved) {
        // Delete
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items/quran/${activeSurahId}`, {
          method: "DELETE",
          credentials: "include",
          headers: await getAuthHeaders()
        });
        if (response.ok) {
          setIsSaved(false);
        }
      } else {
        // Save
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items`, {
          method: "POST",
          headers: await getAuthHeaders(true),
          credentials: "include",
          body: JSON.stringify({
            type: "quran",
            itemId: activeSurahId,
            data: {
              id: surahData.id,
              name: surahData.name,
              englishName: surahData.englishName,
              arabicName: surahData.arabicName,
              numberOfAyahs: surahData.numberOfAyahs,
              revelationType: surahData.revelationType
            }
          })
        });
        if (response.ok) {
          setIsSaved(true);
        }
      }
    } catch (error) {
      console.error("Failed to toggle save Quran surah:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <SurahSidebar
          surahs={filteredSurahs}
          activeSurahId={activeSurahId}
          onSurahSelect={selectSurah}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className={styles.contentArea}>
          <QuranHeader
            englishName={surahData.englishName}
            arabicName={surahData.arabicName}
            revelationType={surahData.revelationType}
            numberOfAyahs={surahData.numberOfAyahs}
            isSaved={isSaved}
            onToggleSave={handleToggleSave}
            showSaveButton={!!session}
          />

          {surahData.bismillah && (
            <BismillahBlock bismillah={surahData.bismillah} />
          )}

          <AyahList ayahs={surahData.ayahs} />

          <DecorativeImage />
        </div>
      </main>

      <Footer />
    </div>
  );
}
