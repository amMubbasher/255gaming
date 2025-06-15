"use client";

import { Check, ClipboardCopy } from "lucide-react";
import React, { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";

interface ToastContentProps {
  transactionSignature: string;
  explorerUrl: string;
}

export function ToastContent({
  transactionSignature,
  explorerUrl,
}: ToastContentProps) {
  const [isContentCopied, setIsContentCopied] = useState(false);

  const handleContentCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    navigator.clipboard.writeText(transactionSignature);
    setIsContentCopied(true);
    setTimeout(() => setIsContentCopied(false), 500);
  };

  return (
    <div className="mt-2 space-y-3 max-w-[90vw] sm:max-w-sm">
      <div className="text-[11px] font-mono bg-white/10 text-white px-2 py-1.5 rounded border border-white/10 shadow-inner shadow-black/30 overflow-x-auto">
        {transactionSignature}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          className={`h-8 px-2 text-xs flex-1 font-medium border border-purple-500/40 backdrop-blur-md ${
            isContentCopied
              ? "bg-purple-800/30 text-green-300"
              : "bg-white/10 hover:bg-purple-800/30 text-white"
          }`}
          onClick={handleContentCopy}
        >
          {isContentCopied ? (
            <Check className="w-4 h-4 mr-1.5" />
          ) : (
            <ClipboardCopy className="w-4 h-4 mr-1.5" />
          )}
          {isContentCopied ? "Copied!" : "Copy Signature"}
        </Button>

        <Button
          size="sm"
          className="h-8 px-2 text-xs flex-1 font-medium bg-white/10 hover:bg-blue-800/30 text-white border border-blue-500/30 backdrop-blur-md"
          onClick={(e) => {
            e.stopPropagation();
            window.open(explorerUrl, "_blank");
          }}
        >
          <svg
            className="w-4 h-4 mr-1.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
            <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
          </svg>
          View in Explorer
        </Button>
      </div>
    </div>
  );
}
