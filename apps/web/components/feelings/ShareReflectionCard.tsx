"use client";

import React from "react";
import Image from "next/image";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ShareReflectionCard() {
  return (
    <div className="relative aspect-square rounded-[40px] overflow-hidden group">
      <Image
        src="/images/forest-meditative.png"
        alt="Meditative Background"
        fill
        className="object-cover transition-transform duration-[4s] group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-primary/40 backdrop-blur-[2px]" />

      <div className="absolute inset-0 p-10 flex flex-col items-center justify-center text-center space-y-6">
        <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center">
          <MessageSquare className="w-6 h-6 text-white" />
        </div>
        <p className="text-white text-xl font-serif italic max-w-[220px]">
          Would you like to share your own reflection anonymously?
        </p>
        <Button className="bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 rounded-full px-8 py-6 font-bold tracking-widest uppercase text-xs shadow-xl shadow-black/20 transition-all duration-300 hover:translate-y-[-2px]">
          Share Feeling
        </Button>
      </div>
    </div>
  );
}
