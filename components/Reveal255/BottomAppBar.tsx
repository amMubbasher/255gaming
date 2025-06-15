"use client";

import { Twitter, MessageCircle, Share2 } from "lucide-react";

export function BottomAppBar() {
  return (
    <footer className="sticky bottom-0 inset-x-0 z-50 bg-black/30 backdrop-blur-md border-t border-white/10">
      <div className="relative flex justify-center items-center gap-8 px-6 py-4 sm:py-5">
        <button className="text-white hover:text-white/70 transition">
          <Twitter size={22} />
        </button>
        <button className="text-white hover:text-white/70 transition">
          <MessageCircle size={22} />
        </button>
        <button className="text-white hover:text-white/70 transition">
          <Share2 size={22} />
        </button>
      </div>
    </footer>
  );
}
