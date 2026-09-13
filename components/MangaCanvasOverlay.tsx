"use client";

import React, { useEffect, useRef } from "react";

export default function MangaCanvasOverlay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let scrollSpeed = 0;
    let lastScrollY = window.scrollY;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollSpeed = Math.min(25, Math.abs(currentScrollY - lastScrollY) * 0.8);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Speed lines particles from center outward
    const lineCount = 40;
    const lines = Array.from({ length: lineCount }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      length: Math.random() * 80 + 40,
      distance: Math.random() * (Math.max(width, height) / 2),
      speed: Math.random() * 3 + 1,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Decelerate scroll speed effect
      scrollSpeed *= 0.92;

      // Only draw dynamic radial speedlines if scrolling or motion is present
      if (scrollSpeed > 0.5) {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        const centerOffset = 180;

        lines.forEach((line) => {
          line.distance += (line.speed + scrollSpeed * 2);
          const maxDist = Math.max(width, height) * 0.8;
          if (line.distance > maxDist) {
            line.distance = centerOffset;
            line.angle = Math.random() * Math.PI * 2;
          }

          const x1 = Math.cos(line.angle) * line.distance;
          const y1 = Math.sin(line.angle) * line.distance;
          const x2 = Math.cos(line.angle) * (line.distance + line.length + scrollSpeed * 4);
          const y2 = Math.sin(line.angle) * (line.distance + line.length + scrollSpeed * 4);

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.8, line.alpha * (scrollSpeed / 5))})`;
          ctx.lineWidth = Math.min(3, 1 + scrollSpeed * 0.1);
          ctx.stroke();
        });
        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-30 overflow-hidden select-none">
      {/* Dynamic Speedlines Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Cyberpunk Halftone Vignette */}
      <div className="absolute inset-0 bg-halftone opacity-35" />

      {/* Comic Border Vignette Frame */}
      <div className="absolute inset-0 border-[8px] sm:border-[12px] border-black pointer-events-none" />

      {/* Japanese Onomatopoeia Watermarks (Cyberpunk Noir Aesthetic) */}
      <div className="absolute top-20 right-6 font-comic font-black text-6xl sm:text-8xl text-white/[0.04] leading-none transform rotate-12 select-none pointer-events-none">
        ゴゴゴ
      </div>
      <div className="absolute bottom-16 left-8 font-comic font-black text-7xl sm:text-9xl text-white/[0.04] leading-none transform -rotate-6 select-none pointer-events-none">
        ドンッ!
      </div>
      <div className="absolute top-1/2 left-4 font-comic font-black text-5xl sm:text-7xl text-manga-neonPink/[0.05] leading-none transform -rotate-90 select-none pointer-events-none">
        ズキュウウウン
      </div>
    </div>
  );
}
