"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useFeelings } from "@/hooks/use-feelings";
import { FeelingHeader } from "@/components/feelings/FeelingHeader";
import { FeelingChips } from "@/components/feelings/FeelingChips";
import { QuranicComfortCard } from "@/components/feelings/QuranicComfortCard";
import { SelectedDuaCard } from "@/components/feelings/SelectedDuaCard";
import { CommunityFeelings } from "@/components/feelings/CommunityFeelings";
import { ShareReflectionCard } from "@/components/feelings/ShareReflectionCard";

export default function FeelingToolPage() {
  const { feelings, selectedFeeling, selectedFeelingId, selectFeeling } = useFeelings();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">

        <FeelingHeader />

        <FeelingChips
          feelings={feelings}
          selectedFeelingId={selectedFeelingId}
          onSelect={selectFeeling}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">


          <div className="lg:col-span-8 space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">

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

          {/* Sidebar (Right) */}
          <div className="lg:col-span-4 space-y-8 animate-in fade-in slide-in-from-right duration-1000">

            <CommunityFeelings reflections={selectedFeeling.community} />

            <ShareReflectionCard />

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
