// Web Audio API Sound Synthesizer for Liberated Cyberpunk Noir Game
// Generates continuous rain ambiance, noir firearm clicks, and authentic comic sound FX

class LiberatedSoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private pageRustleEnabled: boolean = true;
  private rainNode: AudioNode | null = null;
  private rainGain: GainNode | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("liberated_audio_muted");
      this.isMuted = saved === "true";
      const savedRustle = localStorage.getItem("liberated_rustle_enabled");
      if (savedRustle !== null) {
        this.pageRustleEnabled = savedRustle === "true";
      }
    }
  }

  private initContext() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== "undefined") {
      localStorage.setItem("liberated_audio_muted", String(this.isMuted));
      window.dispatchEvent(new CustomEvent("liberated_audio_toggle", { detail: { isMuted: this.isMuted } }));
    }

    if (this.isMuted) {
      this.stopRainAmbience();
    } else {
      this.playMedallionToggle();
      this.startRainAmbience();
    }
    return this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public togglePageRustle(): boolean {
    this.pageRustleEnabled = !this.pageRustleEnabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("liberated_rustle_enabled", String(this.pageRustleEnabled));
      window.dispatchEvent(
        new CustomEvent("liberated_rustle_toggle", { detail: { enabled: this.pageRustleEnabled } })
      );
    }
    if (this.pageRustleEnabled) {
      this.playPageTurn(true);
    }
    return this.pageRustleEnabled;
  }

  public getPageRustleEnabled(): boolean {
    return this.pageRustleEnabled;
  }

  // Continuous Cyberpunk Rain Sound Generator
  public startRainAmbience() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || this.rainNode) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.15;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const lowpass = this.ctx.createBiquadFilter();
      lowpass.type = "lowpass";
      lowpass.frequency.setValueAtTime(800, this.ctx.currentTime);

      const highpass = this.ctx.createBiquadFilter();
      highpass.type = "highpass";
      highpass.frequency.setValueAtTime(150, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      this.rainGain.gain.setValueAtTime(0.08, this.ctx.currentTime);

      whiteNoise.connect(lowpass);
      lowpass.connect(highpass);
      highpass.connect(this.rainGain);
      this.rainGain.connect(this.ctx.destination);

      whiteNoise.start();
      this.rainNode = whiteNoise;
    } catch {}
  }

  public stopRainAmbience() {
    if (this.rainNode) {
      try {
        (this.rainNode as AudioBufferSourceNode).stop();
        this.rainNode.disconnect();
      } catch {}
      this.rainNode = null;
    }
  }

  // Comic Page Rustle / Slide
  public playPageTurn(force = false) {
    if (!force && (this.isMuted || !this.pageRustleEnabled)) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1400, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(350, this.ctx.currentTime + 0.12);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.12);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();
    } catch {}
  }

  // Noir Gun Slide / Cocking Click
  public playGunClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [800, 1200, 600].forEach((f, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(f, now + i * 0.03);

        gain.gain.setValueAtTime(0.18, now + i * 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.03 + 0.04);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.03);
        osc.stop(now + i * 0.03 + 0.04);
      });
    } catch {}
  }

  // Comic Impact / 'BAM!' Action Boom
  public playImpactBoom() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(180, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(32, this.ctx.currentTime + 0.38);

      gain.gain.setValueAtTime(0.45, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.38);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.38);
    } catch {}
  }

  // Comic Speech Bubble Pop
  public playBubblePop() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(950, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {}
  }

  // Dialogue Typewriter Blip
  public playDialogueBlip() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "square";
      osc.frequency.setValueAtTime(480 + Math.random() * 80, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {}
  }

  // Terminal Keypress / Computer Click
  public playTerminalClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch {}
  }

  // Medallion Chime
  public playMedallionToggle() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      [480, 720, 960].forEach((freq, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + i * 0.05);

        gain.gain.setValueAtTime(0.12, now + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + i * 0.05);
        osc.stop(now + i * 0.05 + 0.1);
      });
    } catch {}
  }
}

export const soundManager = new LiberatedSoundManager();
