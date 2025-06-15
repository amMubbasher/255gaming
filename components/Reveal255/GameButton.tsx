"use client";

import { FC, memo, useMemo } from "react";
import { GameState } from "./types/GameState";
import { useGuessHandler } from "../handlers/useGuessHandler";
import { useRevealHandler } from "../handlers/useRevealHandler";
import { Button } from "@/components/ui/button";

export interface GameButtonProps {
  gameState: GameState;
  guessValue: number;
  wagerValue: number;
}

export const GameButton: FC<GameButtonProps> = memo(
  ({ gameState, guessValue, wagerValue }) => {
    const {
      handleGuess,
      isLoading: guessLoading,
      getIsDisabled: isGuessDisabled,
      getIsSpinnerVisible: isGuessSpinnerVisible,
    } = useGuessHandler();

    const {
      handleReveal,
      isLoading: revealLoading,
      getIsDisabled: isRevealDisabled,
      getIsSpinnerVisible: isRevealSpinnerVisible,
    } = useRevealHandler();

    const { label, onClick, disabled, showSpinner, isLoading } = useMemo(() => {
      let label = "Guess";
      let onClick = () => handleGuess(guessValue, wagerValue);
      let disabled = false;
      let showSpinner = false;
      let isLoading = false;

      switch (gameState) {
        case "Ready":
        case "Complete":
          label = "Guess";
          onClick = () => handleGuess(guessValue, wagerValue);
          disabled = isGuessDisabled(gameState);
          showSpinner = isGuessSpinnerVisible();
          isLoading = guessLoading;
          break;
        case "Waiting":
          label = "Reveal";
          onClick = () => handleReveal();
          disabled = isRevealDisabled();
          showSpinner = isRevealSpinnerVisible();
          isLoading = revealLoading;
          break;
      }

      return { label, onClick, disabled, showSpinner, isLoading };
    }, [
      gameState,
      guessValue,
      wagerValue,
      handleGuess,
      handleReveal,
      guessLoading,
      revealLoading,
      isGuessDisabled,
      isRevealDisabled,
      isGuessSpinnerVisible,
      isRevealSpinnerVisible,
    ]);

    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        aria-busy={isLoading}
        aria-label={label}
        className={`w-full max-w-[220px] mx-auto h-11 text-sm font-semibold tracking-tight rounded-xl ${
          showSpinner ? "animate-pulse" : ""
        }`}
      >
        <div className="relative z-10 flex items-center justify-center gap-2">
          {showSpinner ? (
            <>
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
              <span className="text-xs">
                {gameState === "Waiting"
                  ? revealLoading
                    ? "Revealing..."
                    : "Waiting..."
                  : guessLoading
                  ? "Submitting..."
                  : "Waiting..."}
              </span>
            </>
          ) : (
            label
          )}
        </div>
      </Button>
    );
  }
);

GameButton.displayName = "GameButton";
