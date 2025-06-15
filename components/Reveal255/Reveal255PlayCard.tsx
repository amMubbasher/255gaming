"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ResultsDisplay } from "./ResultsDisplay";
import { usePlayerState } from "./hooks/usePlayerState";
import { GameForm } from "./GameForm";
import { useSolPrice } from "./hooks/useSolPrice";
import { GameButton } from "./GameButton";
import { TxToastToggle } from "./TxToastToggle";
import { cn } from "@/lib/utils";
import TutorialModal from "@/components/Tutorial/TutorialModal";

export function Reveal255PlayCard() {
  const { playerState, roundState, loading, error } = usePlayerState();
  const solPrice = useSolPrice();

  const [guess, setGuess] = React.useState("0");
  const [wager, setWager] = React.useState("0.1");
  const [currency, setCurrency] = React.useState<"SOL" | "USD">("SOL");
  const [highlight, setHighlight] = React.useState<"red" | "yellow" | "green" | null>(null);

  const handleToggleCurrency = () =>
    setCurrency((prev) => (prev === "SOL" ? "USD" : "SOL"));

  const baseCardClass =
    "w-full max-w-md mx-auto relative overflow-hidden rounded-2xl bg-white/3 backdrop-blur-md border border-white/5 shadow-inner shadow-white/10 transition-all duration-500";

  React.useEffect(() => {
    if (roundState === "Complete" && playerState) {
      const { distance } = playerState;
      const multiplier = getMultiplier(distance);

      if (multiplier >= 1.25) setHighlight("green");
      else if (multiplier === 0.5) setHighlight("yellow");
      else if (multiplier === 0) setHighlight("red");
      else setHighlight(null);

      const timeout = setTimeout(() => setHighlight(null), 8000);
      return () => clearTimeout(timeout);
    }
  }, [roundState, playerState]);

  function getMultiplier(distance: number): number {
    if (distance === 0) return 15;
    if (distance <= 10) return 4.5;
    if (distance <= 20) return 3;
    if (distance <= 40) return 1.25;
    if (distance <= 50) return 0.5;
    return 0;
  }

  const glowMap: Record<string, string> = {
    red: "bg-red-500/30",
    yellow: "bg-yellow-300/30",
    green: "bg-green-400/30",
  };

  const safeRoundState = roundState!;
  const guessValue = Number.parseInt(guess) || 0;
  const enteredWager = Number.parseFloat(wager) || 0;
  const effectiveSolWager =
    currency === "USD" && solPrice ? enteredWager / solPrice : enteredWager;

  if (loading || error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className={baseCardClass}>
          <CardContent className="flex flex-col items-center py-6 space-y-6 relative z-10">
            <p
              className={
                error
                  ? "text-red-400 drop-shadow-md"
                  : "text-white drop-shadow-md animate-pulse"
              }
            >
              {error || "Loading…"}
            </p>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: [1, 1.01, 1] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      }}
    >
      <Card className={cn(baseCardClass)}>
        {/* 👇 Tutorial modal trigger (replaces InstructionPopover) */}
        <TutorialModal />

        <AnimatePresence>
          {highlight && (
            <motion.div
              key={highlight}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 6, repeat: Infinity, repeatType: "loop" }}
              className={cn(
                "absolute inset-0 z-0 rounded-2xl pointer-events-none blur-2xl",
                glowMap[highlight]
              )}
            />
          )}
        </AnimatePresence>

        <CardContent className="relative z-10 flex flex-col items-center pt-4 px-4 pb-5 space-y-4">
          <h1 className="text-lg font-bold tracking-wide text-transparent bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text drop-shadow-sm">
            Reveal 255
          </h1>

          <ResultsDisplay
            gameState={safeRoundState}
            playerState={playerState}
            solPrice={solPrice}
          />

          <div className="w-full h-px bg-white/20" />

          <GameForm
            currency={currency}
            wager={wager}
            guess={guess}
            onWagerChange={setWager}
            onGuessChange={setGuess}
            solPrice={solPrice}
            gameState={safeRoundState}
            onToggleCurrency={handleToggleCurrency}
          />

          <GameButton
            gameState={safeRoundState}
            guessValue={guessValue}
            wagerValue={effectiveSolWager}
          />

          <div className="mt-4 w-full relative h-5">
            <a
              href="https://orao.network/solana-vrf"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute left-1/2 -translate-x-1/2 text-xs text-white/40 hover:text-white/70 hover:underline transition"
            >
              Powered by Orao
            </a>
            <div className="absolute right-0 top-0">
              <TxToastToggle />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
