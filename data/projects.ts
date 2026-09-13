export interface ProjectData {
  id: string;
  popoverId: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  role: string;
  metrics: string[];
  techStack: { name: string; rarity: "common" | "rare" | "epic" | "legendary"; category: string }[];
  blueprintDetails: string[];
  githubUrl: string;
  liveUrl: string;
}

export const sampleProjects: ProjectData[] = [
  {
    id: "proj-1",
    popoverId: "modal-proj-1",
    title: "NEO-CYBER ENGINE",
    codename: "PROJECT_CHRONOS",
    tagline: "High-performance WebGL Scrollytelling & 60FPS Comic Engine",
    description:
      "A cinematic scroll-driven storytelling engine built with Next.js App Router, GSAP ScrollTrigger, and custom GLSL fragment shaders simulating authentic manga halftones and diagonal ink cuts in real time.",
    role: "Lead Creative Technologist & Architect",
    metrics: ["60 FPS Locked", "0.00 CLS Score", "1.2MB Zero-Jank Bundle"],
    techStack: [
      { name: "Next.js 14", rarity: "legendary", category: "FRAMEWORK" },
      { name: "GSAP 3", rarity: "legendary", category: "ANIMATION" },
      { name: "Tailwind CSS", rarity: "epic", category: "STYLING" },
      { name: "TypeScript", rarity: "epic", category: "LANGUAGE" },
    ],
    blueprintDetails: [
      "Custom GSAP ScrollTrigger timeline scrubbing SVG clip-path polygons with sub-pixel interpolation.",
      "Native HTML Popover API integration with bidirectional keyboard & backdrop dismiss handlers.",
      "Strict CSS Anchor Positioning with fallback calculation for 100% device compatibility.",
      "Fully accessible prefers-reduced-motion layout fallback preserving all visual comic hierarchy."
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://nextjs.org",
  },
  {
    id: "proj-2",
    popoverId: "modal-proj-2",
    title: "SYNTH-NEXUS OS",
    codename: "PROJECT_VALKYRIE",
    tagline: "Distributed Real-time Game State Engine & Audio Synthesizer",
    description:
      "An ultra-low-latency distributed browser gaming platform powered by Web Audio API synthesizers, WebSocket state synchronization, and reactive spatial sound triggers.",
    role: "Full-Stack Distributed Systems Engineer",
    metrics: ["<35ms Latency", "500K+ Lobbies", "99.99% Uptime"],
    techStack: [
      { name: "Web Audio API", rarity: "legendary", category: "AUDIO" },
      { name: "WebSockets", rarity: "epic", category: "NETWORK" },
      { name: "React 18", rarity: "epic", category: "FRONTEND" },
      { name: "Node.js", rarity: "rare", category: "BACKEND" },
    ],
    blueprintDetails: [
      "Procedural comic sound synthesis eliminating external audio network requests completely.",
      "Binary WebSocket packet serializer reducing network overhead by 68%.",
      "Dynamic equalizer visualization synchronized with user interaction velocity."
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://react.dev",
  },
  {
    id: "proj-3",
    popoverId: "modal-proj-3",
    title: "QUANTUM GRID UI",
    codename: "PROJECT_GHOST_SHELL",
    tagline: "Adaptive Comic Component Design System & Component Library",
    description:
      "An open-source design system inspired by 90s cyber-noir manga. Features custom screentone utilities, onomatopoeia watermarks, dynamic diagonal clipping cards, and high-contrast dark modes.",
    role: "Design Systems & Frontend Lead",
    metrics: ["40+ Components", "100% A11y Rating", "5.4k GitHub Stars"],
    techStack: [
      { name: "Tailwind CSS", rarity: "legendary", category: "DESIGN" },
      { name: "TypeScript", rarity: "epic", category: "CORE" },
      { name: "Motion", rarity: "legendary", category: "MOTION" },
      { name: "Figma Tokens", rarity: "rare", category: "DESIGN" },
    ],
    blueprintDetails: [
      "Custom Tailwind preset with screentones, halftones, and hard-edged comic drop shadows.",
      "Comprehensive ARIA role bindings for complex interactive graphic novel dialog widgets.",
      "Built-in test suite for color contrast and screen-reader navigable comic sequences."
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://tailwindcss.com",
  },
];
