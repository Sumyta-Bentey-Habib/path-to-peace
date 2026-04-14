"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProphetIcon } from "@/components/shared/ProphetIcon";
import { Search, ArrowRight, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import prophetsData from "@/lib/data/prophets.json";
import { styles } from "./style";

export default function ProphetStoriesUI() {
  const [search, setSearch] = useState("");
  const [activeEra, setActiveEra] = useState("All Eras");

  const filteredProphets = prophetsData.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesEra = activeEra === "All Eras" || p.era === activeEra;
    return matchesSearch && matchesEra;
  });

  const featuredProphet = prophetsData.find(p => p.isFeatured);
  const otherProphets = filteredProphets.filter(p => !p.isFeatured);

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.heroSection}>
          <div className={styles.heroTextBox}>
            <h1 className={styles.mainTitle}>
               Prophet Stories <br />
               <span className="italic font-light text-primary/60">Library</span>
            </h1>
            <p className={styles.heroDesc}>
              Journey through the lives of the Messengers, from the dawn of creation to the final revelation. A digital sanctuary for timeless wisdom and sacred narratives.
            </p>
          </div>
          <div className={styles.heroImageBox}>
            <div className="absolute inset-0 rounded-full border-2 border-outline-variant/20 animate-[spin_20s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full overflow-hidden shadow-meditative">
              <Image 
                src="/images/hero-manuscript.png"
                alt="Ancient Manuscript"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className={styles.filterSection}>
          <div className={styles.searchWrapper}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
            <Input 
              placeholder="Search Prophet by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <div className="flex-1 w-full overflow-x-auto">
            <Tabs value={activeEra} onValueChange={setActiveEra} className="w-full">
              <TabsList className="bg-transparent space-x-2">
                {["All Eras", "Early Creation", "The Great Flood", "Banu Isra'il", "The Final Message"].map(era => (
                  <TabsTrigger 
                    key={era} 
                    value={era}
                    className="data-[state=active]:bg-primary data-[state=active]:text-on-primary rounded-xl px-6 py-2 text-sm transition-all"
                  >
                    {era}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </section>

        <div className={styles.storiesGrid}>
          {featuredProphet && (
            <Card className={styles.featuredCard}>
              <div className={styles.featuredArabicTitle}>
                {featuredProphet.arabicName}
              </div>
              <div className="space-y-4 relative z-10">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-secondary-container">
                  {featuredProphet.title}
                </span>
                <h2 className="text-5xl font-serif text-white">
                  {featuredProphet.name} 
                  <span className="block text-2xl mt-2 font-arabic text-surface-container-highest/60">
                    ({featuredProphet.salutation})
                  </span>
                </h2>
                <p className="text-surface-container-low/70 max-w-md leading-relaxed">
                  {featuredProphet.subtitle}
                </p>
                <Link 
                  href={featuredProphet.link}
                  className="inline-flex items-center space-x-3 text-secondary-container font-medium pt-8 group/link"
                >
                  <span className="border-b border-transparent group-hover/link:border-secondary-container transition-all">Read the Seerah</span>
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </Card>
          )}

          {otherProphets.map((prophet) => (
            <Card key={prophet.id} className={styles.prophetCard}>
              <div className="flex justify-between items-start mb-6">
                <div className={styles.prophetIconBox}>
                   <ProphetIcon type={prophet.icon} />
                </div>
                <div className={styles.cardArabicName}>
                  {prophet.arabicName}
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-primary">{prophet.name}</h3>
                <p className="text-xs text-on-surface-variant/60 leading-relaxed line-clamp-3">
                  {prophet.subtitle}
                </p>
              </div>

              <Link 
                href={prophet.link}
                className={styles.cardLink}
              >
                <span>Explore Story</span>
                <ExternalLink className="w-3 h-3 group-hover/link:scale-110 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>

        <div className={styles.loadMoreBox}>
          <Button variant="outline" className="px-12 py-6 rounded-xl bg-surface-container text-on-surface font-medium border-none hover:bg-surface-container-highest transition-colors">
            Load All {prophetsData.length} Messengers
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
