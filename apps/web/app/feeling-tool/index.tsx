"use client";

import React, { useEffect, useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useFeelings } from "@/hooks/use-feelings";
import { FeelingHeader } from "@/components/feelings/FeelingHeader";
import { FeelingChips } from "@/components/feelings/FeelingChips";
import { QuranicComfortCard } from "@/components/feelings/QuranicComfortCard";
import { SelectedDuaCard } from "@/components/feelings/SelectedDuaCard";
import { CommunityFeelings } from "@/components/feelings/CommunityFeelings";
import { ShareReflectionCard } from "@/components/feelings/ShareReflectionCard";
import { styles } from "./style";
import { authClient, getAuthHeaders } from "@/lib/auth-client";
import { Heart, Sparkles } from "lucide-react";

export default function FeelingToolUI() {
  const { feelings, selectedFeeling, selectedFeelingId, selectFeeling } = useFeelings();

  const { data: session } = authClient.useSession();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  // Check if current feeling is saved
  useEffect(() => {
    if (!session) return;
    
    const checkSavedState = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items?type=feeling`, {
          credentials: "include",
          headers: await getAuthHeaders()
        });
        if (response.ok) {
          const savedItems = await response.json();
          const alreadySaved = savedItems.some((item: any) => item.itemId === selectedFeelingId);
          setIsSaved(alreadySaved);
        }
      } catch (error) {
        console.error("Failed to fetch saved Feeling state:", error);
      }
    };

    checkSavedState();
  }, [selectedFeelingId, session]);

  const handleToggleSave = async () => {
    if (!session || loading) return;
    setLoading(true);

    try {
      if (isSaved) {
        // Delete
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items/feeling/${selectedFeelingId}`, {
          method: "DELETE",
          credentials: "include",
          headers: await getAuthHeaders()
        });
        if (response.ok) {
          setIsSaved(false);
        }
      } else {
        // Save
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/saved-items`, {
          method: "POST",
          headers: await getAuthHeaders(true),
          credentials: "include",
          body: JSON.stringify({
            type: "feeling",
            itemId: selectedFeelingId,
            data: {
              id: selectedFeeling.id,
              label: selectedFeeling.label,
              icon: selectedFeeling.icon,
              quran: selectedFeeling.quran,
              dua: selectedFeeling.dua
            }
          })
        });
        if (response.ok) {
          setIsSaved(true);
        }
      }
    } catch (error) {
      console.error("Failed to toggle save Feeling state:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <FeelingHeader />

        <FeelingChips
          feelings={feelings}
          selectedFeelingId={selectedFeelingId}
          onSelect={selectFeeling}
        />

        {session && (
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white/60 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-6 mb-12 max-w-4xl mx-auto shadow-sm animate-in fade-in slide-in-from-bottom duration-500 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-primary">
                  Reflecting on: <span className="text-secondary font-serif italic text-base capitalize">{selectedFeeling.label}</span>
                </p>
                <p className="text-xs text-on-surface-variant font-medium">Save this emotional state and comforting resources to your dashboard.</p>
              </div>
            </div>
            <button
              onClick={handleToggleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-primary text-white hover:bg-primary-container text-sm font-bold shadow-lg shadow-primary/10 transition-all duration-300 cursor-pointer active:scale-95 group"
            >
              <Heart 
                size={16} 
                className={isSaved ? "fill-rose-400 text-rose-400 group-hover:scale-115 transition-transform" : "text-white group-hover:scale-115 transition-transform"} 
              />
              {isSaved ? "Saved to Dashboard" : "Save State to Dashboard"}
            </button>
          </div>
        )}

        <div className={styles.contentGrid}>
          <div className={styles.leftContent}>
            <QuranicComfortCard
              arabic={selectedFeeling.quran.arabic}
              translation={selectedFeeling.quran.translation}
              reference={selectedFeeling.quran.reference}
            />

            <SelectedDuaCard
              arabic={selectedFeeling.dua.arabic}
              translation={selectedFeeling.dua.translation}
            />
          </div>

          <div className={styles.sidebarContent}>
            <CommunityFeelings reflections={selectedFeeling.community} />
            <ShareReflectionCard />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
