"use client";

import { useState, useMemo, useEffect } from "react";
import surahsData from "@/lib/data/quran_surahs.json";
import quranDataRaw from "@/lib/data/quran_data.json";

const quranData = quranDataRaw as Record<string, SurahData>;

interface SurahListItem {
  id: number;
  number: string;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  arabicName: string;
}

interface Ayah {
  number: number;
  arabic: string;
  translation: string;
  translator: string;
}

interface SurahData {
  id: number;
  name: string;
  englishName: string;
  arabicName: string;
  revelationType: string;
  numberOfAyahs: number;
  bismillah?: {
    arabic: string;
    translation: string;
  } | null;
  ayahs: Ayah[];
}

export function useQuran() {
  const [activeSurahId, setActiveSurahId] = useState<number>(1);
  const [surahData, setSurahData] = useState<SurahData>(quranData["1"]);
  const [searchQuery, setSearchQuery] = useState("");

  const surahs = surahsData as unknown as SurahListItem[];

  const filteredSurahs = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return surahs.filter((s) =>
      s.name.toLowerCase().includes(query) ||
      s.englishName.toLowerCase().includes(query) ||
      s.englishNameTranslation.toLowerCase().includes(query) ||
      s.number.toString().includes(query) ||
      s.arabicName.includes(searchQuery)
    );
  }, [searchQuery, surahs]);

  const selectSurah = (id: number) => {
    setActiveSurahId(id);
    const data = quranData[id.toString()];
    if (data) {
      setSurahData(data);
    }
  };

  return {
    activeSurahId,
    surahData,
    searchQuery,
    setSearchQuery,
    filteredSurahs,
    selectSurah,
  };
}
