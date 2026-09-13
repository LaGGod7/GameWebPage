"use client";

import { useState, useEffect, useCallback } from "react";
import { achievements, Achievement } from "@/data/gameData";

const STORAGE_KEY = "liberated_achievements";

export function useAchievements() {
  const [earned, setEarned] = useState<Set<string>>(new Set());
  const [latest, setLatest] = useState<Achievement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as string[];
      setEarned(new Set(saved));
    } catch {}
  }, []);

  const unlock = useCallback((id: string) => {
    setEarned((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(next)));
      }
      const ach = achievements.find((a) => a.id === id);
      if (ach) setLatest(ach);
      return next;
    });
  }, []);

  const clearLatest = useCallback(() => setLatest(null), []);

  // Listen to global achievement events
  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent<{ id: string }>;
      unlock(ev.detail.id);
    };
    window.addEventListener("liberated_achievement", handler);
    return () => window.removeEventListener("liberated_achievement", handler);
  }, [unlock]);

  return { earned, unlock, latest, clearLatest, allAchievements: achievements };
}
