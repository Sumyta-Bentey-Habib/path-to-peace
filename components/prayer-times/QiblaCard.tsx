"use client";

import React from "react";
import Image from "next/image";
import { Compass } from "lucide-react";
import { Button } from "@/components/ui/button";

interface QiblaCardProps {
  direction: number;
}

export function QiblaCard({ direction }: QiblaCardProps) {
  return (
    <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[48px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000 group mb-32">
       <Image
          src="/images/forest-meditative.png"
          alt="Meditative Forest"
          fill
          className="object-cover transition-transform duration-[6s] group-hover:scale-105 opacity-60"
       />
       <div className="absolute inset-0 bg-primary/30 backdrop-blur-[4px] transition-all duration-500 group-hover:bg-primary/40" />
       
       <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-between p-12 lg:p-20 gap-12">
          <div className="space-y-6 max-w-xl text-center md:text-left">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight leading-tight">
              Orient Yourself <br/> <span className="text-white/60 italic font-normal">Towards Peace</span>
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-serif italic leading-relaxed">
              Find the Qibla direction from your current location and prepare your soul for meaningful prayer.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-6">
            <div className="w-48 h-48 rounded-[60px] bg-white/10 backdrop-blur-xl border border-white/20 flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:rotate-3">
               <Compass className="w-10 h-10 text-secondary-container animate-pulse" />
               <div>
                 <p className="text-[10px] font-bold tracking-widest uppercase text-white/50">Qibla Angle</p>
                 <p className="text-4xl font-serif text-white italic">{direction}°</p>
               </div>
            </div>
            <Button className="bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 rounded-full px-12 py-7 font-bold tracking-widest uppercase text-sm shadow-xl shadow-black/20 transition-all duration-500 hover:translate-y-[-4px]">
              Open Compass
            </Button>
          </div>
       </div>
    </div>
  );
}
