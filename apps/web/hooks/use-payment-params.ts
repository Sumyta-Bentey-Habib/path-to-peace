"use client";

import { useSearchParams } from "next/navigation";

export function usePaymentParams() {
  const searchParams = useSearchParams();
  const tranId = searchParams.get("tran_id") || "";
  const reason = searchParams.get("reason") || "";
  const courseId = searchParams.get("course_id") || "";

  let displayReason = "We were unable to process your payment transaction.";
  if (reason === "validation_failed") {
    displayReason = "Payment verification failed with SSLCommerz servers.";
  } else if (reason === "missing_val_id") {
    displayReason = "The transaction validation reference was missing.";
  }

  return {
    tranId,
    reason,
    courseId,
    displayReason,
  };
}
