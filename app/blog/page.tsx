"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useBlog } from "@/hooks/use-blog";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCategories } from "@/components/blog/BlogCategories";
import { BlogCard } from "@/components/blog/BlogCard";
import { Search, MapPinSearch } from "lucide-react";

export default function BlogPage() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredPosts,
  } = useBlog();

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        
        {/* Hero Section */}
        <section className="animate-in fade-in slide-in-from-bottom duration-1000">
          <BlogHero />
        </section>

        {/* Search & Categories */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          <div className="flex-1 max-w-md relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-emerald-700 transition-colors" />
            <input
              type="text"
              placeholder="Search reflections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-border/50 rounded-2xl py-3.5 pl-12 pr-6 outline-none focus:ring-2 focus:ring-emerald-500/10 focus:border-emerald-500/30 transition-all text-sm shadow-sm"
            />
          </div>

          <BlogCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-surface-container rounded-3xl flex items-center justify-center mb-6 border border-border/50">
                <MapPinSearch className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-2">No reflections found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
        
        {/* Newsletter / CTA Section (Common for Blogs) */}
        <section className="mt-32 p-12 lg:p-20 bg-emerald-950 rounded-3xl text-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-800/20 rounded-full blur-[100px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-serif text-emerald-50 mb-6 sm:text-4xl italic">Subscribe to Our Newsletter</h2>
            <p className="text-emerald-200/70 mb-10 text-lg leading-relaxed">
              Stay connected with our latest reflections, tools, and spiritual resources directly in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-emerald-100/30 outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
              <button className="px-8 py-4 bg-emerald-100 text-emerald-950 font-bold rounded-xl hover:bg-white transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
