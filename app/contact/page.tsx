"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ContactPage() {
  return (
    <main className="min-h-screen star-pattern scroll-smooth">
      <Navbar />
      <section className="px-6 md:px-12 py-20 md:py-32 max-w-4xl mx-auto space-y-12">
        <h1 className="text-5xl md:text-7xl font-serif text-primary">Get in Touch</h1>
        <p className="text-lg text-on-surface-variant max-w-[50ch] leading-relaxed">
          If you have questions about our sanctuary, or simply wish to share a reflection, we would be honored to hear from you.
        </p>
        
        <form className="space-y-8 bg-surface-container-low p-8 md:p-12 rounded-3xl ghost-border border-0">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Full Name</label>
              <Input placeholder="Your Name" className="bg-surface-container-lowest border-0 py-6" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Email Address</label>
              <Input type="email" placeholder="you@example.com" className="bg-surface-container-lowest border-0 py-6" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-primary/60">Your Message</label>
            <textarea 
              placeholder="What is on your heart?" 
              className="w-full bg-surface-container-lowest rounded-md p-4 min-h-[200px] outline-none border-0 focus:ring-1 focus:ring-surface-tint transition-all"
            ></textarea>
          </div>
          <Button size="lg" className="bg-primary text-on-primary px-12 py-7 h-auto rounded-md font-sans font-bold hover:bg-primary-container transition-all shadow-meditative border-0 w-full md:w-auto">
            Send Message
          </Button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
