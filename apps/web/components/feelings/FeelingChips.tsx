"use client";

import React from "react";
import { Frown, User, Wind, Heart, Anchor } from "lucide-react";
import { cn } from "@/lib/utils";

interface Feeling {
  id: string;
  label: string;
}

interface FeelingChipsProps {
  feelings: Feeling[];
  selectedFeelingId: string;
  onSelect: (id: string) => void;
}

const feelingIcons: Record<string, React.ReactNode> = {
  sad: <Frown className="w-4 h-4" />,
  lonely: <User className="w-4 h-4" />,
  anxious: <Wind className="w-4 h-4" />,
  grateful: <Heart className="w-4 h-4" />,
  patient: <Anchor className="w-4 h-4" />,
};

export function FeelingChips({
  feelings,
  selectedFeelingId,
  onSelect,
}: FeelingChipsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-6 mb-16">
      {feelings.map((feeling) => (
        <button
          key={feeling.id}
          onClick={() => onSelect(feeling.id)}
          className={cn(
            "flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-500",
            selectedFeelingId === feeling.id
              ? "bg-secondary-container text-on-secondary-container shadow-lg shadow-secondary-container/20 scale-105"
              : "bg-surface-container hover:bg-surface-container-highest text-on-surface-variant/60"
          )}
        >
          {feelingIcons[feeling.id]}
          {feeling.label}
        </button>
      ))}
    </div>
  );
}
