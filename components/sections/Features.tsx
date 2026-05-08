"use client";

import Link from "next/link";
import { BookOpen, Heart, Clock, Compass, ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function Features() {
  const tools = [
    {
      title: "The Holy Quran",
      description: "Access clear translations and deep insights into the final revelation.",
      icon: <BookOpen className="w-6 h-6" />,
      href: "/quran",
      color: "bg-emerald-500/10 text-emerald-700",
      delay: "delay-0"
    },
    {
      title: "Daily Duas",
      description: "A collection of supplications for every emotion and circumstance.",
      icon: <Heart className="w-6 h-6" />,
      href: "/duas",
      color: "bg-rose-500/10 text-rose-700",
      delay: "delay-100"
    },
    {
      title: "Prayer Times",
      description: "Stay connected to your daily rhythm with precise prayer schedules.",
      icon: <Clock className="w-6 h-6" />,
      href: "/prayer-times",
      color: "bg-amber-500/10 text-amber-700",
      delay: "delay-200"
    },
    {
      title: "Feeling Tool",
      description: "Find spiritual guidance tailored to your current state of heart.",
      icon: <Compass className="w-6 h-6" />,
      href: "/feeling-tool",
      color: "bg-blue-500/10 text-blue-700",
      delay: "delay-300"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-16 md:mb-24">
          <div className="space-y-6">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-secondary">Your Spiritual Toolkit</h2>
            <p className="text-4xl md:text-5xl font-serif text-primary leading-tight">
              Tools designed for your daily journey.
            </p>
            <p className="text-lg text-on-surface-variant max-w-[45ch]">
              We offer a curated suite of resources to help you maintain consistency and find tranquility in your spiritual practice.
            </p>
          </div>
          <div className="hidden lg:block relative aspect-square max-w-md mx-auto">
             <div className="absolute inset-0 bg-primary/5 rounded-full animate-pulse"></div>
             <div className="absolute inset-8 border border-primary/10 rounded-full animate-spin-slow"></div>
             <div className="absolute inset-16 bg-surface-container shadow-2xl rounded-3xl overflow-hidden">
                <img src="/images/features_bg.png" alt="Guidance" className="w-full h-full object-cover" />
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tools.map((tool, index) => (
            <Link key={index} href={tool.href} className="group h-full">
              <Card className="h-full border-0 bg-surface-container-low hover:bg-surface-container-high transition-all duration-300 shadow-sm hover:shadow-md group-hover:-translate-y-1">
                <CardHeader className="space-y-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center transition-colors", tool.color)}>
                    {tool.icon}
                  </div>
                  <CardTitle className="text-xl font-serif text-primary">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <CardDescription className="text-on-surface-variant text-base leading-relaxed">
                    {tool.description}
                  </CardDescription>
                  <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all">
                    Explore Now
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
