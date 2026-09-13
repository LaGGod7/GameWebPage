"use client";

import React, { useEffect } from "react";
import { useAchievements } from "@/hooks/useAchievements";

const RARITY_STYLES: Record<string, { border: string; bg: string; glow: string }> = {
  common:    { border: "#6b7280", bg: "#6b728020", glow: "none" },
  rare:      { border: "#3b82f6", bg: "#3b82f620", glow: "0 0 8px #3b82f640" },
  epic:      { border: "#a855f7", bg: "#a855f720", glow: "0 0 10px #a855f740" },
  legendary: { border: "#FFE600", bg: "#FFE60015", glow: "0 0 14px #FFE60060" },
};

// Toast notification for newly earned achievement
function AchievementToast({ achievement, onDismiss }: { achievement: { id: string; title: string; description: string; icon: string; rarity: string } | null; onDismiss: () => void }) {
  useEffect(() => {
    if (!achievement) return;
    const t = setTimeout(onDismiss, 4000);
    return () => clearTimeout(t);
  }, [achievement, onDismiss]);

  if (!achievement) return null;

  const style = RARITY_STYLES[achievement.rarity] || RARITY_STYLES.common;

  return (
    <div
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none"
      style={{ animation: "achievementSlideIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards" }}
      aria-live="polite"
      role="status"
    >
      <div
        className="flex items-center gap-3 px-5 py-3 border-2 font-mono"
        style={{
          borderColor: style.border,
          backgroundColor: "#050505",
          boxShadow: style.glow,
          minWidth: "280px",
        }}
      >
        <span className="text-2xl">{achievement.icon}</span>
        <div>
          <div className="text-[9px] uppercase tracking-widest" style={{ color: style.border }}>
            ACHIEVEMENT UNLOCKED — {achievement.rarity.toUpperCase()}
          </div>
          <div className="text-white font-black text-sm uppercase tracking-wide">{achievement.title}</div>
          <div className="text-white/50 text-[10px]">{achievement.description}</div>
        </div>
      </div>
      <style>{`
        @keyframes achievementSlideIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)    scale(1);   }
        }
      `}</style>
    </div>
  );
}

interface AchievementBadgesProps {
  className?: string;
  showAll?: boolean; // show locked achievements too (grayed out)
}

export default function AchievementBadges({ className = "", showAll = true }: AchievementBadgesProps) {
  const { earned, latest, clearLatest, allAchievements } = useAchievements();

  const display = showAll ? allAchievements : allAchievements.filter((a) => earned.has(a.id));

  return (
    <>
      <AchievementToast achievement={latest} onDismiss={clearLatest} />

      {display.length > 0 && (
        <div className={`flex flex-wrap gap-3 ${className}`}>
          {display.map((ach) => {
            const isEarned = earned.has(ach.id);
            const style = RARITY_STYLES[ach.rarity] || RARITY_STYLES.common;
            return (
              <div
                key={ach.id}
                className="flex items-center gap-2 px-3 py-2 border font-mono text-[10px] transition-all duration-300"
                style={{
                  borderColor: isEarned ? style.border : "#333",
                  backgroundColor: isEarned ? style.bg : "#0a0a0a",
                  boxShadow: isEarned ? style.glow : "none",
                  opacity: isEarned ? 1 : 0.4,
                  filter: isEarned ? "none" : "grayscale(100%)",
                }}
                title={ach.description}
              >
                <span className="text-base">{isEarned ? ach.icon : "🔒"}</span>
                <div>
                  <div className="font-black uppercase tracking-wider text-white text-[9px]">{ach.title}</div>
                  <div style={{ color: isEarned ? style.border : "#555" }} className="text-[8px] uppercase">
                    {ach.rarity}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
