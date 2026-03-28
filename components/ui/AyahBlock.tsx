"use client";

import { Quote, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AyahBlockProps {
  surah: string;
  verse: string;
}

export function AyahBlock({ surah, verse }: AyahBlockProps) {
  return (
    <div className="md:col-span-2 lg:col-span-3 bg-surface-container-lowest p-8 md:p-12 rounded-xl relative overflow-hidden group hover:shadow-meditative transition-all duration-500 ghost-border">
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
      <div className="absolute top-8 right-8">
        <Quote className="w-12 h-12 text-secondary/10" />
      </div>
      
      <div className="space-y-8">
        <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-secondary uppercase">
          <span>{surah}</span>
        </div>
        <h3 className="text-3xl md:text-4xl leading-relaxed text-primary font-serif italic font-normal">
          &quot;{verse}&quot;
        </h3>
        <div className="flex items-center gap-6 pt-4">
          <Button variant="ghost" className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors p-0 h-auto">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button variant="ghost" className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors p-0 h-auto">
            <Bookmark className="w-4 h-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
