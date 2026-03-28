"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen star-pattern scroll-smooth">
      <Navbar />
      <section className="px-6 md:px-12 py-20 md:py-32 max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-7xl font-serif text-primary">About Path to Peace</h1>
        <div className="space-y-6 text-lg text-on-surface-variant leading-relaxed">
          <p>
            Path to Peace is more than a digital platform; it is a sanctuary designed for the modern seeker. 
            In an age of constant noise and increasing complexity, we believe in the power of spiritual tranquility 
            and the timeless wisdom of the heart.
          </p>
          <p>
            Our mission is to provide a meditative space where seekers can reconnect with the Divine Source, 
            explore the depths of their own souls, and find companionship in a community dedicated to 
            knowledge and peace.
          </p>
          <p>
            Inspired by the classical Islamic tradition and presented through a modern editorial lens, 
            every word and image on this platform is curated to inspire reflection and growth.
          </p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
