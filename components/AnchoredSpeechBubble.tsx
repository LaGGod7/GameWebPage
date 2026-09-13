"use client";

import React from "react";
import { soundManager } from "@/lib/soundManager";

interface AnchoredSpeechBubbleProps {
  id?: string;
  anchorId?: string;
  speaker?: string;
  text: string;
  tailDirection?: "bottom" | "left" | "right" | "top";
  variant?: "default" | "shout" | "whisper" | "cyber";
  className?: string;
}

export default function AnchoredSpeechBubble({
  id,
  speaker,
  text,
  tailDirection = "bottom",
  variant = "default",
  className = "",
}: AnchoredSpeechBubbleProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "shout":
        return "bg-manga-neonYellow text-black border-4 border-black font-black uppercase shadow-comic transform -rotate-1";
      case "cyber":
        return "bg-black text-manga-neonCyan border-4 border-manga-neonCyan shadow-comic-neon-cyan";
      default:
        return "bg-white text-black border-4 border-black font-bold shadow-comic";
    }
  };

  const getTailClass = () => {
    if (variant === "cyber") return "";
    switch (tailDirection) {
      case "left":
        return "speech-bubble-tail-left";
      case "bottom":
      default:
        return "speech-bubble-tail-bottom";
    }
  };

  return (
    <div
      id={id}
      onMouseEnter={() => soundManager.playBubblePop()}
      className={`relative p-4 sm:p-5 rounded-2xl max-w-sm sm:max-w-md select-none transition-transform duration-200 hover:scale-[1.02] ${getVariantStyles()} ${getTailClass()} ${className}`}
    >
      {speaker && (
        <div className="text-[10px] font-mono tracking-widest font-black uppercase text-manga-neonPink mb-1">
          // {speaker}
        </div>
      )}
      <p className="font-comic tracking-wide text-sm sm:text-base leading-snug">
        &ldquo;{text}&rdquo;
      </p>
    </div>
  );
}
