"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function Stories() {
  const featuredStories = [
    {
      title: "Finding Stillness in the City",
      excerpt: "How a high-stress career led me to discover the profound power of Fajr reflection.",
      author: "Sarah J.",
      category: "Personal Journey",
      image: "/images/story_reflection.png"
    },
    {
      title: "The Art of Gratitude",
      excerpt: "Transforming my daily outlook through the practice of morning Adhkar.",
      author: "Omar K.",
      category: "Growth",
      image: "/images/forest-meditative.png"
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-secondary">Community Narratives</h2>
            <p className="text-4xl md:text-5xl font-serif text-primary">Stories of Transformation</p>
          </div>
          <Link href="/stories" className="group flex items-center gap-3 text-primary font-bold border-b-2 border-primary/10 hover:border-primary transition-all pb-1">
            Browse All Stories
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {featuredStories.map((story, index) => (
            <div key={index} className="group cursor-pointer">
              <div className="relative aspect-video rounded-3xl overflow-hidden mb-8 shadow-lg">
                <Image 
                  src={story.image} 
                  alt={story.title} 
                  fill 
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <Badge className="bg-white/90 text-primary hover:bg-white border-0 font-bold uppercase tracking-wider text-[10px]">
                    {story.category}
                  </Badge>
                </div>
              </div>
              <div className="space-y-4 max-w-[90%]">
                <h3 className="text-2xl md:text-3xl font-serif text-primary group-hover:text-secondary transition-colors">
                  {story.title}
                </h3>
                <p className="text-on-surface-variant leading-relaxed line-clamp-2">
                  {story.excerpt}
                </p>
                <div className="flex items-center gap-3 text-sm text-on-surface-variant/70 font-medium">
                  <span className="w-8 h-[1px] bg-primary/20"></span>
                  {story.author}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
