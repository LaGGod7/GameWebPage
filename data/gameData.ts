import { Rarity } from "@/components/ItemBadge";

export interface GamePillarData {
  id: string;
  popoverId: string;
  title: string;
  codename: string;
  tagline: string;
  description: string;
  category: string;
  features: string[];
  mechanics: { name: string; rarity: Rarity; category: string }[];
  controlsPreview: string[];
  steamUrl?: string;
  gogUrl?: string;
}

export interface ReviewQuote {
  quote: string;
  outlet: string;
  score?: string;
  highlight?: boolean;
}

export interface StoryChoiceBranch {
  id: string;
  actionCallout: string;
  buttonLabel: string;
  characterTitle: string;
  characterFaction: string;
  characterMood: "determined" | "analytical" | "triumphant";
  dialogueText: string;
  consequence: string;
  tacticalTraits: { name: string; rarity: Rarity; category: string }[];
}

export const liberatedPillars: GamePillarData[] = [
  {
    id: "pillar-stealth",
    popoverId: "modal-stealth",
    title: "STEALTH & INFILTRATION",
    codename: "PILLAR_01 // GHOST PROTOCOL",
    tagline: "Vanish into Hand-Drawn Shadows & Evade Dystopian Surveillance",
    description:
      "Navigate dystopian mega-structures, CCTV grids, and automated police drones. Creep through vents, neutralize biometric sensors, and perform non-lethal takedowns within living comic book panels.",
    category: "TACTICAL PLATFORMER",
    features: [
      "Dynamic Light & Shadow Engine: Hide inside pure black ink shading to break enemy line-of-sight.",
      "Acoustic Noise Detection: Every footstep and broken glass tile alerts nearby riot officers.",
      "Multi-Route Panel Navigation: Discover vertical elevator shafts, rooftop fire escapes, and underground sewers."
    ],
    mechanics: [
      { name: "Shadow Cloak", rarity: "legendary", category: "STEALTH" },
      { name: "Drone Bypass", rarity: "epic", category: "HACKING" },
      { name: "Silent Takedown", rarity: "rare", category: "COMBAT" },
      { name: "Rooftop Parkour", rarity: "epic", category: "MOBILITY" }
    ],
    controlsPreview: [
      "[CTRL / C] — Crouch & Enter Deep Shadows",
      "[F] — Silent Biometric Restraint",
      "[SPACE + W] — Ledge Grab & Wall Vault"
    ],
    steamUrl: "https://store.steampowered.com/app/875310/Liberated/",
    gogUrl: "https://www.gog.com/game/liberated"
  },
  {
    id: "pillar-combat",
    popoverId: "modal-combat",
    title: "GUNFIGHTS & ACTION",
    codename: "PILLAR_02 // KINETIC FIRE",
    tagline: "High-Caliber Noir Shootouts with Dynamic Comic Panel Destruction",
    description:
      "When diplomacy fails, draw your custom sidearm. Engage in frantic, physics-driven gunfights where panel borders shatter, muzzle flashes illuminate the dark, and bullets pierce destructible cover.",
    category: "ACTION SHOOTER",
    features: [
      "Dynamic Comic Visual FX: Onomatopoeic text (BANG!, RATATATA!) bursts from weapons upon trigger pull.",
      "Destructible Panel Cover: Concrete barriers, glass partitions, and barricades splinter under sustained fire.",
      "Tactical Bullet-Time Dodges: Roll beneath incoming fire and return accurate headshots in slow motion."
    ],
    mechanics: [
      { name: "Heavy Magnum", rarity: "legendary", category: "FIREARM" },
      { name: "Cover Slide", rarity: "epic", category: "MOBILITY" },
      { name: "Penetrating Round", rarity: "rare", category: "AMMO" },
      { name: "Bullet Time", rarity: "legendary", category: "REFLEX" }
    ],
    controlsPreview: [
      "[L-CLICK] — Fire Equipped Weapon",
      "[R-CLICK / SHIFT] — Aim & Enter Bullet Focus",
      "[SPACE + DIRECTION] — Tactical Combat Roll"
    ],
    steamUrl: "https://store.steampowered.com/app/875310/Liberated/",
    gogUrl: "https://www.gog.com/game/liberated"
  },
  {
    id: "pillar-puzzles",
    popoverId: "modal-puzzles",
    title: "DYSTOPIAN HACKING",
    codename: "PILLAR_03 // CIPHER BREAKER",
    tagline: "Decrypt Authoritarian Databanks & Unravel Government Conspiracies",
    description:
      "Jack into Citizen Credit score databases, bypass facial recognition servers, and solve multi-layered logic riddles to expose the totalitarian regime's darkest secrets.",
    category: "LOGIC PUZZLE",
    features: [
      "Interactive Terminal Decryptor: Rewire logic gates, crack alphanumeric hashes, and tap phone lines.",
      "Surveillance Network Manipulation: Turn government defense turrets against oppressive enforcement squads.",
      "Branching Evidence Dossiers: Collect classified files that unlock alternative story endings."
    ],
    mechanics: [
      { name: "Cipher Key", rarity: "legendary", category: "CYBER" },
      { name: "Network Sniffer", rarity: "epic", category: "HACKING" },
      { name: "Overclock CPU", rarity: "rare", category: "TECH" },
      { name: "Firewall Breaker", rarity: "epic", category: "UTILITY" }
    ],
    controlsPreview: [
      "[E] — Interact with Data Terminal",
      "[ARROW KEYS] — Route Power Logic Nodes",
      "[ENTER] — Execute Decryption Script"
    ],
    steamUrl: "https://store.steampowered.com/app/875310/Liberated/",
    gogUrl: "https://www.gog.com/game/liberated"
  }
];

export const storyBranches: StoryChoiceBranch[] = [
  {
    id: "resistance",
    actionCallout: "BAM!",
    buttonLabel: "SIDE WITH THE RESISTANCE",
    characterTitle: "BARRY // RESISTANCE INSURGENT",
    characterFaction: "UNDERGROUND NETWORK // LIBERATION FRONT",
    characterMood: "determined",
    dialogueText:
      "“The Citizen Credit system isn't for public safety—it's a digital leash. Tonight, we breach Central Node 09 and wipe the surveillance ledger clean.”",
    consequence: "Unlocks insurgent sabotage missions, smoke grenades, and anti-surveillance EMP tools.",
    tacticalTraits: [
      { name: "Guerilla Tactics", rarity: "legendary", category: "RESISTANCE" },
      { name: "EMP Grenade", rarity: "epic", category: "EQUIPMENT" },
      { name: "Black Market Ammo", rarity: "rare", category: "SUPPLY" },
      { name: "Infiltration Rig", rarity: "legendary", category: "GEAR" }
    ]
  },
  {
    id: "order",
    actionCallout: "HALT!",
    buttonLabel: "ENFORCE GOVERNMENT COMPLIANCE",
    characterTitle: "CAPTAIN FRANKS // ENFORCEMENT DIVISION",
    characterFaction: "METROPOLITAN SECURITY BUREAU",
    characterMood: "analytical",
    dialogueText:
      "“Without the system, this city falls to lawless chaos. We don't make the laws, but we maintain the line between civilization and complete anarchy.”",
    consequence: "Unlocks riot armor plates, tactical drone support, and government terminal overrides.",
    tacticalTraits: [
      { name: "Riot Shield", rarity: "legendary", category: "AUTHORITY" },
      { name: "Drone Support", rarity: "epic", category: "TECH" },
      { name: "Override Keycard", rarity: "rare", category: "ACCESS" },
      { name: "Combat Armor", rarity: "legendary", category: "DEFENSE" }
    ]
  },
  {
    id: "rogue",
    actionCallout: "HACK!",
    buttonLabel: "GO ROGUE & LEAK THE CONSPIRACY",
    characterTitle: "CIPHER // WHISTLEBLOWER ANALYST",
    characterFaction: "INDEPENDENT DATA OPERATIVE",
    characterMood: "triumphant",
    dialogueText:
      "“Both sides are playing a rigged game. I have the root access logs—broadcast them to every billboard in the metropolis and let the citizens decide.”",
    consequence: "Triggers the true conspiracy storyline, disabling all citywide security grids simultaneously.",
    tacticalTraits: [
      { name: "Broadcast Hijack", rarity: "legendary", category: "CYBER" },
      { name: "Master Keyring", rarity: "epic", category: "HACKING" },
      { name: "Scrambler Node", rarity: "epic", category: "STEALTH" },
      { name: "Whistleblower Logs", rarity: "rare", category: "INTEL" }
    ]
  }
];

export const pressReviews: ReviewQuote[] = [
  {
    quote: "Enter an action-adventure game inside a living, hand-drawn comic book.",
    outlet: "Game Informer",
    score: "9.0 / 10",
    highlight: true
  },
  {
    quote: "A bold, stylish graphic novel come to life with tight noir gunplay.",
    outlet: "PC Gamer",
    score: "RECOMMENDED",
    highlight: false
  },
  {
    quote: "Liberated blends cyberpunk dystopian themes with thrilling comic panels.",
    outlet: "IGN",
    score: "8.5 / 10",
    highlight: true
  },
  {
    quote: "The visual presentation is stunning—a true love letter to dark noir comics.",
    outlet: "Rock Paper Shotgun",
    score: "ESSENTIAL",
    highlight: false
  }
];

// ─────────────────────────────────────────────────────────────────────────────
// HACKING TERMINAL DATA
// ─────────────────────────────────────────────────────────────────────────────
export interface HackingCommand {
  output: string;
  type: "success" | "warning" | "error" | "classified" | "info" | "system";
  delay?: number; // ms to simulate processing
}

export const hackingCommands: Record<string, HackingCommand> = {
  HELP: {
    output: `LIBERATION FRONT SECURE SHELL v2.089
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AVAILABLE COMMANDS:
  SCAN_NETWORK          — Enumerate nearby surveillance nodes
  BREACH_NODE_09        — Initiate breach on Central Hub 09
  DECRYPT [--target]    — Decrypt classified government files
  WHOAMI                — Display current operative identity
  LS_CLASSIFIED         — List intercepted classified files
  SUDO_LIBERATE         — Execute full network liberation sequence
  CAT MEMO_2089         — Read intercepted government memorandum
  PING CENTRAL_NODE     — Test connectivity to government mainframe
  STATUS                — Display current mission status
  CLEAR                 — Clear terminal buffer`,
    type: "info",
    delay: 200,
  },
  SCAN_NETWORK: {
    output: `[SCANNING METROPOLITAN NETWORK...]
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ 100%

NODES DETECTED: 23
  ├─ NODE_01 [PATROL_DRONE_ALPHA]    STATUS: ACTIVE    THREAT: HIGH
  ├─ NODE_04 [CCTV_GRID_SECTOR_7]   STATUS: ACTIVE    THREAT: MED
  ├─ NODE_07 [BIOMETRIC_SCANNER_B]  STATUS: IDLE      THREAT: LOW
  ├─ NODE_09 [CENTRAL_HUB]          STATUS: ██████    THREAT: ████
  ├─ NODE_12 [CREDIT_BUREAU_DB]     STATUS: LOCKED    THREAT: ████
  └─ NODE_19 [BROADCAST_TOWER]      STATUS: ACTIVE    THREAT: MED

[!] NODE_09 IS VULNERABLE — FIREWALL VERSION 2.1.4 (OUTDATED)
TIP: Use BREACH_NODE_09 to initiate access sequence.`,
    type: "success",
    delay: 1800,
  },
  BREACH_NODE_09: {
    output: `[INITIATING BREACH SEQUENCE: NODE_09]
Attempting handshake...        [OK]
Spoofing MAC address...        [OK]
Injecting payload v3.7...      [OK]
Bypassing 2-factor auth...

[WARNING: TRACE DETECTED — ROUTING THROUGH PROXY]
Rerouting via Node 19...       [OK]
Proxy tunnel established...    [OK]

BREACH PROGRESS:
[█████████████████░░░] 88%
[████████████████████] 100% — ACCESS GRANTED

> Connected to CENTRAL_HUB_09
> Filesystem mounted at /secure/credit_bureau/
> 14,207 citizen records accessible.
> Type LS_CLASSIFIED to view intercepted files.`,
    type: "warning",
    delay: 2800,
  },
  "DECRYPT --target=CREDIT_DB": {
    output: `DECRYPTING: CITIZEN_CREDIT_DB.enc
Key exchange...    RSA-4096   [OK]
AES-256 decrypt... [████████████████████] COMPLETE

DECRYPTED CONTENT — FILE: RELOCATION_ORDER_2089.doc
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
METROPOLITAN SECURITY BUREAU — INTERNAL ONLY
RE: PHASE 3 COMPLIANCE ENFORCEMENT

Citizens assigned Citizen Credit Score below 400 are
hereby designated for MANDATORY RELOCATION to
Re-Education Sector 7-F.

Current count: 12,847 citizens affected.

Authorization: DIRECTOR VERAN, CLEARANCE OMEGA
Signature: ████████████ [CLASSIFIED]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[DECRYPTION COMPLETE — FILE SAVED TO LOCAL CACHE]`,
    type: "classified",
    delay: 2400,
  },
  DECRYPT: {
    output: `USAGE: DECRYPT --target=<FILENAME>
AVAILABLE TARGETS:
  CREDIT_DB     — Citizen Credit Score database
  RELOC_ORDERS  — Phase 3 relocation orders
  PATROL_ROUTES — Drone patrol route manifests
  DIRECTOR_COMM — Director communications log

Example: DECRYPT --target=CREDIT_DB`,
    type: "info",
    delay: 300,
  },
  WHOAMI: {
    output: `OPERATIVE IDENTITY CHECK...

CALLSIGN:     [REDACTED]
FACTION:      LIBERATION FRONT
CREDIT SCORE: 000 — ★ LIBERATED
STATUS:       MOST WANTED — THREAT LEVEL ALPHA
ACCESS:       ROOT (UNAUTHORIZED)
ACTIVE SINCE: 2089.03.17

"Both the system and those who enforce it are
the enemy. Data is the revolution's ammunition."
                           — CIPHER, 2089`,
    type: "success",
    delay: 600,
  },
  LS_CLASSIFIED: {
    output: `/secure/credit_bureau/intercepts/
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
drwxr--r--  RELOCATION_ORDER_2089.doc        [CLASSIFIED]
drwxr--r--  CREDIT_SCORE_MANIPULATION.log    [CLASSIFIED]
drwxr--r--  DIRECTOR_VERAN_COMMS.enc         [TOP SECRET]
drwxr--r--  PHASE3_ENFORCEMENT_PLAN.pdf      [CLASSIFIED]
drwxr--r--  WHISTLEBLOWER_WATCHLIST.txt      [RESTRICTED]
drwxr--r--  NODE_09_FIREWALL_AUDIT.txt       [INTERNAL]
drwxr--r--  CITIZEN_REASSIGNMENT_Q4.csv      [CLASSIFIED]

7 files intercepted. Type DECRYPT --target=<name> to read.`,
    type: "classified",
    delay: 800,
  },
  SUDO_LIBERATE: {
    output: `[SUDO] LIBERATION SEQUENCE AUTHORIZED

Disabling citywide surveillance grid...
  ├─ CCTV Sector 1-4:     OFFLINE ████████████ [DONE]
  ├─ Facial Recog Grid:   OFFLINE ████████████ [DONE]
  ├─ Citizen Credit Sys:  OFFLINE ████████████ [DONE]
  └─ Patrol Drone Fleet:  OFFLINE ████████████ [DONE]

Broadcasting classified files to ALL city billboards...
[████████████████████] BROADCAST COMPLETE

 ██╗     ██╗██████╗ ███████╗██████╗  █████╗ ████████╗███████╗██████╗
 ██║     ██║██╔══██╗██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██╔══██╗
 ██║     ██║██████╔╝█████╗  ██████╔╝███████║   ██║   █████╗  ██║  ██║
 ██║     ██║██╔══██╗██╔══╝  ██╔══██╗██╔══██║   ██║   ██╔══╝  ██║  ██║
 ███████╗██║██████╔╝███████╗██║  ██║██║  ██║   ██║   ███████╗██████╔╝
 ╚══════╝╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝  ╚═╝   ╚══════╝╚═════╝

MISSION COMPLETE. THE CITY IS FREE.`,
    type: "success",
    delay: 3200,
  },
  "CAT MEMO_2089": {
    output: `MEMORANDUM — METROPOLITAN SECURITY BUREAU
DATE: 2089.01.04 — CLASSIFICATION: OMEGA

TO:   All Division Commanders
FROM: Director Veran, Bureau of Social Compliance

RE: ACCELERATED CITIZEN CREDIT ENFORCEMENT

Effective immediately, any citizen whose Credit Score
falls below the THRESHOLD of 400 points will be subject
to Phase 3 Intervention Protocols. This includes:

  1. Digital identity suspension (banking, transit, comms)
  2. Asset seizure pending compliance review
  3. Transfer to Re-Education Facility 7-F

The Bureau reminds all personnel: compliance is safety.
Dissent is a threat to collective security.

Director Veran
[SEAL: METROPOLITAN SECURITY BUREAU]`,
    type: "classified",
    delay: 400,
  },
  PING: {
    output: `PING CENTRAL_NODE (10.09.00.1)
56 bytes from 10.09.00.1: icmp_seq=1 ttl=64 time=2.1 ms
56 bytes from 10.09.00.1: icmp_seq=2 ttl=64 time=1.9 ms
56 bytes from 10.09.00.1: icmp_seq=3 ttl=64 time=2.0 ms

--- CENTRAL_NODE ping statistics ---
3 packets transmitted, 3 received, 0% packet loss
[NODE IS LIVE — BREACH IS POSSIBLE]`,
    type: "info",
    delay: 1200,
  },
  STATUS: {
    output: `MISSION STATUS REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OPERATION:    NIGHT PROTOCOL
PHASE:        3 of 4
OBJECTIVE:    Breach Node 09 + Broadcast Evidence
PRIORITY:     CRITICAL

TEAM STATUS:
  BARRY    — Field Operative    [ACTIVE — SECTOR 7]
  CIPHER   — Data Analyst       [ACTIVE — ONLINE]
  UNNAMED  — Infiltration Lead  [ACTIVE — ON-SITE]

THREAT ASSESSMENT:
  Drone Patrols:   ELEVATED
  Credit Monitors: ACTIVE
  Human Agents:    3 IN VICINITY

NEXT ACTION: Execute BREACH_NODE_09`,
    type: "system",
    delay: 500,
  },
  CLEAR: {
    output: "",
    type: "system",
    delay: 0,
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// CHARACTER PROFILES (DOSSIER DATA)
// ─────────────────────────────────────────────────────────────────────────────
export interface CharacterProfile {
  id: string;
  callsign: string;
  fullName: string;
  rank: string;
  faction: string;
  factionTag: "RESISTANCE" | "AUTHORITY" | "ROGUE";
  clearanceLevel: string;
  status: string;
  imagePath: string;
  quote: string;
  specialization: string;
  threatLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  knownAbilities: string[];
  redactedField: string;
}

export const characterProfiles: CharacterProfile[] = [
  {
    id: "barry",
    callsign: "BARRY",
    fullName: "B█████ R██████",
    rank: "Field Operative, Cell Leader",
    faction: "Liberation Front — Underground Network",
    factionTag: "RESISTANCE",
    clearanceLevel: "RESTRICTED",
    status: "WANTED — THREAT LEVEL CRITICAL",
    imagePath: "/barry_resistance.jpg",
    quote: '"The Citizen Credit system isn\'t for public safety—it\'s a digital leash."',
    specialization: "Urban Guerilla Tactics, Demolitions, Intelligence Extraction",
    threatLevel: "CRITICAL",
    knownAbilities: ["Guerilla Tactics", "EMP Deployment", "Safe House Networks", "Black Market Procurement"],
    redactedField: "Last known location: ███████ DISTRICT — CLASSIFIED",
  },
  {
    id: "franks",
    callsign: "CAPTAIN FRANKS",
    fullName: "Gerald T. Franks",
    rank: "Captain, Enforcement Division",
    faction: "Metropolitan Security Bureau — E.D.",
    factionTag: "AUTHORITY",
    clearanceLevel: "TOP SECRET",
    status: "ACTIVE OPERATIVE — AUTHORIZED LETHAL FORCE",
    imagePath: "/franks_authority.jpg",
    quote: '"Without the system, this city falls to lawless chaos."',
    specialization: "Riot Control, Drone Coordination, Biometric Surveillance",
    threatLevel: "HIGH",
    knownAbilities: ["Riot Shield Deployment", "Tactical Drone Support", "Terminal Override Access", "Combat Armor Integration"],
    redactedField: "Internal Affairs File: ██████ — SEALED PER DIRECTOR ORDER",
  },
  {
    id: "cipher",
    callsign: "CIPHER",
    fullName: "[IDENTITY REDACTED]",
    rank: "Independent Data Operative",
    faction: "Unaffiliated — Whistleblower Network",
    factionTag: "ROGUE",
    clearanceLevel: "UNKNOWN",
    status: "GHOST — OFF ALL REGISTRIES",
    imagePath: "/cipher_silhouette.jpg", // will use a fallback SVG until image quota resets
    quote: '"Both sides are playing a rigged game. I have the root access logs."',
    specialization: "Network Intrusion, Data Exfiltration, Identity Erasure",
    threatLevel: "CRITICAL",
    knownAbilities: ["Broadcast Hijack", "Root Access Exploitation", "Identity Scrambling", "Evidence Archive Building"],
    redactedField: "Origin: ████████ — TOTAL INFORMATION BLACKOUT",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENTS
// ─────────────────────────────────────────────────────────────────────────────
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

export const achievements: Achievement[] = [
  {
    id: "ach_liberated",
    title: "LIBERATED",
    description: "Reached the end of the comic. The city is free.",
    icon: "🔓",
    rarity: "legendary",
  },
  {
    id: "ach_resistance",
    title: "RESISTANCE FIGHTER",
    description: "Sided with the Liberation Front.",
    icon: "✊",
    rarity: "epic",
  },
  {
    id: "ach_order",
    title: "ENFORCER",
    description: "Chose to maintain government compliance.",
    icon: "🛡️",
    rarity: "rare",
  },
  {
    id: "ach_hacker",
    title: "MASTER HACKER",
    description: "Executed SUDO_LIBERATE in the terminal.",
    icon: "💻",
    rarity: "legendary",
  },
  {
    id: "ach_rogue",
    title: "WHISTLEBLOWER",
    description: "Went rogue and leaked the conspiracy.",
    icon: "📡",
    rarity: "epic",
  },
];

export const systemSpecs = {
  minimum: {
    os: "Windows 7 / 8.1 / 10 (64-bit)",
    processor: "Intel Core i3 3.0 GHz or AMD equivalent",
    memory: "4 GB RAM",
    graphics: "GeForce GTX 550 Ti / AMD Radeon HD 6790 (1GB VRAM)",
    directX: "Version 11",
    storage: "6 GB available space",
    sound: "DirectX compatible audio device"
  },
  recommended: {
    os: "Windows 10 / 11 (64-bit)",
    processor: "Intel Core i5 3.4 GHz or AMD Ryzen 5",
    memory: "8 GB RAM",
    graphics: "GeForce GTX 960 / AMD Radeon R9 280 (2GB VRAM)",
    directX: "Version 11",
    storage: "6 GB SSD available space",
    sound: "DirectX compatible spatial audio device"
  }
};
