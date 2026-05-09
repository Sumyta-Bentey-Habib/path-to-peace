"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface DuaCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
}

export function DuaCategories({
  categories,
  selectedCategory,
  onSelect,
}: DuaCategoriesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 mb-16 overflow-x-auto pb-4 no-scrollbar">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={cn(
            "whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-bold tracking-widest uppercase transition-all duration-300 border border-outline-variant/10",
            selectedCategory === category
              ? "bg-secondary-container text-on-secondary-container border-secondary-container shadow-lg shadow-secondary-container/20"
              : "bg-surface-container-low hover:bg-surface-container text-on-surface-variant/50"
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
