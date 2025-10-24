/**
 * Background Audio Manager
 * Handles ambient sounds during focus sessions
 */

class BackgroundAudio {
  constructor() {
    this.audioContext = null;
    this.currentSound = null;
    this.gainNode = null;
    this.isInitialized = false;
    this.isPlaying = false;

    // For looping sounds
    this.sourceNode = null;
    this.oscillatorNodes = [];
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
      this.gainNode.gain.value = 0.5; // Default volume
      this.isInitialized = true;
    } catch (error) {
      console.warn('Web Audio API not supported:', error);
    }
  }

  /**
   * Set volume (0-1)
   */
  setVolume(volume) {
    if (this.gainNode) {
      this.gainNode.gain.value = volume;
    }
  }

  /**
   * Generate white noise buffer
   */
  createWhiteNoiseBuffer() {
    const bufferSize = this.audioContext.sampleRate * 2; // 2 seconds
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  /**
   * Generate pink noise buffer (more natural than white noise)
   */
  createPinkNoiseBuffer() {
    const bufferSize = this.audioContext.sampleRate * 2;
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const output = buffer.getChannelData(0);

    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.11; // Compensate for gain
      b6 = white * 0.115926;
    }

    return buffer;
  }

  /**
   * Play white noise
   */
  playWhiteNoise() {
    const buffer = this.createPinkNoiseBuffer(); // Using pink noise as it's more pleasant
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Add subtle low-pass filter for more pleasant sound
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 3000;

    source.connect(filter);
    filter.connect(this.gainNode);
    source.start();

    this.sourceNode = source;
    this.currentSound = 'white-noise';
    this.isPlaying = true;
  }

  /**
   * Generate rain sound using filtered noise
   */
  playRain() {
    // Create base rain noise
    const buffer = this.createPinkNoiseBuffer();
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Band-pass filter for rain-like sound
    const filter1 = this.audioContext.createBiquadFilter();
    filter1.type = 'bandpass';
    filter1.frequency.value = 800;
    filter1.Q.value = 0.5;

    const filter2 = this.audioContext.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.value = 2000;

    // Add subtle reverb-like delay
    const delay = this.audioContext.createDelay();
    delay.delayTime.value = 0.02;

    const delayGain = this.audioContext.createGain();
    delayGain.gain.value = 0.3;

    // Connect the chain
    source.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(this.gainNode);
    filter2.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(filter2);

    source.start();

    this.sourceNode = source;
    this.currentSound = 'rain';
    this.isPlaying = true;
  }

  /**
   * Generate binaural beats for focus
   * Uses theta/alpha waves (4-8 Hz difference) for deep focus
   */
  playBinaural() {
    const baseFreq = 200; // Base frequency in Hz
    const beatFreq = 6; // 6 Hz difference = theta wave (deep focus)

    // Create two oscillators
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();

    osc1.type = 'sine';
    osc2.type = 'sine';
    osc1.frequency.value = baseFreq;
    osc2.frequency.value = baseFreq + beatFreq;

    // Create stereo panner for left/right ears
    const merger = this.audioContext.createChannelMerger(2);
    const leftGain = this.audioContext.createGain();
    const rightGain = this.audioContext.createGain();

    leftGain.gain.value = 0.5;
    rightGain.gain.value = 0.5;

    // Route oscillators to different channels
    osc1.connect(leftGain);
    osc2.connect(rightGain);
    leftGain.connect(merger, 0, 0);
    rightGain.connect(merger, 0, 1);
    merger.connect(this.gainNode);

    osc1.start();
    osc2.start();

    this.oscillatorNodes = [osc1, osc2];
    this.currentSound = 'binaural';
    this.isPlaying = true;
  }

  /**
   * Generate forest ambiance (birds, rustling leaves)
   */
  playForest() {
    // Base: filtered noise for wind/rustling
    const buffer = this.createPinkNoiseBuffer();
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Band-pass filter for natural ambiance
    const filter1 = this.audioContext.createBiquadFilter();
    filter1.type = 'highpass';
    filter1.frequency.value = 400;

    const filter2 = this.audioContext.createBiquadFilter();
    filter2.type = 'lowpass';
    filter2.frequency.value = 1500;

    // Subtle reverb
    const delay = this.audioContext.createDelay();
    delay.delayTime.value = 0.03;
    const delayGain = this.audioContext.createGain();
    delayGain.gain.value = 0.2;

    source.connect(filter1);
    filter1.connect(filter2);
    filter2.connect(this.gainNode);
    filter2.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(filter2);

    source.start();

    this.sourceNode = source;
    this.currentSound = 'forest';
    this.isPlaying = true;
  }

  /**
   * Generate ocean waves sound
   */
  playWaves() {
    // Base noise for wave texture
    const buffer = this.createPinkNoiseBuffer();
    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    // Low-pass filter for deep ocean sound
    const filter = this.audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 500;
    filter.Q.value = 1;

    // Create wave-like volume modulation using LFO
    const lfo = this.audioContext.createOscillator();
    const lfoGain = this.audioContext.createGain();
    lfo.frequency.value = 0.2; // Slow wave rhythm
    lfoGain.gain.value = 0.3;

    const volumeControl = this.audioContext.createGain();
    volumeControl.gain.value = 0.5;

    // Connect LFO to modulate volume
    lfo.connect(lfoGain);
    lfoGain.connect(volumeControl.gain);

    source.connect(filter);
    filter.connect(volumeControl);
    volumeControl.connect(this.gainNode);

    source.start();
    lfo.start();

    this.sourceNode = source;
    this.oscillatorNodes.push(lfo); // Store LFO for cleanup
    this.currentSound = 'waves';
    this.isPlaying = true;
  }

  /**
   * Play a specific sound by name with fade in
   */
  play(soundType, volume = 0.5, fadeInDuration = 2) {
    if (soundType === 'none') {
      this.stop();
      return;
    }

    // Initialize if not already
    if (!this.isInitialized) {
      this.init();
    }

    // Stop any existing sound
    this.stop();

    const targetVolume = volume;

    // Set initial volume to 0 for fade in
    if (this.gainNode) {
      this.gainNode.gain.cancelScheduledValues(this.audioContext.currentTime);
      this.gainNode.gain.value = 0;
    }

    // Start the appropriate sound
    switch (soundType) {
      case 'white-noise':
        this.playWhiteNoise();
        break;
      case 'forest':
        this.playForest();
        break;
      case 'waves':
        this.playWaves();
        break;
      case 'rain':
        this.playRain();
        break;
      case 'binaural':
        this.playBinaural();
        break;
      default:
        console.warn('Unknown sound type:', soundType);
        return;
    }

    // Fade in after starting the sound
    if (this.gainNode && this.audioContext && fadeInDuration > 0) {
      const now = this.audioContext.currentTime;
      this.gainNode.gain.setValueAtTime(0, now);
      this.gainNode.gain.linearRampToValueAtTime(targetVolume, now + fadeInDuration);
    } else if (this.gainNode) {
      this.gainNode.gain.value = targetVolume;
    }
  }

  /**
   * Stop all sounds
   */
  stop() {
    if (this.sourceNode) {
      try {
        this.sourceNode.stop();
      } catch (e) {
        // Already stopped
      }
      this.sourceNode = null;
    }

    this.oscillatorNodes.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Already stopped
      }
    });
    this.oscillatorNodes = [];

    this.currentSound = null;
    this.isPlaying = false;
  }

  /**
   * Fade out and stop
   */
  fadeOut(duration = 1) {
    if (!this.gainNode || !this.isPlaying) return;

    const currentGain = this.gainNode.gain.value;
    const now = this.audioContext.currentTime;

    this.gainNode.gain.setValueAtTime(currentGain, now);
    this.gainNode.gain.linearRampToValueAtTime(0, now + duration);

    setTimeout(() => {
      this.stop();
      this.gainNode.gain.value = currentGain; // Restore volume
    }, duration * 1000);
  }

  /**
   * Clean up audio context
   */
  dispose() {
    this.stop();
    if (this.audioContext) {
      this.audioContext.close();
      this.audioContext = null;
      this.isInitialized = false;
    }
  }
}

// Export singleton instance
export const backgroundAudio = new BackgroundAudio();
