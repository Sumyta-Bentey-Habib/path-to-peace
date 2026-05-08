"use client";

import Image from "next/image";
import { Sparkles, Sun, Heart } from "lucide-react";

export function Mission() {
  const values = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Self-Discovery",
      description: "Uncover the depths of your inner self through reflection and timeless wisdom."
    },
    {
      icon: <Sun className="w-6 h-6" />,
      title: "Inner Peace",
      description: "Find tranquility in a fast-paced world with tools designed for spiritual calmness."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Timeless Wisdom",
      description: "Connect with the eternal truths that have guided seekers for generations."
    }
  ];

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src="/images/mission_bg.png" 
          alt="Abstract serenity" 
          fill 
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-linear-to-b from-surface via-transparent to-surface"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-4 mb-16 md:mb-24">
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-secondary">Our Philosophy</h2>
          <p className="text-4xl md:text-6xl font-serif text-primary max-w-[20ch] mx-auto leading-tight">
            The path to peace is a journey within.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {values.map((value, index) => (
            <div key={index} className="space-y-6 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary-container/30 flex items-center justify-center text-on-secondary-container group-hover:scale-110 transition-transform duration-500">
                {value.icon}
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-serif text-primary">{value.title}</h3>
                <p className="text-on-surface-variant leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
