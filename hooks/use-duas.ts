"use client";

import { useState, useMemo } from "react";
import duasData from "@/lib/data/duas.json";

export interface Dua {
  id: number;
  category: string;
  title: string;
  description: string;
  arabic: string;
  transliteration: string;
  meaning: string;
  reference: string;
}

export function useDuas() {
  const [selectedCategory, setSelectedCategory] = useState("All Supplications");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = duasData.categories;
  const allDuas = (duasData.duas as Dua[]);

  const filteredDuas = useMemo(() => {
    return allDuas.filter((dua) => {
      const matchesCategory =
        selectedCategory === "All Supplications" || dua.category === selectedCategory;
      const matchesSearch =
        dua.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dua.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, allDuas]);

  return {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredDuas,
  };
}
