// src/components/counter/hooks/useProgram.tsx
"use client";

import * as anchor from "@coral-xyz/anchor";
import { PublicKey } from "@solana/web3.js";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { Reveal255v2 } from "@/anchor-idl/idl";
import IdlJson from "@/anchor-idl/idl.json";
import { useMemo } from "react";

interface UseProgramReturn {
  program: anchor.Program<Reveal255v2>;
  reveal255v2Address: PublicKey;
  publicKey: PublicKey | null;
  connected: boolean;
  connection: anchor.web3.Connection;
}

export function useProgram(): UseProgramReturn {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const wallet = useAnchorWallet();

  // Cast the imported JSON to the IDL type.
  // Anchor v0.31+ will pull the program ID from IdlJson.metadata.address internally.
  const idl = IdlJson as unknown as Reveal255v2;

  const program = useMemo(() => {
    let provider: anchor.AnchorProvider;

    if (wallet) {
      // If the user is connected, build a real AnchorProvider:
      provider = new anchor.AnchorProvider(
        connection,
        wallet,
        { preflightCommitment: "confirmed" }
      );
    } else {
      // Otherwise, build a read‐only provider with a dummy Wallet object:
      const dummyWallet = {
        publicKey: null,
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        signTransaction: async (_tx: unknown) => {
          throw new Error("No wallet available to sign");
        },
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        signAllTransactions: async (_txs: unknown[]) => {
          throw new Error("No wallet available to sign");
        },
      } as unknown as anchor.Wallet;

      provider = new anchor.AnchorProvider(
        connection,
        dummyWallet,
        { preflightCommitment: "confirmed" }
      );
    }

    // Anchor v0.31+ automatically reads the `address` from the IDL JSON.
    return new anchor.Program<Reveal255v2>(idl, provider);
  }, [connection, wallet, idl]);

  // Derive the PDA for 'Reveal255v2' using program.programId
  const reveal255v2Address = useMemo(() => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("Reveal255v2")],
      program.programId
    )[0];
  }, [program.programId]);

  return {
    program,
    reveal255v2Address,
    publicKey,
    connected,
    connection,
  };
}
