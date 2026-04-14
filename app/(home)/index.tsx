"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Guidance } from "@/components/sections/Guidance";
import { CTA } from "@/components/sections/CTA";
import { styles } from "./style";

export default function HomeUI() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Guidance />
      <CTA />
      <Footer />
    </main>
  );
}
