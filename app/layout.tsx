import type { Metadata } from "next";
import "./globals.css";
import MangaHeader from "@/components/MangaHeader";
import MangaCanvasOverlay from "@/components/MangaCanvasOverlay";
import GovernmentHUD from "@/components/GovernmentHUD";
import ImpactFXLayer from "@/components/ImpactFX";
import AchievementBadges from "@/components/AchievementBadges";

export const metadata: Metadata = {
  title: "LIBERATED // CYBERPUNK NOIR VIDEO GAME OFFICIAL SHOWCASE",
  description:
    "Enter the living dystopian graphic novel. Liberated is an action-adventure video game inside the pages of a comic book. Stealth, gunfights, and moral dilemmas.",
  keywords: [
    "Liberated",
    "Liberated Game",
    "Walkabout Games",
    "Atomic Wolf",
    "Cyberpunk Noir",
    "Playable Graphic Novel",
    "Action Adventure",
    "Side-Scroller",
    "Stealth Gunplay",
  ],
  authors: [{ name: "Atomic Wolf & Walkabout Games" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-black text-white antialiased selection:bg-manga-neonPink selection:text-white min-h-screen">
        {/* Global Manga Header */}
        <MangaHeader />

        {/* Fixed Viewport Manga Canvas Overlay (Speedlines, Halftone, Onomatopoeia) */}
        <MangaCanvasOverlay />

        {/* Government Surveillance HUD — Citizen Credit Score + Threat Level */}
        <GovernmentHUD />

        {/* Global Impact FX Layer — BAM! / POW! / CRACK! comic bursts */}
        <ImpactFXLayer />

        {/* Achievement toast notifications */}
        <AchievementBadges showAll={false} />

        {/* Main Application Viewport */}
        <main className="relative z-10 w-full min-h-screen overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}

