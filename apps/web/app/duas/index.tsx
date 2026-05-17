"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useDuas } from "@/hooks/use-duas";
import { DuaHeader } from "@/components/duas/DuaHeader";
import { DuaCategories } from "@/components/duas/DuaCategories";
import { DuaCard } from "@/components/duas/DuaCard";
import { DuasCTA } from "@/components/duas/DuasHero";
import { styles } from "./style";
import { authClient } from "@/lib/auth-client";
import { useSavedItems } from "@/hooks/use-saved-items";

export default function LibraryOfDuasUI() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredDuas,
  } = useDuas();

  const { data: session } = authClient.useSession();
  const { toggleSaveItem, isItemSaved } = useSavedItems("dua");

  const handleToggleSave = async (dua: any) => {
    if (!session) return;
    await toggleSaveItem("dua", dua.id, dua);
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <DuaHeader />

        <DuaCategories
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="space-y-12 text-left">
          {filteredDuas.length > 0 ? (
            filteredDuas.map((dua, index) => (
              <DuaCard
                key={dua.id}
                id={dua.id}
                category={dua.category}
                title={dua.title}
                description={dua.description}
                arabic={dua.arabic}
                transliteration={dua.transliteration}
                meaning={dua.meaning}
                reference={dua.reference}
                isReversed={index % 2 !== 0}
                isSaved={isItemSaved("dua", dua.id)}
                onToggleSave={() => handleToggleSave(dua)}
                showSaveButton={!!session}
              />
            ))
          ) : (
            <div className={styles.noResults}>
              <p className="text-2xl font-serif italic text-primary/40">No supplications found in this category.</p>
              <button 
                onClick={() => { setSelectedCategory("All Supplications"); }}
                className={styles.clearFiltersBtn}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

        <DuasCTA />
      </main>

      <Footer />
    </div>
  );
}
