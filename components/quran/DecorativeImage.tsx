"use client";

import React from "react";
import Image from "next/image";

export function DecorativeImage() {
  return (
    <div className="relative mt-20 w-full aspect-21/9 rounded-[48px] overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom duration-1000 group">
      <Image
        src="/images/forest-meditative.png"
        alt="Meditative Forest"
        fill
        className="object-cover transition-transform duration-[3s] group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
    </div>
  );
}
