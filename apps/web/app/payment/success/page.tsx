"use client";

import { Suspense } from "react";
import Link from "next/link";
import { Check, Sparkles, BookOpen, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePaymentParams } from "@/hooks/use-payment-params";
import { PaymentStatusLayout, PaymentFallback } from "@/components/payment/PaymentStatusLayout";

function PaymentSuccessContent() {
  const { tranId } = usePaymentParams();
  const displayTranId = tranId || "N/A";

  return (
    <PaymentStatusLayout
      status="success"
      titlePrefix="Tranquility"
      titleHighlight="Unlocked"
      description="Your transaction has been verified. Welcome to your path to peace. You now have full lifetime access to this course material."
      badgeIcon={
        <Check
          size={40}
          strokeWidth={3}
          className="animate-in zoom-in duration-700 delay-100"
        />
      }
      tagIcon={<Sparkles size={12} className="animate-spin duration-3000" />}
      tagText="Enrollment Completed"
      actions={
        <>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
              <span>Go to Dashboard</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Button>
          </Link>
          <Link href="/courses" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-outline-variant/50 hover:bg-surface-container-low px-8 py-6 rounded-2xl font-bold text-primary flex items-center justify-center gap-2"
            >
              <BookOpen size={18} />
              <span>Browse More Courses</span>
            </Button>
          </Link>
        </>
      }
    >
      {/* Transaction Card */}
      <div className="bg-white border border-outline-variant/30 rounded-3xl p-6 mb-10 max-w-md mx-auto shadow-sm text-left space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-outline-variant/10">
          <span className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">
            Transaction ID
          </span>
          <span className="text-sm font-mono font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100">
            {displayTranId}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">
            Payment Status
          </span>
          <div className="flex items-center gap-1 text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-100 uppercase tracking-wider">
            <ShieldCheck size={14} />
            <span>Verified</span>
          </div>
        </div>
      </div>
    </PaymentStatusLayout>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <PaymentFallback message="Confirming payment transaction..." />
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}
