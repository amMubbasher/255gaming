
import LaunchCountdownCard from "@/components/Home/LaunchCountdownCard";
// import { ConnectButton } from "@/components/ui/connect-button";
import Image from "next/image";

export const metadata = {
  title: "255Gaming | Solana's Ultimate Guessing Game",
  description: "Play Reveal255 — the Solana guessing game with unbeatable odds, fair payouts, and secure randomness via Orao VRF.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 5.0,
  userScalable: true,
};

export default function HomePage() {
  return (
    <main className="relative w-full overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="absolute top-[10%] left-[5%] w-96 h-96 rounded-full bg-purple-500 blur-[100px] animate-pulse-slow" />
          <div className="absolute top-[40%] right-[10%] w-72 h-72 rounded-full bg-blue-500 blur-[80px] animate-pulse-slower" />
          <div className="absolute bottom-[15%] left-[20%] w-80 h-80 rounded-full bg-indigo-500 blur-[90px] animate-pulse" />
        </div>
        
        {/* Geometric SVG elements */}
        {/* <div className="hidden lg:block absolute top-[5%] right-[15%] opacity-30 animate-float-slow">
          <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="60" cy="60" r="58" stroke="white" strokeWidth="2" />
            <path d="M30 30L90 90" stroke="white" strokeWidth="2" />
            <path d="M30 90L90 30" stroke="white" strokeWidth="2" />
          </svg>
        </div> */}
        
        {/* <div className="hidden lg:block absolute bottom-[10%] right-[25%] opacity-20 animate-float">
          <svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="130" height="130" stroke="white" strokeWidth="2" />
            <rect x="30" y="30" width="90" height="90" stroke="white" strokeWidth="2" />
            <rect x="50" y="50" width="50" height="50" stroke="white" strokeWidth="2" />
          </svg>
        </div> */}
      </div>
      

      
      {/* Main content area */}
      <div className="relative z-10 w-full  flex flex-col lg:flex-row items-center justify-center px-6 py-8">
        {/* Left side - Hero text */}
        <div className="home-left-sidebar-mobile w-full lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left lg:pr-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 mb-4">
            Solana's Premier Guessing Game
          </h1>
          
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto lg:mx-0 mb-8">
            Experience fair odds, lightning-fast rounds, and fully on-chain randomness powered by advanced Orao VRF technology.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <a 
              href="/reveal255" 
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <span>🎮</span> Play Reveal255
            </a>
            
            <a 
              href="https://discord.gg/UTCKrAKKPW"
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/15 transition-colors flex items-center justify-center gap-2"
            >
              <span>💬</span> Join Discord
            </a>
          </div>
        </div>
        
        {/* Right side - Countdown card */}
        <div className="w-full lg:w-1/2 max-w-md">
          <LaunchCountdownCard />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-4 text-center text-white/60 text-sm">
        <p>Powered by <span className="font-medium text-white/80">Orao VRF</span> — provably fair randomness for every guess.</p>
      </footer>
    </main>
  );
}
