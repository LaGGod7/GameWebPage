Here is the complete Markdown specification document for your interactive manga portfolio website. You can copy and paste this file (`portfolio-spec.md`) directly into your project repository or feed it into your AI coding agent (e.g., Cursor, Claude, GitHub Copilot) to generate the codebase.

---

# ARCHITECTURAL SPECIFICATION: INTERACTIVE MANGA DIGITAL PORTFOLIO

## 1. Project Overview & Visual Vision

This project is a high-performance, scroll-driven interactive manga narrative portfolio inspired by the cyberpunk noir graphic novel style of *Liberated*. The application translates traditional comic panels, diagonal speed lines, speech bubbles, and sound effects into dynamic web components driven by user scroll input.

### Core Aesthetic Principles

* **Color Palette:** High-contrast monochromatic black/white base (`#000000`, `#FFFFFF`, `#121212`) paired with selective neon highlight colors (e.g., `#FF0055` or `#00E5FF`) for UI interactive triggers.


* **Line Art Style:** Heavy black ink shading, cross-hatching, halftone dot overlays, and sharp diagonal panel cuts.


* **Motion Engine:** Linear camera pan-and-zoom through pinned viewport scenes using GreenSock Animation Platform (GSAP) and Motion.



---

## 2. Asset Sourcing & Library Manifest

The following assets provide the visual foundation for multi-layered parallax backgrounds, transparent character cutouts, speech bubbles, and UI badges.

### Primary Asset Repositories

| Asset Category | Source / Provider | Download Link | License Model | Intended Usage |
| --- | --- | --- | --- | --- |
| **Working Files & Characters** | Reign Breaker Press Kit

 | [Google Drive Press Kit](https://indieformer.com/press-kit-guide/)<br> | Developer Public Access

 | Layered `.PSD`/`.SVG` character cutouts & line art

 |
| **Comic Layout Assets** | Playable Concepts (Solip Park)

 | [Aalto University Asset Pack](https://playableconcepts.aalto.fi/portfolio/comic-style-basics/)<br> | Creative Commons CC BY 3.0

 | Background plates, character templates, and props

 |
| **Comic UI & Frames** | Moludar Comic UI Pack

 | [Itch.io Comic Tag](https://itch.io/game-assets/tag-comics)<br> | Permissive / Developer Terms

 | 50+ comic frames, 100+ speech bubble vectors

 |
| **Environment Backgrounds** | The Outlander CC0 Packs

 | [Itch.io Dungeon/Sci-Fi Sets](https://itch.io/game-assets/tag-comics)<br> | Creative Commons CC0

 | Dark fantasy & sci-fi fixed stage plates

 |
| **Skill & Item Icons** | AssetSmithy 2D Samplers

 | [Itch.io AssetSmithy](https://itch.io/game-assets/tag-comics)<br> | Permissive / Commercial Sampler

 | Inventory-style badges for tech stacks

 |
| **Audio FX & Transitions** | Envato / Freesound Comic Suite

 | [Envato Elements Comic Audio](https://elements.envato.com/all-items/comic)<br> | Royalty-Free Commercial

 | Page-turn rustles, pops, and impact sounds

 |

---

## 3. Recommended Technical Stack

* **Framework:** Next.js (App Router) + TypeScript


* **Styling:** Tailwind CSS + Custom CSS Variables


* **Motion Engine:** GSAP (with `ScrollTrigger` & `SplitText`)


* **React Transitions:** Motion (`useScroll`, `useTransform`)


* **Audio Engine:** Howler.js (for spatial, low-latency sound triggers)


* **Image Pipeline:** WebP / SVG for optimal rendering budget



---

## 4. UI/UX Page Architecture & Layout Snapshots

```
+-------------------------------------------------------------+
| VOL. 01 // PORTFOLIO HEADER           [ AUDIO TOGGLE: ON ]  |
+-------------------------------------------------------------+
|                                                             |
|   +-----------------------------------------------------+   |
|   | PANEL 01: HERO COVER (Pinned Viewport)               |   |
|   |                                                     |   |
|   |  /---------------\      [ Character Cutout ]        |   |
|   | /  DIAGONAL MASK  \     (Scrollytelling Parallax)   |   |
|   |/   PANEL OVERLAY   \                                |   |
|   |                     \   "SCROLL TO UNLOCK ISSUE"    |   |
|   +-----------------------------------------------------+   |
|                                                             |
|   +-----------------------------------------------------+   |
|   | PANEL 02: FEATURED PROJECTS (Zoom & Pan Transition) |   |
|   |                                                     |   |
|   |  +--------------------+  (Speech Bubble Overlay)    |   |
|   |  | Project Screen     |  /------------------------\ |   |
|   |  | Frame (Clip-Path)  | < "Built with Next & GSAP"| |   |
|   |  +--------------------+  \------------------------/ |   |
|   |  [Tech Badges: React, TypeScript, Tailwind]         |   |
|   +-----------------------------------------------------+   |
|                                                             |
|   +-----------------------------------------------------+   |
|   | PANEL 03: INTERACTIVE EXPERIENCE (Dialogue Grid)    |   |
|   |                                                     |   |
|   |  [ Character A ]            [ Character B ]         |   |
|   |  +-----------------------------------------------+  |   |
|   |  | "Select Dialogue Branch:"                     |  |   |
|   |  |  > Option 1: Inspect Frontend Mastery         |  |   |
|   |  |  > Option 2: Inspect Architecture & Performance |  |   |
|   |  +-----------------------------------------------+  |   |
|   +-----------------------------------------------------+   |
|                                                             |
+-------------------------------------------------------------+

```

---

## 5. UI Components & Effect Specifications

### Component 1: `MangaHeader`

* **Visual Style:** Monochromatic banner fixed at top, formatted as a comic book issue bar.


* **Features:**
* Left: Issue indicator `VOL. 01 // INTERACTIVE PORTFOLIO`.
* Center: Manga page progress tracker bar.
* Right: Interactive sound toggle medallion with visual equalizer bars.





### Component 2: `HeroCoverPanel` (Section 1)

* **Visual Style:** Full-screen (`100vh`) hero scene featuring a diagonal clipped panel frame and multi-layered character cutout.


* **Scroll Behavior:**
* Pinned in place for `2000px` of virtual scroll depth.


* As user scrolls down, background halftone scales up by $10\%$, foreground character moves $15\%$ horizontally to create 3D parallax depth.


* Text uses GSAP `SplitText` to write out character dialogue line-by-line.





### Component 3: `ProjectShowcaseGrid` (Section 2)

* **Visual Style:** A 3-panel comic spread layout using CSS Grid and `clip-path` polygon masks.


* **Interactive Elements:**
* **Anchored Speech Bubbles:** HTML text elements positioned over target nodes using CSS Anchor Positioning.


* **Project Modals:** Clicking a project panel opens a popover modal using the native HTML Popover API, displaying deep-dive case studies.


* **Item Badges:** Tech stack icons styled as RPG comic inventory items.





### Component 4: `BranchingDialogue` (Section 3)

* **Visual Style:** Visual-novel dialogue interface featuring dual character portraits.


* **Interactive Elements:**
* Choice buttons styled as comic action callouts ("BAM!", "SELECT").


* Selecting an option triggers dynamic line art changes and loads specific resume experience cards.





---

## 6. Implementation Code Templates for Development AI

Provide these code templates to your AI agent to construct the primary animation triggers.

### GSAP Pinned Panel & Clip-Path Reveal Implementation

```javascript
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function MangaScrollytellingStage() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=3000",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // Step 1: Reveal panel 1 via clipPath polygon morphing
      tl.to(".manga-panel-1", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.5,
        ease: "power2.inOut"
      })
      // Step 2: Parallax shift character sprite forward
      .to(".character-sprite", {
        xPercent: 20,
        scale: 1.1,
        duration: 2
      }, "<")
      // Step 3: Fade in speech bubble with slight bounce
      .from(".speech-bubble", {
        scale: 0,
        opacity: 0,
        transformOrigin: "bottom left",
        duration: 0.8,
        ease: "back.out(1.7)"
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-black overflow-hidden">
      <div className="manga-panel-1 absolute inset-0 bg-neutral-900 clip-hidden">
        <img src="/assets/bg-plate.webp" alt="Background" className="w-full h-full object-cover" />
        <img src="/assets/character.webp" alt="Character" className="character-sprite absolute bottom-0 left-10 h-4/5 object-contain" />
        <div className="speech-bubble absolute top-1/4 left-1/3 bg-white text-black p-6 rounded-3xl border-4 border-black font-bold">
          Welcome to my interactive domain!
        </div>
      </div>
    </div>
  );
}

```

### Global CSS Utility Rules (`globals.css`)

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Halftone Dot Overlay Pattern */
.bg-halftone {
  background-image: radial-gradient(#262626 20%, transparent 20%);
  background-size: 12px 12px;
}

/* Initial Hidden Clip Path state for dynamic polygon reveals */
.clip-hidden {
  clip-path: polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%);
}

/* Reduced Motion Override for Accessibility */
@media (prefers-reduced-motion: reduce) {
  .character-sprite,
  .manga-panel-1 {
    animation: none !important;
    transform: none !important;
    clip-path: none !important;
    transition: opacity 0.3s ease-in-out !important;
  }
}


