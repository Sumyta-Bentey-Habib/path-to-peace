"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { X, AlertCircle, RefreshCw, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

function PaymentFailContent() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id") || "";
  const reason = searchParams.get("reason") || "";

  let displayReason = "We were unable to process your payment transaction.";
  if (reason === "validation_failed") {
    displayReason = "Payment verification failed with SSLCommerz servers.";
  } else if (reason === "missing_val_id") {
    displayReason = "The transaction validation reference was missing.";
  }

  return (
    <div className="min-h-screen bg-[#faf9f6] text-primary flex flex-col justify-between">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20 px-4 relative overflow-hidden">
        {/* Decorative Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-2xl bg-white/70 backdrop-blur-xl border border-red-500/10 shadow-[0_32px_64px_-16px_rgba(239,68,68,0.06)] rounded-[3rem] p-10 md:p-14 text-center hover:border-red-500/20 transition-colors duration-500">
          
          {/* Animated Error Badge */}
          <div className="mx-auto w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center mb-8 relative group">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-red-500 to-rose-400 flex items-center justify-center text-white shadow-[0_12px_24px_-4px_rgba(239,68,68,0.3)] group-hover:scale-110 transition-transform duration-500">
              <X size={40} strokeWidth={3} className="animate-in zoom-in duration-700 delay-100" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-red-500/10 text-red-700 rounded-full text-xs font-extrabold uppercase tracking-wider mb-6">
            <AlertCircle size={12} />
            <span>Transaction Unsuccessful</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
            Payment <span className="italic text-red-600">Failed</span>
          </h1>
          
          <p className="text-on-surface-variant text-base font-medium max-w-md mx-auto mb-10 leading-relaxed">
            {displayReason} No funds were charged or, if deducted, will be automatically refunded by your card issuer/bKash within 3-5 working days.
          </p>

          {/* Details Card */}
          {tranId && (
            <div className="bg-white border border-outline-variant/30 rounded-3xl p-6 mb-10 max-w-md mx-auto shadow-sm text-left">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">Attempted Reference</span>
                <span className="text-sm font-mono font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg border border-red-100">{tranId}</span>
              </div>
            </div>
          )}

          {/* Troubleshooting tips */}
          <div className="max-w-md mx-auto bg-surface-container-low/50 rounded-2xl p-6 mb-10 text-left space-y-3 border border-outline-variant/20">
            <h4 className="text-sm font-bold text-primary flex items-center gap-2">
              <HelpCircle size={16} className="text-secondary" />
              Suggested Solutions:
            </h4>
            <ul className="text-xs text-on-surface-variant space-y-2 list-disc list-inside font-medium leading-relaxed">
              <li>Ensure your bKash wallet or bank card has sufficient balance.</li>
              <li>Verify that your internet connection is stable.</li>
              <li>Make sure online transaction permissions are enabled for your card.</li>
              <li>Try again using a different payment card or mobile wallet interface.</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/courses" className="w-full sm:w-auto">
              <Button className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
                <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
                <span>Try Purchase Again</span>
              </Button>
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto border-outline-variant/50 hover:bg-surface-container-low px-8 py-6 rounded-2xl font-bold text-primary flex items-center justify-center gap-2">
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

export default function PaymentFailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#faf9f6] text-primary flex flex-col justify-between">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-bold text-on-surface-variant">Loading payment status...</p>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <PaymentFailContent />
    </Suspense>
  );
}
