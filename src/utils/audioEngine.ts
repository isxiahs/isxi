/**
 * Web Audio API Atmospheric Dark Ambient Soundscape Engine
 * Produces authentic nocturnal drone, resonant tape hum, and analog harmonics
 * without external audio file loading failures.
 */

class NocturneAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private masterGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];
  private noiseNode: AudioBufferSourceNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  private subscribers: Set<(playing: boolean) => void> = new Set();
  private volume: number = 0.7;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.subscribers.add(cb);
    cb(this.isPlaying);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  private notify() {
    this.subscribers.forEach((cb) => cb(this.isPlaying));
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(this.volume, this.ctx.currentTime, 0.05);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public togglePlay(baseFreq: number = 55) {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start(baseFreq);
    }
  }

  public start(baseFreq: number = 55) {
    try {
      this.initContext();
      if (!this.ctx || !this.masterGain) return;

      this.stopNodes();

      const now = this.ctx.currentTime;

      // 1. Resonant Low-Pass Filter
      this.filterNode = this.ctx.createBiquadFilter();
      this.filterNode.type = 'lowpass';
      this.filterNode.frequency.setValueAtTime(320, now);
      this.filterNode.Q.setValueAtTime(4.2, now);
      this.filterNode.connect(this.masterGain);

      // 2. Slow LFO modulating the filter cutoff for tape breathing effect
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.08, now); // very slow swell
      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(140, now);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(this.filterNode.frequency);
      this.lfo.start(now);

      // 3. Multi-Harmonic Warm Oscillators (Sub + Root + 5th harmonic)
      const freqs = [
        baseFreq * 0.5, // Sub-octave (e.g. 27.5 Hz)
        baseFreq,       // Fundamental (e.g. 55 Hz)
        baseFreq * 1.5, // Fifth harmonic (e.g. 82.5 Hz)
        baseFreq * 2.01 // Detuned octave (e.g. 110.5 Hz)
      ];

      this.oscs = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        const oscGain = this.ctx!.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, now);
        
        // Slight detune for analog drift
        osc.detune.setValueAtTime((i - 1.5) * 4, now);

        const gainVal = i === 0 ? 0.35 : i === 1 ? 0.25 : 0.12;
        oscGain.gain.setValueAtTime(0.001, now);
        oscGain.gain.setTargetAtTime(gainVal, now, 0.4);

        osc.connect(oscGain);
        oscGain.connect(this.filterNode!);
        osc.start(now);
        return osc;
      });

      // 4. Subtle Analog Tape Hiss / Ambient Texture (Pink noise buffer)
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.0555179;
        b1 = 0.96300 * b1 + white * 0.0750759;
        b2 = 0.57000 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.035;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(650, now);
      noiseFilter.Q.setValueAtTime(1.2, now);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.001, now);
      noiseGain.gain.setTargetAtTime(0.04, now, 0.5);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      this.noiseNode.start(now);

      this.isPlaying = true;
      this.notify();
    } catch {
      // AudioContext could be blocked prior to user interaction
      this.isPlaying = false;
      this.notify();
    }
  }

  private stopNodes() {
    this.oscs.forEach((osc) => {
      try {
        osc.stop();
        osc.disconnect();
      } catch {
        // Ignored
      }
    });
    this.oscs = [];

    if (this.lfo) {
      try {
        this.lfo.stop();
        this.lfo.disconnect();
      } catch {
        // Ignored
      }
      this.lfo = null;
    }

    if (this.noiseNode) {
      try {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      } catch {
        // Ignored
      }
      this.noiseNode = null;
    }
  }

  public stop() {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(0.001, this.ctx.currentTime, 0.15);
      setTimeout(() => {
        this.stopNodes();
        if (this.masterGain && this.ctx) {
          this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
        }
      }, 200);
    } else {
      this.stopNodes();
    }
    this.isPlaying = false;
    this.notify();
  }
}

export const audioEngine = new NocturneAudioEngine();
