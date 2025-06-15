// frontend/components/toast/maybeShowTxToast.tsx
"use client";

import { toast } from "sonner";
import { ToastContent } from "../Reveal255/ToastContent";
import { useToastSettingsStore } from "../Reveal255/store/useToastSettingsStore";

/**
 * Conditionally show a Solana transaction toast depending on user preference.
 */
export function maybeShowTxToast(transactionSignature: string) {
  const enabled = useToastSettingsStore.getState().enabled;
  if (!enabled) return;

  const explorerUrl = `https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`;

  toast.custom(() => (
    <ToastContent
      transactionSignature={transactionSignature}
      explorerUrl={explorerUrl}
    />
  ));
}
