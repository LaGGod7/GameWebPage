"use client";

import React, { useState } from "react";
import { soundManager } from "@/lib/soundManager";
import ItemBadge from "./ItemBadge";
import { Terminal, Shield, Award, Sparkles, CheckCircle2 } from "lucide-react";

interface DialogueBranch {
  id: string;
  actionCallout: string;
  buttonLabel: string;
  speakerResponse: string;
  characterMood: "determined" | "analytical" | "triumphant";
  roleTitle: string;
  company: string;
  period: string;
  highlights: string[];
  skills: { name: string; rarity: "common" | "rare" | "epic" | "legendary"; category: string }[];
}

const dialogueBranches: DialogueBranch[] = [
  {
    id: "frontend",
    actionCallout: "BAM!",
    buttonLabel: "INSPECT FRONTEND & MOTION MASTERY",
    speakerResponse: "“Target locked. You're observing a developer who engineers 60FPS fluid canvas pipelines, GSAP timeline choreographies, and robust zero-layout-shift UI architectures.”",
    characterMood: "determined",
    roleTitle: "Senior Creative Frontend Engineer",
    company: "CyberMatrix Labs",
    period: "2023 - PRESENT",
    highlights: [
      "Architected interactive 3D/canvas web experiences boosting user session engagement by 240%.",
      "Pioneered GSAP ScrollTrigger + Motion performance pipelines with 100/100 Lighthouse score.",
      "Engineered micro-frontend design systems adopted by 12+ enterprise production squads."
    ],
    skills: [
      { name: "GSAP 3", rarity: "legendary", category: "ANIMATION" },
      { name: "Next.js 14", rarity: "legendary", category: "FRAMEWORK" },
      { name: "TypeScript", rarity: "epic", category: "LANGUAGE" },
      { name: "Tailwind CSS", rarity: "epic", category: "STYLING" },
    ]
  },
  {
    id: "systems",
    actionCallout: "SLASH!",
    buttonLabel: "INSPECT ARCHITECTURE & SCALE",
    speakerResponse: "“Systems check complete. High-throughput distributed backends, edge routing, caching strategies, and resilient event-driven architectures under heavy load.”",
    characterMood: "analytical",
    roleTitle: "Full-Stack Systems Architect",
    company: "NeoTokyo Nexus",
    period: "2021 - 2023",
    highlights: [
      "Scaled real-time WebSocket state synchronizers handling 500,000+ concurrent game lobbies.",
      "Optimized serverless edge compute latency from 320ms down to sub-45ms worldwide.",
      "Designed zero-trust OAuth2 / JWT authentication pipelines and automated CI/CD stages."
    ],
    skills: [
      { name: "Node.js", rarity: "epic", category: "RUNTIME" },
      { name: "PostgreSQL", rarity: "rare", category: "DATABASE" },
      { name: "Docker", rarity: "rare", category: "DEVOPS" },
      { name: "Redis", rarity: "epic", category: "CACHE" },
    ]
  },
  {
    id: "creative",
    actionCallout: "HACK!",
    buttonLabel: "INSPECT CREATIVE LAB & SHADERS",
    speakerResponse: "“Critical override activated. Merging generative art, WebGL fragment shaders, responsive canvas particle engines, and spatial audio interfaces.”",
    characterMood: "triumphant",
    roleTitle: "Creative Technologist & R&D",
    company: "HyperDrive Interactive",
    period: "2019 - 2021",
    highlights: [
      "Developed procedural audio synthesizer engines and GLSL post-processing filters in-browser.",
      "Built custom physics engines for interactive comic storytelling and browser gaming.",
      "Won multiple digital design honors for experimental scrollytelling web apps."
    ],
    skills: [
      { name: "WebGL / GLSL", rarity: "legendary", category: "GRAPHICS" },
      { name: "Web Audio API", rarity: "epic", category: "AUDIO" },
      { name: "Canvas 2D", rarity: "legendary", category: "GRAPHICS" },
      { name: "Three.js", rarity: "rare", category: "3D ENGINE" },
    ]
  }
];

export default function BranchingDialogue() {
  const [activeBranchId, setActiveBranchId] = useState<string>("frontend");
  const activeBranch = dialogueBranches.find((b) => b.id === activeBranchId) || dialogueBranches[0];

  const handleBranchSelect = (branch: DialogueBranch) => {
    soundManager.playImpactBoom();
    setActiveBranchId(branch.id);
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
              PANEL 03 // DIALOGUE GRID
            </span>
            <span className="text-manga-neonCyan text-xs font-mono font-bold tracking-widest hidden sm:inline">
              SELECT BRANCH TO UNLOCK EXPERIENCES
            </span>
          </div>
          <div className="text-[11px] font-mono text-manga-silver font-bold uppercase">
            STATUS: INTERACTIVE
          </div>
        </div>

        {/* Main Content Grid: Characters + Choices + Resume Dossier */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Dual Character Portrait Standoff */}
          <div className="lg:col-span-4 space-y-4">
            <div className="border-4 border-black bg-neutral-900 p-4 shadow-comic relative overflow-hidden">
              <div className="flex items-center justify-between mb-3 border-b border-neutral-700 pb-2">
                <span className="text-xs font-comic text-manga-neonCyan uppercase font-black">
                  [OPERATIVE // PROTAGONIST]
                </span>
                <span className="text-[10px] font-mono bg-manga-neonPink text-black font-bold px-1.5 py-0.5">
                  MOOD: {activeBranch.characterMood.toUpperCase()}
                </span>
              </div>

              {/* Stylized Manga Cyber Portrait SVG */}
              <div className="relative w-full h-48 bg-neutral-950 border-2 border-neutral-800 flex items-center justify-center overflow-hidden">
                <svg
                  viewBox="0 0 200 200"
                  className="w-full h-full text-white filter drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]"
                >
                  <defs>
                    <pattern id="portraitDots" width="8" height="8" patternUnits="userSpaceOnUse">
                      <circle cx="2" cy="2" r="1.5" fill="#333" />
                    </pattern>
                  </defs>
                  {/* Cyber Portrait Silhouette */}
                  <rect width="200" height="200" fill="url(#portraitDots)" />
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
                  {/* Cyber Visor Eye */}
                  <rect
                    x="75"
                    y="75"
                    width="50"
                    height="10"
                    fill="#FF0055"
                    className="animate-pulse"
                  />
                  {/* Manga Speed/Impact accents */}
                  <line x1="20" y1="30" x2="60" y2="50" stroke="#FFE600" strokeWidth="3" />
                  <line x1="180" y1="30" x2="140" y2="50" stroke="#FFE600" strokeWidth="3" />
                </svg>

                {/* Floating Japanese Onomatopoeia */}
                <div className="absolute bottom-2 right-2 text-3xl font-comic text-white/20 select-none font-black">
                  ズズズ
                </div>
              </div>
            </div>

            {/* Action Dialogue Option Buttons */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-mono text-manga-silver font-bold uppercase tracking-wider">
                SELECT DIALOGUE ROUTE:
              </div>

              {dialogueBranches.map((branch) => {
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

          {/* Right Column: Dialogue Response + Experience Dossier */}
          <div className="lg:col-span-8 space-y-6">
            {/* Dynamic Comic Speech Bubble */}
            <div className="relative bg-white text-black border-4 border-black p-5 sm:p-6 rounded-3xl shadow-comic speech-bubble-tail-bottom">
              <div className="text-[10px] font-mono font-black text-manga-neonPink tracking-widest uppercase mb-1">
                // OPERATIVE BROADCAST
              </div>
              <p className="font-comic text-lg sm:text-xl leading-relaxed text-black">
                {activeBranch.speakerResponse}
              </p>
            </div>

            {/* Unlocked Experience Card Dossier */}
            <div className="border-4 border-neutral-800 bg-neutral-900/90 p-5 sm:p-6 shadow-comic space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-neutral-700 pb-3">
                <div>
                  <h3 className="text-xl sm:text-2xl font-comic text-white tracking-wide uppercase">
                    {activeBranch.roleTitle}
                  </h3>
                  <div className="text-xs font-mono font-bold text-manga-neonCyan mt-0.5">
                    {activeBranch.company} // {activeBranch.period}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-black border border-manga-neonYellow text-manga-neonYellow text-xs font-mono font-bold">
                  <Award className="w-3.5 h-3.5" /> VERIFIED CREDENTIALS
                </div>
              </div>

              {/* Key Achievements */}
              <div className="space-y-2">
                <div className="text-[11px] font-mono text-manga-silver font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-manga-neonPink" /> MISSION ACCOMPLISHMENTS:
                </div>
                <ul className="space-y-2 text-xs sm:text-sm text-neutral-300 font-sans">
                  {activeBranch.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-manga-neonCyan shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Mastery Arsenal */}
              <div className="pt-2 border-t border-neutral-800">
                <div className="text-[11px] font-mono text-manga-silver font-bold uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-manga-neonYellow" /> DEPLOYED ARSENAL:
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeBranch.skills.map((skill, idx) => (
                    <ItemBadge
                      key={idx}
                      label={skill.name}
                      rarity={skill.rarity}
                      category={skill.category}
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
