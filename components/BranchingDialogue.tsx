"use client";

import React, { useState } from "react";
import { soundManager } from "@/lib/soundManager";
import ItemBadge from "./ItemBadge";
import { storyBranches, StoryChoiceBranch } from "@/data/gameData";
import { Terminal, ShieldAlert, Award, Sparkles, CheckCircle2, Skull, Scale, Radio } from "lucide-react";

export default function BranchingDialogue() {
  const [activeBranchId, setActiveBranchId] = useState<string>("resistance");
  const activeBranch = storyBranches.find((b) => b.id === activeBranchId) || storyBranches[0];

  const handleBranchSelect = (branch: StoryChoiceBranch) => {
    soundManager.playImpactBoom();
    setActiveBranchId(branch.id);

    // Dispatch ImpactFX burst based on faction
    const impactWords: Record<string, string> = {
      resistance: "BAM!",
      order: "HALT!",
      rogue: "CRACK!",
    };
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("liberated_impact_fx", {
        detail: { word: impactWords[branch.id] || "POW!" }
      }));
      window.dispatchEvent(new CustomEvent("liberated_faction_choice", {
        detail: { faction: branch.id }
      }));
      // Unlock faction achievement
      const achMap: Record<string, string> = {
        resistance: "ach_resistance",
        order: "ach_order",
        rogue: "ach_rogue",
      };
      if (achMap[branch.id]) {
        window.dispatchEvent(new CustomEvent("liberated_achievement", {
          detail: { id: achMap[branch.id] }
        }));
      }
    }
  };


  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      {/* Visual Novel Dialogue Box Container */}
      <div className="border-4 border-white bg-black/95 shadow-comic-lg p-4 sm:p-8 relative overflow-hidden">
        
        {/* Halftone Screentone Backdrop */}
        <div className="absolute inset-0 bg-halftone-dense opacity-25 pointer-events-none" />

        {/* Top Comic Banner */}
        <div className="relative z-10 flex items-center justify-between border-b-4 border-white pb-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="bg-manga-neonYellow text-black font-comic px-3 py-0.5 text-base sm:text-lg font-black transform -skew-x-12 shadow-comic-sm">
              ISSUE 03 // MULTI-PERSPECTIVE NARRATIVE
            </span>
            <span className="text-manga-neonCyan text-xs font-mono font-bold tracking-widest hidden sm:inline">
              EVERY CHOICE SHAPES THE COMIC BOOK STORYLINE
            </span>
          </div>
          <div className="text-[11px] font-mono text-manga-silver font-bold uppercase">
            STATUS: INTERACTIVE DECISION NODE
          </div>
        </div>

        {/* Main Content Grid: Characters + Moral Choices + Consequences */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Character Portrait Standoff */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border-4 border-black bg-neutral-900 p-4 shadow-comic relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 border-b border-neutral-700 pb-2">
                <span className="text-xs font-comic text-manga-neonCyan uppercase font-black">
                  [PERSPECTIVE // OPERATIVE]
                </span>
                <span className="text-[10px] font-mono bg-manga-neonPink text-black font-bold px-1.5 py-0.5">
                  MOOD: {activeBranch.characterMood.toUpperCase()}
                </span>
              </div>

              {/* Stylized Cyber Noir Manga Portrait */}
              <div className="relative w-full h-48 bg-neutral-950 border-2 border-neutral-800 flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-white filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]"
                >
                  <defs>
                    <pattern id="noirPortraitDots" width="8" height="8" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#333" />
                    </pattern>
                  </defs>
                  <rect width="200" height="200" fill="url(#noirPortraitDots)" />
                  {/* Cyber Silhouette Character Cutout */}
                  <path
                    d="M30 190 L50 120 L80 100 L100 60 L120 100 L150 120 L170 190 Z"
                    fill="#18181b"
                    stroke="#ffffff"
                    strokeWidth="3"
                  />
                  <polygon
                    points="70,70 100,40 130,70 100,110"
                    fill="#09090b"
                    stroke="#00E5FF"
                    strokeWidth="3"
                  />
                  {/* Glowing Visor */}
                  <rect
                    x="75"
                    y="75"
                    width="50"
                    height="10"
                    fill={activeBranch.id === "resistance" ? "#FF0055" : activeBranch.id === "order" ? "#00E5FF" : "#FFE600"}
                    className="animate-pulse"
                  />
                  {/* Comic Action Hatching */}
                  <line x1="20" y1="30" x2="60" y2="50" stroke="#FFE600" strokeWidth="3" />
                  <line x1="180" y1="30" x2="140" y2="50" stroke="#FFE600" strokeWidth="3" />
                </svg>

                {/* Floating Japanese Onomatopoeia */}
                <div className="absolute bottom-2 right-2 text-3xl font-comic text-white/20 select-none font-black">
                  ドンッ!
                </div>
              </div>
            </div>

            {/* Moral Choice Action Buttons */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono text-manga-silver font-bold uppercase tracking-wider">
                SELECT STORY PATH:
              </div>

              {storyBranches.map((branch) => {
                const isActive = branch.id === activeBranchId;
                return (
                  <button
                    key={branch.id}
                    onClick={() => handleBranchSelect(branch)}
                    className={`w-full p-3 text-left border-2 font-mono text-xs transition-all flex items-center justify-between group cursor-pointer ${
                      isActive
                        ? "bg-white text-black border-white shadow-comic font-black"
                        : "bg-neutral-950 text-neutral-300 border-neutral-700 hover:border-manga-neonCyan hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span
                        className={`px-2 py-0.5 font-comic text-xs ${
                          isActive
                            ? "bg-manga-neonPink text-white shadow-comic-sm"
                            : "bg-neutral-800 text-manga-neonCyan group-hover:bg-manga-neonCyan group-hover:text-black"
                        }`}
                      >
                        {branch.actionCallout}
                      </span>
                      <span className="truncate">{branch.buttonLabel}</span>
                    </div>
                    <span className="text-base font-bold ml-1">❯</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Character Dialogue + Story Consequence */}
          <div className="lg:col-span-8 space-y-6">
            {/* Dynamic Comic Speech Bubble */}
            <div className="relative bg-white text-black border-4 border-black p-5 sm:p-6 rounded-3xl shadow-comic speech-bubble-tail-bottom">
              <div className="text-[10px] font-mono font-black text-manga-neonPink tracking-widest uppercase mb-1">
                // {activeBranch.characterTitle}
              </div>
              <p className="font-comic text-lg sm:text-xl leading-relaxed text-black">
                {activeBranch.dialogueText}
              </p>
            </div>

            {/* Narrative Consequence Dossier */}
            <div className="border-4 border-neutral-800 bg-neutral-900/90 p-5 sm:p-6 shadow-comic space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-700 pb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-comic text-white tracking-wide uppercase">
                    {activeBranch.characterFaction}
                  </h3>
                  <div className="text-xs font-mono font-bold text-manga-neonCyan mt-0.5 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5" /> MORAL PATH CONSEQUENCE
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black border border-manga-neonYellow text-manga-neonYellow text-xs font-mono font-bold">
                  <Radio className="w-3.5 h-3.5" /> LIVE PERSPECTIVE
                </div>
              </div>

              {/* Story Impact */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-manga-silver font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5 text-manga-neonPink" /> MISSION CONSEQUENCE:
                </div>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
                  {activeBranch.consequence}
                </p>
              </div>

              {/* Tactical Loadout Traits */}
              <div className="pt-2 border-t border-neutral-800">
                <div className="text-[11px] font-mono text-manga-silver font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-manga-neonYellow" /> UNLOCKED TACTICAL TRAITS:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeBranch.tacticalTraits.map((trait, idx) => (
                    <ItemBadge
                      key={idx}
                      label={trait.name}
                      rarity={trait.rarity}
                      category={trait.category}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
