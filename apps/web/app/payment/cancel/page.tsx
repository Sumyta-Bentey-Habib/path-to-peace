"use client";

import Link from "next/link";
import { ArrowLeft, Ban, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] text-primary flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-amber-500/10 shadow-[0_32px_64px_-16px_rgba(245,158,11,0.06)] rounded-[3rem] p-10 md:p-14 text-center hover:border-amber-500/20 transition-colors duration-500">
          
          {/* Cancel Badge */}
          <div className="mx-auto w-24 h-24 rounded-full bg-amber-500/10 flex items-center justify-center mb-8 relative group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-[0_12px_24px_-4px_rgba(245,158,11,0.3)] group-hover:scale-110 transition-transform duration-500">
              <Ban size={40} className="animate-in zoom-in duration-700 delay-100" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-500/10 text-amber-700 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6">
            <Sparkles size={12} />
            <span>Transaction Cancelled</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
            Checkout <span className="italic text-amber-600">Cancelled</span>
          </h1>
          
          <p className="text-on-surface-variant text-base font-medium max-w-md mx-auto mb-10 leading-relaxed">
            You have cancelled the SSLCommerz payment request. No funds were charged from your account. You can complete your enrollment at any time.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/courses" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Return to Courses</span>
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-outline-variant/50 hover:bg-surface-container-low px-8 py-6 rounded-2xl font-bold text-primary flex items-center justify-center gap-2">
                <BookOpen size={18} />
                <span>Go to Dashboard</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
