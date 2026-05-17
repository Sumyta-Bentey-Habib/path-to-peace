"use client";

import { Suspense } from "react";
import Link from "next/link";
import { X, AlertCircle, RefreshCw, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePaymentParams } from "@/hooks/use-payment-params";
import { PaymentStatusLayout, PaymentFallback } from "@/components/payment/PaymentStatusLayout";

function PaymentFailContent() {
  const { tranId, displayReason } = usePaymentParams();

  return (
    <PaymentStatusLayout
      status="fail"
      titlePrefix="Payment"
      titleHighlight="Failed"
      description={
        <>
          {displayReason} No funds were charged or, if deducted, will be automatically refunded by your card issuer/bKash within 3-5 working days.
        </>
      }
      badgeIcon={
        <X
          size={40}
          strokeWidth={3}
          className="animate-in zoom-in duration-700 delay-100"
        />
      }
      tagIcon={<AlertCircle size={12} />}
      tagText="Transaction Unsuccessful"
      actions={
        <>
          <Link href="/courses" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
              <RefreshCw
                size={18}
                className="group-hover:rotate-180 transition-transform duration-700"
              />
              <span>Try Purchase Again</span>
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-outline-variant/50 hover:bg-surface-container-low px-8 py-6 rounded-2xl font-bold text-primary flex items-center justify-center gap-2"
            >
              <span>Go to Dashboard</span>
            </Button>
          </Link>
        </>
      }
    >
      {/* Details Card */}
      {tranId && (
        <div className="bg-white border border-outline-variant/30 rounded-3xl p-6 mb-10 max-w-md mx-auto shadow-sm text-left">
          <div className="flex justify-between items-center">
            <span className="text-xs font-bold text-on-surface-variant/70 uppercase tracking-wider">
              Attempted Reference
            </span>
            <span className="text-sm font-mono font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg border border-red-100">
              {tranId}
            </span>
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
          <li>
            Make sure online transaction permissions are enabled for your card.
          </li>
          <li>
            Try again using a different payment card or mobile wallet interface.
          </li>
        </ul>
      </div>
    </PaymentStatusLayout>
  );
}

export default function PaymentFailPage() {
  return (
    <Suspense fallback={<PaymentFallback message="Loading payment status..." />}>
      <PaymentFailContent />
    </Suspense>
  );
}
