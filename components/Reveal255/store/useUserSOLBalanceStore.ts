import { create } from 'zustand'
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js'

interface UserSOLBalanceStore {
  balance: number
  // Starts (or restarts) a 5-second polling loop for the given publicKey/connection
  startPollingBalance: (publicKey: PublicKey, connection: Connection) => void
  // Stops the 5-second polling loop (if running)
  stopPollingBalance: () => void
}

const useUserSOLBalanceStore = create<UserSOLBalanceStore>((set) => {
  // Keep a reference to the interval timer so we can clear it later.
  let pollInterval: ReturnType<typeof setInterval> | null = null

  // Internal helper to fetch once and update `balance`
  async function fetchAndSet(publicKey: PublicKey, connection: Connection) {
    try {
      const lamports = await connection.getBalance(publicKey, 'confirmed')

      const sol = lamports / LAMPORTS_PER_SOL
      set({ balance: sol })
      console.log(`balance updated: ${sol} SOL`)
    } catch (err) {
      console.error('error getting balance:', err)
    }
  }

  return {
    balance: 0,

    startPollingBalance: (publicKey, connection) => {
      // If an interval is already running, clear it first
      if (pollInterval) {
        clearInterval(pollInterval)
      }

      // Immediately fetch once before waiting 5s
      fetchAndSet(publicKey, connection)

      // Set up a new 5-second interval
      pollInterval = setInterval(() => {
        fetchAndSet(publicKey, connection)
      }, 10000)
    },

    stopPollingBalance: () => {
      if (pollInterval) {
        clearInterval(pollInterval)
        pollInterval = null
        console.log('Stopped polling user SOL balance.')
      }
    },
  }
})

export default useUserSOLBalanceStore
