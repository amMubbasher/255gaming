"use client";

import { Bell, BellOff } from "lucide-react";
import { useToastSettingsStore } from "./store/useToastSettingsStore";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"; // <-- adjust this path if needed

export function TxToastToggle() {
  const enabled = useToastSettingsStore((s) => s.enabled);
  const toggleEnabled = useToastSettingsStore((s) => s.toggleEnabled);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          onClick={toggleEnabled}
          className="rounded-full p-1.5 bg-gray-900 text-gray-400 hover:bg-gray-800 transition"
          aria-label="Toggle transaction toasts"
        >
          {enabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
        </button>
      </TooltipTrigger>
      <TooltipContent>
        {enabled ? "Disable transaction toasts" : "Enable transaction toasts"}
      </TooltipContent>
    </Tooltip>
  );
}
