"use client";

import React from "react";

interface Bismillah {
  arabic: string;
  translation: string;
}

interface BismillahBlockProps {
  bismillah: Bismillah;
}

export function BismillahBlock({ bismillah }: BismillahBlockProps) {
  return (
    <div className="bg-surface-container-low/50 rounded-2xl p-10 text-center space-y-4 border border-outline-variant/5 group hover:bg-surface-container-low transition-colors duration-500">
      <div className="font-arabic text-4xl text-primary/80 group-hover:text-primary transition-colors leading-[1.8]">
        {bismillah.arabic}
      </div>
      <p className="text-sm text-on-surface-variant/60 italic font-medium leading-relaxed max-w-lg mx-auto">
        {bismillah.translation}
      </p>
    </div>
  );
}
