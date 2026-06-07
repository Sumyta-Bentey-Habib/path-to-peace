"use client";

import React from "react";
import { CategoryPreview } from "./CategoryPreview";
import { DhikrCounter } from "./DhikrCounter";

export function CTA() {
  return (
    <section className="py-24 md:py-32 bg-surface-container-lowest/50 border-t border-t-outline-variant/10 px-6 space-y-32">
      {/* Supplication Categories Section */}
      <CategoryPreview />

      {/* Interactive Daily Dhikr Counter Section */}
      <DhikrCounter />
    </section>
  );
}
