// "use client";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
// import React from "react";
// import dynamic from "next/dynamic";

// // Hydration-safe import for WalletMultiButton
// const WalletMultiButton = dynamic(
//   () =>
//     import("@solana/wallet-adapter-react-ui").then(
//       (mod) => mod.WalletMultiButton
//     ),
//   {
//     ssr: false,
//     loading: () => (
//       <div className="btn btn-primary animate-pulse flex items-center gap-3 px-5 py-2 rounded-xl shadow-md text-white">
//         <div className="w-5 h-5 bg-white/20 rounded-full" />
//         <div className="h-3 w-24 bg-white/10 rounded-sm" />
//       </div>
//     ),
//   }
// );

// export function WalletButton() {
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger asChild>
//           <div className="inline-block">
//             <WalletMultiButton className="btn btn-primary text-white px-5 py-2 rounded-xl shadow-md" />
//           </div>
//         </TooltipTrigger>
//         <TooltipContent>
//           <p>Devnet Only</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// }

"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";

// Styles to inject for the wallet modal
const WALLET_MODAL_STYLES = `
  .wallet-adapter-modal-wrapper {
    background: linear-gradient(135deg, #6b21a8 0%, #3730a3 100%) !important;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4), 0 10px 10px -5px rgba(0, 0, 0, 0.2) !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    border-radius: 20px !important;
    width: 400px !important;
    max-width: 90vw !important;
    padding: 24px !important;
  }

  .wallet-adapter-modal-overlay {
    background: rgba(0, 0, 0, 0.7) !important;
    backdrop-filter: blur(4px) !important;
  }

  .wallet-adapter-modal-button-close {
    background: rgba(255, 255, 255, 0.1) !important;
    border-radius: 50% !important;
    width: 36px !important;
    height: 36px !important;
    transition: background 0.2s !important;
  }

  .wallet-adapter-modal-button-close:hover {
    background: rgba(255, 255, 255, 0.2) !important;
  }

  .wallet-adapter-modal-title {
    font-size: 24px !important;
    font-weight: 600 !important;
    color: white !important;
    margin-bottom: 16px !important;
  }

  .wallet-adapter-modal-content {
    margin-top: 16px !important;
  }

  .wallet-adapter-button {
    background: rgba(255, 255, 255, 0.1) !important;
    border-radius: 12px !important;
    padding: 14px 16px !important;
    border: 1px solid rgba(255, 255, 255, 0.1) !important;
    display: flex !important;
    align-items: center !important;
    transition: background 0.2s !important;
    margin-bottom: 10px !important;
  }

  .wallet-adapter-button:hover {
    background: rgba(255, 255, 255, 0.15) !important;
  }

  .wallet-adapter-button-start-icon {
    margin-right: 16px !important;
  }

  .wallet-adapter-modal-list {
    margin-bottom: 16px !important;
  }

  .wallet-adapter-modal-list-more {
    color: rgb(156, 163, 175) !important;
    font-size: 14px !important;
    margin: 12px 0 !important;
  }
`;

// Hydration-safe import for WalletMultiButton
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton
    ),
  {
    ssr: false,
    loading: () => (
      <div className="btn btn-primary animate-pulse flex items-center gap-3 px-5 py-2 rounded-xl shadow-md text-white">
        <div className="w-5 h-5 bg-white/20 rounded-full" />
        <div className="h-3 w-24 bg-white/10 rounded-sm" />
      </div>
    ),
  }
);

export function WalletButton() {
  // Inject custom styles for wallet modal when component mounts
  useEffect(() => {
    // Check if style already exists
    const styleId = "wallet-modal-custom-styles";
    if (!document.getElementById(styleId)) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.innerHTML = WALLET_MODAL_STYLES;
      document.head.appendChild(styleElement);
    }
    
    return () => {
      // Optional: remove styles when component unmounts
      // const styleElement = document.getElementById(styleId);
      // if (styleElement) styleElement.remove();
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="wallet-button-wrapper relative inline-block">
            <WalletMultiButton className="!bg-gradient-to-r !from-purple-600 !to-blue-600 !border-0 !rounded-full !text-white !font-medium !py-2 !px-5 !text-sm !transition-all hover:!opacity-90 !shadow-md" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Devnet Only</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
