"use client";

import Link from "next/link";
import { Search, Bell, Heart, Star, Share2, Globe, Mail, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-surface-container-low mt-24 py-20 px-8 lg:px-12 border-t border-outline-variant/10 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
        <div className="space-y-8">
          <div className="text-2xl font-serif font-bold text-primary tracking-tight">
            Path to <span className="text-primary/70 italic">Peace</span>
          </div>
          <p className="text-sm text-on-surface-variant/70 leading-relaxed max-w-xs">
            A dedicated digital sanctuary preserving the timeless wisdom of Islamic knowledge for a
            modern generation. Seek, learn, and grow through sacred narratives.
          </p>
          <div className="flex space-x-3">
            {[Globe, Mail, Search].map((Icon, i) => (
              <Button
                key={i}
                variant="outline"
                size="icon"
                className="group rounded-full bg-surface/50 border-outline-variant/20 hover:bg-primary transition-all duration-300"
              >
                <Icon className="w-4 h-4 text-primary group-hover:text-on-primary transition-colors" />
              </Button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-primary/40 mb-8 uppercase">
            Quick Links
          </h4>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm text-on-surface-variant/80 font-medium font-sans">
            <Link href="/prayer-times" className="hover:text-primary transition-colors">
              Prayer Times
            </Link>
            <Link href="/about" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-primary transition-colors">
              Contact
            </Link>
            <Link href="/donate" className="hover:text-primary transition-colors">
              Donate
            </Link>
            <Link href="/quran" className="hover:text-primary transition-colors">
              Quran
            </Link>
            <Link href="/stories" className="hover:text-primary transition-colors">
              Stories
            </Link>
          </div>
        </div>

        <div>
          <h4 className="text-[10px] font-bold tracking-[0.2em] text-primary/40 mb-8 uppercase">
            Knowledge Community
          </h4>
          <p className="text-xs text-on-surface-variant/60 mb-8 leading-relaxed italic">
            &ldquo;The ink of the scholar is more sacred than the blood of the martyr.&rdquo;
          </p>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-surface-container-highest/20"
            >
              <Moon className="w-4 h-4 text-primary" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-surface-container-highest/20"
            >
              <Search className="w-4 h-4 text-primary" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-surface-container-highest/20"
            >
              <Bell className="w-4 h-4 text-primary" />
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-between items-start md:items-end">
          <div className="md:text-right">
            <div className="text-xs text-on-surface-variant/50 flex flex-col gap-2">
              <span>© 2026 Path to Peace.</span>
              <span>A Digital Sanctuary for knowledge.</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-12 md:mt-0 text-on-surface-variant/20">
            <Heart className="w-4 h-4 fill-current" />
            <Star className="w-4 h-4 fill-current" />
            <Share2 className="w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
