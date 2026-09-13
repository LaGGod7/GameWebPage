"use client";

import React, { useEffect, useState } from "react";
import {
  Volume2,
  VolumeX,
  CloudRain,
  ShoppingBag,
  ExternalLink,
  BookOpen,
  ShieldAlert,
  Cpu,
  Monitor,
  ChevronDown
} from "lucide-react";
import { soundManager } from "@/lib/soundManager";

interface MangaHeaderProps {
  currentIssue?: string;
  currentPage?: number;
  totalPages?: number;
}

export default function MangaHeader({
  currentIssue = "ISSUE #1: THE RESISTANCE",
  currentPage = 1,
  totalPages = 5,
}: MangaHeaderProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [isRustleEnabled, setIsRustleEnabled] = useState(true);
  const [showStoreDropdown, setShowStoreDropdown] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activePage, setActivePage] = useState(currentPage);

  useEffect(() => {
    setIsMuted(soundManager.getIsMuted());
    setIsRustleEnabled(soundManager.getPageRustleEnabled());

    const handleAudioToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isMuted: boolean }>;
      setIsMuted(customEvent.detail.isMuted);
    };

    const handleRustleToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ enabled: boolean }>;
      setIsRustleEnabled(customEvent.detail.enabled);
    };

    const handlePageChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ page: number }>;
      setActivePage(customEvent.detail.page);
    };

    window.addEventListener("liberated_audio_toggle", handleAudioToggle);
    window.addEventListener("liberated_rustle_toggle", handleRustleToggle);
    window.addEventListener("liberated_page_change", handlePageChange);

    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalScroll) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("liberated_audio_toggle", handleAudioToggle);
      window.removeEventListener("liberated_rustle_toggle", handleRustleToggle);
      window.removeEventListener("liberated_page_change", handlePageChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [totalPages]);

  const toggleSound = () => {
    const nextState = soundManager.toggleMute();
    setIsMuted(nextState);
  };

  const toggleRustleSound = () => {
    const nextState = soundManager.togglePageRustle();
    setIsRustleEnabled(nextState);
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
    <header className="sticky top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b-4 border-white text-white font-mono select-none">
      {/* Top Issue Bar */}
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-2 sm:gap-6 text-xs sm:text-sm">
        
        {/* Left: Game Title Logo & Issue Tag */}
        <div className="flex items-center gap-3">
          <div className="bg-white text-black font-comic tracking-widest px-2.5 py-0.5 text-sm sm:text-base uppercase font-black transform -skew-x-12 shadow-comic-sm border border-black">
            LIBERATED
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-manga-neonPink text-black text-[10px] font-mono font-bold px-1.5 py-0.5">
              VOL. 01
            </span>
            <span className="text-manga-neonCyan font-bold tracking-wider text-xs hidden sm:inline">
              {currentIssue}
            </span>
          </div>
        </div>

        {/* Center: Issue Nav Buttons */}
        <div className="hidden md:flex items-center gap-2">
          <button
            onClick={() => scrollToSection(0)}
            className={`px-2.5 py-1 text-xs border transition-colors flex items-center gap-1 font-bold ${
              activePage === 1
                ? "border-manga-neonCyan text-manga-neonCyan bg-manga-neonCyan/10 shadow-comic-neon-cyan"
                : "border-white/30 hover:border-manga-neonCyan hover:text-manga-neonCyan text-white"
            }`}
          >
            <BookOpen className="w-3 h-3" /> P.01 COVER
          </button>
          <button
            onClick={() => scrollToSection(32)}
            className={`px-2.5 py-1 text-xs border transition-colors flex items-center gap-1 font-bold ${
              activePage === 2
                ? "border-manga-neonPink text-manga-neonPink bg-manga-neonPink/10 shadow-comic-neon-pink"
                : "border-white/30 hover:border-manga-neonPink hover:text-manga-neonPink text-white"
            }`}
          >
            <ShieldAlert className="w-3 h-3" /> P.02 TRAILERS
          </button>
          <button
            onClick={() => scrollToSection(62)}
            className={`px-2.5 py-1 text-xs border transition-colors flex items-center gap-1 font-bold ${
              activePage === 3
                ? "border-manga-neonYellow text-manga-neonYellow bg-manga-neonYellow/10 shadow-comic-neon-yellow"
                : "border-white/30 hover:border-manga-neonYellow hover:text-manga-neonYellow text-white"
            }`}
          >
            <Cpu className="w-3 h-3" /> P.03 STORY
          </button>
          <button
            onClick={() => scrollToSection(90)}
            className={`px-2.5 py-1 text-xs border transition-colors flex items-center gap-1 font-bold ${
              activePage === 4
                ? "border-white text-white bg-white/10 shadow-comic-white-sm"
                : "border-white/30 hover:border-white hover:text-white text-white"
            }`}
          >
            <Monitor className="w-3 h-3" /> P.04 SPECS
          </button>
        </div>

        {/* Right: Audio Toggles & Buy CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Page Tracker Pill */}
          <div className="hidden lg:flex bg-neutral-900 border border-neutral-700 px-2.5 py-1 rounded text-[11px] font-bold tracking-widest text-manga-silver items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-manga-neonPink animate-ping" />
            <span>PAGE {String(activePage).padStart(2, "0")} / {String(totalPages).padStart(2, "0")}</span>
          </div>

          {/* Audio Toggle: Comic Page Rustle SFX */}
          <button
            onClick={toggleRustleSound}
            aria-label={isRustleEnabled ? "Mute comic page rustle sound effects" : "Enable comic page rustle sound effects"}
            title="Toggle Comic Page Rustle Sound FX"
            className={`group flex items-center gap-1.5 px-2.5 py-1 border-2 transition-all duration-200 cursor-pointer ${
              isRustleEnabled
                ? "border-manga-neonYellow bg-manga-neonYellow/10 text-manga-neonYellow shadow-comic-neon-yellow"
                : "border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-400"
            }`}
          >
            <BookOpen className={`w-3.5 h-3.5 ${isRustleEnabled ? "animate-pulse" : ""}`} />
            <span className="hidden sm:inline-block font-bold text-xs">
              {isRustleEnabled ? "PAGE SFX: ON" : "PAGE SFX: OFF"}
            </span>
          </button>

          {/* Audio Toggle: Dystopian Rain Ambiance */}
          <button
            onClick={toggleSound}
            aria-label={isMuted ? "Enable dystopian rain audio" : "Mute rain audio"}
            title="Toggle Continuous Rain Ambiance"
            className={`group flex items-center gap-1.5 px-2.5 py-1 border-2 transition-all duration-200 cursor-pointer ${
              !isMuted
                ? "border-manga-neonCyan bg-manga-neonCyan/10 text-manga-neonCyan shadow-comic-neon-cyan"
                : "border-neutral-700 bg-neutral-900 text-neutral-400 hover:border-neutral-400"
            }`}
          >
            {!isMuted ? (
              <CloudRain className="w-3.5 h-3.5 text-manga-neonCyan animate-bounce" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            )}
            <span className="hidden sm:inline-block font-bold text-xs">
              {!isMuted ? "RAIN: ON" : "RAIN: OFF"}
            </span>

            {/* Visual Equalizer Bars */}
            <div className="hidden sm:flex items-end gap-0.5 h-3.5 w-3.5 justify-center">
              <span
                className={`w-0.5 bg-current transition-all rounded-t-sm ${
                  !isMuted ? "animate-equalizer1" : "h-1"
                }`}
              />
              <span
                className={`w-0.5 bg-current transition-all rounded-t-sm ${
                  !isMuted ? "animate-equalizer2" : "h-1"
                }`}
              />
              <span
                className={`w-0.5 bg-current transition-all rounded-t-sm ${
                  !isMuted ? "animate-equalizer3" : "h-1"
                }`}
              />
            </div>
          </button>

          {/* Sticky Storefront 'Buy on Steam / GOG' CTA Button */}
          <div className="relative">
            <button
              onClick={() => {
                soundManager.playGunClick();
                setShowStoreDropdown(!showStoreDropdown);
              }}
              onMouseEnter={() => setShowStoreDropdown(true)}
              aria-expanded={showStoreDropdown}
              aria-label="Buy on Steam / GOG"
              className="px-3 py-1 bg-manga-neonYellow text-black font-comic font-black text-xs sm:text-sm uppercase flex items-center gap-1.5 border-2 border-black hover:bg-white hover:text-black transition-all shadow-comic-sm cursor-pointer transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <ShoppingBag className="w-3.5 h-3.5 fill-current" />
              <span>BUY ON STEAM / GOG</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${showStoreDropdown ? "rotate-180" : ""}`} />
            </button>

            {/* Dual Storefront Dropdown Launchers */}
            {showStoreDropdown && (
              <div
                onMouseLeave={() => setShowStoreDropdown(false)}
                className="absolute right-0 top-full mt-2 w-64 bg-neutral-950 border-4 border-white p-2.5 shadow-comic-lg z-50 space-y-2 animate-fadeIn"
              >
                <div className="text-[10px] font-mono text-manga-neonPink font-bold uppercase tracking-widest px-2 py-0.5 border-b border-neutral-800 flex items-center justify-between">
                  <span>// OFFICIAL DISTRIBUTORS</span>
                  <span className="text-white">PC / MAC</span>
                </div>

                <a
                  href="https://store.steampowered.com/app/875310/Liberated/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    soundManager.playImpactBoom();
                    setShowStoreDropdown(false);
                  }}
                  className="w-full px-3 py-2 bg-black hover:bg-neutral-900 border-2 border-neutral-700 hover:border-manga-neonCyan text-white text-xs font-mono font-bold flex items-center justify-between transition-all group cursor-pointer shadow-comic-sm"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-manga-neonCyan font-black font-comic text-sm leading-tight group-hover:text-white">
                      STEAM STORE
                    </span>
                    <span className="text-[10px] text-neutral-400">Includes Achievements & Badges</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-manga-neonCyan shrink-0" />
                </a>

                <a
                  href="https://www.gog.com/game/liberated"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    soundManager.playImpactBoom();
                    setShowStoreDropdown(false);
                  }}
                  className="w-full px-3 py-2 bg-black hover:bg-neutral-900 border-2 border-neutral-700 hover:border-manga-neonPink text-white text-xs font-mono font-bold flex items-center justify-between transition-all group cursor-pointer shadow-comic-sm"
                >
                  <div className="flex flex-col text-left">
                    <span className="text-manga-neonPink font-black font-comic text-sm leading-tight group-hover:text-white">
                      GOG.COM STORE
                    </span>
                    <span className="text-[10px] text-manga-neonYellow font-bold">100% DRM-FREE EDITION</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-manga-neonPink shrink-0" />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Comic Reading Progress Tracker Bar */}
      <div className="w-full bg-neutral-900 h-1.5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-manga-neonPink via-manga-neonCyan to-manga-neonYellow transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>
    </header>
  );
}
