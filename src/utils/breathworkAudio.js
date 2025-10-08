/**
 * Breathwork Audio Engine
 * Uses Web Audio API to generate calming breath sounds
 */

class BreathworkAudio {
  constructor() {
    this.audioContext = null;
    this.gainNode = null;
    this.currentOscillator = null;
    this.isInitialized = false;
  }

  /**
   * Initialize the audio context (must be called after user interaction)
   */
  init() {
    if (this.isInitialized) return;

    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.value = 0;
      this.isInitialized = true;
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Play inhale sound - rising tone
   * @param {number} duration - Duration in seconds
   */
  playInhale(duration) {
    if (!this.isInitialized) return;

    this.stopCurrent();

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now); // Start frequency
    osc.frequency.exponentialRampToValueAtTime(400, now + duration); // Rise to higher frequency

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.1); // Fade in quickly
    gain.gain.setValueAtTime(0.15, now + duration - 0.2);
    gain.gain.linearRampToValueAtTime(0, now + duration); // Fade out

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration);

    this.currentOscillator = osc;
  }

  /**
   * Play exhale sound - descending tone
   * @param {number} duration - Duration in seconds
   */
  playExhale(duration) {
    if (!this.isInitialized) return;

    this.stopCurrent();

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now); // Start frequency
    osc.frequency.exponentialRampToValueAtTime(200, now + duration); // Descend to lower frequency

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.1); // Fade in quickly
    gain.gain.setValueAtTime(0.15, now + duration - 0.2);
    gain.gain.linearRampToValueAtTime(0, now + duration); // Fade out

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration);

    this.currentOscillator = osc;
  }

  /**
   * Play hold sound - subtle ambient tone
   * @param {number} duration - Duration in seconds
   * @param {boolean} isFull - true for hold after inhale, false for hold after exhale
   */
  playHold(duration, isFull = true) {
    if (!this.isInitialized) return;

    this.stopCurrent();

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sine';
    // Hold-full: higher frequency with slight pulse
    // Hold-empty: lower frequency, more grounded
    const baseFreq = isFull ? 350 : 250;
    osc.frequency.setValueAtTime(baseFreq, now);

    // Very subtle volume with gentle pulse
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.2);

    // Create gentle pulse effect
    const pulseInterval = 1.0; // Pulse every second
    for (let t = 0.5; t < duration - 0.5; t += pulseInterval) {
      gain.gain.linearRampToValueAtTime(0.08, now + t);
      gain.gain.linearRampToValueAtTime(0.05, now + t + pulseInterval / 2);
    }

    gain.gain.linearRampToValueAtTime(0, now + duration);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + duration);

    this.currentOscillator = osc;
  }

  /**
   * Play phase transition chime - brief tone to mark transitions
   */
  playTransitionChime() {
    if (!this.isInitialized) return;

    const now = this.audioContext.currentTime;
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, now); // Pleasant mid-high tone

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.1, now + 0.05);
    gain.gain.linearRampToValueAtTime(0, now + 0.3);

    osc.connect(gain);
    gain.connect(this.gainNode);

    osc.start(now);
    osc.stop(now + 0.3);
  }

  /**
   * Play completion sound - celebratory ascending tones
   */
  playComplete() {
    if (!this.isInitialized) return;

    const now = this.audioContext.currentTime;
    const frequencies = [400, 500, 600]; // Ascending triad

    frequencies.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + i * 0.2);

      gain.gain.setValueAtTime(0, now + i * 0.2);
      gain.gain.linearRampToValueAtTime(0.15, now + i * 0.2 + 0.05);
      gain.gain.linearRampToValueAtTime(0, now + i * 0.2 + 0.4);

      osc.connect(gain);
      gain.connect(this.gainNode);

      osc.start(now + i * 0.2);
      osc.stop(now + i * 0.2 + 0.4);
    });
  }

  /**
   * Stop current sound
   */
  stopCurrent() {
    if (this.currentOscillator) {
      try {
        this.currentOscillator.stop();
      } catch (e) {
        // Already stopped
      }
      this.currentOscillator = null;
    }
  }

  /**
   * Play sound based on phase type
   */
  playPhase(phase) {
    const duration = phase.duration;

    switch (phase.type) {
      case 'inhale':
        this.playInhale(duration);
        break;
      case 'exhale':
        this.playExhale(duration);
        break;
      case 'hold-full':
        this.playHold(duration, true);
        break;
      case 'hold-empty':
        this.playHold(duration, false);
        break;
      default:
        console.warn('Unknown phase type:', phase.type);
    }
  }

  /**
   * Clean up audio context
   */
  dispose() {
    this.stopCurrent();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.isInitialized = false;
    }
  }
}

// Export singleton instance
export const breathworkAudio = new BreathworkAudio();
