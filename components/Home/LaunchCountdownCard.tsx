// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";
// import Head from "next/head";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";

// const TARGET_DATE = new Date();
// TARGET_DATE.setDate(TARGET_DATE.getDate() + 21);

// export default function LaunchCountdownCard() {
//   const [timeLeft, setTimeLeft] = useState<string>("");

//   useEffect(() => {
//     const interval = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = TARGET_DATE.getTime() - now;

//       if (distance <= 0) {
//         setTimeLeft("We are live on mainnet!");
//         clearInterval(interval);
//         return;
//       }

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>255Gaming — Solana&apos;s Fair Guessing Game</title>
//         <meta
//           name="description"
//           content="Play Reveal255 — the Solana guessing game with unbeatable odds, fair payouts, and secure randomness via Orao VRF. Join us on mainnet soon!"
//         />
//         <meta property="og:title" content="255Gaming — Reveal255 on Solana" />
//         <meta
//           property="og:description"
//           content="Play Reveal255 — the Solana guessing game with unbeatable odds, fair payouts, and secure randomness via Orao VRF."
//         />
//         <meta property="og:image" content="/og-image.png" />
//         <meta property="og:url" content="https://gaming255.com" />
//       </Head>

//       <div className="w-full flex justify-center">
//         <Card className="w-full max-w-md text-white bg-white/10 backdrop-blur-md border border-white/10 shadow-xl text-center">
//           <CardHeader className="items-center">
//             <CardTitle className="text-xl">🎯 Welcome to 255Gaming</CardTitle>
//             <CardDescription className="text-white/90 text-sm">
//               Solana&apos;s ultimate guessing game — fair odds, fast rounds, and fully on-chain randomness.
//             </CardDescription>
//           </CardHeader>

//           <CardContent className="space-y-4">
//             <p className="text-sm text-white/80">
//               🚀 255Gaming is launching on <strong>Mainnet</strong> soon. Countdown below:
//             </p>
//             <div className="text-2xl font-bold tracking-wide">{timeLeft}</div>

//             <p className="text-sm text-white/80">
//               ⚔️ Play <strong>Reveal255</strong> now on Devnet and help us perfect the game before mainnet launch.
//             </p>
//           </CardContent>

//           <CardFooter className="flex flex-col gap-4">
//             <Button asChild>
//               <Link href="/reveal255">🎮 Play Reveal255 (Devnet)</Link>
//             </Button>

//             <Button variant="secondary" asChild>
//               <a
//                 href="https://discord.gg/UTCKrAKKPW"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 💬 Join our Discord
//               </a>
//             </Button>

//             <p className="text-xs text-white/70 text-center">
//               💡 Questions, bugs, partnerships, or want to know more about our mainnet launch? <br />
//               Join our Discord to connect with the team and stay updated.
//             </p>

//             <p className="text-xs text-white/70 text-center">
//               Powered by <strong>Orao VRF</strong> — provably fair randomness for every guess.
//             </p>
//           </CardFooter>
//         </Card>
//       </div>
//     </>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// Set target date for the countdown
const TARGET_DATE = new Date();
TARGET_DATE.setDate(TARGET_DATE.getDate() + 21);

export default function LaunchCountdownCard() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE.getTime() - now;

      if (distance <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          expired: true,
        });
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
        expired: false,
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className=" w-full backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-3xl">🎯</span>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-white mb-2">
          Mainnet Launch Countdown
        </h2>
        
        <p className="text-white/70 text-center mb-8">
          Join us when 255Gaming goes live on Solana Mainnet!
        </p>
        
        {timeLeft.expired ? (
          <div className="text-center py-4">
            <span className="text-2xl font-bold text-purple-400">We are live on mainnet!</span>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2 md:gap-4 mb-8">
            {[
              { value: timeLeft.days, label: "Days" },
              { value: timeLeft.hours, label: "Hours" },
              { value: timeLeft.minutes, label: "Minutes" },
              { value: timeLeft.seconds, label: "Seconds" }
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-full aspect-square bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center">
                  <span className="text-xl md:text-3xl font-bold text-white">
                    {item.value.toString().padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs mt-1 text-white/70">{item.label}</span>
              </div>
            ))}
          </div>
        )}
        
        <div className="space-y-4">
          <p className="text-white/80 text-center text-sm">
            Help us perfect the game before mainnet launch.
          </p>
          
          <Link 
            href="/reveal255" 
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <span>🎮</span> Try Reveal255 on Devnet
          </Link>
          
          <a
            href="https://discord.gg/UTCKrAKKPW"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-3 flex items-center justify-center gap-2 bg-white/10 border border-white/20 rounded-full text-white font-medium hover:bg-white/15 transition-colors"
          >
            <span>💬</span> Join our Discord
          </a>
          
          <div className="text-xs text-white/60 text-center pt-4 border-t border-white/10">
            <p>Questions or bugs? Need more information about our mainnet launch?</p>
            <p className="mt-1">Join our Discord to connect with the team.</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
