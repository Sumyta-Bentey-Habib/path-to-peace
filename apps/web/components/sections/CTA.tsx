"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Wind, 
  Sun, 
  Shield, 
  Heart, 
  BookOpen, 
  Activity, 
  ArrowRight,
  RotateCcw,
  Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const PREVIEW_CATEGORIES = [
  {
    title: "Ease in Hardship",
    description: "Find strength, patience, and solace in times of adversity, anxiety, and trial.",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    title: "Morning & Evening",
    description: "Daily authentic remembrances to bring blessings, tranquility, and presence to your day.",
    icon: <Sun className="w-5 h-5" />,
  },
  {
    title: "Protection & Safety",
    description: "Supplications for divine guarding, safety, and refuge from physical and spiritual harms.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Gratitude",
    description: "Remedial expressions of praise and thanks to celebrate His infinite favors and blessings.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    title: "Knowledge & Success",
    description: "Spiritual prayers for wisdom, memory, ease in tasks, and guidance in decisions.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Health & Healing",
    description: "Remedies from the Sunnah for physical restoration, wellness, and peace of mind.",
    icon: <Activity className="w-5 h-5" />,
  }
];

const DHIKR_PHRASES = [
  {
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubhanAllah",
    translation: "Glory be to Allah",
    virtue: "Fills half the scale of good deeds.",
    target: 33
  },
  {
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: "Praise be to Allah",
    virtue: "Fills the scale of good deeds entirely.",
    target: 33
  },
  {
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest",
    virtue: "Magnifies His greatness in the heart.",
    target: 34
  },
  {
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illallah",
    translation: "There is no deity but Allah",
    virtue: "The highest branch of faith and key to Paradise.",
    target: 100
  },
  {
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: "I seek forgiveness from Allah",
    virtue: "Opens doors of sustenance, relief, and mercy.",
    target: 100
  }
];

export function CTA() {
  // Dhikr Counter State
  const [activeDhikrIdx, setActiveDhikrIdx] = useState(0);
  const [count, setCount] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [isTapping, setIsTapping] = useState(false);

  const activeDhikr = DHIKR_PHRASES[activeDhikrIdx];

  // Self-contained Web Audio click synthesizer
  const playClickSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.06);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    } catch (e) {
      console.warn("Audio Context failure:", e);
    }
  };

  const handleTap = () => {
    playClickSound();
    setIsTapping(true);
    setTimeout(() => setIsTapping(false), 100);

    // Haptic vibration feedback for supported mobile devices
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      navigator.vibrate(12);
    }

    setCount((prev) => {
      const next = prev + 1;
      if (next >= activeDhikr.target) {
        setCompletedCycles((c) => c + 1);
        return 0; // Reset count upon reaching target
      }
      return next;
    });
  };

  const handleReset = () => {
    setCount(0);
    setCompletedCycles(0);
  };

  const handleDhikrChange = (idx: number) => {
    setActiveDhikrIdx(idx);
    setCount(0);
  };

  // Progress percentage
  const progressPercent = (count / activeDhikr.target) * 100;

  return (
    <section className="py-24 md:py-32 bg-surface-container-lowest/50 border-t border-t-outline-variant/10 px-6 space-y-32">
      
      {/* ================= SECTION 1: SUPPLICATION CATEGORIES ================= */}
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

      {/* ================= SECTION 2: INTERACTIVE TASBIH SANCTUARY ================= */}
      <div className="max-w-4xl mx-auto space-y-12 border-t border-t-outline-variant/10 pt-24">
        <div className="text-center space-y-4 max-w-xl mx-auto">
          <span className="px-3 py-1 bg-secondary-container/10 text-secondary border border-secondary/15 rounded-full text-[10px] font-black tracking-widest uppercase inline-block">Unique Interactive Feature</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary tracking-tight">
            Daily Dhikr Sanctuary
          </h2>
          <p className="text-sm text-on-surface-variant/80 font-medium">
            Establish a moment of spiritual presence. Select a phrase of remembrance below and tap the counter to begin your Tasbih.
          </p>
        </div>

        <div className="bg-surface-container-low/60 border border-outline-variant/20 rounded-[3rem] p-8 md:p-12 shadow-sm relative overflow-hidden">
          {/* Subtle background blurs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

          <div className="relative space-y-10">
            {/* Phrase Tab Switcher */}
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 bg-white/40 backdrop-blur-sm border border-outline-variant/10 rounded-2xl">
              {DHIKR_PHRASES.map((dhikr, idx) => (
                <button
                  key={dhikr.transliteration}
                  onClick={() => handleDhikrChange(idx)}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 cursor-pointer",
                    activeDhikrIdx === idx
                      ? "bg-primary text-white shadow-md shadow-primary/10 scale-102"
                      : "text-on-surface-variant/70 hover:bg-surface-container-high hover:text-primary"
                  )}
                >
                  {dhikr.transliteration}
                </button>
              ))}
            </div>

            {/* Dhikr Details */}
            <div className="text-center space-y-3 min-h-[100px] flex flex-col justify-center items-center">
              <h3 className="text-4xl font-serif font-bold text-primary leading-normal" dir="rtl">
                {activeDhikr.arabic}
              </h3>
              <p className="text-sm font-sans italic text-secondary font-medium">&ldquo;{activeDhikr.translation}&rdquo;</p>
              <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/50 max-w-md">
                Virtue: {activeDhikr.virtue}
              </p>
            </div>

            {/* Tap Circular Button Counter */}
            <div className="flex flex-col items-center justify-center space-y-6">
              <div className="relative flex items-center justify-center">
                {/* SVG Progress Circle Ring */}
                <svg className="w-52 h-52 transform -rotate-90">
                  <circle
                    cx="104"
                    cy="104"
                    r="92"
                    className="stroke-surface-container-high fill-transparent"
                    strokeWidth="8"
                  />
                  <circle
                    cx="104"
                    cy="104"
                    r="92"
                    className="stroke-primary fill-transparent transition-all duration-300 ease-out"
                    strokeWidth="8"
                    strokeDasharray={2 * Math.PI * 92}
                    strokeDashoffset={2 * Math.PI * 92 * (1 - progressPercent / 100)}
                    strokeLinecap="round"
                  />
                </svg>

                {/* Interactive Tapper Button */}
                <button
                  onClick={handleTap}
                  className={cn(
                    "absolute w-44 h-44 rounded-full bg-white border border-outline-variant/20 shadow-md flex flex-col items-center justify-center cursor-pointer transition-all duration-150 select-none outline-none active:shadow-sm",
                    isTapping ? "scale-95 bg-primary/5 shadow-inner" : "hover:scale-102 hover:shadow-lg"
                  )}
                >
                  <span className="text-[10px] font-bold tracking-widest text-on-surface-variant/50 uppercase mb-1">Recite</span>
                  <span className="text-5xl font-serif font-bold text-primary tracking-tight">
                    {count}
                  </span>
                  <span className="text-[9px] font-bold text-primary/60 tracking-wider mt-1">
                    Goal: {activeDhikr.target}
                  </span>
                </button>
              </div>

              {/* Stats & Actions */}
              <div className="flex items-center gap-12 text-xs">
                <div className="text-center">
                  <span className="text-[10px] font-bold text-on-surface-variant/50 block uppercase tracking-widest">Completed</span>
                  <span className="text-base font-bold text-primary flex items-center gap-1 justify-center mt-1">
                    <Sparkles size={14} className="text-secondary" /> {completedCycles}
                  </span>
                </div>
                
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-4.5 py-2.5 bg-surface-container border border-outline-variant/25 hover:bg-surface-container-high text-on-surface-variant rounded-xl font-bold cursor-pointer transition-all"
                  title="Reset counter"
                >
                  <RotateCcw size={13} /> Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
