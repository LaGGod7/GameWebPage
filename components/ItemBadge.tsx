"use client";

import React from "react";
import { soundManager } from "@/lib/soundManager";

export type Rarity = "common" | "rare" | "epic" | "legendary";

interface ItemBadgeProps {
  label: string;
  category?: string;
  rarity?: Rarity;
  iconText?: string;
  level?: string;
}

export default function ItemBadge({
  label,
  category = "TECH SKILL",
  rarity = "rare",
  iconText = "◆",
  level = "LV.99",
}: ItemBadgeProps) {
  const getRarityStyles = () => {
    switch (rarity) {
      case "legendary":
        return "border-manga-neonYellow text-manga-neonYellow bg-manga-neonYellow/10 shadow-comic-neon-yellow";
      case "epic":
        return "border-manga-neonPink text-manga-neonPink bg-manga-neonPink/10 shadow-comic-neon-pink";
      case "rare":
        return "border-manga-neonCyan text-manga-neonCyan bg-manga-neonCyan/10 shadow-comic-neon-cyan";
      default:
        return "border-white text-white bg-white/10 shadow-comic";
    }
  };

  return (
    <div
      onMouseEnter={() => soundManager.playBubblePop()}
      className={`group relative inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono font-bold uppercase border-2 transition-transform duration-150 hover:-translate-y-0.5 cursor-default ${getRarityStyles()}`}
    >
      <span className="font-comic text-sm leading-none">{iconText}</span>
      <span className="tracking-wider">{label}</span>
      <span className="text-[9px] px-1 py-0.2 bg-black text-white border border-current font-mono">
        {level}
      </span>

      {/* Comic Hover Inventory Tooltip */}
      <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-40 whitespace-nowrap">
        <div className="bg-black border-2 border-white p-2 text-[10px] text-white shadow-comic">
          <div className="text-manga-neonCyan font-bold tracking-widest">{category}</div>
          <div className="text-white font-bold">{label} [{rarity.toUpperCase()}]</div>
        </div>
        <div className="w-2 h-2 bg-black border-r-2 border-b-2 border-white transform rotate-45 -mt-1" />
      </div>
    </div>
  );
}
