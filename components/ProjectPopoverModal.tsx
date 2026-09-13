"use client";

import React, { useEffect, useRef } from "react";
import { X, ExternalLink, ShoppingBag, Gamepad2, ShieldCheck, Crosshair, Terminal, Monitor, HardDrive, Cpu, Layers } from "lucide-react";
import ItemBadge from "./ItemBadge";
import { GamePillarData, systemSpecs } from "@/data/gameData";
import { soundManager } from "@/lib/soundManager";

interface GameFeatureModalProps {
  pillar: GamePillarData;
  onClose?: () => void;
}

export default function ProjectPopoverModal({ pillar }: GameFeatureModalProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const popoverEl = popoverRef.current;
    if (!popoverEl) return;

    const handleToggle = (e: Event) => {
      const toggleEvent = e as unknown as { newState?: string };
      if (toggleEvent.newState === "open") {
        soundManager.playGunClick();
      }
    };

    popoverEl.addEventListener("toggle", handleToggle);

    return () => {
      popoverEl.removeEventListener("toggle", handleToggle);
    };
  }, []);

  const closePopover = () => {
    soundManager.playBubblePop();
    if (popoverRef.current) {
      if (typeof popoverRef.current.hidePopover === "function") {
        popoverRef.current.hidePopover();
      } else {
        popoverRef.current.style.display = "none";
      }
    }
  };

  return (
    <div
      ref={popoverRef}
      id={pillar.popoverId}
      popover="auto"
      className="m-auto fixed inset-0 z-50 p-4 max-w-4xl w-[94vw] max-h-[90vh] overflow-y-auto bg-neutral-950 border-4 border-white shadow-comic-lg text-white font-mono backdrop:bg-black/85 backdrop:backdrop-blur-md"
    >
      {/* Top Action Header Bar */}
      <div className="flex items-center justify-between border-b-4 border-white pb-3 mb-4 sticky top-0 bg-neutral-950 z-20 pt-1">
        <div className="flex items-center gap-3">
          <div className="bg-manga-neonPink text-black font-comic px-2.5 py-0.5 text-base font-black transform -skew-x-12 shadow-comic-sm">
            GAMEPLAY DOSSIER // {pillar.codename}
          </div>
          <span className="hidden sm:inline-block text-manga-neonCyan text-xs font-bold tracking-widest">
            CATEGORY: {pillar.category}
          </span>
        </div>

        <button
          onClick={closePopover}
          className="p-1.5 bg-black border-2 border-white hover:bg-manga-neonPink hover:text-black hover:border-black transition-colors shadow-comic-sm cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Feature Breakdown */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-neutral-700 bg-neutral-900/90 p-4 relative overflow-hidden">
            {/* Screentone Grid Background */}
            <div className="absolute inset-0 bg-screentone-lines pointer-events-none opacity-40" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-comic text-white tracking-wide uppercase">
                {pillar.title}
              </h2>
              <p className="text-manga-neonCyan font-bold text-sm mt-1">
                {pillar.tagline}
              </p>

              <p className="text-neutral-300 text-xs sm:text-sm mt-4 leading-relaxed font-sans">
                {pillar.description}
              </p>
            </div>
          </div>

          {/* Gameplay Highlights Box */}
          <div className="border-2 border-manga-neonCyan/60 bg-black p-4 relative">
            <div className="text-xs text-manga-neonCyan font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <Crosshair className="w-4 h-4" /> CORE TACTICAL HIGHLIGHTS
            </div>

            <ul className="space-y-2 text-xs text-neutral-300">
              {pillar.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-manga-neonPink font-bold">▶</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Controls Scheme Box */}
          <div className="border border-neutral-800 bg-neutral-900/80 p-3">
            <div className="text-[11px] font-mono text-manga-neonYellow font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Gamepad2 className="w-3.5 h-3.5" /> INPUT & CONTROLS SCHEME:
            </div>
            <div className="space-y-1 text-xs text-neutral-300">
              {pillar.controlsPreview.map((ctrl, i) => (
                <div key={i} className="flex items-center gap-2 font-mono">
                  <span className="text-manga-neonCyan">▪</span>
                  <span>{ctrl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Inventory Mechanics & Store CTAs */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Tactical Loadout */}
            <div className="border-2 border-white bg-neutral-900 p-4 shadow-comic">
              <div className="text-xs font-black uppercase text-white tracking-widest mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-manga-neonPink" /> EQUIPPED ABILITIES & GEAR
              </div>

              <div className="flex flex-wrap gap-2">
                {pillar.mechanics.map((tech, i) => (
                  <ItemBadge
                    key={i}
                    label={tech.name}
                    rarity={tech.rarity}
                    category={tech.category}
                  />
                ))}
              </div>
            </div>

            {/* Visual Novel Comic Tag */}
            <div className="border border-neutral-800 bg-black p-3 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-manga-neonCyan shrink-0" />
              <div>
                <div className="text-[10px] text-manga-silver uppercase">GENRE PILLAR</div>
                <div className="text-xs font-bold text-white">Living Graphic Novel Platformer</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-2">
            {pillar.steamUrl && (
              <a
                href={pillar.steamUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playImpactBoom()}
                className="w-full py-3 bg-manga-neonYellow text-black font-comic text-base sm:text-lg uppercase font-black flex items-center justify-center gap-2 border-2 border-black hover:bg-white hover:text-black transition-colors shadow-comic"
              >
                <ShoppingBag className="w-5 h-5 fill-current" /> WISHLIST ON STEAM
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {pillar.gogUrl && (
              <a
                href={pillar.gogUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playGunClick()}
                className="w-full py-2.5 bg-black text-white font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 border-2 border-white hover:border-manga-neonCyan hover:text-manga-neonCyan transition-colors shadow-comic"
              >
                <Monitor className="w-4 h-4" /> GET DRM-FREE ON GOG.COM
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// System Specs Popover Modal Component
export function SystemSpecsModal() {
  const specsRef = useRef<HTMLDivElement | null>(null);

  const closeSpecs = () => {
    soundManager.playBubblePop();
    if (specsRef.current) {
      if (typeof specsRef.current.hidePopover === "function") {
        specsRef.current.hidePopover();
      } else {
        specsRef.current.style.display = "none";
      }
    }
  };

  return (
    <div
      ref={specsRef}
      id="modal-specs"
      popover="auto"
      className="m-auto fixed inset-0 z-50 p-6 max-w-3xl w-[92vw] max-h-[85vh] overflow-y-auto bg-neutral-950 border-4 border-white shadow-comic-lg text-white font-mono backdrop:bg-black/85 backdrop:backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b-4 border-white pb-3 mb-6 sticky top-0 bg-neutral-950 z-20">
        <div className="flex items-center gap-3">
          <span className="bg-manga-neonYellow text-black font-comic px-3 py-0.5 text-base font-black transform -skew-x-12 shadow-comic-sm">
            SYSTEM SPECIFICATIONS // PC REQUIREMENTS
          </span>
        </div>
        <button
          onClick={closeSpecs}
          className="p-1.5 bg-black border-2 border-white hover:bg-manga-neonPink hover:text-black transition-colors"
          aria-label="Close specs modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Minimum Specs */}
        <div className="border-2 border-neutral-700 bg-neutral-900/90 p-4 space-y-3">
          <div className="text-xs font-comic font-black text-manga-neonCyan uppercase tracking-widest border-b border-neutral-700 pb-1">
            MINIMUM SPECIFICATIONS
          </div>
          <div className="space-y-2 text-xs text-neutral-300">
            <div><strong className="text-white">OS:</strong> {systemSpecs.minimum.os}</div>
            <div><strong className="text-white">Processor:</strong> {systemSpecs.minimum.processor}</div>
            <div><strong className="text-white">Memory:</strong> {systemSpecs.minimum.memory}</div>
            <div><strong className="text-white">Graphics:</strong> {systemSpecs.minimum.graphics}</div>
            <div><strong className="text-white">DirectX:</strong> {systemSpecs.minimum.directX}</div>
            <div><strong className="text-white">Storage:</strong> {systemSpecs.minimum.storage}</div>
          </div>
        </div>

        {/* Recommended Specs */}
        <div className="border-2 border-manga-neonPink bg-neutral-900/90 p-4 space-y-3 shadow-comic-neon-pink">
          <div className="text-xs font-comic font-black text-manga-neonPink uppercase tracking-widest border-b border-neutral-700 pb-1">
            RECOMMENDED SPECIFICATIONS
          </div>
          <div className="space-y-2 text-xs text-neutral-300">
            <div><strong className="text-white">OS:</strong> {systemSpecs.recommended.os}</div>
            <div><strong className="text-white">Processor:</strong> {systemSpecs.recommended.processor}</div>
            <div><strong className="text-white">Memory:</strong> {systemSpecs.recommended.memory}</div>
            <div><strong className="text-white">Graphics:</strong> {systemSpecs.recommended.graphics}</div>
            <div><strong className="text-white">DirectX:</strong> {systemSpecs.recommended.directX}</div>
            <div><strong className="text-white">Storage:</strong> {systemSpecs.recommended.storage}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
