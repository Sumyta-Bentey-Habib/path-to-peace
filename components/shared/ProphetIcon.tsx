import React from "react";
import { Search } from "lucide-react";

interface ProphetIconProps {
  type: string;
}

export function ProphetIcon({ type }: ProphetIconProps) {
  switch (type) {
    case "final-messenger":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      );
    case "wind":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
          <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
          <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
        </svg>
      );
    case "camel":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="m21 16-1-3h-2l-1-2h-3l-2 2h-4L6 11V9l-1-1H3l-1 1v2l1 1h1l1 2v4h2v-4h6v4h2v-4h3l1 2h2v-1z" />
        </svg>
      );
    case "city":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M3 21h18" />
          <path d="M3 7v14" />
          <path d="M13 21V9l-1-1-1 1v12" />
          <path d="M21 21V11l-1-1-1 1v10" />
          <path d="M9 21V5l-1-1-1 1v16" />
        </svg>
      );
    case "well":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <rect x="4" y="16" width="16" height="6" rx="1" />
          <path d="M6 16V4h12v12" />
          <path d="M12 4v8" />
          <circle cx="12" cy="14" r="2" />
        </svg>
      );
    case "scale":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="m16 16 3-8 3 8c-.87.67-1.93 1-3 1s-2.13-.33-3-1Z" />
          <path d="m2 16 3-8 3 8c-.87.67-1.93 1-3 1s-2.13-.33-3-1Z" />
          <path d="M7 21h10" />
          <path d="M12 3v18" />
          <path d="M3 7h18" />
        </svg>
      );
    case "crown":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z" />
          <path d="M4 18h16" />
        </svg>
      );
    case "first-caliph":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" />
          <circle cx="12" cy="11" r="3" />
        </svg>
      );
    case "justice":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 3v18" />
          <path d="M5 7h14" />
          <path d="M5 7l2 12h10l2-12" />
        </svg>
      );
    case "generosity":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M12 8v8" />
          <path d="M8 12h8" />
        </svg>
      );
    case "sword":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="m14.5 17.5-2.5 2.5-2.5-2.5" />
          <path d="m12 19V5" />
          <path d="m5 8 7-3 7 3" />
          <path d="m12 5V2" />
        </svg>
      );
    case "family":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "tribe":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          <path d="M12 11l2 2 4-4" />
        </svg>
      );
    case "mic":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
          <line x1="12" y1="19" x2="12" y2="23" />
          <line x1="8" y1="23" x2="16" y2="23" />
        </svg>
      );
    case "shield":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case "music":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M9 18V5l12-2v13" />
          <circle cx="6" cy="18" r="3" />
          <circle cx="18" cy="16" r="3" />
        </svg>
      );
    case "fire":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case "path":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M13 22s-1-7 0-11c.8-3.2 3.3-5.5 6-6" />
          <path d="M15 22s-2-5 0-7" />
          <path d="M11 22s1-10 0-15c-1-5-4-7-8-7" />
        </svg>
      );
    case "temple":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M3 21h18" />
          <path d="M3 7l9-4 9 4v14" />
          <path d="M5 21V10l7-3 7 3v11" />
          <path d="M12 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 1.2 9.2a7 7 0 0 1-9.2 8.8Z" />
          <path d="M11 20v-5.5" />
          <path d="M7 15l4-1.5" />
          <path d="M15 13l-4 1.5" />
        </svg>
      );
    case "mountain":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
      );
    case "ship":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M19.38 20.42a1 1 0 0 0 .62-.92V6h-4v2h-1V6h-1v2h-1V6H3s0 3.64 0 4c0 3 2 4 4 4H19.38" />
        </svg>
      );
    case "kaaba":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <rect x="4" y="8" width="16" height="12" rx="1" />
          <path d="M10 8V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3" />
          <path d="M4 12h16" />
        </svg>
      );
    case "tablets":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <rect x="4" y="4" width="7" height="16" rx="2" />
          <rect x="13" y="4" width="7" height="16" rx="2" />
          <path d="M7 8h1" />
          <path d="M7 12h1" />
          <path d="M7 16h1" />
          <path d="M16 8h1" />
          <path d="M16 12h1" />
          <path d="M16 16h1" />
        </svg>
      );
    case "sparkles":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="m12 3 1.912 5.813a2 2 0 0 0 1.275 1.275L21 12l-5.813 1.912a2 2 0 0 0-1.275 1.275L12 21l-1.912-5.813a2 2 0 0 0-1.275-1.275L3 12l5.813-1.912a2 2 0 0 0 1.275-1.275L12 3Z" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      );
    case "cross":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 2v20M5 12h14" />
        </svg>
      );
    case "droplet":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
        </svg>
      );
    case "book":
      return (
        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-2">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    default:
      return <Search className="w-5 h-5" />;
  }
}
