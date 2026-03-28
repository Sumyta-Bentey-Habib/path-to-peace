"use client";

import Link from "next/link";
import { Share2, Heart, Star } from "lucide-react";

export function Footer() {
  return (
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
  );
}
