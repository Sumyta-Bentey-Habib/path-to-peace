"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";

interface QuranicComfortCardProps {
  arabic: string;
  translation: string;
  reference: string;
}

export function QuranicComfortCard({
  arabic,
  translation,
  reference,
}: QuranicComfortCardProps) {
  return (
    <div className="bg-surface-container-lowest p-10 rounded-[32px] border border-outline-variant/10 shadow-meditative group hover:shadow-xl transition-all duration-500 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-secondary-container/5 rounded-bl-[100px] -mr-8 -mt-8" />
      
      <Badge className="bg-primary/5 text-primary border-none px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase mb-10">
        Quranic Comfort
      </Badge>

      <div className="space-y-8 relative z-10">
        <div className="text-right">
          <h2 className="font-arabic text-4xl md:text-5xl leading-loose text-primary/90">
            {arabic}
          </h2>
        </div>
        
        <div className="space-y-4">
          <p className="text-2xl font-serif italic text-on-surface leading-snug">
            &quot;{translation}&quot;
          </p>
          <div className="text-[10px] font-bold tracking-[0.2em] text-on-surface-variant/40 uppercase">
            — {reference}
          </div>
        </div>
      </div>
    </div>
  );
}
