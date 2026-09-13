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
      scrollSpeed = Math.min(30, Math.abs(currentScrollY - lastScrollY) * 0.8);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Dystopian Continuous Rain Droplets Simulation with impact splashes
    const dropCount = 140;
    const rainDrops = Array.from({ length: dropCount }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      length: Math.random() * 28 + 16,
      speed: Math.random() * 10 + 14,
      opacity: Math.random() * 0.5 + 0.25,
      tilt: -2.8,
    }));

    // Micro-splashes
    interface Splash {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      opacity: number;
    }
    const splashes: Splash[] = [];

    // Radial Speedlines
    const lineCount = 40;
    const lines = Array.from({ length: lineCount }).map(() => ({
      angle: Math.random() * Math.PI * 2,
      length: Math.random() * 80 + 40,
      distance: Math.random() * (Math.max(width, height) / 2),
      speed: Math.random() * 3.5 + 1.5,
      alpha: Math.random() * 0.5 + 0.15,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      scrollSpeed *= 0.92;

      // 1. Draw Dystopian Rain Particles (Pure stark white on black)
      ctx.lineWidth = 1.3;
      rainDrops.forEach((drop) => {
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x + drop.tilt, drop.y + drop.length + scrollSpeed * 0.6);
        ctx.strokeStyle = `rgba(255, 255, 255, ${drop.opacity})`;
        ctx.stroke();

        drop.y += drop.speed + scrollSpeed * 0.4;
        drop.x += drop.tilt;

        if (drop.y > height - 10) {
          if (Math.random() > 0.6) {
            splashes.push({
              x: drop.x,
              y: height - Math.random() * 8,
              radius: 1,
              maxRadius: Math.random() * 4 + 2,
              opacity: 0.6,
            });
          }
          drop.y = -drop.length;
          drop.x = Math.random() * width;
        }
      });

      // 2. Render Micro-splashes
      for (let i = splashes.length - 1; i >= 0; i--) {
        const s = splashes[i];
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${s.opacity})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();

        s.radius += 0.4;
        s.opacity -= 0.05;
        if (s.opacity <= 0 || s.radius >= s.maxRadius) {
          splashes.splice(i, 1);
        }
      }

      // 3. Draw Dynamic Speedlines when scrolling
      if (scrollSpeed > 0.5) {
        ctx.save();
        ctx.translate(width / 2, height / 2);
        const centerOffset = 160;

        lines.forEach((line) => {
          line.distance += line.speed + scrollSpeed * 2.5;
          const maxDist = Math.max(width, height) * 0.85;
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
          ctx.strokeStyle = `rgba(255, 255, 255, ${Math.min(0.8, line.alpha * (scrollSpeed / 3.5))})`;
          ctx.lineWidth = Math.min(3, 1 + scrollSpeed * 0.12);
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
      {/* Continuous Rain & Speedlines Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />

      {/* Cyberpunk Halftone & Screentone Texture */}
      <div className="absolute inset-0 bg-halftone opacity-35" />

      {/* Stark Monochromatic Ink Frame Border */}
      <div className="absolute inset-0 border-[8px] sm:border-[12px] border-black shadow-[inset_0_0_0_2px_#FFFFFF] pointer-events-none" />

      {/* Comic Noir Onomatopoeia Watermarks */}
      <div className="absolute top-24 right-8 font-comic font-black text-6xl sm:text-8xl text-white/[0.05] leading-none transform rotate-12 select-none pointer-events-none">
        BANG!
      </div>
      <div className="absolute bottom-20 left-10 font-comic font-black text-7xl sm:text-9xl text-white/[0.05] leading-none transform -rotate-6 select-none pointer-events-none">
        RATATATA!
      </div>
      <div className="absolute top-1/2 left-6 font-comic font-black text-5xl sm:text-7xl text-white/[0.04] leading-none transform -rotate-90 select-none pointer-events-none">
        ゴゴゴ
      </div>
    </div>
  );
}
