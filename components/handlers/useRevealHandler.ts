// frontend/components/handlers/useRevealHandler.ts
"use client";

import { useState, useCallback } from "react";
import { PublicKey, SystemProgram } from "@solana/web3.js";
import { useProgram } from "../Reveal255/hooks/useProgram";
import { maybeShowTxToast } from "@/components/toast/maybeShowTxToast";
import { showFriendlyErrorToast } from "@/lib/showFriendlyErrorToast";

interface RevealAccounts {
  player: PublicKey;
  playerState: PublicKey;
  vault: PublicKey;
  random: PublicKey;
  vrf: PublicKey;
  systemProgram: PublicKey;
}

export function useRevealHandler() {
  const { program, publicKey, connected } = useProgram();
  const [isLoading, setIsLoading] = useState(false);
  const [postTxWait, setPostTxWait] = useState(false);
  const [transactionSignature, setTransactionSignature] = useState<string | null>(null);

  const handleReveal = useCallback(async () => {
    if (!program || !publicKey) return;

    try {
      setIsLoading(true);

      const [playerStatePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("player_state"), publicKey.toBuffer()],
        program.programId
      );

      const playerStateAccount = await program.account.playerState.fetch(playerStatePda);
      const seedArray: number[] = playerStateAccount.seed as number[];

      const [vaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault3")],
        program.programId
      );

      const vrfProgramId = new PublicKey(
        "VRFzZoJdhFWL8rkvu87LpKM3RbcVezpMEc6X5GVDr7y"
      );

      const [randomPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("orao-vrf-randomness-request"), Uint8Array.from(seedArray)],
        vrfProgramId
      );

      const tx = await program.methods
        .reveal()
        .accounts({
          player: publicKey,
          playerState: playerStatePda,
          vault: vaultPda,
          random: randomPda,
          vrf: vrfProgramId,
          systemProgram: SystemProgram.programId,
        } as RevealAccounts)
        .rpc();

      setTransactionSignature(tx);
      maybeShowTxToast(tx);

      setPostTxWait(true);
      setTimeout(() => {
        setPostTxWait(false);
      }, 8000);
    } catch (err) {
      console.error("Error during reveal():", err);
      showFriendlyErrorToast(err);
    } finally {
      setIsLoading(false);
    }
  }, [program, publicKey]);

  const getIsDisabled = () => {
    return isLoading || postTxWait || !connected;
  };

  const getIsSpinnerVisible = () => {
    return isLoading || postTxWait;
  };

  return {
    handleReveal,
    isLoading,
    postTxWait,
    transactionSignature,
    getIsDisabled,
    getIsSpinnerVisible,
  };
}
