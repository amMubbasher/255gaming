// utils/showFriendlyErrorToast.ts
import { toast } from "sonner";

export const anchorErrorMessages: Record<number, string> = {
  6000: "Randomness not quite ready. Try again in ~15 seconds.",
  6001: "No guess submitted yet. Submit a guess first!",
  6002: "Randomness already revealed. Wait for next round.",
  6003: "Still waiting for randomness to be fulfilled.",
  6004: "Invalid seed provided.",
  6005: "Vault doesn't have enough SOL for a payout.",
  6006: "You are not authorized for this player state.",
  6007: "Wager must be greater than zero.",
  6008: "Wager too small. Minimum is 0.001 SOL.",
  6009: "Wager too large. Maximum is 10 SOL.",
  6010: "Math overflow during payout. Try a smaller wager.",
  6011: "Player state account not found.",
  6012: "Vault account not found.",
  6013: "VRF network state not found.",
  6014: "VRF network state is invalid."
};

interface AnchorError {
  error?: {
    errorCode?: {
      number?: number;
    };
  };
  message?: string;
}

export function showFriendlyErrorToast(err: unknown) {
  const safeErr = err as AnchorError;
  const code = safeErr?.error?.errorCode?.number;
  const message = safeErr?.message || "Something went wrong.";

  if (code && anchorErrorMessages[code]) {
    toast.error("Error", {
      description: anchorErrorMessages[code],
    });
    return;
  }

  if (message.includes("0x1")) {
    toast.error("Insufficient funds", {
      description: "You don't have enough SOL to cover the transaction.",
    });
    return;
  }

  if (message.includes("Transaction was not confirmed")) {
    toast.error("Transaction Timeout", {
      description: "It took too long to confirm. Try again.",
    });
    return;
  }

  toast.error("Transaction Failed", {
    description: message,
  });
}
