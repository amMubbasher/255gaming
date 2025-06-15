// frontend/components/handlers/useGuessHandler.ts
"use client";

import { useState, useCallback } from "react";
import { BN } from "@coral-xyz/anchor";
import { PublicKey, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from "sonner";
import { useProgram } from "../Reveal255/hooks/useProgram";
import { maybeShowTxToast } from "@/components/toast/maybeShowTxToast";
import { showFriendlyErrorToast } from "@/lib/showFriendlyErrorToast";

interface GuessAccounts {
  player: PublicKey;
  playerState: PublicKey;
  vault: PublicKey;
  treasury: PublicKey;
  config: PublicKey;
  random: PublicKey;
  vrf: PublicKey;
  systemProgram: PublicKey;
}

export type RoundState = "Ready" | "Waiting" | "Complete";

export function useGuessHandler() {
  const { program, publicKey, connected } = useProgram();
  const [isLoading, setIsLoading] = useState(false);
  const [postTxWait, setPostTxWait] = useState(false);
  const [txSig, setTxSig] = useState<string | null>(null);

  const handleGuess = useCallback(
    async (guessValue: number, wagerValue: number) => {
      if (!program || !publicKey) return;

      if (guessValue < 0 || guessValue > 255) {
        toast.error("Enter a valid guess (0–255)");
        return;
      }
      if (wagerValue <= 0) {
        toast.error("Enter a valid wager");
        return;
      }

      const lamports = Math.round(wagerValue * LAMPORTS_PER_SOL);
      const wagerLamports = new BN(lamports);
      const guess = guessValue;
      const seed = Array.from(crypto.getRandomValues(new Uint8Array(32)));

      const [playerStatePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("player_state"), publicKey.toBuffer()],
        program.programId
      );
      const [vaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("vault3")],
        program.programId
      );
      const vrfProgramId = new PublicKey(
        "VRFzZoJdhFWL8rkvu87LpKM3RbcVezpMEc6X5GVDr7y"
      );
      const [configPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("orao-vrf-network-configuration")],
        vrfProgramId
      );
      const [randomPda] = PublicKey.findProgramAddressSync(
        [Buffer.from("orao-vrf-randomness-request"), Uint8Array.from(seed)],
        vrfProgramId
      );

      try {
        setIsLoading(true);

        const networkStateAccount = await program.account.networkState.fetch(
          configPda
        );
        const realTreasury = networkStateAccount.config.treasury;

        const tx = await program.methods
          .guess(seed, guess, wagerLamports)
          .accounts({
            player: publicKey,
            playerState: playerStatePda,
            vault: vaultPda,
            treasury: realTreasury,
            config: configPda,
            random: randomPda,
            vrf: vrfProgramId,
            systemProgram: SystemProgram.programId,
          } as GuessAccounts)
          .rpc();

        setTxSig(tx);
        maybeShowTxToast(tx);

        setPostTxWait(true);
        setTimeout(() => {
          setPostTxWait(false);
        }, 8000);
      } catch (err) {
        console.error("Error during guess():", err);
        showFriendlyErrorToast(err);
      } finally {
        setIsLoading(false);
      }
    },
    [program, publicKey]
  );

  const getIsDisabled = (roundState: RoundState) => {
    return (
      isLoading ||
      !connected ||
      roundState === "Waiting" ||
      postTxWait
    );
  };

  const getIsSpinnerVisible = () => {
    return isLoading || postTxWait;
  };

  return {
    handleGuess,
    isLoading,
    postTxWait,
    txSig,
    getIsDisabled,
    getIsSpinnerVisible,
  };
}
