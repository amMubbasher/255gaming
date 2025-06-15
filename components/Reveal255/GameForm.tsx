"use client";

import { FC } from "react";
import { GameState } from "./types/GameState";
import BalanceDisplay from "./BalanceDisplay";
import { CurrencySwitcher } from "./CurrencySwitcher";
import { cn } from "@/lib/utils";

interface Props {
  currency: "SOL" | "USD";
  wager: string;
  guess: string;
  onWagerChange: (value: string) => void;
  onGuessChange: (value: string) => void;
  solPrice: number | null;
  gameState: GameState;
  onToggleCurrency: () => void;
  onSubmit?: () => void;
}

export const GameForm: FC<Props> = ({
  currency,
  wager,
  guess,
  onWagerChange,
  onGuessChange,
  solPrice,
  gameState,
  onToggleCurrency,
  onSubmit,
}) => {
  const isDisabled = gameState === "Waiting";
  const numericWager = parseFloat(wager);

  const converted =
    solPrice && !isNaN(numericWager)
      ? currency === "USD"
        ? `≈ ${(numericWager / solPrice).toFixed(2)} SOL`
        : `≈ $${(numericWager * solPrice).toFixed(2)}`
      : "≈ $0.00";

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (onSubmit && !isDisabled) {
      onSubmit();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-5">
      {/* Optional status text */}
      {isDisabled && (
        <p className="text-center text-xs text-red-400 font-medium tracking-wide">
          Click Reveal....
        </p>
      )}

      {/* Balance + Currency Switcher */}
      <div className="space-y-2">
        <BalanceDisplay currency={currency} solPrice={solPrice} />
        <div className="flex justify-center gap-2">
          <CurrencySwitcher value={currency} onToggle={onToggleCurrency} />
        </div>
      </div>

      {/* Wager Input */}
      <div>
        <label
          htmlFor="wager"
          className="block text-[11px] font-semibold mb-1 uppercase text-white/60"
        >
          Wager ({currency})
        </label>
        <div className="relative">
          <input
            id="wager"
            type="number"
            step="0.01"
            min="0"
            value={wager}
            onChange={(e) => onWagerChange(e.target.value)}
            placeholder={currency === "USD" ? "e.g. 5.00" : "e.g. 0.1"}
            className={cn(
              "w-full rounded-md px-3 py-2 text-sm bg-transparent",
              "text-white placeholder-white/40 border border-white/10 outline-none",
              "focus:ring-2 focus:ring-purple-500/70 font-medium",
              isDisabled && "opacity-60 pointer-events-none"
            )}
            disabled={isDisabled}
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-white/50">
            {converted}
          </span>
        </div>
      </div>

      {/* Guess Input */}
      <div>
        <label
          htmlFor="guess"
          className="block text-[11px] font-semibold mb-1 uppercase text-white/60"
        >
          Your Guess (0–255)
        </label>
        <input
          id="guess"
          type="number"
          step="1"
          min={0}
          max={255}
          value={guess}
          onChange={(e) => onGuessChange(e.target.value)}
          placeholder="e.g. 128"
          className={cn(
            "w-full rounded-md px-3 py-2 text-sm bg-transparent",
            "text-white placeholder-white/40 border border-white/10 outline-none",
            "focus:ring-2 focus:ring-purple-500/70 font-medium",
            isDisabled && "opacity-60 pointer-events-none"
          )}
          disabled={isDisabled}
          onKeyDown={(e) => {
            if ([".", ",", "e", "-"].includes(e.key)) e.preventDefault();
          }}
        />
      </div>
    </form>
  );
};
