"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative px-6 md:px-12 py-16 md:py-24 grid md:grid-cols-2 gap-16 items-center max-w-7xl mx-auto overflow-hidden">
      <div className="space-y-8 animate-in fade-in slide-in-from-left duration-1000">
        <Badge variant="secondary" className="px-3 py-1 rounded-full bg-secondary-container/30 text-[10px] font-bold tracking-widest text-on-secondary-container uppercase border-0">
          <Star className="w-3 h-3 mr-2 fill-secondary" />
          Daily Reflection
        </Badge>
        <h1 className="text-5xl md:text-7xl font-serif text-primary leading-[1.1] max-w-[12ch]">
          &quot;He who knows himself, knows his Lord.&quot;
        </h1>
        <p className="text-lg md:text-xl text-on-surface-variant font-sans max-w-[45ch] leading-relaxed italic">
          A timeless reminder attributed to the sages, inviting us to the inward journey of peace and discovery.
        </p>
        <div className="flex flex-wrap items-center gap-8">
          <Link 
            href="/stories" 
            className={cn(
              buttonVariants({ variant: "default" }),
              "bg-primary text-on-primary px-8 py-7 h-auto rounded-md font-sans font-semibold flex items-center gap-3 hover:bg-primary-container transition-all shadow-meditative group border-0 text-base"
            )}
          >
            Begin Your Journey
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/resources" className="text-primary font-sans font-semibold border-b-2 border-secondary/30 hover:border-secondary transition-all pb-1 leading-none">
            Explore Resources
          </Link>
        </div>
      </div>

      <div className="relative aspect-4/5 md:aspect-auto md:h-[600px] w-full animate-in fade-in slide-in-from-right duration-1000">
         <div className="absolute -inset-4 bg-primary/5 rounded-4xl -rotate-2"></div>
         <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image 
              src="/images/hero_mosque.png" 
              alt="Sanctuary of peace" 
              fill 
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/40 to-transparent"></div>
         </div>
         
         {/* Floating Wisdom Card */}
         <div className="absolute -bottom-8 -left-8 md:-left-12 bg-surface-container-lowest p-6 rounded-xl shadow-meditative max-w-[280px] glassmorphism ghost-border">
            <h4 className="text-secondary font-serif italic text-sm mb-2 font-bold">Wisdom of the Day</h4>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              &quot;The soul is like a mirror; the more you polish it with prayer, the more it reflects Divine light.&quot;
            </p>
         </div>
      </div>
    </section>
  );
}
