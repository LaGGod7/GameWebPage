"use client";

import React, { useState, useEffect, useRef } from "react";
import { soundManager } from "@/lib/soundManager";

interface TerminalLine {
  id: string;
  type: "system" | "user" | "success" | "error" | "alert" | "glitch";
  text: string;
  timestamp: string;
}

const COMMAND_RESPONSES: Record<string, string[]> = {
  help: [
    "AVAILABLE COMMANDS:",
    "  scan      - Scan target subnet for vulnerabilities",
    "  hack      - Attempt citizen registry privilege escalation",
    "  bypass    - Inject firewall override packet",
    "  decrypt   - Decrypt intercepted transmission file",
    "  clear     - Wipe terminal output buffer",
    "  help      - Display this command index",
  ],
  scan: [
    "[NET-SCAN] Scanning subnet 192.168.0.0/24...",
    "[PORT 22]  SSH - FILTERED (GOV_ENCRYPT_V4)",
    "[PORT 80]  HTTP - CITIZEN_PORTAL (ACCESSIBLE)",
    "[PORT 443] HTTPS - TLS 1.3 (CERT: METRO_AUTHORITY)",
    "[PORT 8080] CITIZEN_DB - OPEN (VULNERABILITY: CVE-2042-8801)",
    "[RESULT] 1 EXPLOITABLE VECTOR FOUND IN CITIZEN REGISTRY.",
  ],
  hack: [
    "[EXPLOIT] Initiating buffer overflow on citizen registry...",
    "[INJECT] Shellcode injected into memory segment 0x7FFF004B...",
    "[AUTH] Root escalation sequence 45%...",
    "[AUTH] Root escalation sequence 89%...",
    "[SUCCESS] ACCESS GRANTED. CITIZEN DATABASE ACCESSED.",
    "[STATUS] CITIZEN_STATUS OVERRIDDEN TO: UNTRACEABLE.",
  ],
  bypass: [
    "[FIREWALL] Probing government gateway proxy...",
    "[BYPASS] Spoofing MAC address to ENFORCER_PATROL_09...",
    "[BYPASS] Security checkpoint bypassed. Alarm suppressed.",
  ],
  decrypt: [
    "[DECRYPT] Loading payload: TRANS_7749_INTERCEPT.DAT",
    "[CIPHER] Alg: AES-256-GCM / Key: 0x99AA...BC41",
    "[MESSAGE] 'Barry - the crackdown is planned for 0200h. Move the safe house.'",
    "[DECRYPT] Intercept archived to local storage.",
  ],
};

interface HackingTerminalProps {
  className?: string;
  onHackAchieved?: (id: string) => void;
}

export default function HackingTerminal({
  className = "",
  onHackAchieved,
}: HackingTerminalProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: "1",
      type: "system",
      text: "CITIZEN OS v4.19.0 — TERMINAL ACCESS // RESTRICTED",
      timestamp: "00:00:01",
    },
    {
      id: "2",
      type: "alert",
      text: "[WARNING] UNAUTHORIZED OVERRIDE DETECTED — CITIZEN ID: REDACTED",
      timestamp: "00:00:02",
    },
    {
      id: "3",
      type: "system",
      text: "Type 'help' to inspect command directory, or select a command below.",
      timestamp: "00:00:03",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const getTimestamp = () => {
    const d = new Date();
    return d.toTimeString().split(" ")[0];
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    soundManager.playTerminalClick();

    const userLine: TerminalLine = {
      id: Math.random().toString(),
      type: "user",
      text: `> ${rawCmd}`,
      timestamp: getTimestamp(),
    };

    if (cmd === "clear") {
      setLines([
        {
          id: Math.random().toString(),
          type: "system",
          text: "TERMINAL BUFFER CLEARED.",
          timestamp: getTimestamp(),
        },
      ]);
      setInputVal("");
      return;
    }

    setLines((prev) => [...prev, userLine]);
    setInputVal("");
    setIsProcessing(true);

    // Check achievement unlock
    if (cmd === "hack") {
      onHackAchieved?.("ach_hacker");
      if (typeof window !== "undefined") {
        window.dispatchEvent(
          new CustomEvent("liberated_achievement_unlock", {
            detail: { id: "ach_hacker" },
          })
        );
        window.dispatchEvent(
          new CustomEvent("liberated_faction_choice", {
            detail: { faction: "RESISTANCE", creditDelta: -100 },
          })
        );
      }
    }

    setTimeout(() => {
      const resp = COMMAND_RESPONSES[cmd] || [
        `[ERROR] Unknown command '${rawCmd}'. Type 'help' for command directory.`,
      ];

      const responseLines: TerminalLine[] = resp.map((text) => ({
        id: Math.random().toString(),
        type: text.includes("[SUCCESS]")
          ? "success"
          : text.includes("[ERROR]")
          ? "error"
          : text.includes("[WARNING]") || text.includes("[ALERT]")
          ? "alert"
          : "system",
        text,
        timestamp: getTimestamp(),
      }));

      setLines((prev) => [...prev, ...responseLines]);
      setIsProcessing(false);
      soundManager.playTerminalClick();
    }, 400);
  };

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  return (
    <div className={`w-full h-full min-h-[360px] bg-black border-2 border-white flex flex-col font-mono text-xs select-none ${className}`}>
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-white text-black font-bold uppercase tracking-wider text-[11px] border-b-2 border-white">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2 h-2 bg-black animate-pulse" />
          <span>CITIZEN_OS // SEC_OVERRIDE_TERMINAL</span>
        </div>
        <span className="text-[10px] bg-black text-white px-1.5 py-0.5 font-black">
          ROOT SHELL
        </span>
      </div>

      {/* Output Console */}
      <div className="flex-1 p-3 overflow-y-auto space-y-1.5 text-zinc-300 font-mono text-[11px] max-h-[260px] scrollbar-thin">
        {lines.map((l) => (
          <div
            key={l.id}
            className={`flex items-start gap-2 leading-relaxed ${
              l.type === "user"
                ? "text-white font-bold"
                : l.type === "success"
                ? "text-emerald-400 font-bold"
                : l.type === "error"
                ? "text-red-400 font-bold"
                : l.type === "alert"
                ? "text-yellow-300 font-bold"
                : "text-zinc-300"
            }`}
          >
            <span className="text-zinc-600 text-[9px] select-none shrink-0 pt-0.5">
              [{l.timestamp}]
            </span>
            <span className="break-all">{l.text}</span>
          </div>
        ))}
        {isProcessing && (
          <div className="text-zinc-400 animate-pulse text-[11px]">
            [SYSTEM] Executing exploit payload...
          </div>
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Quick Action Buttons */}
      <div className="px-3 py-1.5 bg-zinc-950 border-t border-zinc-800 flex flex-wrap gap-1.5">
        {["help", "scan", "hack", "bypass", "decrypt", "clear"].map((cmd) => (
          <button
            key={cmd}
            onClick={() => handleCommand(cmd)}
            disabled={isProcessing}
            className="px-2 py-0.5 text-[10px] font-mono font-bold bg-zinc-900 text-zinc-300 border border-zinc-700 hover:border-white hover:text-white hover:bg-zinc-800 active:scale-95 transition-all uppercase"
          >
            &gt; {cmd}
          </button>
        ))}
      </div>

      {/* Input Prompt */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCommand(inputVal);
        }}
        className="flex items-center px-3 py-2 bg-black border-t-2 border-white gap-2"
      >
        <span className="text-white font-black text-sm">&gt;</span>
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder="Enter command (e.g. scan, hack)..."
          disabled={isProcessing}
          className="flex-1 bg-transparent text-white font-mono text-xs focus:outline-none placeholder-zinc-600"
        />
        <button
          type="submit"
          disabled={isProcessing || !inputVal.trim()}
          className="px-3 py-1 bg-white text-black font-black text-[10px] uppercase hover:bg-zinc-200 active:scale-95 transition-all disabled:opacity-30 disabled:pointer-events-none"
        >
          EXECUTE
        </button>
      </form>
    </div>
  );
}
