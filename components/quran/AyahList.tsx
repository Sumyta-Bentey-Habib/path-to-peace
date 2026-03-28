"use client";

import React from "react";
import { AyahCard } from "./AyahCard";

interface Ayah {
  number: number;
  arabic: string;
  translation: string;
  translator: string;
}

interface AyahListProps {
  ayahs: Ayah[];
}

export function AyahList({ ayahs }: AyahListProps) {
  return (
    <div className="space-y-24 pt-8">
      {ayahs.map((ayah) => (
        <AyahCard key={ayah.number} ayah={ayah} />
      ))}
    </div>
  );
}
