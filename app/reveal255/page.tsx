import { Reveal255PlayCard } from "@/components/Reveal255/Reveal255PlayCard";

export const metadata = {
  title: "Reveal 255", // Added a title for completeness (optional)
  description: "Game", // Added a description for completeness (optional)
};

export const viewport = {
  width: "device-width",
  initialScale: 1.0,
  maximumScale: 1.0,
  userScalable: false,
  viewportFit: "cover", // Note: viewportFit is experimental
};

export default function Reveal255Page() {
  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Full background image for Reveal255 */}
      <div className="absolute inset-0 bg-[url('/BackGroundReveal.png')] bg-cover bg-center bg-no-repeat bg-rich_black-500" />

      {/* Content wrapper */}
      <div className="relative z-10  flex items-center justify-center px-4 pt-24">
        <div className="w-full max-w-md">
          <Reveal255PlayCard />
        </div>
      </div>
    </main>
  );
}