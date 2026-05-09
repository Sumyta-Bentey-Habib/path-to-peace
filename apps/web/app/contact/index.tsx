"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { styles } from "./style";

export default function ContactUI() {
  return (
    <main className={styles.container}>
      <Navbar />
      <section className={styles.contentSection}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
          If you have questions about our sanctuary, or simply wish to share a reflection, we would be honored to hear from you.
        </p>
        
        <form className={styles.contactForm}>
          <div className={styles.formGrid}>
            <div className={styles.formGroup}>
              <label className={styles.inputLabel}>Full Name</label>
              <Input placeholder="Your Name" className={styles.formInput} />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.inputLabel}>Email Address</label>
              <Input type="email" placeholder="you@example.com" className={styles.formInput} />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label className={styles.inputLabel}>Your Message</label>
            <textarea 
              placeholder="What is on your heart?" 
              className={styles.formTextarea}
            ></textarea>
          </div>
          <Button size="lg" className={styles.submitBtn}>
            Send Message
          </Button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
