"use client";

import Link from "next/link";
import { Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glassmorphism ghost-border border-x-0 border-t-0 py-4 px-6 md:px-12 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link href="/" className="font-serif text-2xl font-bold text-primary">
          Path to Peace
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-primary border-b-2 border-secondary pb-0.5">Home</Link>
          <Link href="/about" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium text-on-surface-variant hover:text-primary transition-colors">Contact</Link>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <Input 
            placeholder="Search wisdom..." 
            className="bg-surface-container-highest/50 focus:bg-surface-container-lowest focus:ring-1 focus:ring-surface-tint pl-10 pr-4 py-2 rounded-full text-sm outline-none transition-all w-48 md:w-64 border-0"
          />
        </div>
        <Button variant="ghost" size="icon" className="text-primary hover:bg-surface-container-low rounded-full transition-all">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
}
