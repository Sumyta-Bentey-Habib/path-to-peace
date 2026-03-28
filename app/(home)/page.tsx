"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Guidance } from "@/components/sections/Guidance";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="min-h-screen star-pattern scroll-smooth">
      <Navbar />
      <Hero />
      <Guidance />
      <CTA />
      <Footer />
    </main>
  );
}
