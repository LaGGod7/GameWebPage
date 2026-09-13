"use client";

import React, { useState } from "react";
import { characterProfiles, CharacterProfile } from "@/data/gameData";
import { Shield, Skull, Radio, AlertTriangle, Lock } from "lucide-react";

const FACTION_STYLES: Record<CharacterProfile["factionTag"], { border: string; badge: string; bg: string; label: string }> = {
  RESISTANCE: { border: "#FF0055", badge: "bg-[#FF0055] text-black", bg: "bg-[#FF0055]/5",  label: "LIBERATION FRONT" },
  AUTHORITY:  { border: "#FFFFFF", badge: "bg-white text-black",     bg: "bg-white/5",        label: "ENFORCEMENT DIV." },
  ROGUE:      { border: "#00E5FF", badge: "bg-[#00E5FF] text-black", bg: "bg-[#00E5FF]/5",   label: "INDEPENDENT OPERATIVE" },
};

const THREAT_COLORS: Record<CharacterProfile["threatLevel"], string> = {
  LOW:      "#22c55e",
  MEDIUM:   "#eab308",
  HIGH:     "#f97316",
  CRITICAL: "#ef4444",
};

// Cipher fallback SVG (since image quota ran out)
function CipherSVGPortrait() {
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full text-white" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="cipherDots" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="#1a1a1a" />
        </pattern>
      </defs>
      <rect width="200" height="220" fill="url(#cipherDots)" />
      {/* Hooded figure */}
      <ellipse cx="100" cy="60" rx="38" ry="42" fill="#0a0a0a" stroke="#00E5FF" strokeWidth="2.5" />
      <path d="M55 40 Q100 10 145 40 L158 120 Q130 95 100 98 Q70 95 42 120 Z" fill="#111" stroke="#00E5FF" strokeWidth="1.5"/>
      {/* Face */}
      <ellipse cx="100" cy="66" rx="24" ry="26" fill="#181818" />
      {/* Glasses with screen reflection */}
      <rect x="76" y="58" width="18" height="10" rx="2" fill="#000" stroke="#00E5FF" strokeWidth="1.5"/>
      <rect x="106" y="58" width="18" height="10" rx="2" fill="#000" stroke="#00E5FF" strokeWidth="1.5"/>
      <line x1="94" y1="63" x2="106" y2="63" stroke="#00E5FF" strokeWidth="1.2"/>
      {/* Screen glow in glasses */}
      <rect x="78" y="60" width="14" height="6" rx="1" fill="#00E5FF" opacity="0.3"/>
      <rect x="108" y="60" width="14" height="6" rx="1" fill="#00E5FF" opacity="0.3"/>
      {/* Body / jacket */}
      <path d="M42 120 Q60 108 100 112 Q140 108 158 120 L165 200 Q130 190 100 193 Q70 190 35 200 Z" fill="#0d0d0d" stroke="#333" strokeWidth="1.5"/>
      {/* Circuit pattern on jacket */}
      <path d="M60 140 H80 V155 H100 V140 H120" stroke="#00E5FF" strokeWidth="0.8" fill="none" opacity="0.5"/>
      <circle cx="80" cy="140" r="2" fill="#00E5FF" opacity="0.6"/>
      <circle cx="100" cy="155" r="2" fill="#00E5FF" opacity="0.6"/>
      {/* Keyboard hologram */}
      <rect x="68" y="168" width="64" height="18" rx="2" fill="none" stroke="#00E5FF" strokeWidth="0.8" opacity="0.4"/>
      {Array.from({length:8}).map((_,i) => (
        <rect key={i} x={70+i*8} y="170" width="6" height="4" rx="0.5" fill="#00E5FF" opacity="0.25" />
      ))}
      {/* Text at bottom */}
      <text x="100" y="213" textAnchor="middle" fill="#00E5FF" fontSize="8" fontFamily="monospace" opacity="0.6">
        [IDENTITY REDACTED]
      </text>
    </svg>
  );
}

interface CharacterDossierProps {
  activeCharacterId?: string;
  compact?: boolean;
}

export default function CharacterDossier({ activeCharacterId, compact = false }: CharacterDossierProps) {
  const [expanded, setExpanded] = useState<string | null>(activeCharacterId || null);

  const profiles = activeCharacterId
    ? characterProfiles.filter((p) => p.id === activeCharacterId)
    : characterProfiles;

  return (
    <div className={`grid gap-4 ${compact ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"}`}>
      {profiles.map((profile) => {
        const style = FACTION_STYLES[profile.factionTag];
        const isExpanded = expanded === profile.id || compact;
        return (
          <div
            key={profile.id}
            className="border-2 bg-black relative overflow-hidden cursor-pointer group transition-all duration-200"
            style={{ borderColor: style.border }}
            onClick={() => !compact && setExpanded(isExpanded ? null : profile.id)}
          >
            {/* Faction color accent top bar */}
            <div className="h-1 w-full" style={{ backgroundColor: style.border }} />

            {/* Top header */}
            <div className="flex items-center justify-between px-3 py-2 border-b border-white/10" style={{ backgroundColor: `${style.border}11` }}>
              <div className={`text-[9px] font-mono font-bold px-2 py-0.5 ${style.badge}`}>
                {style.label}
              </div>
              <div className={`text-[9px] font-mono font-bold px-2 py-0.5 border`}
                style={{ color: THREAT_COLORS[profile.threatLevel], borderColor: THREAT_COLORS[profile.threatLevel] }}>
                THREAT: {profile.threatLevel}
              </div>
            </div>

            {/* Portrait */}
            <div className="relative w-full h-44 bg-neutral-950 overflow-hidden border-b border-white/10">
              {profile.imagePath.includes("cipher_silhouette") ? (
                <CipherSVGPortrait />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.imagePath}
                  alt={profile.callsign}
                  className="w-full h-full object-cover object-top"
                  style={{ filter: "grayscale(100%) contrast(1.2)" }}
                />
              )}
              {/* CLASSIFIED stamp overlay */}
              <div className="absolute bottom-2 right-2 border border-red-500/60 px-1.5 py-0.5 text-[9px] font-mono font-black text-red-500/80 rotate-[-8deg]">
                {profile.clearanceLevel}
              </div>
            </div>

            {/* Identity block */}
            <div className="px-3 py-2 space-y-1">
              <div className="text-[9px] font-mono text-white/40 uppercase tracking-widest">CALLSIGN</div>
              <div className="font-comic text-base font-black text-white uppercase tracking-wider">{profile.callsign}</div>
              <div className="text-[10px] font-mono text-white/60">{profile.rank}</div>
              <div className="text-[10px] font-mono" style={{ color: style.border }}>{profile.faction}</div>
            </div>

            {/* Expandable details */}
            {isExpanded && (
              <div className="px-3 pb-3 space-y-2 border-t border-white/10 pt-2">
                {/* Status */}
                <div>
                  <div className="text-[9px] font-mono text-white/40 uppercase mb-0.5">STATUS</div>
                  <div className="text-[10px] font-mono text-red-400">{profile.status}</div>
                </div>

                {/* Quote */}
                <div className="border-l-2 pl-2 py-0.5 italic text-[10px] font-mono text-white/70" style={{ borderColor: style.border }}>
                  {profile.quote}
                </div>

                {/* Known abilities */}
                <div>
                  <div className="text-[9px] font-mono text-white/40 uppercase mb-1">KNOWN CAPABILITIES</div>
                  <div className="flex flex-wrap gap-1">
                    {profile.knownAbilities.map((ability) => (
                      <span key={ability} className="text-[9px] font-mono px-1.5 py-0.5 border border-white/20 text-white/70 bg-white/5">
                        {ability}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Redacted field */}
                <div className="flex items-center gap-1 bg-white/5 px-2 py-1.5 border border-white/10">
                  <Lock className="w-3 h-3 text-white/30 flex-shrink-0" />
                  <span className="text-[9px] font-mono text-white/30">{profile.redactedField}</span>
                </div>
              </div>
            )}

            {/* Expand hint */}
            {!compact && (
              <div className="px-3 py-1.5 border-t border-white/10 text-[9px] font-mono text-white/30 text-center">
                {isExpanded ? "▲ COLLAPSE DOSSIER" : "▼ EXPAND DOSSIER"}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
