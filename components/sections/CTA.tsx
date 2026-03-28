"use client";

import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 md:py-40 px-6 animate-in fade-in duration-1000">
       <div className="max-w-4xl mx-auto rounded-[3rem] bg-linear-to-br from-surface-container-lowest via-surface to-surface-container-low p-12 md:p-24 text-center shadow-meditative relative overflow-hidden ghost-border border-opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
          
          <div className="relative space-y-8">
             <h2 className="text-5xl md:text-6xl font-serif text-primary">Cultivate Your Inner Garden</h2>
             <p className="text-lg text-on-surface-variant max-w-[50ch] mx-auto leading-relaxed font-sans">
                Join our community of seekers. Receive weekly spiritual insights, track your Quran progress, and find solace in the collective pursuit of tranquility.
             </p>
             <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Button className="bg-secondary-container text-on-secondary-container px-10 py-7 h-auto rounded-md font-sans font-bold hover:shadow-lg hover:-translate-y-1 transition-all w-full sm:w-auto border-0">
                  Join the Sanctuary
                </Button>
                <Button className="bg-surface-container text-primary px-10 py-7 h-auto rounded-md font-sans font-bold hover:bg-surface-container-highest transition-all w-full sm:w-auto border-0">
                  Donate to Support
                </Button>
             </div>
          </div>
       </div>
    </section>
  );
}
