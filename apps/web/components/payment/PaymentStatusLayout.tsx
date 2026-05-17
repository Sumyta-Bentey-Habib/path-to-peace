"use client";

import { ReactNode } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export type PaymentStatus = "success" | "fail" | "cancel";

export interface PaymentStatusLayoutProps {
  status: PaymentStatus;
  titlePrefix: string;
  titleHighlight: string;
  description: ReactNode;
  badgeIcon: ReactNode;
  tagIcon: ReactNode;
  tagText: string;
  children?: ReactNode;
  actions: ReactNode;
}

const THEME_MAP = {
  success: {
    topLeftGradient: "bg-emerald-500/10",
    cardBorderAndShadow:
      "border border-emerald-500/20 shadow-[0_32px_64px_-16px_rgba(16,185,129,0.08)] hover:border-emerald-500/40",
    badgeOuterBg: "bg-emerald-500/10",
    badgeInnerGradient:
      "from-emerald-500 to-emerald-400 shadow-[0_12px_24px_-4px_rgba(16,185,129,0.4)]",
    tagStyles: "bg-emerald-500/10 text-emerald-700",
    highlightStyles: "italic text-emerald-600",
    showPing: true,
  },
  fail: {
    topLeftGradient: "bg-red-500/5",
    cardBorderAndShadow:
      "border border-red-500/10 shadow-[0_32px_64px_-16px_rgba(239,68,68,0.06)] hover:border-red-500/20",
    badgeOuterBg: "bg-red-500/10",
    badgeInnerGradient:
      "from-red-500 to-rose-400 shadow-[0_12px_24px_-4px_rgba(239,68,68,0.3)]",
    tagStyles: "bg-red-500/10 text-red-700",
    highlightStyles: "italic text-red-600",
    showPing: false,
  },
  cancel: {
    topLeftGradient: "bg-amber-500/5",
    cardBorderAndShadow:
      "border border-amber-500/10 shadow-[0_32px_64px_-16px_rgba(245,158,11,0.06)] hover:border-amber-500/20",
    badgeOuterBg: "bg-amber-500/10",
    badgeInnerGradient:
      "from-amber-500 to-yellow-400 shadow-[0_12px_24px_-4px_rgba(245,158,11,0.3)]",
    tagStyles: "bg-amber-500/10 text-amber-700",
    highlightStyles: "italic text-amber-600",
    showPing: false,
  },
};

export function PaymentStatusLayout({
  status,
  titlePrefix,
  titleHighlight,
  description,
  badgeIcon,
  tagIcon,
  tagText,
  children,
  actions,
}: PaymentStatusLayoutProps) {
  const theme = THEME_MAP[status];

  return (
    <div className="min-h-screen bg-[#faf9f6] text-primary flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div
          className={`absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] ${theme.topLeftGradient} rounded-full blur-[120px] pointer-events-none`}
        />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div
          className={`relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl rounded-[3rem] p-10 md:p-14 text-center transition-colors duration-500 ${theme.cardBorderAndShadow}`}
        >
          {/* Animated Status Badge */}
          <div
            className={`mx-auto w-24 h-24 rounded-full flex items-center justify-center mb-8 relative group ${theme.badgeOuterBg}`}
          >
            {theme.showPing && (
              <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-75" />
            )}
            <div
              className={`w-20 h-20 rounded-full bg-gradient-to-tr flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 ${theme.badgeInnerGradient}`}
            >
              {badgeIcon}
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6 ${theme.tagStyles}`}
          >
            {tagIcon}
            <span>{tagText}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
            {titlePrefix}{" "}
            <span className={theme.highlightStyles}>{titleHighlight}</span>
          </h1>

          <p className="text-on-surface-variant text-base font-medium max-w-md mx-auto mb-10 leading-relaxed">
            {description}
          </p>

          {/* Dynamic Content Slot */}
          {children}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {actions}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export interface PaymentFallbackProps {
  message?: string;
}

export function PaymentFallback({
  message = "Loading payment status...",
}: PaymentFallbackProps) {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-primary flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-bold text-on-surface-variant">{message}</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
