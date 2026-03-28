"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BlogCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function BlogCategories({
  categories,
  selectedCategory,
  onSelect,
}: BlogCategoriesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-12 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border border-border/50",
            selectedCategory === category
              ? "bg-emerald-800 text-white border-emerald-800 shadow-lg shadow-emerald-800/20"
              : "bg-surface hover:bg-emerald-50 text-muted-foreground hover:text-emerald-800"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
