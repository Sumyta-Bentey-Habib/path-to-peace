"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Mission } from "@/components/sections/Mission";
import { Features } from "@/components/sections/Features";
import { Guidance } from "@/components/sections/Guidance";
import { Stories } from "@/components/sections/Stories";
import { CTA } from "@/components/sections/CTA";
import { styles } from "./style";

export default function HomeUI() {
  return (
    <main className={styles.main}>
      <Navbar />
      <Hero />
      <Mission />
      <Features />
      <Guidance />
      <Stories />
      <CTA />
      <Footer />
    </main>
  );
}
