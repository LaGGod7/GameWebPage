import type { Metadata } from "next";
import "./globals.css";
import MangaHeader from "@/components/MangaHeader";
import MangaCanvasOverlay from "@/components/MangaCanvasOverlay";

export const metadata: Metadata = {
  title: "VOL. 01 // INTERACTIVE MANGA DIGITAL PORTFOLIO",
  description:
    "A scroll-driven cyber-noir manga portfolio featuring GSAP ScrollTrigger scrollytelling, native HTML Popovers, and CSS Anchor Positioning.",
  keywords: [
    "Manga Portfolio",
    "Cyberpunk",
    "GSAP ScrollTrigger",
    "Next.js 14",
    "Motion",
    "Scrollytelling",
    "Creative Developer",
    "Tailwind CSS",
  ],
  authors: [{ name: "Cyber Noir Manga Dev" }],
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

        {/* Main Application Viewport */}
        <main className="relative z-10 w-full min-h-screen overflow-x-hidden">
          {children}
        </main>
      </body>
    </html>
  );
}
