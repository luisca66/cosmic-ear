// ========================================
// COSMIC EAR - Constantes del Juego
// ========================================

export const NOTES = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export const INSTRUMENTS = ["Piano", "Cello", "Corno", "Coro", "Fagot"];

export const BASE_URL = "https://stormstudios.com.mx/wp-content/App%20AP%20samples";

export const NOTE_COLORS = {
    "C": 0xff0000,
    "C#": 0xff4400,
    "D": 0xff8800,
    "D#": 0xffcc00,
    "E": 0xffff00,
    "F": 0x88ff00,
    "F#": 0x00ff00,
    "G": 0x00ff88,
    "G#": 0x00ffff,
    "A": 0x0088ff,
    "A#": 0x0000ff,
    "B": 0x8800ff
};

export const MUSIC_TRACKS = [
    { id: 'space-ambient.mp3', name: 'Space Ambient', icon: '🌌' },
    { id: 'cosmic-song.mp3', name: 'Cosmic Song', icon: '🎵' },
    { id: 'orbital-drift.mp3', name: 'Orbital Drift', icon: '🛸' },
    { id: 'silent-orbits.mp3', name: 'Silent Orbits', icon: '🌠' },
    { id: 'space-drift.mp3', name: 'Space Drift', icon: '🌊' },
    { id: 'infinite-cosmos.mp3', name: 'Infinite Cosmos', icon: '♾️' }
];

// Multiplicadores de puntuación según número de notas
export const SCORE_MULTIPLIERS = {
    1: 1.0,
    2: 1.5,
    3: 2.5,
    4: 4.0,
    5: 6.0
};

// Configuración de dificultad
export const DIFFICULTY_CONFIG = {
    MIN_TIME_FOR_SCORE: 0.5,        // Segundos mínimos para calcular puntos
    MAX_PLANET_SCORE: 2000,         // Puntos máximos por planeta
    BASE_SCORE_MULTIPLIER: 100,     // Multiplicador base de puntos
    NOTE_MATCH_CENTS: 30,           // Centésimas de tono para considerar match
    NOTE_MATCH_DURATION: 700        // Milisegundos sosteniendo nota correcta
};

// Configuración del juego
export const GAME_CONFIG = {
    NUM_PLANETS: 15,
    MIN_PLANET_DISTANCE: 25,
    MAX_PLANET_DISTANCE: 175,
    INTERACTION_DISTANCE: 12,
    MIN_GAME_DURATION: 3,           // Minutos mínimos
    DEFAULT_GAME_DURATION: 5,       // Duración por defecto
    SHIP_MAX_SPEED: 2,
    SHIP_THRUST_MULTIPLIER: 0.016,
    CAMERA_OFFSET: { x: 0, y: 2, z: 8 }
};

// Rango de octavas para generación de notas
export const OCTAVE_RANGE = {
    MIN: 2,
    MAX: 6
};

// Configuración de audio
export const AUDIO_CONFIG = {
    ENGINE_VOLUME: 0.15,
    ENGINE_THRUST_VOLUME: 0.5,
    THRUSTER_VOLUME: 0.3,
    SAMPLE_VOLUME: 0.4,
    SUCCESS_VOLUME: 0.6,
    AMBIENT_VOLUME: 0.4,
    ENGINE_FILTER_FREQ: 200,
    THRUSTER_FILTER_FREQ: 7000,
    THRUSTER_Q: 2
};

// Configuración de pitch detection
export const PITCH_CONFIG = {
    FFT_SIZE: 2048,
    MIN_RMS: 0.002,
    TRIM_THRESHOLD: 0.05,
    MIN_FREQUENCY: 55,
    MAX_FREQUENCY: 4000,
    VOLUME_MULTIPLIER: 500
};
