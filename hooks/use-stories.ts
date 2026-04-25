"use client";

import { useMemo } from "react";
import { prophets as prophetsData, storiesContent as storiesContentData } from "../lib/data/stories-data";

export interface Prophet {
  id: string;
  name: string;
  arabicName: string;
  subtitle: string;
  era: string;
  icon: string;
  link: string;
  isFeatured?: boolean;
  salutation?: string;
  title?: string;
}

export interface StoryDetail {
  fullName: string;
  narrative: {
    title: string;
    content: string;
  }[];
  lessons: string[];
  quranReferences: {
    text: string;
    reference: string;
  }[];
}

export function useStories() {
  const prophets = prophetsData as Prophet[];
  
  const eras = useMemo(() => {
    const allEras = prophets.map((p) => p.era);
    return ["All Eras", ...Array.from(new Set(allEras))];
  }, [prophets]);

  const getStoryById = (id: string): (Prophet & { details?: StoryDetail }) | null => {
    const prophet = prophets.find((p) => p.id === id);
    if (!prophet) return null;

    const details = (storiesContentData as Record<string, StoryDetail>)[id];
    return { ...prophet, details };
  };

  return {
    prophets,
    eras,
    getStoryById
  };
}
