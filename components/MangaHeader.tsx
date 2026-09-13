"use client";

import React, { useEffect, useState } from "react";
import { Volume2, VolumeX, Sparkles, BookOpen, Compass } from "lucide-react";
import { soundManager } from "@/lib/soundManager";

interface MangaHeaderProps {
  currentChapter?: string;
  currentPage?: number;
  totalPages?: number;
}

export default function MangaHeader({
  currentChapter = "CH. 01: GENESIS PROLOGUE",
  currentPage = 1,
  totalPages = 4,
}: MangaHeaderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    setIsMuted(soundManager.getIsMuted());

    const handleAudioToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isMuted: boolean }>;
      setIsMuted(customEvent.detail.isMuted);
    };

    window.addEventListener("manga_audio_toggle", handleAudioToggle);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
        
        // Calculate dynamic page 1 to 4
        const calculatedPage = Math.min(
          totalPages,
          Math.max(1, Math.floor((progress / 100) * totalPages) + 1)
        );
        setActivePage(calculatedPage);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("manga_audio_toggle", handleAudioToggle);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalPages]);

  const toggleSound = () => {
    const nextState = soundManager.toggleMute();
    setIsMuted(nextState);
  };

  const scrollToSection = (targetYPercent: number) => {
    soundManager.playPageTurn();
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: (totalScroll * targetYPercent) / 100,
      behavior: "smooth",
    });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b-4 border-white text-white font-mono select-none">
      {/* Top Issue Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2 sm:gap-6 text-xs sm:text-sm">
        
        {/* Left: Issue badge & Title */}
        <div className="flex items-center gap-3">
          <div className="bg-manga-neonPink text-black font-comic tracking-wider px-2 py-0.5 text-xs sm:text-sm uppercase font-black transform -skew-x-12 shadow-comic-sm">
            VOL. 01
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block font-black tracking-widest text-white">
              CYBER NOIR ARCHIVE //
            </span>
            <span className="text-manga-neonCyan font-bold tracking-wider text-xs">
              {currentChapter}
            </span>
          </div>
        </div>

        {/* Center: Issue Nav Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollToSection(0)}
            className="px-2.5 py-1 text-xs border border-white/30 hover:border-manga-neonCyan hover:text-manga-neonCyan transition-colors flex items-center gap-1 font-bold"
          >
            <BookOpen className="w-3 h-3" /> P.01 COVER
          </button>
          <button
            onClick={() => scrollToSection(35)}
            className="px-2.5 py-1 text-xs border border-white/30 hover:border-manga-neonPink hover:text-manga-neonPink transition-colors flex items-center gap-1 font-bold"
          >
            <Sparkles className="w-3 h-3" /> P.02 PROJECTS
          </button>
          <button
            onClick={() => scrollToSection(75)}
            className="px-2.5 py-1 text-xs border border-white/30 hover:border-manga-neonYellow hover:text-manga-neonYellow transition-colors flex items-center gap-1 font-bold"
          >
            <Compass className="w-3 h-3" /> P.03 DIALOGUE
          </button>
        </div>

        {/* Right: Sound Medallion & Equalizer */}
        <div className="flex items-center gap-3">
          {/* Page Tracker Pill */}
          <div className="bg-neutral-900 border border-neutral-700 px-2.5 py-1 rounded text-[11px] font-bold tracking-widest text-manga-silver flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-manga-neonPink animate-ping" />
            <span>PAGE {String(activePage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</span>
          </div>

          {/* Audio Toggle Medallion */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Unmute comic audio" : "Mute comic audio"}
            className={`group flex items-center gap-2 px-3 py-1 border-2 transition-all duration-200 cursor-pointer ${
              !isMuted
                ? "border-manga-neonCyan bg-manga-neonCyan/10 text-manga-neonCyan shadow-comic-neon-cyan"
                : "border-neutral-600 bg-neutral-900 text-neutral-400 hover:border-neutral-400"
            }`}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-neutral-400" />
            ) : (
              <Volume2 className="w-4 h-4 text-manga-neonCyan" />
            )}
            <span className="hidden sm:inline-block font-bold text-xs">
              {!isMuted ? "AUDIO ON" : "MUTED"}
            </span>

            {/* Visual Equalizer Bars */}
            <div className="flex items-end gap-0.5 h-4 w-4 justify-center">
              <span
                className={`w-1 bg-current transition-all rounded-t-sm ${
                  !isMuted ? "animate-equalizer1" : "h-1"
                }`}
              />
              <span
                className={`w-1 bg-current transition-all rounded-t-sm ${
                  !isMuted ? "animate-equalizer2" : "h-1"
                }`}
              />
              <span
                className={`w-1 bg-current transition-all rounded-t-sm ${
                  !isMuted ? "animate-equalizer3" : "h-1"
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Manga Page Progress Tracker Bar */}
      <div className="w-full bg-neutral-900 h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-manga-neonPink via-manga-neonCyan to-manga-neonYellow transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
