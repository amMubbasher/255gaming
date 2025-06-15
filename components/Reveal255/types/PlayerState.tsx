// src/components/counter/types/PlayerState.ts

import type { PublicKey } from "@solana/web3.js";
import type BN from "bn.js";  // ← import BN as a type

/**
 * This interface mirrors your on‐chain `PlayerState`:
 *
 * pub struct PlayerState {
 *     pub player: Pubkey,      // 32 bytes
 *     pub counter: u32,        // 4 bytes
 *     pub guess: u8,           // 1 byte
 *     pub wager: u64,          // 8 bytes
 *     pub secret: u8,          // 1 byte (0 until reveal sets it)
 *     pub distance: u8,        // 1 byte
 *     pub payout: u64,         // 8 bytes
 *     pub seed: [u8; 32],      // 32 bytes
 *     pub bump: u8,            // 1 byte
 * }
 */
export interface PlayerState {
  /** The player’s public key (32 bytes) */
  player: PublicKey;

  /** A counter (u32) */
  counter: number;

  /** The user’s guess (0–255) */
  guess: number;

  /**
   * The wager in lamports (u64). When Anchor decodes a u64, it becomes a BN.
   */
  wager: BN;

  /**
   * The secret number (0–255). Before reveal, this may be 0.
   */
  secret: number;

  /**
   * The circular distance (0–127). After reveal, your program writes this.
   */
  distance: number;

  /**
   * The on-chain payout (in lamports, u64). Anchor returns this as a BN.
   */
  payout: BN;

  /**
   * The 32-byte “seed” PDA (raw bytes). Decoded as a Uint8Array.
   */
  seed: Uint8Array;

  /** The PDA bump (0–255) */
  bump: number;
}
