// ========================================
// COSMIC EAR - Detección de Pitch
// ========================================

import { NOTES, PITCH_CONFIG } from '../constants.js';

/**
 * Convierte frecuencia a nota musical
 * @param {number} frequency - Frecuencia en Hz
 * @returns {Object} - { note, index, octave, cents, frequency }
 */
export function getNoteFromPitch(frequency) {
    const noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    const midi = Math.round(noteNum) + 69;
    const noteIndex = ((midi % 12) + 12) % 12;

    return {
        note: NOTES[noteIndex],
        index: noteIndex,
        octave: Math.floor(midi / 12) - 1,
        cents: Math.floor((noteNum - Math.round(noteNum)) * 100),
        frequency: frequency
    };
}

/**
 * Auto-correlación para detección de pitch
 * @param {Float32Array} buffer - Buffer de audio
 * @param {number} sampleRate - Sample rate del audio context
 * @returns {number} - Frecuencia detectada o -1 si no se detecta
 */
export function autoCorrelate(buffer, sampleRate) {
    let SIZE = buffer.length;
    let rms = 0;

    // Calcular RMS (Root Mean Square)
    for (let i = 0; i < SIZE; i++) {
        rms += buffer[i] * buffer[i];
    }
    rms = Math.sqrt(rms / SIZE);

    // Si el volumen es muy bajo, no hay pitch
    if (rms < PITCH_CONFIG.MIN_RMS) return -1;

    // Encontrar el inicio del buffer (trim silence)
    let r1 = 0, r2 = SIZE - 1;
    const threshold = PITCH_CONFIG.TRIM_THRESHOLD;

    for (let i = 0; i < SIZE / 2; i++) {
        if (Math.abs(buffer[i]) < threshold) {
            r1 = i;
            break;
        }
    }

    for (let i = 1; i < SIZE / 2; i++) {
        if (Math.abs(buffer[SIZE - i]) < threshold) {
            r2 = SIZE - i;
            break;
        }
    }

    // Trim el buffer
    buffer = buffer.slice(r1, r2);
    SIZE = buffer.length;

    if (SIZE < 2) return -1;

    // Auto-correlación
    const correlations = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
        for (let j = 0; j < SIZE - i; j++) {
            correlations[i] += buffer[j] * buffer[j + i];
        }
    }

    // Encontrar el primer valle
    let d = 0;
    while (d < SIZE - 1 && correlations[d] > correlations[d + 1]) {
        d++;
    }

    // Encontrar el máximo después del valle
    let maxval = -1;
    let maxpos = -1;
    for (let i = d; i < SIZE; i++) {
        if (correlations[i] > maxval) {
            maxval = correlations[i];
            maxpos = i;
        }
    }

    if (maxpos < 1 || maxpos >= SIZE - 1) return -1;

    // Interpolación parabólica para mejor precisión
    let T0 = maxpos;
    const x1 = correlations[T0 - 1];
    const x2 = correlations[T0];
    const x3 = correlations[T0 + 1];

    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;

    if (a) T0 -= b / (2 * a);

    return sampleRate / T0;
}
