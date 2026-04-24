"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Surah {
  id: number;
  number: string;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  arabicName: string;
}

interface SurahSidebarProps {
  surahs: Surah[];
  activeSurahId: number;
  onSurahSelect: (id: number) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function SurahSidebar({
  surahs,
  activeSurahId,
  onSurahSelect,
  searchQuery,
  onSearchChange,
}: SurahSidebarProps) {
  return (
    <aside className="w-full lg:w-80 border-r border-outline-variant/10 p-6 flex flex-col gap-6 bg-surface-container-lowest shadow-xl lg:h-[calc(100vh-80px)] lg:sticky lg:top-20 z-20">
      <div className="flex flex-col gap-4 flex-none">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search Surah..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 bg-surface-container/50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full -mx-2 px-2">
          <div className="flex flex-col gap-1 pb-4">
            {surahs.map((surah) => (
              <button
                key={surah.id}
                onClick={() => onSurahSelect(surah.id)}
                className={cn(
                  "flex items-center justify-between p-4 rounded-xl transition-all duration-300 group",
                  activeSurahId === surah.id
                    ? "bg-primary text-on-primary shadow-lg shadow-primary/10"
                    : "hover:bg-surface-container-highest/50 text-on-surface-variant"
                )}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={cn(
                      "text-[10px] font-bold tracking-tighter w-6",
                      activeSurahId === surah.id ? "text-on-primary/60" : "text-primary/40"
                    )}
                  >
                    {surah.number}
                  </span>
                  <div className="text-left">
                    <div className="font-serif font-bold text-sm tracking-wide">
                      {surah.name}
                    </div>
                    <div
                      className={cn(
                        "text-[10px] uppercase tracking-widest font-bold",
                        activeSurahId === surah.id ? "text-on-primary/50" : "text-on-surface-variant/40"
                      )}
                    >
                      {surah.englishNameTranslation}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    "font-arabic text-lg opacity-40 group-hover:opacity-100 transition-opacity",
                    activeSurahId === surah.id ? "text-on-primary" : "text-primary"
                  )}
                >
                  {surah.arabicName}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </aside>
  );
}
