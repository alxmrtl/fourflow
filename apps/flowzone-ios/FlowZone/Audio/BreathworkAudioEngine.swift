//
//  BreathworkAudioEngine.swift
//  FlowZone
//
//  AVAudioEngine-based sine wave synthesis for breathwork audio
//

import AVFoundation

@MainActor
class BreathworkAudioEngine {
    static let shared = BreathworkAudioEngine()

    private var audioEngine: AVAudioEngine?
    private var currentSourceNode: AVAudioSourceNode?
    private var isInitialized = false

    // Oscillator state
    private var phase: Double = 0
    private var frequency: Double = 200
    private var amplitude: Double = 0
    private var isPlaying = false

    private init() {}

    // MARK: - Initialization

    func initialize() {
        guard !isInitialized else { return }

        do {
            try AVAudioSession.sharedInstance().setCategory(.playback, mode: .default, options: [.mixWithOthers])
            try AVAudioSession.sharedInstance().setActive(true)
            isInitialized = true
        } catch {
            print("BreathworkAudioEngine: Failed to initialize audio session: \(error)")
        }
    }

    // MARK: - Phase Playback

    func playPhase(_ phase: BreathPhase) {
        switch phase.type {
        case .inhale:
            playInhale(duration: phase.duration)
        case .exhale:
            playExhale(duration: phase.duration)
        case .holdFull:
            playHold(duration: phase.duration, isFull: true)
        case .holdEmpty:
            playHold(duration: phase.duration, isFull: false)
        }
    }

    // MARK: - Sound Types

    func playInhale(duration: TimeInterval) {
        initialize()
        stopCurrent()

        // Rising tone: 200Hz -> 400Hz
        playTone(
            startFrequency: 200,
            endFrequency: 400,
            duration: duration,
            maxAmplitude: 0.15
        )
    }

    func playExhale(duration: TimeInterval) {
        initialize()
        stopCurrent()

        // Descending tone: 400Hz -> 200Hz
        playTone(
            startFrequency: 400,
            endFrequency: 200,
            duration: duration,
            maxAmplitude: 0.15
        )
    }

    func playHold(duration: TimeInterval, isFull: Bool) {
        initialize()
        stopCurrent()

        // Steady tone with subtle pulse
        let frequency = isFull ? 350.0 : 250.0
        playTone(
            startFrequency: frequency,
            endFrequency: frequency,
            duration: duration,
            maxAmplitude: 0.05
        )
    }

    func playComplete() {
        initialize()

        // Ascending triad: 400 -> 500 -> 600 Hz
        let frequencies: [Double] = [400, 500, 600]

        for (index, freq) in frequencies.enumerated() {
            DispatchQueue.main.asyncAfter(deadline: .now() + Double(index) * 0.2) { [weak self] in
                self?.playChime(frequency: freq, duration: 0.4)
            }
        }
    }

    func stopCurrent() {
        audioEngine?.stop()
        if let node = currentSourceNode {
            audioEngine?.detach(node)
        }
        currentSourceNode = nil
        isPlaying = false
    }

    // MARK: - Private Audio Generation

    private func playTone(
        startFrequency: Double,
        endFrequency: Double,
        duration: TimeInterval,
        maxAmplitude: Double
    ) {
        let engine = AVAudioEngine()
        self.audioEngine = engine

        let sampleRate = engine.outputNode.outputFormat(forBus: 0).sampleRate
        let format = engine.outputNode.outputFormat(forBus: 0)

        var currentPhase: Double = 0
        var currentFreq = startFrequency
        let freqStep = (endFrequency - startFrequency) / (duration * sampleRate)

        var currentAmp: Double = 0
        let fadeInSamples = 0.1 * sampleRate
        let fadeOutStart = (duration - 0.1) * sampleRate
        _ = duration * sampleRate  // totalSamples calculated but used implicitly via fadeOutStart

        var sampleCount: Double = 0

        let sourceNode = AVAudioSourceNode { _, _, frameCount, audioBufferList -> OSStatus in
            let ablPointer = UnsafeMutableAudioBufferListPointer(audioBufferList)

            for frame in 0..<Int(frameCount) {
                // Calculate amplitude envelope
                if sampleCount < fadeInSamples {
                    currentAmp = (sampleCount / fadeInSamples) * maxAmplitude
                } else if sampleCount > fadeOutStart {
                    let fadeProgress = (sampleCount - fadeOutStart) / (0.1 * sampleRate)
                    currentAmp = maxAmplitude * (1.0 - fadeProgress)
                } else {
                    currentAmp = maxAmplitude
                }

                // Generate sine wave
                let sample = Float(sin(currentPhase) * currentAmp)

                // Update phase
                currentPhase += 2.0 * .pi * currentFreq / sampleRate
                if currentPhase > 2.0 * .pi {
                    currentPhase -= 2.0 * .pi
                }

                // Update frequency
                currentFreq += freqStep

                sampleCount += 1

                // Write to all channels
                for buffer in ablPointer {
                    let buf = buffer.mData?.assumingMemoryBound(to: Float.self)
                    buf?[frame] = sample
                }
            }

            return noErr
        }

        engine.attach(sourceNode)
        engine.connect(sourceNode, to: engine.mainMixerNode, format: format)
        currentSourceNode = sourceNode

        do {
            try engine.start()
            isPlaying = true

            // Schedule stop
            DispatchQueue.main.asyncAfter(deadline: .now() + duration + 0.1) { [weak self] in
                self?.stopCurrent()
            }
        } catch {
            print("BreathworkAudioEngine: Failed to start engine: \(error)")
        }
    }

    private func playChime(frequency: Double, duration: TimeInterval) {
        let engine = AVAudioEngine()

        let sampleRate = engine.outputNode.outputFormat(forBus: 0).sampleRate
        let format = engine.outputNode.outputFormat(forBus: 0)

        var currentPhase: Double = 0
        let maxAmplitude: Double = 0.15

        let fadeInSamples = 0.05 * sampleRate
        let totalSamples = duration * sampleRate

        var sampleCount: Double = 0

        let sourceNode = AVAudioSourceNode { _, _, frameCount, audioBufferList -> OSStatus in
            let ablPointer = UnsafeMutableAudioBufferListPointer(audioBufferList)

            for frame in 0..<Int(frameCount) {
                // Calculate amplitude with quick attack and slow decay
                var currentAmp: Double
                if sampleCount < fadeInSamples {
                    currentAmp = (sampleCount / fadeInSamples) * maxAmplitude
                } else {
                    let decayProgress = (sampleCount - fadeInSamples) / (totalSamples - fadeInSamples)
                    currentAmp = maxAmplitude * (1.0 - decayProgress)
                }

                let sample = Float(sin(currentPhase) * currentAmp)

                currentPhase += 2.0 * .pi * frequency / sampleRate
                if currentPhase > 2.0 * .pi {
                    currentPhase -= 2.0 * .pi
                }

                sampleCount += 1

                for buffer in ablPointer {
                    let buf = buffer.mData?.assumingMemoryBound(to: Float.self)
                    buf?[frame] = sample
                }
            }

            return noErr
        }

        engine.attach(sourceNode)
        engine.connect(sourceNode, to: engine.mainMixerNode, format: format)

        do {
            try engine.start()

            DispatchQueue.main.asyncAfter(deadline: .now() + duration) {
                engine.stop()
            }
        } catch {
            print("BreathworkAudioEngine: Failed to play chime: \(error)")
        }
    }
}
