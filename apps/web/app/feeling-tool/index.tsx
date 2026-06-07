"use client";

import React, { useEffect, useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { styles } from "./style";
import { authClient } from "@/lib/auth-client";
import { useSavedItems } from "@/hooks/use-saved-items";
import { 
  Sun, 
  Shield, 
  Heart, 
  BookOpen, 
  Smile, 
  Users, 
  Compass, 
  Navigation, 
  Activity, 
  Wind,
  Book,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

// Category Details with associated icons
const CATEGORY_DETAILS: Record<string, {
  label: string;
  icon: React.ReactNode;
}> = {
  "Ease in Hardship": {
    label: "Ease in Hardship",
    icon: <Wind className="w-4.5 h-4.5" />
  },
  "Morning & Evening": {
    label: "Morning & Evening",
    icon: <Sun className="w-4.5 h-4.5" />
  },
  "Protection & Safety": {
    label: "Protection & Safety",
    icon: <Shield className="w-4.5 h-4.5" />
  },
  "Gratitude": {
    label: "Gratitude",
    icon: <Heart className="w-4.5 h-4.5" />
  },
  "Knowledge & Success": {
    label: "Knowledge & Success",
    icon: <BookOpen className="w-4.5 h-4.5" />
  },
  "Forgiveness & Mercy": {
    label: "Forgiveness & Mercy",
    icon: <Smile className="w-4.5 h-4.5" />
  },
  "Family & Parents": {
    label: "Family & Parents",
    icon: <Users className="w-4.5 h-4.5" />
  },
  "Daily Life": {
    label: "Daily Life",
    icon: <Compass className="w-4.5 h-4.5" />
  },
  "Travel & Journey": {
    label: "Travel & Journey",
    icon: <Navigation className="w-4.5 h-4.5" />
  },
  "Health & Healing": {
    label: "Health & Healing",
    icon: <Activity className="w-4.5 h-4.5" />
  }
};

export default function FeelingToolUI() {
  const [duas, setDuas] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("Ease in Hardship");
  const [loading, setLoading] = useState<boolean>(true);
  
  const { data: session } = authClient.useSession();
  const { toggleSaveItem, isItemSaved } = useSavedItems("feeling");

  const isSaved = isItemSaved("feeling", selectedCategory);

  // Fetch Duas
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/duas`);
        if (response.ok) {
          const dData = await response.json();
          if (Array.isArray(dData)) setDuas(dData);
        }
      } catch (error) {
        console.error("Failed to fetch supplication data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter Duas belonging to the selected category
  const categoryDuas = useMemo(() => {
    return duas.filter(d => d.category === selectedCategory);
  }, [selectedCategory, duas]);

  // Dynamic Categories compilation from Duas and Predefined categories
  const categories = useMemo(() => {
    const predefinedList = Object.keys(CATEGORY_DETAILS);
    const existingInDb = duas.map(d => d.category).filter(Boolean);
    return Array.from(new Set([...predefinedList, ...existingInDb]));
  }, [duas]);

  const handleToggleSave = async () => {
    if (!session) return;
    await toggleSaveItem("feeling", selectedCategory, {
      id: selectedCategory,
      label: selectedCategory,
      icon: "Book",
      dua: {
        arabic: categoryDuas[0]?.arabic || "",
        translation: categoryDuas[0]?.meaning || categoryDuas[0]?.translation || "",
        reference: categoryDuas[0]?.reference || "Category Remedy"
      }
    });
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        {/* Supplication Header */}
        <section className="text-center space-y-6 max-w-3xl mx-auto mb-16 animate-in fade-in slide-in-from-top duration-700">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-primary tracking-tight">
            Supplication Sanctuary
          </h1>
          <p className="text-sm italic text-on-surface-variant/70 font-medium max-w-lg mx-auto">
            &quot;Verily, in the remembrance of Allah do hearts find rest.&quot;
          </p>
        </section>

        {/* Supplication Category Chips Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4 mb-16 max-w-5xl mx-auto animate-in fade-in duration-700 delay-100">
          {categories.map((cat) => {
            const details = CATEGORY_DETAILS[cat] || {
              icon: <Book className="w-4 h-4" />
            };
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "flex items-center gap-2 px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 active:scale-95 cursor-pointer",
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105 border border-primary"
                    : "bg-surface-container-low hover:bg-surface-container-high text-on-surface-variant/75 border border-outline-variant/10"
                )}
              >
                {details.icon}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Save state to dashboard wrapper */}
        {session && (
          <div className="flex flex-col sm:flex-row justify-between items-center bg-white/60 backdrop-blur-md border border-outline-variant/20 rounded-3xl p-6 mb-12 max-w-4xl mx-auto shadow-sm animate-in fade-in slide-in-from-bottom duration-500 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-secondary-container/20 flex items-center justify-center text-secondary">
                <Sparkles size={18} />
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-primary">
                  Reflecting on: <span className="text-secondary font-serif italic text-base capitalize">{selectedCategory}</span>
                </p>
                <p className="text-xs text-on-surface-variant font-medium">Save this spiritual category and comforting remedies to your dashboard.</p>
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
              {isSaved ? "Saved to Dashboard" : "Save to Dashboard"}
            </button>
          </div>
        )}

        {/* Centered Supplications Column */}
        <div className={styles.contentGrid}>
          <div className={styles.leftContent}>
            {/* Mapped Duas Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-surface-container-lowest px-6 py-4 rounded-2xl border border-outline-variant/10 shadow-sm">
                <span className="text-sm font-bold text-primary flex items-center gap-2">
                  <Book size={18} className="text-secondary" /> Remedial Duas for {selectedCategory}
                </span>
                <span className="text-xs px-2.5 py-0.5 bg-secondary-container/20 text-on-secondary-container rounded-full font-bold">
                  {categoryDuas.length} Supplication{categoryDuas.length !== 1 ? "s" : ""}
                </span>
              </div>
              
              {loading ? (
                <div className="py-24 text-center text-primary font-medium flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  Seeking supplications...
                </div>
              ) : categoryDuas.map((dua: any, idx: number) => (
                <div key={dua._id || dua.id || idx} className="bg-surface-container-lowest p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm border-l-4 border-l-secondary animate-in fade-in slide-in-from-bottom duration-300 hover:shadow-md transition-all">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-serif font-bold text-primary text-lg">{dua.title}</h4>
                    <span className="text-[10px] px-2 py-0.5 bg-secondary-container/10 text-secondary rounded font-mono uppercase tracking-wider font-bold">{dua.category}</span>
                  </div>
                  <p className="font-serif text-right text-xl md:text-2xl leading-loose text-primary/80 mb-4" dir="rtl">{dua.arabic}</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed font-medium mb-3">&quot;{dua.meaning || dua.translation}&quot;</p>
                  {dua.reference && <p className="text-[10px] text-primary/60 font-bold text-right">— {dua.reference}</p>}
                </div>
              ))}
              
              {!loading && categoryDuas.length === 0 && (
                <div className="p-8 text-center bg-surface-container-lowest rounded-2xl border border-outline-variant/10 text-on-surface-variant font-medium text-sm">
                  No supplications found in this category yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
