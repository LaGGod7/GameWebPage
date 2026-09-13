"use client";

import React, { useEffect, useRef } from "react";
import { X, ExternalLink, Github, Cpu, ShieldCheck, Zap, Layers } from "lucide-react";
import ItemBadge, { Rarity } from "./ItemBadge";
import { soundManager } from "@/lib/soundManager";

export interface ProjectData {
  id: string;
  popoverId: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  role: string;
  metrics: string[];
  techStack: { name: string; rarity: Rarity; category: string }[];
  blueprintDetails: string[];
  githubUrl?: string;
  liveUrl?: string;
  bannerGradient?: string;
}

interface ProjectPopoverModalProps {
  project: ProjectData;
  onClose?: () => void;
}

export default function ProjectPopoverModal({ project }: ProjectPopoverModalProps) {
  const popoverRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const popoverEl = popoverRef.current;
    if (!popoverEl) return;

    const handleToggle = (e: Event) => {
      const toggleEvent = e as unknown as { newState?: string };
      if (toggleEvent.newState === "open") {
        soundManager.playImpactBoom();
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
        // Fallback for older browsers
        popoverRef.current.style.display = "none";
      }
    }
  };

  return (
    <div
      ref={popoverRef}
      id={project.popoverId}
      popover="auto"
      className="m-auto fixed inset-0 z-50 p-4 max-w-4xl w-[94vw] max-h-[90vh] overflow-y-auto bg-neutral-950 border-4 border-white shadow-comic-lg text-white font-mono backdrop:bg-black/85 backdrop:backdrop-blur-md"
    >
      {/* Top Action Header Bar */}
      <div className="flex items-center justify-between border-b-4 border-white pb-3 mb-4 sticky top-0 bg-neutral-950 z-20 pt-1">
        <div className="flex items-center gap-3">
          <div className="bg-manga-neonPink text-black font-comic px-2.5 py-0.5 text-base font-black transform -skew-x-12 shadow-comic-sm">
            MISSION DOSSIER // {project.codename}
          </div>
          <span className="hidden sm:inline-block text-manga-neonCyan text-xs font-bold tracking-widest">
            STATUS: DEPLOYED & CLASSIFIED
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
        {/* Left Column: Blueprint & Architecture */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border-2 border-neutral-700 bg-neutral-900/90 p-4 relative overflow-hidden">
            {/* Screentone Grid Background */}
            <div className="absolute inset-0 bg-screentone-lines pointer-events-none opacity-40" />

            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl font-comic text-white tracking-wide uppercase">
                {project.title}
              </h2>
              <p className="text-manga-neonCyan font-bold text-sm mt-1">
                {project.tagline}
              </p>

              <p className="text-neutral-300 text-xs sm:text-sm mt-4 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>
          </div>

          {/* Blueprint Specs Box */}
          <div className="border-2 border-manga-neonCyan/60 bg-black p-4 relative">
            <div className="text-xs text-manga-neonCyan font-black uppercase tracking-widest mb-3 flex items-center gap-2">
              <Layers className="w-4 h-4" /> ARCHITECTURAL BLUEPRINTS
            </div>

            <ul className="space-y-2 text-xs text-neutral-300">
              {project.blueprintDetails.map((detail, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-manga-neonPink font-bold">▶</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Live Metrics */}
          <div className="grid grid-cols-3 gap-2">
            {project.metrics.map((metric, i) => (
              <div
                key={i}
                className="bg-neutral-900 border border-neutral-700 p-2 text-center"
              >
                <div className="text-[10px] text-manga-silver font-bold uppercase">
                  METRIC 0{i + 1}
                </div>
                <div className="text-xs sm:text-sm font-black text-manga-neonYellow truncate">
                  {metric}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Inventory Equipment & Links */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* RPG Inventory Loadout */}
            <div className="border-2 border-white bg-neutral-900 p-4 shadow-comic">
              <div className="text-xs font-black uppercase text-white tracking-widest mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-manga-neonPink" /> EQUIPPED TECH ARSENAL
              </div>

              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, i) => (
                  <ItemBadge
                    key={i}
                    label={tech.name}
                    rarity={tech.rarity}
                    category={tech.category}
                  />
                ))}
              </div>
            </div>

            {/* Role & Verification Badge */}
            <div className="border border-neutral-800 bg-black p-3 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-manga-neonCyan shrink-0" />
              <div>
                <div className="text-[10px] text-manga-silver uppercase">ENGINEER ROLE</div>
                <div className="text-xs font-bold text-white">{project.role}</div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 space-y-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playImpactBoom()}
                className="w-full py-3 bg-manga-neonCyan text-black font-comic text-base sm:text-lg uppercase font-black flex items-center justify-center gap-2 border-2 border-black hover:bg-white hover:text-black transition-colors shadow-comic"
              >
                <Zap className="w-5 h-5 fill-current" /> LAUNCH PRODUCTION LINK
                <ExternalLink className="w-4 h-4" />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundManager.playBubblePop()}
                className="w-full py-2.5 bg-black text-white font-mono text-xs uppercase font-bold flex items-center justify-center gap-2 border-2 border-white hover:border-manga-neonPink hover:text-manga-neonPink transition-colors shadow-comic"
              >
                <Github className="w-4 h-4" /> INSPECT SOURCE REPOSITORY
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
