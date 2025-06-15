// src/components/counter/hooks/usePlayerState.tsx
"use client";

import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import { useEffect, useState, useRef } from "react";
import { useProgram } from "./useProgram";

export interface PlayerStateData {
  player: PublicKey;
  counter: number;
  guess: number;
  wager: anchor.BN;
  secret: number;
  distance: number;
  payout: anchor.BN;
  seed: number[];
  bump: number;
}

interface UsePlayerStateReturn {
  playerState: PlayerStateData | null;
  roundState: "Ready" | "Waiting" | "Complete" | null;
  loading: boolean;
  error: string | null;
}

export function usePlayerState(): UsePlayerStateReturn {
  const { program, publicKey, connected } = useProgram();
  const [playerState, setPlayerState] = useState<PlayerStateData | null>(null);
  const [roundState, setRoundState] = useState<"Ready" | "Waiting" | "Complete" | null>(
    "Ready"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Keep a ref for the polling interval ID so we can clear it later
  const pollIntervalRef = useRef<number | null>(null);

  // Extract publicKey.toString() into a stable variable
  const publicKeyString = publicKey ? publicKey.toString() : null;

  useEffect(() => {
    // If wallet/program not ready, reset everything and skip polling
    if (!connected || !publicKey || !program) {
      setPlayerState(null);
      setRoundState("Ready");
      setLoading(false);
      setError("Please connect your wallet to play");
      if (pollIntervalRef.current !== null) {
        window.clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      return;
    }

    setLoading(true);
    setError(null);

    let isCancelled = false;
    let playerStatePda: PublicKey;

    try {
      [playerStatePda] = PublicKey.findProgramAddressSync(
        [Buffer.from("player_state"), publicKey.toBuffer()],
        program.programId
      );
    } catch (err) {
      console.error("Failed to derive playerState PDA:", err);
      setError("Failed to derive PDA");
      setLoading(false);
      return;
    }

    // Function to fetch PlayerState and update roundState
    const fetchPlayerStateOnce = async () => {
      try {
        const accountData = await program.account.playerState.fetch(playerStatePda);
        if (isCancelled) return;

        setPlayerState(accountData as PlayerStateData);
        const newRound =
          accountData.wager.toNumber() === 0
            ? "Ready"
            : accountData.secret !== 0
            ? "Complete"
            : "Waiting";
        setRoundState(newRound);
      } catch (err) {
        if (isCancelled) return;
        // If fetching throws (account not found), treat as "Ready"
        console.warn("Fetch threw (account not found?), treating as Ready:", err);
        setPlayerState(null);
        setRoundState("Ready");
      } finally {
        if (!isCancelled) setLoading(false);
      }
    };

    // Do the initial fetch once
    fetchPlayerStateOnce();

    // Start polling every 10 seconds (adjust interval as desired)
    pollIntervalRef.current = window.setInterval(() => {
      fetchPlayerStateOnce();
    }, 10_000);

    // Cleanup on unmount or dependency change
    return () => {
      isCancelled = true;
      if (pollIntervalRef.current !== null) {
        window.clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, [publicKeyString, connected, program, publicKey]);

  return {
    playerState,
    roundState,
    loading,
    error,
  };
}
