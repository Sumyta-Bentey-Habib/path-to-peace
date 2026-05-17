"use client";

import Link from "next/link";
import { ArrowLeft, Ban, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PaymentStatusLayout } from "@/components/payment/PaymentStatusLayout";

export default function PaymentCancelPage() {
  return (
    <PaymentStatusLayout
      status="cancel"
      titlePrefix="Checkout"
      titleHighlight="Cancelled"
      description="You have cancelled the SSLCommerz payment request. No funds were charged from your account. You can complete your enrollment at any time."
      badgeIcon={
        <Ban size={40} className="animate-in zoom-in duration-700 delay-100" />
      }
      tagIcon={<Sparkles size={12} />}
      tagText="Transaction Cancelled"
      actions={
        <>
          <Link href="/courses" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-primary text-on-primary hover:bg-primary/90 px-8 py-6 rounded-2xl font-bold flex items-center justify-center gap-2 group shadow-lg shadow-primary/10">
              <ArrowLeft
                size={18}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span>Return to Courses</span>
            </Button>
          </Link>
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button
              variant="outline"
              className="w-full sm:w-auto border-outline-variant/50 hover:bg-surface-container-low px-8 py-6 rounded-2xl font-bold text-primary flex items-center justify-center gap-2"
            >
              <BookOpen size={18} />
              <span>Go to Dashboard</span>
            </Button>
          </Link>
        </>
      }
    />
  );
}
