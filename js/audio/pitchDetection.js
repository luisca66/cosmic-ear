/*
 * PITCH DETECTION MODULE
 *
 * Responsibilities:
 * - Initialize ML5.js pitch detection
 * - Get microphone access
 * - Real-time frequency detection
 * - Convert frequency to note name
 * - Calculate cents deviation
 * - Handle audio context management
 *
 * Exports:
 * - initPitchDetection(): Promise<PitchDetector>
 * - startDetection(callback): void
 * - stopDetection(): void
 * - getCurrentPitch(): { frequency, note, cents }
 */
