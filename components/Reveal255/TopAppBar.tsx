"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X, Home, Gamepad } from "lucide-react";
import { SiDiscord } from "react-icons/si";
import { WalletButton } from "./WalletButton";
import { cn } from "@/lib/utils";

export function TopAppBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { href: "/", label: "Home", icon: <Home size={16} className="mr-1" /> },
    { href: "/reveal255", label: "Reveal255", icon: <Gamepad size={16} className="mr-1" /> },
    {
      href: "https://discord.gg/UTCKrAKKPW",
      label: "Discord",
      icon: <SiDiscord size={16} className="mr-1" />,
      external: true,
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={cn(
      " top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled 
        ? "bg-gradient-to-r from-purple-900/95 via-indigo-900/95 to-black/95 backdrop-blur-md shadow-lg" 
        : "bg-gradient-to-r from-purple-900/80 via-indigo-900/80 to-black/80 backdrop-blur-sm"
    )}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            <Image
              src="/Logo.PNG"
              alt="255 Gaming"
              width={100}
              height={64}
              className="object-contain drop-shadow-md transition-transform hover:scale-105"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden sm:flex items-center gap-6">
            {navItems.map(({ href, label, icon, external }) =>
              external ? (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-white text-sm font-medium hover:text-purple-400 transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
                >
                  {icon}
                  {label}
                </a>
              ) : (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center text-white text-sm font-medium hover:text-purple-400 transition-colors duration-200 relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-purple-400 after:transition-all hover:after:w-full"
                >
                  {icon}
                  {label}
                </Link>
              )
            )}
            <div className="ml-4">
              <WalletButton />
            </div>
          </nav>

          {/* Mobile Controls & Dropdown */}
          <div className="sm:hidden flex items-center gap-1 relative z-50" ref={dropdownRef}>
            <div className="scale-90">
              <WalletButton />
            </div>
            <button
              className="text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile Dropdown */}
            <div
              className={cn(
                "absolute right-0 top-full mt-1 w-40 bg-gradient-to-br from-purple-900/95 to-indigo-900/95 rounded-lg shadow-lg overflow-hidden origin-top transition-all duration-200 ease-out transform backdrop-blur-md border border-white/10",
                menuOpen
                  ? "scale-y-100 opacity-100"
                  : "scale-y-95 opacity-0 pointer-events-none"
              )}
              style={{ transformOrigin: "top" }}
            >
              <div className="py-2 px-3 text-right">
                {navItems.map(({ href, label, icon, external }, index) =>
                  external ? (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block py-1.5 text-sm font-medium text-white hover:text-purple-400 transition-colors flex items-center",
                        index !== navItems.length - 1 && "border-b border-white/10"
                      )}
                    >
                      {icon}
                      {label}
                    </a>
                  ) : (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMenuOpen(false)}
                      className={cn(
                        "block py-1.5 text-sm font-medium text-white hover:text-purple-400 transition-colors flex items-center",
                        index !== navItems.length - 1 && "border-b border-white/10"
                      )}
                    >
                      {icon}
                      {label}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
