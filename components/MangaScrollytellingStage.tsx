"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { liberatedPillars, pressReviews, systemSpecs } from "@/data/gameData";
import ProjectPopoverModal, { SystemSpecsModal } from "./ProjectPopoverModal";
import ItemBadge from "./ItemBadge";
import BranchingDialogue from "./BranchingDialogue";
import HackingTerminal from "./HackingTerminal";
import AchievementBadges from "./AchievementBadges";
import { soundManager } from "@/lib/soundManager";
import {
  Sparkles,
  ShoppingBag,
  ChevronDown,
  BookOpen,
  Layers,
  Crosshair,
  Star,
  Monitor,
  ShieldAlert,
  Award,
  Play,
  Terminal,
  Cpu,
  HardDrive,
  CheckCircle2,
  Tv,
  Eye,
  Radio,
  ExternalLink
} from "lucide-react";

export default function MangaScrollytellingStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activeTrailerTab, setActiveTrailerTab] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handleMotionChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };

      mediaQuery.addEventListener("change", handleMotionChange);

      if (mediaQuery.matches) {
        return () => mediaQuery.removeEventListener("change", handleMotionChange);
      }

      const ctx = gsap.context(() => {
        // Enforce explicit initial visibility states
        gsap.set(".frame-hero-cover", { opacity: 1, pointerEvents: "auto", scale: 1 });
        gsap.set(".frame-gameplay-trailers", { opacity: 0, pointerEvents: "none", scale: 0.94 });
        gsap.set(".frame-dialogue-preview", { opacity: 0, pointerEvents: "none", scale: 0.94 });
        gsap.set(".frame-specs-reviews", { opacity: 0, pointerEvents: "none", scale: 0.94 });

        let lastActivePage = 1;

        // Set Frame 5 initial hidden state
        gsap.set(".frame-wanted-poster", { opacity: 0, pointerEvents: "none", scale: 0.94 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=6200",
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Calculate active sequential comic frame
              const p = self.progress;
              let page = 1;
              if (p >= 0.88) {
                page = 5;
              } else if (p >= 0.66) {
                page = 4;
              } else if (p >= 0.44) {
                page = 3;
              } else if (p >= 0.20) {
                page = 2;
              } else {
                page = 1;
              }

              if (page !== lastActivePage) {
                soundManager.playPageTurn();
                lastActivePage = page;
                if (typeof window !== "undefined") {
                  window.dispatchEvent(
                    new CustomEvent("liberated_page_change", { detail: { page } })
                  );
                  // Unlock "LIBERATED" achievement when reaching the final back-cover frame
                  if (page === 5) {
                    window.dispatchEvent(
                      new CustomEvent("liberated_achievement", { detail: { id: "ach_liberated" } })
                    );
                  }
                }
              }
            },
          },
        });

        // ══════════════════════════════════════════════════════════
        // FRAME 1: HERO COVER STAGE (0.0 -> 2.2)
        // ══════════════════════════════════════════════════════════
        // Camera parallax push-in: entering the comic panel
        tl.to(
          ".protagonist-cutout",
          {
            xPercent: 12,
            scale: 1.14,
            duration: 1.4,
            ease: "none",
          },
          0
        )
          .to(
            ".hero-halftone-bg",
            {
              scale: 1.15,
              opacity: 0.5,
              duration: 1.4,
              ease: "none",
            },
            0
          )
          .to(
            ".frame-hero-cover",
            {
              scale: 1.04,
              duration: 1.4,
              ease: "none",
            },
            0
          )
          // Frame 1 exit -> Frame 2 entry transition
          .to(
            ".frame-hero-cover",
            {
              opacity: 0,
              scale: 1.12,
              filter: "blur(4px)",
              duration: 0.8,
              pointerEvents: "none",
              ease: "power2.inOut",
            },
            1.4
          )
          .to(
            ".frame-gameplay-trailers",
            {
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              duration: 0.8,
              ease: "power2.out",
            },
            1.6
          );

        // ══════════════════════════════════════════════════════════
        // FRAME 2: GAMEPLAY TRAILERS & 3-PANEL ACTION SPREAD (2.2 -> 5.4)
        // ══════════════════════════════════════════════════════════
        // Sequential entrance of speech bubble and individual trailer panels
        tl.from(
          ".trailers-speech-bubble",
          {
            scale: 0,
            opacity: 0,
            y: -24,
            transformOrigin: "top center",
            duration: 0.6,
            ease: "back.out(1.7)",
          },
          2.0
        )
          .from(
            ".trailer-panel-1",
            {
              xPercent: -45,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            2.2
          )
          .from(
            ".trailer-panel-2",
            {
              yPercent: 45,
              opacity: 0,
              duration: 0.7,
              ease: "back.out(1.4)",
            },
            2.4
          )
          .from(
            ".trailer-panel-3",
            {
              xPercent: 45,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            2.6
          )
          // Hold duration for Frame 2 reading and trailer inspection
          .to({}, { duration: 1.4 }, 3.3)
          // Frame 2 exit -> Frame 3 entry transition
          .to(
            ".frame-gameplay-trailers",
            {
              opacity: 0,
              scale: 0.95,
              yPercent: -6,
              filter: "blur(3px)",
              duration: 0.8,
              pointerEvents: "none",
              ease: "power2.inOut",
            },
            4.7
          )
          .to(
            ".frame-dialogue-preview",
            {
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              duration: 0.8,
              ease: "power2.out",
            },
            4.9
          );

        // ══════════════════════════════════════════════════════════
        // FRAME 3: INTERACTIVE DIALOGUE PREVIEW (5.4 -> 8.0)
        // ══════════════════════════════════════════════════════════
        tl.from(
          ".dialogue-inner-box",
          {
            scale: 0.92,
            opacity: 0,
            y: 30,
            duration: 0.7,
            ease: "power2.out",
          },
          5.2
        )
          // Hold duration for interacting with dialogue choices and factions
          .to({}, { duration: 1.5 }, 5.9)
          // Frame 3 exit -> Frame 4 entry transition
          .to(
            ".frame-dialogue-preview",
            {
              opacity: 0,
              scale: 0.95,
              yPercent: -6,
              filter: "blur(3px)",
              duration: 0.8,
              pointerEvents: "none",
              ease: "power2.inOut",
            },
            7.4
          )
          .to(
            ".frame-specs-reviews",
            {
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              duration: 0.8,
              ease: "power2.out",
            },
            7.6
          );

        // ══════════════════════════════════════════════════════════
        // FRAME 4: SYSTEM SPECS & BACK COVER ACCLAIM (8.0 -> 10.6)
        // ══════════════════════════════════════════════════════════
        tl.from(
          ".specs-card-minimum",
          {
            xPercent: -40,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          8.0
        )
          .from(
            ".specs-card-recommended",
            {
              xPercent: 40,
              opacity: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            8.2
          )
          .from(
            ".specs-reviews-strip",
            {
              yPercent: 35,
              opacity: 0,
              duration: 0.7,
              ease: "power2.out",
            },
            8.4
          )
          // Final hold duration for specs and purchase CTAs
          .to({}, { duration: 1.5 }, 9.1)
          // Frame 4 exit → Frame 5 entry transition
          .to(
            ".frame-specs-reviews",
            {
              opacity: 0,
              scale: 0.95,
              filter: "blur(3px)",
              duration: 0.7,
              pointerEvents: "none",
              ease: "power2.inOut",
            },
            10.6
          )
          .to(
            ".frame-wanted-poster",
            {
              opacity: 1,
              scale: 1,
              pointerEvents: "auto",
              duration: 0.8,
              ease: "power2.out",
            },
            10.8
          )
          // Stamp-drop animation on WANTED badge
          .from(
            ".wanted-stamp",
            { scale: 2.5, opacity: 0, rotation: -15, duration: 0.5, ease: "back.out(2.5)" },
            11.0
          )
          // Back cover CTA buttons fly in
          .from(
            ".wanted-cta-steam",
            { xPercent: -40, opacity: 0, duration: 0.6, ease: "power3.out" },
            11.2
          )
          .from(
            ".wanted-cta-gog",
            { xPercent: 40, opacity: 0, duration: 0.6, ease: "power3.out" },
            11.3
          )
          .from(
            ".wanted-achievements",
            { yPercent: 30, opacity: 0, duration: 0.5, ease: "power2.out" },
            11.5
          )
          .to({}, { duration: 1.2 }, 11.8);
      }, containerRef);

      return () => {
        ctx.revert();
        mediaQuery.removeEventListener("change", handleMotionChange);
      };
    }
  }, []);

  const openPillarModal = (popoverId: string) => {
    soundManager.playGunClick();
    const modalEl = document.getElementById(popoverId);
    if (modalEl) {
      if (typeof modalEl.showPopover === "function") {
        modalEl.showPopover();
      } else {
        modalEl.style.display = "block";
      }
    }
  };

  const openSpecsModal = () => {
    soundManager.playBubblePop();
    const modalEl = document.getElementById("modal-specs");
    if (modalEl) {
      if (typeof modalEl.showPopover === "function") {
        modalEl.showPopover();
      } else {
        modalEl.style.display = "block";
      }
    }
  };

  // ═════════════════════════════════════════════════════════════════
  // ACCESSIBLE STATIC LAYOUT (PREFERS-REDUCED-MOTION)
  // ═════════════════════════════════════════════════════════════════
  if (prefersReducedMotion) {
    return (
      <div className="w-full min-h-screen bg-black text-white pt-20 pb-24 px-4 space-y-20 font-mono select-none">
        {/* Frame 1: Cover */}
        <div className="max-w-6xl mx-auto border-4 border-white p-6 sm:p-8 bg-neutral-950 shadow-comic-lg">
          <div className="bg-manga-neonPink text-black font-comic px-3 py-1 inline-block text-lg font-black transform -skew-x-12 mb-4">
            ISSUE 01 // LIBERATED OFFICIAL SHOWCASE
          </div>
          <h1 className="text-4xl sm:text-7xl font-comic text-white uppercase tracking-wider mb-3">
            LIBERATED <span className="text-manga-neonCyan">PLAYABLE COMIC</span>
          </h1>
          <p className="font-mono text-sm text-neutral-300 leading-relaxed mb-6 max-w-3xl">
            Enter an action-adventure game played entirely across living graphic novel frames. Stealth, gunfights, and moral dilemmas.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://store.steampowered.com/app/875310/Liberated/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-manga-neonYellow text-black font-comic font-black text-base uppercase border-2 border-black shadow-comic"
            >
              WISHLIST ON STEAM
            </a>
            <button
              onClick={openSpecsModal}
              className="px-4 py-2 bg-black text-white font-mono text-xs uppercase border-2 border-white hover:border-manga-neonCyan transition-colors"
            >
              VIEW HARDWARE SPECS
            </button>
          </div>
        </div>

        {/* Frame 2: Gameplay Pillars */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-comic text-manga-neonCyan uppercase mb-6 border-b-4 border-white pb-2 flex items-center gap-2">
            <Crosshair className="w-6 h-6" /> GAMEPLAY TRAILERS & TACTICAL PILLARS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {liberatedPillars.map((pillar) => (
              <div key={pillar.id} className="border-4 border-white bg-neutral-900 p-6 shadow-comic flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-manga-neonPink font-bold mb-1">
                    //{pillar.codename}
                  </div>
                  <h3 className="text-2xl font-comic text-white mb-2">{pillar.title}</h3>
                  <p className="text-xs text-neutral-300 font-sans mb-4">{pillar.description}</p>
                </div>
                <button
                  onClick={() => openPillarModal(pillar.popoverId)}
                  className="w-full py-2 bg-manga-neonCyan text-black font-comic font-black text-sm uppercase border-2 border-black shadow-comic"
                >
                  INSPECT DOSSIER
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Frame 3: Interactive Dialogue */}
        <div className="max-w-6xl mx-auto">
          <BranchingDialogue />
        </div>

        {/* Frame 4: System Specs */}
        <div className="max-w-6xl mx-auto border-4 border-white bg-neutral-950 p-6 shadow-comic-lg">
          <h2 className="text-3xl font-comic text-manga-neonYellow uppercase mb-6 border-b-4 border-white pb-2 flex items-center gap-2">
            <Monitor className="w-6 h-6" /> PC HARDWARE REQUIREMENTS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-300">
            <div className="border-2 border-neutral-700 p-4 bg-neutral-900 space-y-2">
              <div className="font-comic text-sm text-manga-neonCyan font-bold uppercase">MINIMUM SPECIFICATIONS</div>
              <div><strong>OS:</strong> {systemSpecs.minimum.os}</div>
              <div><strong>Processor:</strong> {systemSpecs.minimum.processor}</div>
              <div><strong>Memory:</strong> {systemSpecs.minimum.memory}</div>
              <div><strong>Graphics:</strong> {systemSpecs.minimum.graphics}</div>
              <div><strong>Storage:</strong> {systemSpecs.minimum.storage}</div>
            </div>
            <div className="border-2 border-manga-neonPink p-4 bg-neutral-900 space-y-2">
              <div className="font-comic text-sm text-manga-neonPink font-bold uppercase">RECOMMENDED SPECIFICATIONS</div>
              <div><strong>OS:</strong> {systemSpecs.recommended.os}</div>
              <div><strong>Processor:</strong> {systemSpecs.recommended.processor}</div>
              <div><strong>Memory:</strong> {systemSpecs.recommended.memory}</div>
              <div><strong>Graphics:</strong> {systemSpecs.recommended.graphics}</div>
              <div><strong>Storage:</strong> {systemSpecs.recommended.storage}</div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {liberatedPillars.map((pillar) => (
          <ProjectPopoverModal key={pillar.id} pillar={pillar} />
        ))}
        <SystemSpecsModal />
      </div>
    );
  }

  // ═════════════════════════════════════════════════════════════════
  // GSAP 4-FRAME SCROLLYTELLING PINNED ENGINE
  // ═════════════════════════════════════════════════════════════════
  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden select-none">
      
      {/* ───────────────────────────────────────────────────────────── */}
      {/* FRAME 1: HERO COVER STAGE (0% -> 25%) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="frame-hero-cover absolute inset-0 bg-neutral-950 clip-manga-hero-full flex items-center justify-center overflow-hidden">
        {/* Halftone Screentone Backdrop */}
        <div className="hero-halftone-bg absolute inset-0 bg-halftone opacity-35 scale-100 transition-transform pointer-events-none" />
        <div className="absolute inset-0 bg-speedlines opacity-30 pointer-events-none" />

        {/* Heavy Ink Comic Diagonal Cut Frame */}
        <div className="absolute inset-3 sm:inset-8 border-4 sm:border-8 border-white bg-black/90 shadow-comic-lg overflow-hidden flex flex-col justify-between p-4 sm:p-10">
          {/* Top Issue Title Bar */}
          <div className="flex items-center justify-between border-b-4 border-white pb-3 z-10">
            <div className="flex items-center gap-3">
              <span className="bg-manga-neonPink text-black font-comic px-3 py-0.5 text-base sm:text-lg font-black transform -skew-x-12 shadow-comic-sm">
                ISSUE 01 // THE RESISTANCE
              </span>
              <span className="text-manga-neonCyan text-xs font-mono font-bold tracking-widest hidden sm:inline">
                OFFICIAL GAME SHOWCASE
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openSpecsModal}
                className="px-2.5 py-1 text-xs font-mono font-bold border border-neutral-700 bg-neutral-900 text-manga-neonYellow hover:border-manga-neonYellow transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Monitor className="w-3.5 h-3.5" /> SYSTEM SPECS
              </button>
            </div>
          </div>

          {/* Hero Center Grid: Title + Protagonist Cutout */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
            {/* Left Col: Hero Title & Game Quote Bubble */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              {/* Press Quote Speech Bubble */}
              <div className="quote-bubble bg-white text-black border-4 border-black p-4 sm:p-6 rounded-3xl max-w-lg shadow-comic speech-bubble-tail-bottom">
                <div className="text-[10px] font-mono font-black text-manga-neonPink tracking-widest uppercase mb-1">
                  // CRITICAL ACCLAIM — GAME INFORMER
                </div>
                <p className="font-comic text-lg sm:text-2xl text-black tracking-wide leading-tight">
                  &ldquo;ENTER AN ACTION-ADVENTURE GAME INSIDE A LIVING, HAND-DRAWN COMIC BOOK.&rdquo;
                </p>
                <div className="mt-2 flex items-center justify-between text-xs font-mono font-bold text-neutral-600">
                  <span>GAME INFORMER</span>
                  <span className="text-black font-comic text-sm">★ 9.0 / 10</span>
                </div>
              </div>

              {/* Bold Title */}
              <div>
                <div className="text-xs sm:text-sm font-mono font-bold text-manga-neonCyan tracking-widest uppercase mb-1 flex items-center gap-2">
                  <Crosshair className="w-4 h-4" /> CYBERPUNK NOIR // PUZZLE PLATFORMER
                </div>
                <h1 className="text-5xl sm:text-8xl font-comic text-white uppercase tracking-wider leading-none">
                  LIBERATED
                </h1>
                <p className="text-xs sm:text-sm font-mono text-neutral-300 mt-2 max-w-xl">
                  A dystopian action-adventure game played entirely across living graphic novel frames.
                </p>
              </div>

              {/* Store & Feature Badges */}
              <div className="hero-store-badges flex flex-wrap gap-2 pt-2">
                <ItemBadge label="Stealth Action" rarity="legendary" iconText="👁" />
                <ItemBadge label="Noir Gunfights" rarity="legendary" iconText="💥" />
                <ItemBadge label="Cyber Hacking" rarity="epic" iconText="💻" />
                <ItemBadge label="Branching Lore" rarity="epic" iconText="📖" />
                <ItemBadge label="Full Audio SFX" rarity="rare" iconText="🎧" />
              </div>
            </div>

            {/* Right Col: Protagonist Silhouetted Cutout */}
            <div className="lg:col-span-5 relative h-60 sm:h-96 flex items-center justify-center">
              <div className="protagonist-cutout relative w-full h-full flex items-center justify-center">
                {/* Comic Halftone Shadow Circle */}
                <div className="absolute w-52 h-52 sm:w-72 sm:h-72 rounded-full bg-manga-neonPink/20 border-4 border-manga-neonPink filter blur-sm -z-10" />

                {/* Liberated Protagonist Silhouette Art */}
                <svg
                  viewBox="0 0 300 400"
                  className="w-full h-full max-h-80 sm:max-h-96 object-contain filter drop-shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                >
                  <polygon
                    points="150,40 180,90 220,100 190,140 200,190 150,160 100,190 110,140 80,100 120,90"
                    fill="#FFE600"
                    opacity="0.15"
                  />
                  <path
                    d="M100,180 L150,150 L200,180 L230,340 L190,390 L150,375 L110,390 L70,340 Z"
                    fill="#080808"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                  />
                  <polygon
                    points="210,190 260,185 270,210 240,215 225,230 205,210"
                    fill="#18181b"
                    stroke="#00E5FF"
                    strokeWidth="3"
                  />
                  <line x1="260" y1="185" x2="290" y2="180" stroke="#FF0055" strokeWidth="3" className="animate-pulse" />
                  <polygon
                    points="120,80 180,80 170,150 150,170 130,150"
                    fill="#111114"
                    stroke="#FFFFFF"
                    strokeWidth="4"
                  />
                  <rect x="130" y="105" width="40" height="10" fill="#FF0055" className="animate-pulse" />
                  <text
                    x="210"
                    y="80"
                    fontFamily="'Bangers', Impact"
                    fontSize="34"
                    fill="#FFE600"
                    className="manga-stroke"
                  >
                    BANG!
                  </text>
                </svg>

                <div className="absolute -bottom-4 right-0 font-comic font-black text-4xl text-white/20 select-none">
                  ズズズ
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Indicator */}
          <div className="flex items-center justify-between border-t-2 border-neutral-800 pt-3 z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-manga-silver">
              <span className="w-2 h-2 rounded-full bg-manga-neonCyan animate-ping" />
              <span>SCROLL TO ADVANCE TO GAMEPLAY TRAILERS</span>
            </div>
            <div className="flex items-center gap-1 font-comic text-sm text-manga-neonCyan animate-bounce">
              <span>EXPLORE FRAME 02</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* FRAME 2: GAMEPLAY TRAILERS & 3-PANEL ACTION SPREAD (25% -> 55%) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="frame-gameplay-trailers absolute inset-0 bg-neutral-950 opacity-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 overflow-hidden">
        {/* Screentone Texture */}
        <div className="absolute inset-0 bg-screentone-lines opacity-30 pointer-events-none" />

        {/* Header Strip */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-b-4 border-white pb-3 pt-12 sm:pt-14">
          <div className="flex items-center gap-3">
            <span className="bg-manga-neonCyan text-black font-comic px-3 py-0.5 text-base sm:text-lg font-black transform -skew-x-12 shadow-comic-sm">
              FRAME 02 // GAMEPLAY TRAILERS
            </span>
            <span className="text-white text-xs font-mono font-bold tracking-widest hidden sm:inline">
              INTERACTIVE NOIR ACTION SEQUENCE
            </span>
          </div>
          <div className="text-[11px] font-mono text-manga-neonPink font-bold uppercase flex items-center gap-1">
            <Tv className="w-3.5 h-3.5" /> LIVE TRAILER PREVIEW
          </div>
        </div>

        {/* Anchored Speech Bubble & Quick Trailer Selectors */}
        <div className="trailers-speech-bubble relative z-10 max-w-7xl mx-auto w-full my-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div
            id="bubble-p1"
            className="inline-flex items-center gap-2 bg-white text-black border-4 border-black px-4 py-2 rounded-2xl shadow-comic text-xs sm:text-sm font-comic"
          >
            <Sparkles className="w-4 h-4 text-manga-neonPink fill-current shrink-0" />
            <span>&ldquo;EXPERIENCE STEALTH, GUNFIGHTS, AND MORAL CHOICES INSIDE LIVING COMIC PAGES.&rdquo;</span>
          </div>

          {/* Quick Trailer Selection Badges */}
          <div className="flex items-center gap-2">
            {liberatedPillars.map((p, i) => (
              <button
                key={p.id}
                onClick={() => {
                  soundManager.playGunClick();
                  setActiveTrailerTab(i);
                }}
                className={`px-2.5 py-1 text-xs font-mono font-bold uppercase border-2 transition-all cursor-pointer flex items-center gap-1 ${
                  activeTrailerTab === i
                    ? "bg-manga-neonYellow text-black border-black shadow-comic-sm"
                    : "bg-black text-neutral-400 border-neutral-700 hover:border-white hover:text-white"
                }`}
              >
                <Play className={`w-3 h-3 ${activeTrailerTab === i ? "fill-current text-black" : ""}`} />
                <span>TRAILER 0{i + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 3-Panel Comic Trailer Grid */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-auto">
          {liberatedPillars.map((pillar, idx) => {
            const cardClipClasses = [
              "clip-manga-card-1",
              "clip-manga-card-2",
              "clip-manga-card-3",
            ][idx % 3];

            const panelNumber = idx + 1;
            const isSelected = activeTrailerTab === idx;

            return (
              <div
                key={pillar.id}
                id={`anchor-p${panelNumber}`}
                className={`trailer-panel-${panelNumber} group relative border-4 bg-black p-5 sm:p-6 shadow-comic-lg hover:shadow-comic-neon-cyan transition-all duration-300 flex flex-col justify-between cursor-pointer ${cardClipClasses} ${
                  isSelected ? "border-manga-neonCyan ring-2 ring-manga-neonCyan" : "border-white"
                }`}
                onClick={() => {
                  setActiveTrailerTab(idx);
                  openPillarModal(pillar.popoverId);
                }}
              >
                {/* Screentone Backdrop */}
                <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />

                {/* Top Card Badge */}
                <div className="relative z-10 flex items-center justify-between border-b-2 border-neutral-700 pb-2 mb-3">
                  <span className="font-comic text-xs uppercase px-2 py-0.5 bg-manga-neonPink text-black font-black">
                    PANEL 0{panelNumber}
                  </span>
                  <span className="text-[10px] font-mono text-manga-neonCyan font-bold flex items-center gap-1">
                    <Play className="w-3 h-3 fill-current text-manga-neonYellow" /> {pillar.category}
                  </span>
                </div>

                {/* Animated Simulated Trailer Frame */}
                <div className="relative z-10 my-2 h-24 sm:h-28 border-2 border-neutral-700 bg-neutral-900 flex items-center justify-center overflow-hidden group-hover:border-manga-neonCyan transition-colors">
                  {idx === 0 && (
                    /* Stealth Trailer Animation */
                    <div className="relative w-full h-full bg-neutral-950 flex items-center justify-center">
                      <div className="absolute inset-0 bg-screentone-crosshatch opacity-30" />
                      <div className="w-8 h-8 rounded-full border-2 border-manga-neonCyan animate-ping opacity-75" />
                      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-manga-neonCyan flex items-center gap-1">
                        <Eye className="w-3 h-3" /> NOISE: 12 dB // INVISIBLE
                      </div>
                    </div>
                  )}

                  {idx === 1 && (
                    /* Gunfight Trailer Animation */
                    <div className="relative w-full h-full bg-neutral-950 flex items-center justify-center">
                      <div className="absolute inset-0 bg-screentone-lines opacity-30" />
                      <div className="text-2xl font-comic text-manga-neonYellow manga-stroke animate-pulse">
                        RATATATA!
                      </div>
                      <div className="absolute bottom-2 left-3 text-[10px] font-mono text-manga-neonPink flex items-center gap-1">
                        <Crosshair className="w-3 h-3" /> RECOIL: LOCK ON
                      </div>
                    </div>
                  )}

                  {idx === 2 && (
                    /* Live Hacking Terminal — replaces static preview */
                    <div className="relative w-full h-full">
                      <HackingTerminal
                        className="w-full h-full border-0 shadow-none"
                        onHackAchieved={(id) => {
                          if (typeof window !== "undefined") {
                            window.dispatchEvent(new CustomEvent("liberated_achievement", { detail: { id } }));
                          }
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="relative z-10 space-y-1">
                  <h3 className="text-xl sm:text-2xl font-comic text-white tracking-wide group-hover:text-manga-neonCyan transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-mono text-manga-silver line-clamp-2">
                    {pillar.tagline}
                  </p>
                </div>

                {/* Bottom CTA Trigger */}
                <div className="relative z-10 pt-3 mt-2 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white transition-colors flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> READ DOSSIER
                  </span>
                  <button
                    popovertarget={pillar.popoverId}
                    onClick={(e) => {
                      e.stopPropagation();
                      openPillarModal(pillar.popoverId);
                    }}
                    className="px-3 py-1 bg-manga-neonYellow text-black font-comic font-black text-xs uppercase border border-black shadow-comic-sm group-hover:bg-white transition-colors"
                  >
                    INSPECT ❯
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Navigation Cue */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t-2 border-neutral-800 pt-2 pb-1">
          <span className="text-[10px] font-mono text-manga-silver">
            CONTINUE SCROLLING TO ENTER FRAME 03: INTERACTIVE DIALOGUE
          </span>
          <span className="text-xs font-comic text-manga-neonPink animate-bounce">
            FRAME 03 ❯❯
          </span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* FRAME 3: INTERACTIVE DIALOGUE PREVIEWS (55% -> 80%) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="frame-dialogue-preview absolute inset-0 bg-black opacity-0 pointer-events-none flex items-center justify-center p-4 pt-16 overflow-y-auto">
        <div className="dialogue-inner-box w-full max-w-7xl mx-auto my-auto space-y-4">
          <BranchingDialogue />
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* FRAME 4: SYSTEM SPECS & BACK COVER ACCLAIM (80% -> 100%) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="frame-specs-reviews absolute inset-0 bg-neutral-950 opacity-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 pt-16 overflow-y-auto">
        <div className="max-w-7xl mx-auto w-full my-auto space-y-6">
          {/* Top Banner */}
          <div className="flex items-center justify-between border-b-4 border-white pb-3">
            <div className="flex items-center gap-3">
              <span className="bg-manga-neonYellow text-black font-comic px-3 py-0.5 text-base sm:text-lg font-black transform -skew-x-12 shadow-comic-sm">
                FRAME 04 // SYSTEM SPECS & PRESS ACCLAIM
              </span>
              <span className="text-manga-neonCyan text-xs font-mono font-bold tracking-widest hidden sm:inline">
                PC REQUIREMENTS & CRITICAL RECEPTION
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://store.steampowered.com/app/875310/Liberated/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playImpactBoom()}
                className="px-4 py-1.5 bg-manga-neonYellow text-black font-comic font-black text-xs sm:text-sm uppercase border-2 border-black hover:bg-white transition-colors shadow-comic-sm flex items-center gap-1.5"
              >
                <ShoppingBag className="w-4 h-4 fill-current" /> BUY ON STEAM
              </a>
            </div>
          </div>

          {/* Side-by-Side Hardware Specs Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Minimum Specs Card */}
            <div className="specs-card-minimum border-4 border-neutral-700 bg-neutral-900/90 p-5 shadow-comic space-y-3">
              <div className="flex items-center justify-between border-b-2 border-neutral-700 pb-2">
                <span className="font-comic text-base text-manga-neonCyan uppercase font-black flex items-center gap-2">
                  <Monitor className="w-4 h-4" /> MINIMUM HARDWARE SPECS
                </span>
                <span className="text-[10px] font-mono text-manga-silver">TARGET: 1080P / 30 FPS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                <div className="border border-neutral-800 p-2 bg-black">
                  <div className="text-[10px] text-manga-silver uppercase">OPERATING SYSTEM</div>
                  <div className="font-bold text-white truncate">{systemSpecs.minimum.os}</div>
                </div>
                <div className="border border-neutral-800 p-2 bg-black">
                  <div className="text-[10px] text-manga-silver uppercase">PROCESSOR (CPU)</div>
                  <div className="font-bold text-white truncate">{systemSpecs.minimum.processor}</div>
                </div>
                <div className="border border-neutral-800 p-2 bg-black">
                  <div className="text-[10px] text-manga-silver uppercase">MEMORY (RAM)</div>
                  <div className="font-bold text-white truncate">{systemSpecs.minimum.memory}</div>
                </div>
                <div className="border border-neutral-800 p-2 bg-black">
                  <div className="text-[10px] text-manga-silver uppercase">GRAPHICS (GPU)</div>
                  <div className="font-bold text-white truncate">{systemSpecs.minimum.graphics}</div>
                </div>
              </div>
            </div>

            {/* Recommended Specs Card */}
            <div className="specs-card-recommended border-4 border-manga-neonPink bg-neutral-900/90 p-5 shadow-comic-neon-pink space-y-3">
              <div className="flex items-center justify-between border-b-2 border-neutral-700 pb-2">
                <span className="font-comic text-base text-manga-neonPink uppercase font-black flex items-center gap-2">
                  <Award className="w-4 h-4" /> RECOMMENDED HARDWARE SPECS
                </span>
                <span className="text-[10px] font-mono text-manga-neonYellow font-bold">TARGET: 1440P / 60 FPS</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono text-neutral-300">
                <div className="border border-neutral-800 p-2 bg-black">
                  <div className="text-[10px] text-manga-silver uppercase">OPERATING SYSTEM</div>
                  <div className="font-bold text-white truncate">{systemSpecs.recommended.os}</div>
                </div>
                <div className="border border-neutral-800 p-2 bg-black">
                  <div className="text-[10px] text-manga-silver uppercase">PROCESSOR (CPU)</div>
                  <div className="font-bold text-white truncate">{systemSpecs.recommended.processor}</div>
                </div>
                <div className="border border-neutral-800 p-2 bg-black">
                  <div className="text-[10px] text-manga-silver uppercase">MEMORY (RAM)</div>
                  <div className="font-bold text-white truncate">{systemSpecs.recommended.memory}</div>
                </div>
                <div className="border border-neutral-800 p-2 bg-black">
                  <div className="text-[10px] text-manga-silver uppercase">GRAPHICS (GPU)</div>
                  <div className="font-bold text-white truncate">{systemSpecs.recommended.graphics}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Press Review Quote Strip */}
          <div className="specs-reviews-strip grid grid-cols-2 sm:grid-cols-4 gap-3">
            {pressReviews.map((review, i) => (
              <div key={i} className="border-2 border-white bg-black p-3.5 shadow-comic space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-comic text-manga-neonPink uppercase font-black">
                    {review.outlet}
                  </span>
                  {review.score && (
                    <span className="text-xs font-comic text-manga-neonYellow">
                      {review.score}
                    </span>
                  )}
                </div>
                <p className="text-[11px] font-mono text-neutral-300 leading-tight line-clamp-3">
                  &ldquo;{review.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Credits */}
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between border-t-2 border-neutral-800 pt-3 text-[10px] font-mono text-manga-silver">
          <span>DEVELOPED BY ATOMIC WOLF // PUBLISHED BY WALKABOUT GAMES</span>
          <span className="text-manga-neonCyan">ALL RIGHTS RESERVED // 2024</span>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* FRAME 5: "WANTED" POSTER — GOVERNMENT BACK COVER (88%→100%) */}
      {/* ───────────────────────────────────────────────────────────── */}
      <div className="frame-wanted-poster absolute inset-0 bg-[#f5f0e0] opacity-0 pointer-events-none flex flex-col items-center justify-center p-6 sm:p-10 pt-16 overflow-hidden">
        {/* Halftone on cream */}
        <div className="absolute inset-0 bg-halftone-dark opacity-20 pointer-events-none" />
        {/* Torn edge at top */}
        <div className="absolute top-0 left-0 right-0 h-3 bg-[#e0d8c0]" style={{ clipPath: "polygon(0 0, 2% 100%, 5% 20%, 8% 100%, 12% 10%, 15% 100%, 20% 30%, 25% 100%, 30% 0, 35% 100%, 40% 15%, 45% 100%, 50% 0, 55% 100%, 60% 20%, 65% 100%, 70% 5%, 75% 100%, 80% 0, 85% 100%, 90% 25%, 95% 100%, 100% 0)" }} />

        <div className="relative z-10 max-w-4xl mx-auto w-full text-center space-y-4">
          {/* MSB Seal header */}
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="h-px flex-1 bg-[#1a1a1a]/40" />
            <span className="text-[10px] font-mono font-black text-[#1a1a1a]/60 uppercase tracking-[0.4em]">METROPOLITAN SECURITY BUREAU // PUBLIC NOTICE NO. 2089-07</span>
            <div className="h-px flex-1 bg-[#1a1a1a]/40" />
          </div>

          {/* WANTED headline */}
          <div className="wanted-stamp inline-block border-8 border-[#1a1a1a] bg-[#1a1a1a] px-6 py-1 rotate-[-1.5deg]">
            <h1 className="text-6xl sm:text-8xl font-comic text-[#f5f0e0] uppercase tracking-widest" style={{ letterSpacing: "0.2em" }}>WANTED</h1>
          </div>

          {/* Protagonist image */}
          <div className="flex justify-center">
            <div className="w-48 h-56 border-4 border-[#1a1a1a] bg-[#d4cebc] overflow-hidden shadow-[6px_6px_0_#1a1a1a]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/protagonist_silhouette.jpg"
                alt="Wanted: Liberation Front Operative"
                className="w-full h-full object-cover object-top"
                style={{ filter: "grayscale(100%) contrast(1.3) brightness(0.9)" }}
              />
            </div>
          </div>

          {/* Crimes listed */}
          <div className="text-left max-w-lg mx-auto border-2 border-[#1a1a1a]/40 bg-[#ede8d4] p-4">
            <div className="text-[10px] font-mono font-black text-[#1a1a1a]/50 uppercase tracking-widest mb-2">CHARGES:</div>
            <ul className="space-y-1 font-mono text-xs text-[#1a1a1a]">
              <li>I.   UNAUTHORIZED DIGITAL LIBERATION OF CLASSIFIED SYSTEMS</li>
              <li>II.  CONSPIRACY AGAINST THE METROPOLITAN CREDIT BUREAU</li>
              <li>III. DISTRIBUTION OF GOVERNMENT-SEALED MEMORANDA</li>
              <li>IV.  INCITEMENT TO RESIST CITIZEN COMPLIANCE PROTOCOLS</li>
            </ul>
          </div>

          {/* Reward / CTA */}
          <div className="font-mono text-[#1a1a1a] text-sm font-black uppercase tracking-wider">
            PLAY THE GAME — BEFORE IT&apos;S CLASSIFIED
          </div>

          {/* Store CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://store.steampowered.com/app/875310/Liberated/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playImpactBoom()}
              className="wanted-cta-steam flex items-center gap-3 px-8 py-4 bg-[#1a1a1a] text-[#f5f0e0] border-4 border-[#1a1a1a] font-comic font-black text-xl uppercase shadow-[6px_6px_0_rgba(0,0,0,0.4)] hover:bg-[#333] transition-colors"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M11.979 0C5.678 0 .511 4.86.022 11.037l6.432 2.658c.545-.371 1.203-.59 1.912-.59.063 0 .125.004.187.006l2.861-4.142V8.91c0-2.495 2.028-4.524 4.524-4.524 2.494 0 4.524 2.029 4.524 4.524s-2.03 4.525-4.524 4.525h-.105l-4.076 2.911c0 .052.004.105.004.159 0 1.875-1.515 3.396-3.39 3.396-1.635 0-3.016-1.173-3.331-2.727L.436 15.27C1.862 20.307 6.486 24 11.979 24c6.627 0 11.999-5.373 11.999-12S18.605 0 11.979 0z"/></svg>
              BUY ON STEAM
            </a>
            <a
              href="https://www.gog.com/game/liberated"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playImpactBoom()}
              className="wanted-cta-gog flex items-center gap-3 px-8 py-4 bg-[#f5f0e0] text-[#1a1a1a] border-4 border-[#1a1a1a] font-comic font-black text-xl uppercase shadow-[6px_6px_0_rgba(0,0,0,0.3)] hover:bg-white transition-colors"
            >
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-.148 4.537c4.056 0 7.344 3.288 7.344 7.344 0 4.057-3.288 7.345-7.344 7.345S4.508 15.938 4.508 11.88c0-4.056 3.288-7.344 7.344-7.344zm0 2.394a4.95 4.95 0 1 0 0 9.9 4.95 4.95 0 0 0 0-9.9z"/></svg>
              BUY ON GOG
            </a>
          </div>

          {/* Achievements strip */}
          <div className="wanted-achievements">
            <div className="text-[10px] font-mono text-[#1a1a1a]/50 uppercase tracking-widest mb-2">UNLOCKED ACHIEVEMENTS</div>
            <div className="flex justify-center">
              <AchievementBadges showAll={true} className="justify-center" />
            </div>
          </div>

          {/* Developer credits */}
          <div className="border-t border-[#1a1a1a]/30 pt-3 text-[9px] font-mono text-[#1a1a1a]/50 uppercase tracking-widest">
            DEVELOPED BY ATOMIC WOLF // PUBLISHED BY WALKABOUT GAMES // ALL RIGHTS RESERVED 2024
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────────── */}
      {/* POPOVER MODALS (Native HTML Popover API) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {liberatedPillars.map((pillar) => (
        <ProjectPopoverModal key={pillar.id} pillar={pillar} />
      ))}
      <SystemSpecsModal />
    </div>
  );
}
