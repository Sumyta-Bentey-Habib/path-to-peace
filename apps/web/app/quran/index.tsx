"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useQuran } from "@/hooks/use-quran";
import { SurahSidebar } from "@/components/quran/SurahSidebar";
import { QuranHeader } from "@/components/quran/QuranHeader";
import { BismillahBlock } from "@/components/quran/BismillahBlock";
import { AyahList } from "@/components/quran/AyahList";
import { DecorativeImage } from "@/components/quran/DecorativeImage";
import { styles } from "./style";
import { authClient } from "@/lib/auth-client";
import { useSavedItems } from "@/hooks/use-saved-items";

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
  const { toggleSaveItem, isItemSaved } = useSavedItems("quran");

  const handleToggleSave = async () => {
    if (!session) return;
    await toggleSaveItem("quran", activeSurahId, {
      id: surahData.id,
      name: surahData.name,
      englishName: surahData.englishName,
      arabicName: surahData.arabicName,
      numberOfAyahs: surahData.numberOfAyahs,
      revelationType: surahData.revelationType
    });
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
            isSaved={isItemSaved("quran", activeSurahId)}
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
