"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

interface DuaCardProps {
  id: number;
  category: string;
  title: string;
  description: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  reference: string;
  isReversed?: boolean;
  isSaved?: boolean;
  onToggleSave?: () => void;
  showSaveButton?: boolean;
}

export function DuaCard({
  id,
  category,
  title,
  description,
  arabic,
  transliteration,
  meaning,
  reference,
  isReversed = false,
  isSaved = false,
  onToggleSave,
  showSaveButton = false,
}: DuaCardProps) {
  return (
    <div className={cn(
      "flex flex-col md:grid md:grid-cols-12 gap-12 bg-surface-container-low/50 rounded-[40px] p-8 md:p-12 mb-16 border border-outline-variant/10 shadow-meditative group transition-shadow hover:shadow-xl duration-1000",
      isReversed ? "md:flex-row-reverse" : ""
    )}>

      {/* Content Column */}
      <div className={cn(
        "flex flex-col flex-1 justify-between gap-8 md:col-span-4",
        isReversed ? "md:col-start-9 md:col-span-4" : ""
      )}>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <Badge className="bg-primary/5 text-primary border-none px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
              {category}
            </Badge>
            {showSaveButton && onToggleSave && (
              <button
                onClick={onToggleSave}
                className="p-2 hover:bg-rose-50 rounded-full transition-all duration-300 text-rose-500 group/btn cursor-pointer hover:scale-110 active:scale-95"
                title={isSaved ? "Remove from Sanctuary" : "Save Supplication"}
              >
                <Heart 
                  size={18} 
                  className={isSaved ? "fill-rose-500 text-rose-500 transition-all duration-300" : "text-rose-400 group-hover/btn:text-rose-500 transition-all duration-300"} 
                />
              </button>
            )}
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif text-primary tracking-tight">
              {title}
            </h2>
            <p className="text-sm italic text-on-surface-variant/70 leading-relaxed max-w-sm font-medium">
              {description}
            </p>
          </div>
        </div>

      </div>

      {/* Arabic Quote Column */}
      <div className={cn(
        "flex-1 bg-surface-container-lowest p-8 md:p-16 rounded-[32px] border border-outline-variant/10 shadow-sm relative overflow-hidden flex flex-col items-end md:col-span-8 group/quote",
        isReversed ? "md:col-start-1 md:col-span-8" : ""
      )}>
        <div className="absolute top-0 right-0 w-48 h-48 bg-secondary-container/5 rounded-bl-[200px] -mr-12 -mt-12 transition-transform duration-[4s] group-hover/quote:scale-110" />

        <div className="text-right space-y-12 relative z-10 w-full">
          <h2 className="font-arabic text-4xl md:text-5xl lg:text-6xl leading-[2] text-primary/90">
            {arabic}
          </h2>

          <div className="space-y-6 text-left border-l-[3px] border-secondary/20 pl-8 ml-4">
             <div className="space-y-2">
                <span className="text-[9px] font-bold tracking-widest uppercase text-secondary/40">Transliteration</span>
                <p className="text-sm italic text-on-surface-variant font-medium leading-relaxed">
                  {transliteration}
                </p>
             </div>

             <div className="space-y-2">
                <span className="text-[9px] font-bold tracking-widest uppercase text-secondary/40">Meaning</span>
                <p className="text-lg md:text-2xl font-serif text-primary leading-tight font-normal">
                  {meaning}
                </p>
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}
