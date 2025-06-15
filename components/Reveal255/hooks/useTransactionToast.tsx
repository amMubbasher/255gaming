// frontend/components/counter/hooks/useTransactionToast.tsx
"use client";

import { useEffect } from "react";
import { maybeShowTxToast } from "@/components/toast/maybeShowTxToast";

interface UseTransactionToastProps {
  transactionSignature: string | null;
}

/**
 * A hook that displays a transaction toast if user settings allow it.
 */
export function useTransactionToast({
  transactionSignature,
}: UseTransactionToastProps) {
  useEffect(() => {
  if (transactionSignature) {
    maybeShowTxToast(transactionSignature); // ✅ CORRECT
  }
}, [transactionSignature]);

}
