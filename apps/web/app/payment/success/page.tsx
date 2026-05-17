"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Check, Sparkles, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id") || "N/A";
  const courseId = searchParams.get("course_id") || "";

  return (
    <div className="min-h-screen bg-[#faf9f6] text-primary flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-emerald-500/20 shadow-[0_32px_64px_-16px_rgba(16,185,129,0.08)] rounded-[3rem] p-10 md:p-14 text-center hover:border-emerald-500/40 transition-colors duration-500">
          
          {/* Animated Success Badge */}
          <div className="mx-auto w-24 h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mb-8 relative group">
            <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping opacity-75" />
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-white shadow-[0_12px_24px_-4px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform duration-500">
              <Check size={40} strokeWidth={3} className="animate-in zoom-in duration-700 delay-100" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-emerald-500/10 text-emerald-700 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6">
            <Sparkles size={12} className="animate-spin duration-3000" />
            <span>Enrollment Completed</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
            Tranquility <span className="italic text-emerald-600">Unlocked</span>
          </h1>
          
          <p className="text-on-surface-variant text-base font-medium max-w-md mx-auto mb-10 leading-relaxed">
            Your transaction has been verified. Welcome to your path to peace. You now have full lifetime access to this course material.
          </p>

          {/* Transaction Card */}
          <div className="bg-white border border-outline-variant/30 rounded-3xl p-6 mb-10 max-w-md mx-auto shadow-sm text-left space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-outline-variant/10">
              <span className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">Transaction ID</span>
              <span className="text-sm font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">{tranId}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">Payment Status</span>
              <div className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>Verified</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
                <span>Go to Dashboard</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/courses" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-outline-variant/50 hover:bg-surface-container-low px-8 py-6 rounded-2xl font-bold text-primary flex items-center justify-center gap-2">
                <BookOpen size={18} />
                <span>Browse More Courses</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf9f6] text-primary flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-on-surface-variant">Confirming payment transaction...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
