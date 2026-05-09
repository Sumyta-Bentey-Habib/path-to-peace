"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Bookmark } from "lucide-react";
import { AyahBlock } from "@/components/ui/AyahBlock";

export function Guidance() {
  return (
    <section className="bg-surface-container-low py-20 md:py-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif text-primary">Guidance from the Source</h2>
            <p className="text-on-surface-variant max-w-[50ch]">
              Selected verses and narrations to anchor your day in tranquility and purpose.
            </p>
          </div>
          <Link href="/collections" className="text-primary font-sans font-semibold flex items-center gap-2 group">
            View All Collections
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <AyahBlock 
            surah="Surat Al-Baqarah 2:152" 
            verse="So remember Me; I will remember you. And be grateful to Me and do not deny Me." 
          />

          {/* Prophet Card */}
          <div className="bg-primary-container text-on-primary p-8 rounded-xl flex flex-col justify-between group overflow-hidden relative border-0">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
            <Heart className="w-8 h-8 text-secondary-container mb-12" />
            <div className="space-y-6">
              <p className="text-xl italic font-serif leading-relaxed">
                &quot;Purity is half of faith.&quot;
              </p>
              <div className="space-y-1">
                <p className="text-xs font-bold uppercase tracking-widest text-secondary-container">Sahih Muslim</p>
                <p className="text-[10px] text-on-primary/60">Foundational Hadith on Taharah</p>
              </div>
            </div>
          </div>

          {/* Sidebar Wisdom */}
          <div className="bg-surface-container p-8 rounded-xl space-y-6 ghost-border border-0">
             <div className="flex items-center gap-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">
                <Bookmark className="w-3 h-3" />
                Prophetic Wisdom
             </div>
             <p className="text-on-surface-variant leading-relaxed italic">
               &quot;The best of people are those that are most useful to people.&quot;
             </p>
             <button className="text-primary text-xs font-bold border-b border-primary/20 hover:border-primary transition-all pb-0.5 w-fit">
                Read Commentary
             </button>
          </div>

          {/* Visual Card */}
          <div className="md:col-span-2 lg:col-span-3 relative h-64 md:h-auto rounded-xl overflow-hidden shadow-lg group">
             <Image 
               src="/images/golden_arch.png" 
               alt="The Beauty of Remembrance" 
               fill 
               className="object-cover group-hover:scale-105 transition-transform duration-1000"
             />
             <div className="absolute inset-0 bg-primary/30 group-hover:bg-primary/20 transition-all"></div>
             <div className="absolute bottom-8 left-8">
                <h3 className="text-white text-3xl font-serif">The Beauty of Remembrance</h3>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
