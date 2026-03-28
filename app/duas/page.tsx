"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

// Custom Hook
import { useDuas } from "@/hooks/use-duas";

// Dua-specific components
import { DuaHeader } from "@/components/duas/DuaHeader";
import { DuaCategories } from "@/components/duas/DuaCategories";
import { DuaCard } from "@/components/duas/DuaCard";
import { DuasCTA } from "@/components/duas/DuasHero";

export default function LibraryOfDuasPage() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredDuas,
  } = useDuas();

  return (
    <div className="min-h-screen bg-surface selection:bg-secondary-container/30 transition-colors duration-500">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 md:pt-24 pb-32">
        {/* Page Header (Title & Search) */}
        <DuaHeader
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Filter Categories */}
        <DuaCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* List of Dua Cards - Alternating Layouts */}
        <div className="space-y-12">
          {filteredDuas.length > 0 ? (
            filteredDuas.map((dua, index) => (
              <DuaCard
                key={dua.id}
                category={dua.category}
                title={dua.title}
                description={dua.description}
                arabic={dua.arabic}
                transliteration={dua.transliteration}
                meaning={dua.meaning}
                reference={dua.reference}
                isReversed={index % 2 !== 0}
              />
            ))
          ) : (
            <div className="text-center py-32 space-y-4">
              <p className="text-2xl font-serif italic text-primary/40">No supplications found matching your search.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedCategory("All Supplications"); }}
                className="text-xs font-bold tracking-widest uppercase text-secondary hover:underline transition-all"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        {/* Call To Action Banner */}
        <DuasCTA />

      </main>

      <Footer />
    </div>
  );
}
