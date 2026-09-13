"use client";

import React, { useState, useEffect, useCallback } from "react";

interface HUDState {
  creditScore: number;
  threatLevel: "COMPLIANT" | "MONITORED" | "FLAGGED" | "INSURGENT" | "LIBERATED";
  scanProgress: number;
  isLiberated: boolean;
}

export default function GovernmentHUD() {
  const [hud, setHud] = useState<HUDState>({
    creditScore: 342,
    threatLevel: "FLAGGED",
    scanProgress: 0,
    isLiberated: false,
  });
  const [visible, setVisible] = useState(true);
  const [blink, setBlink] = useState(false);

  // Scan bar animation
  useEffect(() => {
    const interval = setInterval(() => {
      setHud((h) => {
        if (h.isLiberated) return h;
        return { ...h, scanProgress: (h.scanProgress + 2) % 101 };
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  // Blink effect
  useEffect(() => {
    const interval = setInterval(() => setBlink((b) => !b), 900);
    return () => clearInterval(interval);
  }, []);

  // Listen for scroll-based credit score decay
  useEffect(() => {
    const handleScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = Math.min(1, window.scrollY / total);
      setHud((h) => {
        if (h.isLiberated) return h;
        const newScore = Math.round(342 - progress * 342);
        let threatLevel: HUDState["threatLevel"] = "COMPLIANT";
        if (newScore < 50)  threatLevel = "INSURGENT";
        else if (newScore < 150) threatLevel = "FLAGGED";
        else if (newScore < 250) threatLevel = "MONITORED";
        else threatLevel = "COMPLIANT";
        return { ...h, creditScore: newScore, threatLevel };
      });
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for faction choice events
  useEffect(() => {
    const handleFaction = (e: Event) => {
      const ev = e as CustomEvent<{ faction: string }>;
      if (ev.detail.faction === "resistance") {
        setHud((h) => ({ ...h, threatLevel: "INSURGENT" }));
      }
    };
    const handleHudUpdate = (e: Event) => {
      const ev = e as CustomEvent<{ creditScore: number; status: string }>;
      if (ev.detail.creditScore === 0) {
        setHud({ creditScore: 0, threatLevel: "LIBERATED", scanProgress: 100, isLiberated: true });
      }
    };
    const handlePageChange = (e: Event) => {
      const ev = e as CustomEvent<{ page: number }>;
      if (ev.detail.page === 3) {
        setHud((h) => ({ ...h, threatLevel: h.creditScore < 200 ? "INSURGENT" : "FLAGGED" }));
      }
    };
    window.addEventListener("liberated_faction_choice", handleFaction);
    window.addEventListener("liberated_hud_update", handleHudUpdate);
    window.addEventListener("liberated_page_change", handlePageChange);
    return () => {
      window.removeEventListener("liberated_faction_choice", handleFaction);
      window.removeEventListener("liberated_hud_update", handleHudUpdate);
      window.removeEventListener("liberated_page_change", handlePageChange);
    };
  }, []);

  const getThreatColor = () => {
    switch (hud.threatLevel) {
      case "COMPLIANT":  return "#22c55e";
      case "MONITORED":  return "#eab308";
      case "FLAGGED":    return "#f97316";
      case "INSURGENT":  return "#ef4444";
      case "LIBERATED":  return "#ffffff";
    }
  };

  const getCreditColor = () => {
    if (hud.isLiberated) return "#ffffff";
    if (hud.creditScore > 250) return "#22c55e";
    if (hud.creditScore > 150) return "#eab308";
    return "#ef4444";
  };

  if (!visible) return null;

  return (
    <div
      className="fixed top-16 right-3 z-40 font-mono text-[10px] leading-tight pointer-events-none"
      style={{ maxWidth: "180px" }}
      aria-hidden="true"
    >
      <div
        className="border border-white/30 bg-black/80 backdrop-blur-sm p-2 space-y-1.5"
        style={{ borderColor: `${getThreatColor()}44` }}
      >
        {/* REC indicator */}
        <div className="flex items-center justify-between border-b border-white/10 pb-1 mb-1">
          <span className="text-white/40 uppercase tracking-widest text-[9px]">M.S.B.</span>
          <span style={{ color: blink ? "#ef4444" : "transparent" }} className="text-[9px] font-bold">⬛ REC</span>
        </div>

        {/* Credit Score */}
        <div>
          <div className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">CITIZEN CREDIT</div>
          <div className="flex items-baseline gap-1">
            <span
              className="text-base font-black tabular-nums transition-colors duration-500"
              style={{ color: getCreditColor(), fontFamily: "JetBrains Mono, monospace" }}
            >
              {hud.isLiberated ? "000" : String(hud.creditScore).padStart(3, "0")}
            </span>
            <span className="text-white/30">/1000</span>
          </div>
          {hud.isLiberated ? (
            <div className="text-white text-[9px] font-bold">★ LIBERATED</div>
          ) : (
            <div className="text-white/30 text-[9px]">✗ FLAGGED</div>
          )}
        </div>

        {/* Biometric Scan Bar */}
        {!hud.isLiberated && (
          <div>
            <div className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">BIOMETRIC SCAN</div>
            <div className="w-full h-1 bg-white/10 rounded-none overflow-hidden">
              <div
                className="h-full transition-none"
                style={{ width: `${hud.scanProgress}%`, backgroundColor: getThreatColor() }}
              />
            </div>
            <div className="text-white/30 text-[9px] mt-0.5">
              {hud.scanProgress < 100 ? "SCANNING..." : "IDENTITY CONFIRMED"}
            </div>
          </div>
        )}

        {/* Threat Level */}
        <div className="border-t border-white/10 pt-1">
          <div className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">THREAT LEVEL</div>
          <div
            className="font-black text-[10px] tracking-widest"
            style={{ color: getThreatColor() }}
          >
            {hud.isLiberated ? "✓ SYSTEM OFFLINE" : `▲ ${hud.threatLevel}`}
          </div>
        </div>

        {/* Camera icon */}
        {!hud.isLiberated && (
          <div className="flex items-center gap-1 border-t border-white/10 pt-1">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor" style={{ color: getThreatColor(), opacity: 0.7 }}>
              <path d="M15 8a3 3 0 0 1-6 0 3 3 0 0 1 6 0ZM12 13c-4 0-6 2-6 3v1h12v-1c0-1-2-3-6-3Z"/>
              <rect x="1" y="6" width="22" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="12" cy="11" r="4" fill="none" stroke="currentColor" strokeWidth="1.2"/>
            </svg>
            <span className="text-white/30 text-[9px]">SURVEILLANCE ACTIVE</span>
          </div>
        )}
      </div>
    </div>
  );
}
