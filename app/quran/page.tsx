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

export default function QuranReaderPage() {
  const {
    activeSurahId,
    surahData,
    searchQuery,
    setSearchQuery,
    filteredSurahs,
    selectSurah,
  } = useQuran();

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary-container/30 transition-colors duration-500">
      <Navbar />

      <main className="max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[calc(100vh-80px)]">

        <SurahSidebar
          surahs={filteredSurahs}
          activeSurahId={activeSurahId}
          onSurahSelect={selectSurah}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="flex-1 flex flex-col p-8 lg:p-16 gap-12 max-w-5xl mx-auto w-full">

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
