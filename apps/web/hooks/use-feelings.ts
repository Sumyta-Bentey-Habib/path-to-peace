"use client";

import { useState, useMemo } from "react";
import feelingsData from "@/lib/data/feelings.json";

export interface Feeling {
  id: string;
  label: string;
  icon: string;
  quran: {
    arabic: string;
    translation: string;
    reference: string;
  };
  dua: {
    arabic: string;
    translation: string;
    reference: string;
  };
  community: Array<{
    name: string;
    time: string;
    text: string;
    tag: string;
    count: number;
    type: string;
  }>;
}

export function useFeelings() {
  const [selectedFeelingId, setSelectedFeelingId] = useState<string>("anxious");

  const feelings = (feelingsData as { feelings: Feeling[] }).feelings;

  const selectedFeeling = useMemo(() => {
    return feelings.find((f) => f.id === selectedFeelingId) || feelings[0];
  }, [selectedFeelingId, feelings]);

  const selectFeeling = (id: string) => {
    setSelectedFeelingId(id);
  };

  return {
    feelings,
    selectedFeeling,
    selectedFeelingId,
    selectFeeling,
  };
}
