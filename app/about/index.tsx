"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { styles } from "./style";

export default function AboutUI() {
  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.contentSection}>
        <h1 className={styles.title}>About Path to Peace</h1>
        <div className={styles.textContainer}>
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
