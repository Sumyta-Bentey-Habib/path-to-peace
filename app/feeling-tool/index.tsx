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
import { styles } from "./style";

export default function FeelingToolUI() {
  const { feelings, selectedFeeling, selectedFeelingId, selectFeeling } = useFeelings();

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
