"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export type ImpactWord = "BAM!" | "HALT!" | "CRACK!" | "POW!" | "BOOM!" | "THWACK!" | "ZAP!" | "WHAM!";

interface ImpactBurst {
  id: number;
  word: ImpactWord;
  x: number;
  y: number;
  color: string;
}

const WORD_COLORS: Record<ImpactWord, string> = {
  "BAM!":    "#FF0055",
  "HALT!":   "#FFFFFF",
  "CRACK!":  "#00E5FF",
  "POW!":    "#FFE600",
  "BOOM!":   "#FF0055",
  "THWACK!": "#FFE600",
  "ZAP!":    "#00E5FF",
  "WHAM!":   "#FF0055",
};

// Global trigger — call this from anywhere
let _triggerFX: ((word: ImpactWord, x?: number, y?: number) => void) | null = null;

export function triggerImpactFX(word: ImpactWord, x?: number, y?: number) {
  if (_triggerFX) _triggerFX(word, x, y);
}

export default function ImpactFXLayer() {
  const [bursts, setBursts] = useState<ImpactBurst[]>([]);
  const [mounted, setMounted] = useState(false);
  const counterRef = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  const trigger = useCallback((word: ImpactWord, x?: number, y?: number) => {
    const id = ++counterRef.current;
    const px = x ?? Math.random() * (window.innerWidth * 0.6) + window.innerWidth * 0.2;
    const py = y ?? Math.random() * (window.innerHeight * 0.5) + window.innerHeight * 0.2;
    setBursts((b) => [...b, { id, word, x: px, y: py, color: WORD_COLORS[word] }]);
    setTimeout(() => setBursts((b) => b.filter((burst) => burst.id !== id)), 1200);
  }, []);

  useEffect(() => {
    _triggerFX = trigger;
    return () => { _triggerFX = null; };
  }, [trigger]);

  // Listen to custom events
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ word: ImpactWord; x?: number; y?: number }>;
      trigger(ev.detail.word, ev.detail.x, ev.detail.y);
    };
    window.addEventListener("liberated_impact_fx", handler);
    return () => window.removeEventListener("liberated_impact_fx", handler);
  }, [trigger]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[999] pointer-events-none overflow-hidden" aria-hidden="true">
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="absolute impact-burst"
          style={{
            left: burst.x,
            top:  burst.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Star spikes SVG behind text */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 200 200"
            style={{ width: "140px", height: "140px", left: "-20px", top: "-20px" }}
          >
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const outerR = 85 + (i % 3) * 15;
              const innerR = 35;
              const ox = 100 + outerR * Math.cos(angle);
              const oy = 100 + outerR * Math.sin(angle);
              const ix = 100 + innerR * Math.cos(angle + Math.PI / 12);
              const iy = 100 + innerR * Math.sin(angle + Math.PI / 12);
              return (
                <line key={i} x1="100" y1="100" x2={ox} y2={oy} stroke={burst.color} strokeWidth="4" />
              );
            })}
            <circle cx="100" cy="100" r="38" fill={burst.color} />
            <circle cx="100" cy="100" r="34" fill="#000" />
          </svg>
          {/* Word text */}
          <span
            className="relative font-comic text-3xl font-black uppercase z-10 select-none"
            style={{
              color: burst.color,
              WebkitTextStroke: "3px #000000",
              paintOrder: "stroke fill",
              textShadow: "2px 2px 0 #000",
              lineHeight: 1,
            }}
          >
            {burst.word}
          </span>
        </div>
      ))}

      <style>{`
        @keyframes impactIn {
          0%   { transform: translate(-50%, -50%) scale(0.1) rotate(-12deg); opacity: 0; }
          40%  { transform: translate(-50%, -50%) scale(1.35) rotate(5deg);  opacity: 1; }
          65%  { transform: translate(-50%, -50%) scale(0.95) rotate(-2deg); opacity: 1; }
          80%  { transform: translate(-50%, -50%) scale(1.05) rotate(1deg);  opacity: 1; }
          100% { transform: translate(-50%, -50%) scale(1.0)  rotate(0deg);  opacity: 0; }
        }
        .impact-burst {
          animation: impactIn 1.15s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </div>,
    document.body
  );
}
