"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Info, X } from "lucide-react";
import { useState } from "react";

export default function TutorialModal() {
  const [step, setStep] = useState(1);

  return (
    <Dialog.Root onOpenChange={(open) => open && setStep(1)}>
      <Dialog.Trigger asChild>
        <button
          className="absolute top-9 right-6 z-50 text-white/40 hover:text-white transition"
          aria-label="Open Tutorial"
        >
          <Info className="w-6 h-6" />
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />
        <Dialog.Content className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <VisuallyHidden>
            <Dialog.Title>Reveal255 Tutorial</Dialog.Title>
          </VisuallyHidden>

          <Card className="w-full max-w-md relative z-50 text-white">
            <Dialog.Close asChild>
              <button
                className="absolute top-3 right-3 text-white/60 hover:text-white transition"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>

            {/* Step 1: Game Overview */}
            {step === 1 && (
              <>
                <CardHeader>
                  <CardTitle>🎮 Welcome to Reveal255</CardTitle>
                  <CardDescription className="text-white/80">
                    Guess a number between 0–255. Win SOL based on how close you are.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>• Pick a number and wager some SOL.</p>
                  <p>• Orao VRF draws a secure random number.</p>
                  <p>• Your payout depends on circular distance.</p>
                </CardContent>
                <CardFooter className="justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
                  >
                    Next →
                  </button>
                </CardFooter>
              </>
            )}

            {/* Step 2: Circular Distance */}
            {step === 2 && (
              <>
                <CardHeader>
                  <CardTitle>🌀 Circular Distance</CardTitle>
                  <CardDescription className="text-white/80">
                    The numbers wrap around like a circle from 0 to 255.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p>If you guess 250 and the result is 2, you&apos;re only 8 away!</p>
                  <p>The game calculates the shortest circular path between your guess and the result.</p>
                </CardContent>
                <CardFooter className="justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium"
                  >
                    Next →
                  </button>
                </CardFooter>
              </>
            )}

            {/* Step 3: Payout Structure */}
            {step === 3 && (
              <>
                <CardHeader>
                  <CardTitle>💰 Payout Structure</CardTitle>
                  <CardDescription className="text-white/80">
                    The closer your guess, the more you win.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>🎯 Exact match (0 distance): 15×</li>
                    <li>🔥 Very close (≤10): 4.5×</li>
                    <li>👍 Close (≤20): 3×</li>
                    <li>👌 Okay (≤40): 1.25×</li>
                    <li>😬 Far (≤50): 0.5×</li>
                    <li>🚫 Too far (&gt;50): No payout</li>
                  </ul>
                </CardContent>
                <CardFooter className="justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    ← Back
                  </button>
                  <Dialog.Close asChild>
                    <button className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg text-sm font-medium">
                      Let&apos;s Play!
                    </button>
                  </Dialog.Close>
                </CardFooter>
              </>
            )}
          </Card>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
