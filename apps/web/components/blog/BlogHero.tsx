import React from "react";

export function BlogHero() {
  return (
    <div className="relative py-20 px-6 sm:py-24 lg:px-8 bg-surface rounded-3xl mb-16 overflow-hidden border border-border/50">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-emerald-200/20 rounded-full blur-3xl" />
      
      <div className="relative mx-auto max-w-2xl text-center">
        <span className="text-emerald-600 font-medium tracking-wider uppercase text-sm mb-4 block">Our Journal</span>
        <h1 className="text-4xl font-serif tracking-tight text-foreground sm:text-6xl mb-6">
          Path to Peace <br/><span className="italic text-emerald-800">Reflections</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-xl mx-auto">
          Explore articles on spirituality, mindfulness, and practical wisdom to help you cultivate tranquility in your daily life.
        </p>
      </div>
    </div>
  );
}
