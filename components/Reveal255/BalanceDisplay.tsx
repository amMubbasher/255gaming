import { useEffect } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import useUserSOLBalanceStore from "./store/useUserSOLBalanceStore";

interface BalanceDisplayProps {
  currency: "SOL" | "USD";
  solPrice: number | null;
}

export default function BalanceDisplay({ currency, solPrice }: BalanceDisplayProps) {
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  const balance = useUserSOLBalanceStore((s) => s.balance);
  const startPollingBalance = useUserSOLBalanceStore((s) => s.startPollingBalance);
  const stopPollingBalance = useUserSOLBalanceStore((s) => s.stopPollingBalance);

  useEffect(() => {
    if (publicKey && connection) {
      startPollingBalance(publicKey, connection);
    }
    return stopPollingBalance;
  }, [publicKey, connection, startPollingBalance, stopPollingBalance]);

  if (!publicKey) return null;

  const formattedSOL = balance.toFixed(3);
  const formattedUSD = solPrice !== null ? (balance * solPrice).toFixed(2) : "0.00";

  return (
    <div className="w-full text-center text-white text-sm font-medium">
      Balance:{" "}
      <span className="font-semibold">
        {currency === "SOL" ? `${formattedSOL} SOL` : `$${formattedUSD}`}
      </span>
    </div>
  );
}

