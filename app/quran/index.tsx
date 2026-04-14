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

export default function QuranReaderUI() {
  const {
    activeSurahId,
    surahData,
    searchQuery,
    setSearchQuery,
    filteredSurahs,
    selectSurah,
  } = useQuran();

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
