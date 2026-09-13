GAME LANDING PAGE SPECIFICATION: LIBERATED (CYBERPUNK NOIR SHOWCASE)1. Project Overview & Narrative ConceptThis specification adapts the interactive scrollytelling engine from a personal portfolio into a promotional landing page for the indie video game Liberated. The goal is to let visitors "play" through the web page as if flipping and scrolling through a digital cyberpunk comic book.  Core Game VisionTitle: Liberated[cite: 1]Genre: Cyberpunk Noir Action-Adventure / Puzzle Platformer  Visual Style: Monochromatic black-and-white hand-drawn ink panels, rain-soaked dystopian cityscapes, heavy contrast, and high-tech user interface overlays.  Web Experience: Scroll-linked camera pan-and-zooms through interactive comic frames, displaying gameplay features (stealth, gunfights, narrative puzzles) as user-triggered comic events.  2. Asset Library & Media ManifestAsset CategorySource / ProviderReference / Access LinkUsage in Game SiteGame Screenshots & Key ArtOfficial Press Kit / Store AssetsGOG Product Assets[cite: 1]High-res monochrome panel backgrounds, character key art  Working Graphics & Layer CutoutsDeveloper Presskit ArchiveIndie PressKit Standard[cite: 3]Transparent PNG cutouts of protagonist silhouettes & enemies  Comic Frames & FX OverlaysMoludar Comic UI PackItch.io Comic Tag[cite: 4]Vector speech bubbles, action frames, dynamic speech callouts  Rain & Halftone TexturesMagnific / Free Stock AssetsMagnific Comic Assets[cite: 5]Seamless rain particle overlays & comic halftone background textures  Cyberpunk & Tech IconsAssetSmithy 2D SamplersItch.io AssetSmithy[cite: 4]Inventory-style icons for game features (Stealth, Hacking, Combat)  Comic & Noir Audio SuiteEnvato Comic Sound FXEnvato Elements Audio[cite: 7]Rain ambiance, gun click sounds, page rustles, impact pops  3. Web Site Architecture & Layout BlueprintInstead of a resume layout, the page is organized as a multi-panel issue layout detailing the game's premise, gameplay pillars, story lore, and purchasing options.  Page Structure SummaryHeader Bar (Fixed)Left: Game Title Logo (LIBERATED) + Issue Tag (ISSUE #1: THE RESISTANCE)  Center: Scroll progress bar styled as a comic reading trackerRight: Audio toggle (Rain FX & Page SFX) + "Buy on Steam / GOG" CTA button  Section 1: Hero Cover Stage (The Entry Panel)Full-viewport (100vh) pinned stage.  Visual: Rain-soaked cyberpunk city skyline with a silhouetted protagonist.  Dynamic Effect: Scroll triggers a parallax shift between foreground rain, character line art, and background buildings.  Main CTA: Animated scroll indicator reading "SCROLL TO ENTER THE COMIC".  Section 2: Gameplay Pillars (Multi-Panel Scrollytelling)Pinned grid containing 3 diagonal comic panels.  Panel 1: Stealth & Platforming – Video loop inside a comic cutout.  Panel 2: Gunfights & Action – Clip-path reveal of combat sequences.  Panel 3: Dystopian Puzzles – Interactive hacking terminal snippet.  Section 3: Branching Narrative Preview (Interactive Story)Visual-novel dialogue interface featuring dystopian lore.  User choices alter character dialogue bubbles to showcase the game's multi-perspective storytelling.  Section 4: Reviews & System Requirements (The Back Cover)High-contrast review quote bubbles (e.g., "Noir graphic novel come to life" – Game Informer).  Interactive modal window for System Specs (Minimum vs. Recommended) using the native HTML Popover API.  Footer with developer/publisher credits (Atomic Wolf / Walkabout Games) and store links.  4. Component & Visual Effect SpecificationsComponent 1: CyberpunkRainStageVisual Style: Monochromatic dark mode (#080808 base) with continuous CSS CSS-canvas rain particle animation.  Scroll Link: Pinned for 2500px of virtual scroll depth. As user scrolls, the camera zooms into the central comic panel frame, simulating entering the comic page.  Component 2: GameplayFeatureGridVisual Style: 3-column diagonal grid with heavy black borders and vector speech callouts.  Interactive Behavior:Uses GSAP ScrollTrigger to scale and un-clip panels as they reach center screen.  Speech bubbles present game features: "Experience stealth, gunfights, and moral choices inside living comic pages."[cite: 1]Component 3: NarrativeChoiceNodeVisual Style: Split-screen character portraits with speech bubbles using CSS Anchor Positioning.  Interaction: Clicking choice buttons ("Side with Resistance" vs. "Maintain Order") plays a comic impact sound ("BAM!") and switches character dialogue previews.  5. Technical Implementation Code SnippetUse this updated Next.js / GSAP code snippet to drive the game's pinned panel reveal.JavaScriptimport { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function LiberatedGameStage() {
  const stageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=3500",
          pin: true,
          scrub: 1,
          anticipatePin: 1
        }
      });

      // 1. Zoom into comic cover panel
      tl.to(".hero-comic-frame", {
        scale: 1.3,
        opacity: 0.2,
        duration: 2,
        ease: "power1.inOut"
      })
      // 2. Reveal Gameplay Action Panel via polygon clip-path
      .to(".gameplay-panel-stealth", {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 2,
        ease: "power2.out"
      }, "-=1")
      // 3. Slide character cutout with parallax motion
      .from(".protagonist-cutout", {
        xPercent: -50,
        opacity: 0,
        duration: 1.5
      }, "<")
      // 4. Pop up game quote bubble
      .from(".quote-bubble", {
        scale: 0,
        transformOrigin: "bottom left",
        duration: 0.8,
        ease: "back.out(1.7)"
      });

    }, stageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={stageRef} className="relative w-full h-screen bg-neutral-950 text-white overflow-hidden">
      {/* Background Rain & City */}
      <div className="hero-comic-frame absolute inset-0 flex items-center justify-center border-8 border-black">
        <img src="/assets/liberated-cover.webp" alt="Liberated City" className="w-full h-full object-cover filter grayscale contrast-125" />
        <h1 className="absolute text-7xl font-black tracking-widest uppercase bg-black text-white px-6 py-2 border-4 border-white">
          LIBERATED
        </h1>
      </div>

      {/* Gameplay Panel Reveal Stage */}
      <div className="gameplay-panel-stealth absolute inset-0 bg-black clip-hidden flex flex-col items-center justify-center p-12">
        <img src="/assets/protagonist.webp" alt="Protagonist" className="protagonist-cutout absolute left-12 bottom-0 h-4/5 object-contain" />
        <div className="quote-bubble absolute top-1/3 right-24 bg-white text-black p-6 rounded-2xl border-4 border-black max-w-md font-bold text-lg shadow-2xl">
          <p>"Enter an action-adventure game inside a living, hand-drawn comic book."</p>
          <span className="block mt-2 text-sm text-neutral-600">— Game Informer</span>
        </div>
      </div>
    </div>
  );
}
