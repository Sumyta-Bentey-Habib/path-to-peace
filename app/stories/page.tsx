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

export default function ProphetStoriesPage() {
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
    <div className="min-h-screen bg-surface selection:bg-secondary-container/30">
      <Navbar />

      <main className="max-w-7xl mx-auto px-8 pt-12 pb-24">
        {/* Hero Section */}
        <section className="flex flex-col md:flex-row items-center justify-between mb-20 gap-12">
          <div className="max-w-xl space-y-6 text-center md:text-left">
            <h1 className="text-6xl md:text-7xl font-serif">
               Prophet Stories <br />
               <span className="italic font-light text-primary/60">Library</span>
            </h1>
            <p className="text-lg text-on-surface-variant/80 leading-relaxed max-w-md">
              Journey through the lives of the Messengers, from the dawn of creation to the final revelation. A digital sanctuary for timeless wisdom and sacred narratives.
            </p>
          </div>
          <div className="relative w-64 h-64 md:w-80 md:h-80">
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

        {/* Filter Section */}
        <section className="bg-surface-container-low/50 p-4 rounded-2xl mb-12 flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/50" />
            <Input 
              placeholder="Search Prophet by name..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-surface-container/60 border-none rounded-xl"
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

        {/* Prophet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          
          {/* Featured Card - Muhammad (SAW) */}
          {featuredProphet && (
            <Card className="lg:col-span-2 lg:row-span-2 bg-[#003527] text-white overflow-hidden group hover:shadow-2xl transition-all duration-500 flex flex-col justify-end p-8 border-none relative star-pattern min-h-[550px]">
              <div className="absolute top-8 right-8 text-[#fed65b] text-5xl opacity-40 group-hover:opacity-80 transition-opacity font-serif">
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

          {/* Regular Prophet Cards */}
          {otherProphets.map((prophet) => (
            <Card key={prophet.id} className="bg-surface shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-meditative transition-all duration-300 border border-outline-variant/10 p-6 flex flex-col justify-between group h-[320px]">
              <div className="flex justify-between items-start mb-6">
                <div className="p-3 bg-surface-container-low rounded-xl text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                   <ProphetIcon type={prophet.icon} />
                </div>
                <div className="text-2xl font-serif text-on-surface-variant/20 italic group-hover:text-on-surface-variant/40 transition-colors">
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
                className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-primary/60 hover:text-primary transition-colors group/link mt-6"
              >
                <span>Explore Story</span>
                <ExternalLink className="w-3 h-3 group-hover/link:scale-110 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>

        {/* Load More Button */}
        <div className="mt-20 flex justify-center">
          <Button variant="outline" className="px-12 py-6 rounded-xl bg-surface-container text-on-surface font-medium border-none hover:bg-surface-container-highest transition-colors">
            Load All {prophetsData.length} Messengers
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}
