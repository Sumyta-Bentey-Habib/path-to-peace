"use client";

import React from "react";

export function DuaHeader() {
  return (
    <div className="space-y-12 mb-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-4 max-w-2xl">
          <h1 className="text-5xl md:text-7xl font-serif text-primary tracking-tight">
            Library of Duas
          </h1>
          <p className="text-sm italic text-on-surface-variant/70 font-medium">
            A curated collection of prophetic supplications for every moment of the believer&apos;s journey. Find solace and connection through the words of the Divine.
          </p>
        </div>
      </div>
    </div>
  );
}
