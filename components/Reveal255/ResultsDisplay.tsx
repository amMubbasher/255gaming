"use client";

import { FC } from "react";
import type { PlayerStateData } from "./hooks/usePlayerState";
import { GameState } from "./types/GameState";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

interface ResultsDisplayProps {
  gameState: GameState;
  playerState: PlayerStateData | null;
  solPrice: number | null;
}

function getMultiplier(distance: number): number {
  if (distance === 0) return 15;
  if (distance <= 10) return 4.5;
  if (distance <= 20) return 3;
  if (distance <= 40) return 1.25;
  if (distance <= 50) return 0.5;
  return 0;
}

export const ResultsDisplay: FC<ResultsDisplayProps> = ({
  gameState,
  playerState,
  solPrice,
}) => {
  const baseStyle = "w-full text-[11px] text-center font-semibold px-4 py-3";

  if (gameState === "Ready") {
    return (
      <div className={`${baseStyle} text-white/90`} aria-live="polite">
        🎯 Ready to play? Take a shot!
      </div>
    );
  }

  if (gameState === "Waiting") {
    return (
      <div className={`${baseStyle} text-white/70 animate-pulse`} aria-live="polite">
        ⏳ Waiting for randomness…
      </div>
    );
  }

  if (gameState === "Complete" && playerState) {
    const { guess, secret, distance, payout } = playerState;
    const multiplier = getMultiplier(distance);
    const payoutSOL = Number(payout) / LAMPORTS_PER_SOL;
    const payoutSOLStr = payoutSOL.toFixed(2);
    const payoutUSDStr =
      solPrice !== null ? (payoutSOL * solPrice).toFixed(2) : null;

    return (
      <div className={`${baseStyle} text-white space-y-2`} aria-live="polite">
        <div className="flex justify-center gap-4 font-semibold text-[11px] text-white/90">
          <div>
            <span className="text-white/50 pr-1">Secret:</span>
            <span>{secret}</span>
          </div>
          <div>
            <span className="text-white/50 pr-1">Guess:</span>
            <span>{guess}</span>
          </div>
          <div>
            <span className="text-white/50 pr-1">Δ:</span>
            <span>{distance}</span>
          </div>
        </div>
        <div>
          {payoutSOL > 0 ? (
            <span className="text-green-300 font-bold">
              {multiplier}x → {payoutSOLStr} SOL
              {payoutUSDStr && (
                <span className="text-white/50 font-normal ml-1">
                  (≈ ${payoutUSDStr})
                </span>
              )}
            </span>
          ) : (
            <span className="text-red-400 font-semibold">
              Better Luck Next Time
            </span>
          )}
        </div>
      </div>
    );
  }

  return null;
};
