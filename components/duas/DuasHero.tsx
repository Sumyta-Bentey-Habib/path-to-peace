"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function DuasCTA() {
  return (
    <div className="relative w-full aspect-[21/9] md:aspect-[3/1] rounded-[48px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000 group mb-32">
       <Image
          src="/images/forest-meditative.png"
          alt="Meditative Forest"
          fill
          className="object-cover transition-transform duration-[6s] group-hover:scale-105"
       />
       <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px] transition-all duration-500 group-hover:bg-primary/50" />
       
       <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center space-y-8">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-serif text-white tracking-tight">
              The Power of Supplication
            </h2>
            <p className="text-white/80 text-lg md:text-xl font-serif italic max-w-lg mx-auto leading-relaxed">
              Supplication is the essence of worship. Explore our deep dives into the etiquette of making Dua and the times when supplications are most readily answered.
            </p>
          </div>
          
          <Button className="bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 rounded-full px-12 py-7 font-bold tracking-widest uppercase text-sm shadow-xl shadow-black/20 transition-all duration-500 hover:translate-y-[-4px]">
            Learn More
          </Button>
       </div>
    </div>
  );
}
