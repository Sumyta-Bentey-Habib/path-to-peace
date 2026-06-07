import React from "react";
import { 
  Wind, 
  Sun, 
  Shield, 
  Heart, 
  BookOpen, 
  Activity 
} from "lucide-react";

export interface PreviewCategory {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface DhikrPhrase {
  arabic: string;
  transliteration: string;
  translation: string;
  virtue: string;
  target: number;
}

export const PREVIEW_CATEGORIES: PreviewCategory[] = [
  {
    title: "Ease in Hardship",
    description: "Find strength, patience, and solace in times of adversity, anxiety, and trial.",
    icon: <Wind className="w-5 h-5" />,
  },
  {
    title: "Morning & Evening",
    description: "Daily authentic remembrances to bring blessings, tranquility, and presence to your day.",
    icon: <Sun className="w-5 h-5" />,
  },
  {
    title: "Protection & Safety",
    description: "Supplications for divine guarding, safety, and refuge from physical and spiritual harms.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    title: "Gratitude",
    description: "Remedial expressions of praise and thanks to celebrate His infinite favors and blessings.",
    icon: <Heart className="w-5 h-5" />,
  },
  {
    title: "Knowledge & Success",
    description: "Spiritual prayers for wisdom, memory, ease in tasks, and guidance in decisions.",
    icon: <BookOpen className="w-5 h-5" />,
  },
  {
    title: "Health & Healing",
    description: "Remedies from the Sunnah for physical restoration, wellness, and peace of mind.",
    icon: <Activity className="w-5 h-5" />,
  }
];

export const DHIKR_PHRASES: DhikrPhrase[] = [
  {
    arabic: "سُبْحَانَ اللَّهِ",
    transliteration: "SubhanAllah",
    translation: "Glory be to Allah",
    virtue: "Fills half the scale of good deeds.",
    target: 33
  },
  {
    arabic: "الْحَمْدُ لِلَّهِ",
    transliteration: "Alhamdulillah",
    translation: "Praise be to Allah",
    virtue: "Fills the scale of good deeds entirely.",
    target: 33
  },
  {
    arabic: "اللَّهُ أَكْبَرُ",
    transliteration: "Allahu Akbar",
    translation: "Allah is the Greatest",
    virtue: "Magnifies His greatness in the heart.",
    target: 34
  },
  {
    arabic: "لَا إِلَٰهَ إِلَّا اللَّهُ",
    transliteration: "La ilaha illallah",
    translation: "There is no deity but Allah",
    virtue: "The highest branch of faith and key to Paradise.",
    target: 100
  },
  {
    arabic: "أَسْتَغْفِرُ اللَّهَ",
    transliteration: "Astaghfirullah",
    translation: "I seek forgiveness from Allah",
    virtue: "Opens doors of sustenance, relief, and mercy.",
    target: 100
  }
];
