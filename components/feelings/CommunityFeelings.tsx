"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, Play } from "lucide-react";

export interface Reflection {
  name: string;
  time: string;
  text: string;
  tag: string;
  count: number;
  type: string;
}

interface CommunityFeelingsProps {
  reflections: Reflection[];
}

export function CommunityFeelings({ reflections }: CommunityFeelingsProps) {
  return (
    <div className="bg-surface-container-low/50 rounded-[40px] p-8 space-y-8 border border-outline-variant/5">
      <div className="space-y-1">
        <h3 className="text-lg font-bold tracking-wide">Community Feelings</h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant/40">
          You are not alone
        </p>
      </div>

      <div className="space-y-4">
        {reflections.map((reflection, idx) => (
          <div
            key={idx}
            className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm space-y-4 border border-outline-variant/5"
          >
            <div className="flex justify-between items-center text-[10px] font-bold">
              <span className="text-primary/60">{reflection.name}</span>
              <span className="text-on-surface-variant/30 tracking-tight">
                {reflection.time}
              </span>
            </div>
            <p className="text-sm text-on-surface-variant italic font-medium leading-relaxed">
              &quot;{reflection.text}&quot;
            </p>
            <div className="flex justify-between items-center pt-2">
              <Badge className="bg-surface-container text-[10px] text-on-surface-variant/60 border-none font-bold tracking-widest uppercase px-3 py-1">
                {reflection.tag}
              </Badge>
              <div className="flex items-center gap-2 text-[10px] font-bold text-on-surface-variant/60">
                {reflection.type === "Silent Prayers" ? (
                  <Heart className="w-3 h-3 text-secondary fill-secondary/20" />
                ) : (
                  <Play className="w-3 h-3" />
                )}
                {reflection.count} {reflection.type}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full rounded-2xl py-6 border-outline-variant/20 font-bold tracking-widest uppercase text-[10px] bg-transparent hover:bg-surface-container transition-colors"
      >
        View All Reflections
      </Button>
    </div>
  );
}
