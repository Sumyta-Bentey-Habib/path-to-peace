"use client";

import React from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DuaHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function DuaHeader({ searchQuery, onSearchChange }: DuaHeaderProps) {
  return (
    <div className="space-y-12 mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight">
            Library of Duas
          </h1>
          <p className="text-sm italic text-on-surface-variant/70 font-medium">
            A curated collection of prophetic supplications for every moment of the believer&apos;s journey. Find solace and connection through the words of the Divine.
          </p>
        </div>

        <div className="relative group w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/40 group-focus-within:text-primary transition-colors" />
          <Input
            placeholder="Search Duas..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-12 bg-surface-container/50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
}
