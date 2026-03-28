"use client";

import { useState, useMemo, useEffect } from "react";
import surahsData from "@/lib/data/quran_surahs.json";
import initialSurahData from "@/lib/data/surah_kahf.json";

interface SurahListItem {
  id: number;
  number: string;
  name: string;
  englishName: string;
  arabicName: string;
}

interface Ayah {
  number: number;
  arabic: string;
  translation: string;
  translator: string;
}

interface SurahData {
  englishName: string;
  arabicName: string;
  revelationType: string;
  numberOfAyahs: number;
  bismillah?: {
    arabic: string;
    translation: string;
  };
  ayahs: Ayah[];
}

export function useQuran() {
  const [activeSurahId, setActiveSurahId] = useState<number>(18);
  const [surahData, setSurahData] = useState<SurahData>(initialSurahData);
  const [searchQuery, setSearchQuery] = useState("");

  const surahs = surahsData as unknown as SurahListItem[];

  const filteredSurahs = useMemo(() => {
    return surahs.filter((s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString().includes(searchQuery)
    );
  }, [searchQuery, surahs]);

  const selectSurah = async (id: number) => {
    setActiveSurahId(id);
    
    /**
     * API integration point:
     * In a real application, you would fetch the surah data from an API here.
     * 
     * try {
     *   const res = await fetch(`/api/quran/surah/${id}`);
     *   const data = await res.json();
     *   setSurahData(data);
     * } catch (error) {
     *   console.error("Failed to fetch surah content", error);
     * }
     */
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
