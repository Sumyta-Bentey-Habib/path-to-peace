
"use client";

import Image from "next/image";
import Link from "next/link";
import { Search, User, ArrowRight, Share2, Bookmark, Quote, Heart, Star } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen star-pattern scroll-smooth">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glassmorphism ghost-border border-x-0 border-t-0 py-4 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="font-serif text-2xl font-bold text-primary">
            Path to Peace
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-primary border-b-2 border-secondary pb-0.5">Home</Link>
            <Link href="/about" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input 
              type="text" 
              placeholder="Search wisdom..." 
              className="bg-surface-container-highest/50 focus:bg-surface-container-lowest focus:ring-1 focus:ring-surface-tint pl-10 pr-4 py-2 rounded-full text-sm outline-none transition-all w-48 md:w-64"
            />
          </div>
          <button className="p-2 text-primary hover:bg-surface-container-low rounded-full transition-all">
            <User className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto overflow-hidden">
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container/30 text-[10px] font-bold tracking-widest text-on-secondary-container uppercase">
            <Star className="w-3 h-3 fill-secondary" />
            Daily Reflection
          </div>
          <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[1.1] max-w-[12ch]">
            "He who knows himself, knows his Lord."
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant font-sans max-w-[45ch] leading-relaxed italic">
            A timeless reminder attributed to the sages, inviting us to the inward journey of peace and discovery.
          </p>
          <div className="flex flex-wrap items-center gap-8">
            <button className="bg-primary text-on-primary px-8 py-4 rounded-md font-sans font-semibold flex items-center gap-3 hover:bg-primary-container transition-all shadow-meditative group">
              Begin Your Journey
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <Link href="/resources" className="text-primary font-sans font-semibold border-b-2 border-secondary/30 hover:border-secondary transition-all pb-1">
              Explore Resources
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/5] md:aspect-auto md:h-[600px] w-full animate-in fade-in slide-in-from-right duration-1000">
           <div className="absolute -inset-4 bg-primary/5 rounded-[2rem] -rotate-2"></div>
           <div className="relative h-full w-full rounded-[1.5rem] overflow-hidden shadow-2xl">
              <Image 
                src="/images/hero_mosque.png" 
                alt="Sanctuary of peace" 
                fill 
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"></div>
           </div>
           
           {/* Floating Wisdom Card */}
           <div className="absolute -bottom-8 -left-8 md:-left-12 bg-surface-container-lowest p-6 rounded-xl shadow-meditative max-w-[280px] glassmorphism ghost-border">
              <h4 className="text-secondary font-serif italic text-sm mb-2 font-bold">Wisdom of the Day</h4>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                "The soul is like a mirror; the more you polish it with prayer, the more it reflects Divine light."
              </p>
           </div>
        </div>
      </section>

      {/* Guidance Section */}
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
            {/* The Ayah Block */}
            <div className="md:col-span-2 lg:col-span-3 bg-surface-container-lowest p-8 md:p-12 rounded-xl relative overflow-hidden group hover:shadow-meditative transition-all duration-500">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
              <div className="absolute top-8 right-8">
                <Quote className="w-12 h-12 text-secondary/10" />
              </div>
              
              <div className="space-y-8">
                <div className="flex items-center gap-4 text-xs font-bold tracking-[0.2em] text-secondary uppercase">
                  <span>Surat Al-Baqarah 2:152</span>
                </div>
                <h3 className="text-3xl md:text-4xl leading-relaxed text-primary font-serif italic font-normal">
                  "So remember Me; I will remember you. And be grateful to Me and do not deny Me."
                </h3>
                <div className="flex items-center gap-6 pt-4">
                  <button className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors">
                    <Bookmark className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>

            {/* Prophet Card */}
            <div className="bg-primary-container text-on-primary p-8 rounded-xl flex flex-col justify-between group overflow-hidden relative">
              <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
              <Heart className="w-8 h-8 text-secondary-container mb-12" />
              <div className="space-y-6">
                <p className="text-xl italic font-serif leading-relaxed">
                  "Purity is half of faith."
                </p>
                <div className="space-y-1">
                  <p className="text-xs font-bold uppercase tracking-widest text-secondary-container">Sahih Muslim</p>
                  <p className="text-[10px] text-on-primary/60">Foundational Hadith on Taharah</p>
                </div>
              </div>
            </div>

            {/* Sidebar Wisdom */}
            <div className="bg-surface-container p-8 rounded-xl space-y-6 ghost-border border-0">
               <div className="flex items-center gap-3 text-[10px] font-bold text-on-surface-variant uppercase tracking-[0.1em]">
                  <Bookmark className="w-3 h-3" />
                  Prophetic Wisdom
               </div>
               <p className="text-on-surface-variant leading-relaxed italic">
                 "The best of people are those that are most useful to people."
               </p>
               <button className="text-primary text-xs font-bold border-b border-primary/20 hover:border-primary transition-all pb-0.5">
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

      {/* CTA Section - The Sanctuary */}
      <section className="py-24 md:py-40 px-6 animate-in fade-in duration-1000">
         <div className="max-w-4xl mx-auto rounded-[3rem] bg-gradient-to-br from-surface-container-lowest via-surface to-surface-container-low p-12 md:p-24 text-center shadow-meditative relative overflow-hidden ghost-border border-opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
            
            <div className="relative space-y-8">
               <h2 className="text-5xl md:text-6xl font-serif text-primary">Cultivate Your Inner Garden</h2>
               <p className="text-lg text-on-surface-variant max-w-[50ch] mx-auto leading-relaxed font-sans">
                  Join our community of seekers. Receive weekly spiritual insights, track your Quran progress, and find solace in the collective pursuit of tranquility.
               </p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                  <button className="bg-secondary-container text-on-secondary-container px-10 py-4 rounded-md font-sans font-bold hover:shadow-lg hover:-translate-y-1 transition-all w-full sm:w-auto">
                    Join the Sanctuary
                  </button>
                  <button className="bg-surface-container text-primary px-10 py-4 rounded-md font-sans font-bold hover:bg-surface-container-highest transition-all w-full sm:w-auto">
                    Donate to Support
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant/10 py-16 px-6 md:px-12 bg-surface">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-12">
          <div className="text-center space-y-4">
            <h3 className="font-serif text-3xl text-primary font-bold">Path to Peace</h3>
            <div className="flex items-center gap-8 justify-center">
              <Link href="/privacy" className="text-sm text-on-surface-variant hover:text-primary transition-all">Privacy Policy</Link>
              <Link href="/terms" className="text-sm text-on-surface-variant hover:text-primary transition-all">Terms of Service</Link>
              <Link href="/spiritual-resources" className="text-sm text-on-surface-variant hover:text-primary transition-all">Spiritual Resources</Link>
            </div>
          </div>
          
          <div className="text-xs text-on-surface-variant/60 text-center font-sans tracking-widest uppercase">
            © 2026 Path to Peace. Seek tranquility through knowledge.
          </div>
          
          <div className="flex items-center gap-6 text-on-surface-variant/40">
             <Heart className="w-5 h-5" />
             <Star className="w-5 h-5 text-secondary/30" />
             <Share2 className="w-5 h-5" />
          </div>
        </div>
      </footer>
    </main>
  );
}
