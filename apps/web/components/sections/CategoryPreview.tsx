import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PREVIEW_CATEGORIES } from "./cta-constants";

export function CategoryPreview() {
  return (
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-tight">
          Find Solace in Supplication
        </h2>
        <p className="text-sm md:text-base text-on-surface-variant/80 font-medium leading-relaxed">
          Explore curated spiritual remedies and prayers from the Quran and Sunnah to bring peace and tranquility to your daily life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PREVIEW_CATEGORIES.map((category) => (
          <Link 
            key={category.title}
            href="/feeling-tool"
            className="p-8 bg-surface-container-low/60 hover:bg-primary/5 border border-outline-variant/20 rounded-[2.5rem] flex flex-col justify-between cursor-pointer group shadow-sm hover:shadow-md transition-all hover:scale-[1.02] duration-300"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h4 className="text-xl font-serif font-bold text-primary mb-3">
                {category.title}
              </h4>
              <p className="text-xs md:text-sm text-on-surface-variant/75 font-sans leading-relaxed mb-8">
                {category.description}
              </p>
            </div>
            <span className="text-xs font-bold text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
              Explore Supplications <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Link 
          href="/feeling-tool"
          className="flex items-center gap-2 px-10 py-4.5 bg-primary text-on-primary rounded-2xl text-sm font-bold hover:brightness-110 shadow-lg shadow-primary/10 transition-all active:scale-95 group"
        >
          Enter Supplication Sanctuary 
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
