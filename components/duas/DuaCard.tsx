"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Copy, Share2, Volume2, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface DuaCardProps {
  category: string;
  title: string;
  description: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  reference: string;
  isReversed?: boolean;
}

export function DuaCard({
  category,
  title,
  description,
  arabic,
  transliteration,
  meaning,
  reference,
  isReversed = false,
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
          <Badge className="bg-primary/5 text-primary border-none px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
            {category}
          </Badge>
          <div className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-serif text-primary tracking-tight">
              {title}
            </h2>
            <p className="text-sm italic text-on-surface-variant/70 leading-relaxed max-w-sm font-medium">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 pt-8 border-t border-outline-variant/10">
          <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/40 hover:text-primary transition-colors">
            <Copy className="w-4 h-4" /> Copy
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/40 hover:text-primary transition-colors">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/40 hover:text-primary transition-colors">
            <Volume2 className="w-4 h-4" /> Audio
          </button>
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
