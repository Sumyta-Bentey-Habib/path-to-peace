"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Play, Share2 } from "lucide-react";

interface SelectedDuaCardProps {
  arabic: string;
  translation: string;
}

export function SelectedDuaCard({ arabic, translation }: SelectedDuaCardProps) {
  return (
    <div className="bg-surface-container-lowest p-10 rounded-[32px] border border-outline-variant/10 shadow-meditative group hover:shadow-xl transition-all duration-500 border-l-[6px] border-l-secondary-container">
      <Badge className="bg-secondary-container/20 text-on-secondary-container border-none px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-10">
        Selected Dua
      </Badge>

      <div className="space-y-8">
        <div className="text-right">
          <h2 className="font-arabic text-3xl md:text-4xl leading-loose text-primary/80">
            {arabic}
          </h2>
        </div>
        
        <div className="space-y-6">
          <p className="text-xl text-on-surface-variant leading-relaxed font-sans font-medium">
            &quot;{translation}&quot;
          </p>
          
          <div className="flex flex-wrap items-center gap-8 pt-4">
            <button className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-on-surface/80 hover:text-primary transition-colors">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary">
                <Play className="w-3 h-3 fill-current" />
              </div>
              Listen to Recitation
            </button>
            
            <button className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-on-surface/80 hover:text-primary transition-colors">
              <Share2 className="w-4 h-4" />
              Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
