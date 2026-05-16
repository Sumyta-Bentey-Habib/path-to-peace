"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useDuas } from "@/hooks/use-duas";
import { DuaHeader } from "@/components/duas/DuaHeader";
import { DuaCategories } from "@/components/duas/DuaCategories";
import { DuaCard } from "@/components/duas/DuaCard";
import { DuasCTA } from "@/components/duas/DuasHero";
import { styles } from "./style";
import { authClient, getAuthHeaders } from "@/lib/auth-client";

export default function LibraryOfDuasUI() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    filteredDuas,
  } = useDuas();

  const { data: session } = authClient.useSession();
  const [savedDuaIds, setSavedDuaIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchSavedDuas = async () => {
    if (!session) return;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items?type=dua`, {
        credentials: "include",
        headers: await getAuthHeaders()
      });
      if (response.ok) {
        const savedItems = await response.json();
        setSavedDuaIds(savedItems.map((item: any) => Number(item.itemId)));
      }
    } catch (error) {
      console.error("Failed to fetch saved Duas:", error);
    }
  };

  useEffect(() => {
    fetchSavedDuas();
  }, [session]);

  const handleToggleSave = async (dua: any) => {
    if (!session || loading) return;
    setLoading(true);

    const isSaved = savedDuaIds.includes(dua.id);
    try {
      if (isSaved) {
        // Delete
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items/dua/${dua.id}`, {
          method: "DELETE",
          credentials: "include",
          headers: await getAuthHeaders()
        });
        if (response.ok) {
          setSavedDuaIds(prev => prev.filter(id => id !== dua.id));
        }
      } else {
        // Save
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items`, {
          method: "POST",
          headers: await getAuthHeaders(true),
          credentials: "include",
          body: JSON.stringify({
            type: "dua",
            itemId: dua.id,
            data: dua
          })
        });
        if (response.ok) {
          setSavedDuaIds(prev => [...prev, dua.id]);
        }
      }
    } catch (error) {
      console.error("Failed to toggle save Dua:", error);
    } finally {
      setLoading(false);
    }
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

        <div className="space-y-12">
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
                isSaved={savedDuaIds.includes(dua.id)}
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
