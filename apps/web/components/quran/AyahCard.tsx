"use client";

import React from "react";
import { Bookmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Ayah {
  number: number;
  arabic: string;
  translation: string;
  translator: string;
}

interface AyahCardProps {
  ayah: Ayah;
}

export function AyahCard({ ayah }: AyahCardProps) {
  return (
    <div className="relative flex flex-col md:flex-row gap-12 group animate-in fade-in duration-1000">
      <div className="flex md:flex-col items-center gap-6 justify-center md:justify-start">
        <div className="w-10 h-10 rounded-full bg-surface-container-highest/30 flex items-center justify-center font-bold text-xs text-primary/40">
          {ayah.number}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-on-surface-variant/30 hover:text-secondary transition-all duration-300 hover:scale-110"
        >
          <Bookmark className="w-5 h-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-on-surface-variant/30 hover:text-primary transition-all duration-300 hover:scale-110"
        >
          <Share2 className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex-1 space-y-10 text-right md:text-right">
        <div className="font-arabic text-4xl md:text-5xl leading-loose text-primary group-hover:text-black transition-colors duration-500 font-normal">
          {ayah.arabic}
        </div>
        <div className="text-left space-y-4 animate-in slide-in-from-left duration-700">
          <p className="text-lg text-on-surface-variant leading-relaxed max-w-3xl">
            {ayah.translation}
          </p>
          <div className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant/40 uppercase">
            — {ayah.translator}
          </div>
        </div>
      </div>
    </div>
  );
}
