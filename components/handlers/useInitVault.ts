// src/components/counter/initVault.tsx
import { SystemProgram, PublicKey } from "@solana/web3.js";
import type { Program, Idl } from "@coral-xyz/anchor";

export async function initializeVault(
  program: Program<Idl>,
  publicKey: PublicKey
) {
  // Derive the Vault PDA (seed = "vault3")
  const [vaultPda] = PublicKey.findProgramAddressSync(
    [Buffer.from("vault3")],
    program.programId
  );

  try {
    const tx = await program.methods
      .initializeVault()
      .accounts({
        authority: publicKey,
        vault: vaultPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

    console.log("✅ Vault initialized at", vaultPda.toBase58());
    console.log("🔗 Tx:", tx);
  } catch (err) {
    console.error("❌ Vault init failed:", err);
  }
}
