"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sampleProjects } from "@/data/projects";
import ProjectPopoverModal from "./ProjectPopoverModal";
import ItemBadge from "./ItemBadge";
import BranchingDialogue from "./BranchingDialogue";
import { soundManager } from "@/lib/soundManager";
import { Sparkles, Zap, ChevronDown, BookOpen, Layers, Terminal } from "lucide-react";

export default function MangaScrollytellingStage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Register GSAP ScrollTrigger safely
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
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "+=3000",
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => {
              // Play subtle page rustle sound at milestone thresholds
              if (Math.abs(self.progress - 0.35) < 0.02 || Math.abs(self.progress - 0.7) < 0.02) {
                soundManager.playPageTurn();
              }
            }
          },
        });

        // STEP 3 TIMELINE PHASES:

        // --- PHASE 1: Hero Cover Reveal & Parallax (0% to 35%) ---
        tl.to(".manga-panel-hero", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(".character-sprite-layer", {
          xPercent: 15,
          scale: 1.12,
          duration: 2,
        }, "<")
        .to(".hero-halftone-bg", {
          scale: 1.1,
          opacity: 0.4,
          duration: 2,
        }, "<")
        .from(".hero-speech-bubble", {
          scale: 0,
          opacity: 0,
          transformOrigin: "bottom left",
          duration: 0.8,
          ease: "back.out(1.7)",
        }, "-=0.6")
        .from(".hero-action-badge", {
          y: 40,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        }, "-=0.4");

        // --- PHASE 2: Transition to Featured Projects 3-Panel Spread (35% to 70%) ---
        tl.to(".manga-panel-hero", {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          pointerEvents: "none",
        })
        .to(".manga-panel-projects", {
          opacity: 1,
          pointerEvents: "auto",
          duration: 1,
        }, "<")
        .from(".project-panel-card-1", {
          xPercent: -60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        }, "-=0.5")
        .from(".project-panel-card-2", {
          yPercent: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        }, "-=0.9")
        .from(".project-panel-card-3", {
          xPercent: 60,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        }, "-=0.9")
        .from(".projects-anchored-bubble", {
          scale: 0,
          opacity: 0,
          transformOrigin: "top center",
          duration: 0.7,
          ease: "back.out(1.7)",
        }, "-=0.4");

        // --- PHASE 3: Transition to Visual Novel Dialogue Section (70% to 100%) ---
        tl.to(".manga-panel-projects", {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          pointerEvents: "none",
        })
        .to(".manga-panel-dialogue", {
          opacity: 1,
          pointerEvents: "auto",
          duration: 1,
        }, "<")
        .from(".dialogue-stage-inner", {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        }, "-=0.5");

      }, containerRef);

      return () => {
        ctx.revert();
        mediaQuery.removeEventListener("change", handleMotionChange);
      };
    }
  }, []);

  const openProjectModal = (popoverId: string) => {
    soundManager.playImpactBoom();
    const modalEl = document.getElementById(popoverId);
    if (modalEl) {
      if (typeof modalEl.showPopover === "function") {
        modalEl.showPopover();
      } else {
        modalEl.style.display = "block";
      }
    }
  };

  // Render Accessible Static Mode if prefers-reduced-motion is active
  if (prefersReducedMotion) {
    return (
      <div className="w-full min-h-screen bg-black text-white pt-20 pb-24 px-4 space-y-24">
        {/* Section 1: Hero */}
        <div className="max-w-5xl mx-auto border-4 border-white p-8 bg-neutral-900 shadow-comic-lg">
          <div className="bg-manga-neonPink text-black font-comic px-3 py-1 inline-block text-lg font-black transform -skew-x-12 mb-4">
            ISSUE 01 // ORIGIN PROLOGUE
          </div>
          <h1 className="text-4xl sm:text-6xl font-comic text-white uppercase tracking-wider mb-4">
            CYBER-NOIR <span className="text-manga-neonCyan">MANGA PORTFOLIO</span>
          </h1>
          <p className="font-mono text-sm sm:text-base text-neutral-300 leading-relaxed mb-6">
            Senior Creative Technologist & Full-Stack Architect. Crafting cinematic web experiences, WebGL canvas pipelines, and scalable distributed systems.
          </p>
          <div className="flex flex-wrap gap-2">
            <ItemBadge label="Next.js 14" rarity="legendary" />
            <ItemBadge label="GSAP 3" rarity="legendary" />
            <ItemBadge label="TypeScript" rarity="epic" />
            <ItemBadge label="Tailwind CSS" rarity="epic" />
          </div>
        </div>

        {/* Section 2: Projects Spread */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-comic text-manga-neonYellow uppercase mb-8 border-b-4 border-white pb-2">
            ISSUE 02 // FEATURED MISSION DOSSIERS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleProjects.map((proj) => (
              <div key={proj.id} className="border-4 border-white bg-neutral-900 p-6 shadow-comic flex flex-col justify-between">
                <div>
                  <div className="text-xs font-mono text-manga-neonPink font-bold mb-1">
                    //{proj.codename}
                  </div>
                  <h3 className="text-2xl font-comic text-white mb-2">{proj.title}</h3>
                  <p className="text-xs text-neutral-300 font-sans mb-4">{proj.description}</p>
                </div>
                <button
                  onClick={() => openProjectModal(proj.popoverId)}
                  className="w-full py-2 bg-manga-neonCyan text-black font-comic font-black text-sm uppercase border-2 border-black shadow-comic hover:bg-white"
                >
                  OPEN DOSSIER [POPOVER]
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Branching Dialogue */}
        <div className="max-w-6xl mx-auto">
          <BranchingDialogue />
        </div>

        {/* Modals */}
        {sampleProjects.map((proj) => (
          <ProjectPopoverModal key={proj.id} project={proj} />
        ))}
      </div>
    );
  }

  // Standard GSAP Scrollytelling Pinned Stage
  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden select-none">
      
      {/* ------------------------------------------------------------- */}
      {/* PANEL 01: HERO COVER (Pinned Viewport with SVG Clip-Path & Parallax) */}
      {/* ------------------------------------------------------------- */}
      <div className="manga-panel-hero absolute inset-0 bg-neutral-950 clip-manga-hero-initial flex items-center justify-center overflow-hidden">
        {/* Halftone Screentone Backdrop */}
        <div className="hero-halftone-bg absolute inset-0 bg-halftone opacity-25 scale-100 transition-transform" />
        
        {/* Manga Speed Radial Backdrop */}
        <div className="absolute inset-0 bg-speedlines opacity-30" />

        {/* Heavy Ink Comic Diagonal Cut Frame */}
        <div className="absolute inset-4 sm:inset-10 border-4 sm:border-8 border-white bg-black/80 shadow-comic-lg overflow-hidden flex flex-col justify-between p-6 sm:p-12">
          
          {/* Top Issue Title Row */}
          <div className="flex items-center justify-between border-b-4 border-white pb-3 z-10">
            <div className="flex items-center gap-3">
              <span className="bg-manga-neonPink text-black font-comic px-3 py-0.5 text-base sm:text-lg font-black transform -skew-x-12 shadow-comic-sm">
                ISSUE 01 // COVER PROLOGUE
              </span>
              <span className="text-manga-neonCyan text-xs font-mono font-bold tracking-widest hidden sm:inline">
                LIBERATED CYBERPUNK NOIR EDITION
              </span>
            </div>
            <div className="text-xs font-mono text-manga-neonYellow font-bold tracking-widest">
              [CLASSIFIED OPERATIVE]
            </div>
          </div>

          {/* Hero Center Grid: Dynamic Title + Character Cutout Sprite */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto">
            
            {/* Left Col: Hero Title & Speech Bubble */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6">
              
              {/* Dynamic Animated Speech Bubble */}
              <div className="hero-speech-bubble bg-white text-black border-4 border-black p-4 sm:p-6 rounded-3xl max-w-lg shadow-comic speech-bubble-tail-bottom">
                <div className="text-[10px] font-mono font-black text-manga-neonPink tracking-widest uppercase mb-1">
                  // PROTAGONIST DIALOGUE
                </div>
                <h2 className="font-comic text-xl sm:text-3xl text-black tracking-wide leading-tight">
                  &ldquo;WELCOME TO MY INTERACTIVE DIGITAL DOMAIN! SCROLL DOWN TO UNLOCK THE ISSUE.&rdquo;
                </h2>
              </div>

              {/* Bold Title */}
              <div>
                <div className="text-xs sm:text-sm font-mono font-bold text-manga-neonCyan tracking-widest uppercase mb-1 flex items-center gap-2">
                  <Terminal className="w-4 h-4" /> CREATIVE TECHNOLOGIST // FULL-STACK ARCHITECT
                </div>
                <h1 className="text-4xl sm:text-7xl font-comic text-white uppercase tracking-wider leading-none">
                  CYBER NOIR <br />
                  <span className="text-manga-neonPink underline decoration-manga-neonYellow decoration-4">
                    MANGA DEV
                  </span>
                </h1>
              </div>

              {/* RPG Inventory Skill Badges */}
              <div className="hero-action-badge flex flex-wrap gap-2 pt-2">
                <ItemBadge label="GSAP 3" rarity="legendary" iconText="⚡" />
                <ItemBadge label="Next.js 14" rarity="legendary" iconText="▲" />
                <ItemBadge label="WebGL & Shaders" rarity="epic" iconText="◆" />
                <ItemBadge label="TypeScript" rarity="epic" iconText="TS" />
                <ItemBadge label="Tailwind CSS" rarity="rare" iconText="🎨" />
              </div>
            </div>

            {/* Right Col: Layered Vector Character Cutout */}
            <div className="lg:col-span-5 relative h-64 sm:h-96 flex items-center justify-center">
              <div className="character-sprite-layer relative w-full h-full flex items-center justify-center">
                
                {/* Comic Halftone Shadow Circle */}
                <div className="absolute w-56 h-56 sm:w-72 sm:h-72 rounded-full bg-manga-neonPink/20 border-4 border-manga-neonPink filter blur-sm -z-10" />

                {/* Cyberpunk Character Vector Line Art */}
                <svg
                  viewBox="0 0 300 400"
                  className="w-full h-full max-h-80 sm:max-h-96 object-contain filter drop-shadow-[0_0_15px_rgba(255,0,85,0.4)]"
                >
                  <defs>
                    <linearGradient id="charGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="50%" stopColor="#8E8E93" />
                      <stop offset="100%" stopColor="#121212" />
                    </linearGradient>
                  </defs>

                  {/* Character Shading & Heavy Ink Lines */}
                  <polygon points="150,40 180,90 220,100 190,140 200,190 150,160 100,190 110,140 80,100 120,90" fill="#FFE600" opacity="0.15" />
                  
                  {/* Cyber Body Armour Silhouette */}
                  <path d="M100,180 L150,150 L200,180 L220,320 L190,380 L150,370 L110,380 L80,320 Z" fill="#111114" stroke="#FFFFFF" strokeWidth="4" />
                  <path d="M120,200 L150,180 L180,200 L170,280 L150,300 L130,280 Z" fill="#000000" stroke="#00E5FF" strokeWidth="3" />
                  
                  {/* Cyber Head & Mask */}
                  <polygon points="120,80 180,80 170,150 150,170 130,150" fill="#18181b" stroke="#FFFFFF" strokeWidth="4" />
                  <rect x="130" y="105" width="40" height="12" fill="#FF0055" />
                  <line x1="100" y1="60" x2="150" y2="30" stroke="#00E5FF" strokeWidth="4" />
                  <line x1="200" y1="60" x2="150" y2="30" stroke="#00E5FF" strokeWidth="4" />

                  {/* Onomatopoeia Sparks */}
                  <text x="210" y="80" fontFamily="'Bangers', Impact" fontSize="32" fill="#FFE600" className="manga-stroke">
                    バチッ!
                  </text>
                </svg>

                {/* Floating Japanese Watermark */}
                <div className="absolute -bottom-4 right-0 font-comic font-black text-4xl text-white/20 select-none">
                  ゴゴゴ
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Scroll Prompt */}
          <div className="flex items-center justify-between border-t-2 border-neutral-800 pt-3 z-10">
            <div className="flex items-center gap-2 text-xs font-mono text-manga-silver">
              <span className="w-2 h-2 rounded-full bg-manga-neonCyan animate-ping" />
              <span>SCRUB TO ADVANCE COMIC PANELS</span>
            </div>
            <div className="flex items-center gap-1 font-comic text-sm text-manga-neonCyan animate-bounce">
              <span>CONTINUE READING</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PANEL 02: FEATURED PROJECTS (3-Panel Comic Spread + Anchors + Popovers) */}
      {/* ------------------------------------------------------------- */}
      <div className="manga-panel-projects absolute inset-0 bg-neutral-950 opacity-0 pointer-events-none flex flex-col justify-between p-4 sm:p-8 overflow-hidden">
        {/* Halftone Texture */}
        <div className="absolute inset-0 bg-screentone-lines opacity-30 pointer-events-none" />

        {/* Top Comic Spread Banner */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-b-4 border-white pb-3 pt-12 sm:pt-14">
          <div className="flex items-center gap-3">
            <span className="bg-manga-neonCyan text-black font-comic px-3 py-0.5 text-base sm:text-lg font-black transform -skew-x-12 shadow-comic-sm">
              ISSUE 02 // FEATURED PROJECTS
            </span>
            <span className="text-white text-xs font-mono font-bold tracking-widest hidden sm:inline">
              CLICK CARDS TO TRIGGER NATIVE POPOVER MODALS
            </span>
          </div>
          <div className="text-[11px] font-mono text-manga-neonPink font-bold uppercase">
            POPOVER API + ANCHORS ACTIVE
          </div>
        </div>

        {/* Anchored Speech Bubble Header */}
        <div className="projects-anchored-bubble relative z-10 max-w-7xl mx-auto w-full my-2">
          <div
            id="bubble-p1"
            className="inline-flex items-center gap-2 bg-white text-black border-4 border-black px-4 py-2 rounded-2xl shadow-comic text-xs sm:text-sm font-comic"
          >
            <Sparkles className="w-4 h-4 text-manga-neonPink fill-current shrink-0" />
            <span>&ldquo;EACH PANEL IS AN INTERACTIVE POP-UP MISSION DOSSIER. SELECT A NODE!&rdquo;</span>
          </div>
        </div>

        {/* 3-Panel Comic Grid Spread */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 my-auto">
          {sampleProjects.map((project, idx) => {
            const cardClipClasses = [
              "clip-manga-card-1",
              "clip-manga-card-2",
              "clip-manga-card-3",
            ][idx % 3];

            const anchorId = `anchor-p${idx + 1}`;

            return (
              <div
                key={project.id}
                id={anchorId}
                className={`project-panel-card-${idx + 1} group relative border-4 border-white bg-black p-5 sm:p-6 shadow-comic-lg hover:shadow-comic-neon-cyan transition-all duration-300 flex flex-col justify-between cursor-pointer ${cardClipClasses}`}
                onClick={() => openProjectModal(project.popoverId)}
              >
                {/* Card Halftone Background */}
                <div className="absolute inset-0 bg-halftone opacity-20 pointer-events-none group-hover:opacity-40 transition-opacity" />

                {/* Top Card Badge */}
                <div className="relative z-10 flex items-center justify-between border-b-2 border-neutral-700 pb-2 mb-3">
                  <span className="font-comic text-xs uppercase px-2 py-0.5 bg-manga-neonPink text-black font-black">
                    PANEL 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-manga-neonCyan font-bold">
                    {project.codename}
                  </span>
                </div>

                {/* Card Body */}
                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl sm:text-2xl font-comic text-white tracking-wide group-hover:text-manga-neonCyan transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs font-mono text-manga-silver line-clamp-2">
                    {project.tagline}
                  </p>

                  {/* Equipped Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {project.techStack.slice(0, 3).map((t, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-1.5 py-0.5 bg-neutral-900 border border-neutral-700 text-neutral-300 font-mono font-bold"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Trigger */}
                <div className="relative z-10 pt-4 mt-2 border-t border-neutral-800 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-400 group-hover:text-white transition-colors flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> READ DOSSIER
                  </span>
                  <button
                    popovertarget={project.popoverId}
                    onClick={(e) => {
                      e.stopPropagation();
                      openProjectModal(project.popoverId);
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

        {/* Bottom Panel Prompt */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between border-t-2 border-neutral-800 pt-2 pb-1">
          <span className="text-[10px] font-mono text-manga-silver">
            CONTINUE SCROLLING FOR VISUAL NOVEL DIALOGUE
          </span>
          <span className="text-xs font-comic text-manga-neonPink animate-bounce">
            NEXT PANEL ❯❯
          </span>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PANEL 03: INTERACTIVE EXPERIENCE (Branching Dialogue Grid) */}
      {/* ------------------------------------------------------------- */}
      <div className="manga-panel-dialogue absolute inset-0 bg-black opacity-0 pointer-events-none flex items-center justify-center p-4 pt-16 overflow-y-auto">
        <div className="dialogue-stage-inner w-full max-w-7xl mx-auto my-auto">
          <BranchingDialogue />
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PROJECT POPOVER MODALS (Native HTML Popover API) */}
      {/* ------------------------------------------------------------- */}
      {sampleProjects.map((project) => (
        <ProjectPopoverModal key={project.id} project={project} />
      ))}
    </div>
  );
}
