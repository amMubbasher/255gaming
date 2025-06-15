import "./globals.css";
import "@solana/wallet-adapter-react-ui/styles.css";
import { BottomAppBar } from "@/components/Reveal255/BottomAppBar";
import { TopAppBar } from "@/components/Reveal255/TopAppBar";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { SolanaProvider } from "@/components/Reveal255/provider/Solana";
import { Toaster } from "sonner";
import "../styles/wallet-adapter.css";
// import Header from "@/components/Reveal255/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Reveal 255",
  description: "Game",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark w-full max-w-full overflow-x-hidden">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground w-full max-w-full flex flex-col overflow-x-hidden`}
        style={{
          paddingTop: "env(safe-area-inset-top)",
          paddingBottom: "env(safe-area-inset-bottom)",
          paddingLeft: "env(safe-area-inset-left)",
          paddingRight: "env(safe-area-inset-right)",
        }}
      >
        <SolanaProvider>
          <TopAppBar />
          {/* <Header /> */}
          

          {/* ✅ Add top padding for fixed App Bar */}
          <main className="flex-1 w-full max-w-full flex items-center justify-center px-4 overflow-x-hidden ">
            {children}
          </main>

          <BottomAppBar />

          {/* ✅ Toaster aligned with card layout */}
          <div className="w-full px-4 max-w-md mx-auto">
            <Toaster
              position="bottom-center"
              theme="dark"
              closeButton
              richColors={false}
              toastOptions={{
                style: {
                  background: "rgba(23, 23, 23, 0.8)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "0.75rem",
                  padding: "0.75rem 1rem",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
                  maxWidth: "100%",
                },
                className: "toast-container",
              }}
            />
          </div>
        </SolanaProvider>
      </body>
    </html>
  );
}
