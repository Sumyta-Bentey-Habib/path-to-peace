"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Bookmark } from "lucide-react";

interface QuranHeaderProps {
  englishName: string;
  arabicName: string;
  revelationType: string;
  numberOfAyahs: number;
  isSaved?: boolean;
  onToggleSave?: () => void;
  showSaveButton?: boolean;
}

export function QuranHeader({
  englishName,
  arabicName,
  revelationType,
  numberOfAyahs,
  isSaved = false,
  onToggleSave,
  showSaveButton = false,
}: QuranHeaderProps) {
  return (
    <header className="text-center space-y-4 animate-in fade-in slide-in-from-top duration-700 relative">
      {showSaveButton && onToggleSave && (
        <div className="absolute top-0 right-4 animate-in fade-in zoom-in duration-500">
          <button
            onClick={onToggleSave}
            className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-white border border-outline-variant/30 text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-sm cursor-pointer group hover:scale-105 active:scale-95"
            title={isSaved ? "Remove from Sanctuary" : "Save Surah"}
          >
            <Bookmark 
              size={14} 
              className={isSaved ? "fill-secondary text-secondary group-hover:text-white group-hover:fill-white transition-all duration-300" : "text-primary/60 group-hover:text-white transition-all duration-300"} 
            />
            {isSaved ? "Saved" : "Save Surah"}
          </button>
        </div>
      )}
      
      <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary/40">
        Surah {englishName}
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
