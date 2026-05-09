"use client";

import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useBlog } from "@/hooks/use-blog";
import { BlogHero } from "@/components/blog/BlogHero";
import { BlogCategories } from "@/components/blog/BlogCategories";
import { BlogCard } from "@/components/blog/BlogCard";
import { Search, MapPinSearch } from "lucide-react";
import { styles } from "./style";

export default function BlogUI() {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    filteredPosts,
  } = useBlog();

  return (
    <div className={styles.container}>
      <Navbar />

      <main className={styles.main}>
        <section className={styles.animatedSection}>
          <BlogHero />
        </section>

        <div className={styles.filterBar}>
          <div className={styles.searchWrapper}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search reflections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>

          <BlogCategories
            categories={categories}
            selectedCategory={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className={styles.blogGrid}>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIconBox}>
                <MapPinSearch className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-serif text-foreground mb-2">No reflections found</h3>
              <p className="text-muted-foreground">Try adjusting your search or category filters.</p>
            </div>
          )}
        </div>
        
        <section className={styles.newsletterSection}>
          <div className={styles.newsletterBgOrnament} />
          <div className={styles.newsletterContent}>
            <h2 className={styles.newsletterTitle}>Subscribe to Our Newsletter</h2>
            <p className={styles.newsletterDesc}>
              Stay connected with our latest reflections, tools, and spiritual resources directly in your inbox.
            </p>
            <div className={styles.formWrapper}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className={styles.newsletterInput}
              />
              <button className={styles.newsletterBtn}>
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
