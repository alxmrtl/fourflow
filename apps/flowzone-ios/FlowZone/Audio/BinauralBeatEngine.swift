//
//  BinauralBeatEngine.swift
//  FlowZone
//
//  Binaural beat generator optimized for flow states
//  Uses stereo audio to deliver different frequencies to each ear
//

import AVFoundation

/// Binaural beat presets optimized for different mental states
enum BinauralPreset: String, CaseIterable, Identifiable {
    case flow       // 10 Hz - Alpha/low-beta border for relaxed focus
    case deepFocus  // 14 Hz - Low beta for concentrated work
    case creative   // 8 Hz - High theta/low alpha for creative flow

    var id: String { rawValue }

    var displayName: String {
        switch self {
        case .flow: return "Flow State"
        case .deepFocus: return "Deep Focus"
        case .creative: return "Creative"
        }
    }

    var description: String {
        switch self {
        case .flow: return "10 Hz alpha waves for relaxed, effortless focus"
        case .deepFocus: return "14 Hz beta waves for concentrated work"
        case .creative: return "8 Hz theta-alpha for creative thinking"
        }
    }

    /// The binaural beat frequency (difference between left and right)
    var beatFrequency: Double {
        switch self {
        case .flow: return 10.0       // Alpha-beta border
        case .deepFocus: return 14.0  // Low beta
        case .creative: return 8.0    // Theta-alpha border
        }
    }

    /// Base carrier frequency (left ear receives this, right ear receives base + beat)
    var carrierFrequency: Double {
        // 200 Hz is comfortable for extended listening
        return 200.0
    }
}

@MainActor
class BinauralBeatEngine: ObservableObject {
    static let shared = BinauralBeatEngine()

    private var audioEngine: AVAudioEngine?
    private var sourceNode: AVAudioSourceNode?
    private var isInitialized = false

    @Published private(set) var isPlaying = false
    @Published var volume: Float = 0.3 {
        didSet {
            audioEngine?.mainMixerNode.outputVolume = volume
        }
    }
    @Published var preset: BinauralPreset = .flow

    // Oscillator state (accessed from audio thread, so use atomics in production)
    private var leftPhase: Double = 0
    private var rightPhase: Double = 0

    private init() {}

    // MARK: - Initialization

    func initialize() {
        guard !isInitialized else { return }

        do {
            let session = AVAudioSession.sharedInstance()
            try session.setCategory(.playback, mode: .default, options: [.mixWithOthers])
            try session.setActive(true)
            isInitialized = true
        } catch {
            print("BinauralBeatEngine: Failed to initialize audio session: \(error)")
        }
    }

    // MARK: - Playback Control

    func start() {
        guard !isPlaying else { return }
        initialize()

        let engine = AVAudioEngine()
        self.audioEngine = engine

        // Get stereo format
        let outputFormat = engine.outputNode.outputFormat(forBus: 0)
        let sampleRate = outputFormat.sampleRate

        // Create stereo format explicitly
        guard let stereoFormat = AVAudioFormat(
            standardFormatWithSampleRate: sampleRate,
            channels: 2
        ) else {
            print("BinauralBeatEngine: Failed to create stereo format")
            return
        }

        // Capture current preset values
        let leftFreq = preset.carrierFrequency
        let rightFreq = preset.carrierFrequency + preset.beatFrequency
        let maxAmplitude: Double = 0.5  // Will be scaled by mixer volume

        // Reset phases
        var leftPhase: Double = 0
        var rightPhase: Double = 0

        // Fade in duration
        let fadeInSamples = 2.0 * sampleRate  // 2 second fade in
        var sampleCount: Double = 0

        let sourceNode = AVAudioSourceNode(format: stereoFormat) { _, _, frameCount, audioBufferList -> OSStatus in
            let ablPointer = UnsafeMutableAudioBufferListPointer(audioBufferList)

            // Expecting stereo: buffer 0 = left, buffer 1 = right (or interleaved)
            guard ablPointer.count >= 1 else { return noErr }

            let buffer = ablPointer[0]
            guard let channelData = buffer.mData?.assumingMemoryBound(to: Float.self) else {
                return noErr
            }

            let channelCount = Int(buffer.mNumberChannels)

            for frame in 0..<Int(frameCount) {
                // Smooth fade in
                let envelope: Double
                if sampleCount < fadeInSamples {
                    // Use smooth ease-in curve
                    let progress = sampleCount / fadeInSamples
                    envelope = progress * progress * maxAmplitude
                } else {
                    envelope = maxAmplitude
                }

                // Generate sine waves for each ear
                let leftSample = Float(sin(leftPhase) * envelope)
                let rightSample = Float(sin(rightPhase) * envelope)

                // Update phases
                leftPhase += 2.0 * .pi * leftFreq / sampleRate
                rightPhase += 2.0 * .pi * rightFreq / sampleRate

                // Keep phases in range to prevent floating point issues
                if leftPhase > 2.0 * .pi { leftPhase -= 2.0 * .pi }
                if rightPhase > 2.0 * .pi { rightPhase -= 2.0 * .pi }

                sampleCount += 1

                // Write to stereo buffer
                if channelCount == 2 {
                    // Interleaved stereo
                    channelData[frame * 2] = leftSample      // Left
                    channelData[frame * 2 + 1] = rightSample // Right
                } else if channelCount == 1 {
                    // Mono fallback - mix both (less effective for binaural)
                    channelData[frame] = (leftSample + rightSample) / 2
                }
            }

            return noErr
        }

        self.sourceNode = sourceNode

        engine.attach(sourceNode)
        engine.connect(sourceNode, to: engine.mainMixerNode, format: stereoFormat)
        engine.mainMixerNode.outputVolume = volume

        do {
            try engine.start()
            isPlaying = true
        } catch {
            print("BinauralBeatEngine: Failed to start: \(error)")
        }
    }

    func stop() {
        // Fade out would be nice, but for now just stop
        audioEngine?.stop()
        if let node = sourceNode {
            audioEngine?.detach(node)
        }
        sourceNode = nil
        audioEngine = nil
        isPlaying = false
    }

    func toggle() {
        if isPlaying {
            stop()
        } else {
            start()
        }
    }

    /// Update the binaural preset (requires restart to take effect)
    func setPreset(_ newPreset: BinauralPreset) {
        let wasPlaying = isPlaying
        if wasPlaying {
            stop()
        }
        preset = newPreset
        if wasPlaying {
            start()
        }
    }
}
