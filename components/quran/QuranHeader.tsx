"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface QuranHeaderProps {
  englishName: string;
  arabicName: string;
  revelationType: string;
  numberOfAyahs: number;
}

export function QuranHeader({
  englishName,
  arabicName,
  revelationType,
  numberOfAyahs,
}: QuranHeaderProps) {
  return (
    <header className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700">
      <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/40">
        Surah {englishName} • The Cave
      </div>
      <h1 className="text-5xl md:text-6xl font-arabic font-normal text-primary">
        {arabicName}
      </h1>
      <div className="flex items-center justify-center gap-3 pt-2">
        <Badge
          variant="secondary"
          className="bg-[#fed65b]/20 text-secondary hover:bg-[#fed65b]/30 border-none px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
        >
          {revelationType}
        </Badge>
        <Badge
          variant="outline"
          className="text-on-surface-variant/60 border-outline-variant/30 px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase"
        >
          {numberOfAyahs} Ayahs
        </Badge>
      </div>
    </header>
  );
}
