// src/components/counter/hooks/useUserSOLBalanceStore.ts
import { create } from "zustand";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";

interface UserSOLBalanceStore {
  balance: number;
  getUserSOLBalance: (publicKey: PublicKey, connection: Connection) => Promise<void>;
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set) => ({
  balance: 0,

  getUserSOLBalance: async (publicKey: PublicKey, connection: Connection) => {
    try {
      const lamports = await connection.getBalance(publicKey, "confirmed");
      const balanceSOL = lamports / LAMPORTS_PER_SOL;
      console.log("balance updated:", balanceSOL);
      set({ balance: balanceSOL });
    } catch (err) {
      console.error("error getting balance:", err);
      // If you want to reset to 0 on error, uncomment:
      // set({ balance: 0 });
    }
  },
}));

export default useUserSOLBalanceStore;
