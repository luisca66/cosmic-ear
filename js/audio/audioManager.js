// ========================================
// COSMIC EAR - Audio Manager
// ========================================

import { BASE_URL, NOTES, INSTRUMENTS, MUSIC_TRACKS, AUDIO_CONFIG } from '../constants.js';

/**
 * Clase AudioManager - Gestiona todo el sistema de audio del juego
 */
export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.audioCache = {};
        this.analyser = null;
        this.micStream = null;
        this.engineNoise = null;
        this.engineGain = null;
        this.thrusterNoise = null;
        this.thrusterGain = null;
        this.ambientMusic = null;
    }

    /**
     * Obtiene la URL del sample de un instrumento
     */
    getSampleUrl(instrument, noteIndex, octaveOffset) {
        return `${BASE_URL}/${instrument}/${encodeURIComponent(NOTES[noteIndex])}${4 + octaveOffset}.mp3`;
    }

    /**
     * Inicializa el audio context
     */
    async initAudioContext() {
        if (!this.audioContext) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            this.audioContext = new AudioContext();
        }
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }
        return this.audioContext;
    }

    /**
     * Obtiene el audio context
     */
    getAudioContext() {
        return this.audioContext;
    }

    /**
     * Precarga todos los samples de audio
     */
    async preloadAllSamples(onProgress) {
        const urls = [];

        // Samples de instrumentos
        INSTRUMENTS.forEach(inst => {
            for (let octaveOffset = -2; octaveOffset <= 2; octaveOffset++) {
                for (let noteIndex = 0; noteIndex < 12; noteIndex++) {
                    urls.push(this.getSampleUrl(inst, noteIndex, octaveOffset));
                }
            }
        });

        // Sonidos de éxito/error
        urls.push(`${BASE_URL}/acierto.mp3`);
        urls.push(`${BASE_URL}/error.mp3`);

        // Música de fondo
        MUSIC_TRACKS.forEach(track => {
            urls.push(track.id); // Los archivos están en la raíz del proyecto
        });

        let loaded = 0;
        const total = urls.length;

        const loadAudio = (url) => new Promise(resolve => {
            const audio = new Audio();
            audio.src = url;
            audio.preload = 'auto';

            const done = () => {
                this.audioCache[url] = audio;
                loaded++;
                if (onProgress) {
                    onProgress(Math.floor((loaded / total) * 100));
                }
                resolve();
            };

            audio.addEventListener('canplaythrough', done, { once: true });
            audio.addEventListener('error', done, { once: true });

            // Timeout de seguridad
            setTimeout(done, 3000);

            audio.load();
        });

        // Cargar en lotes de 10
        for (let i = 0; i < urls.length; i += 10) {
            await Promise.all(urls.slice(i, i + 10).map(loadAudio));
        }
    }

    /**
     * Reproduce un acorde de notas
     */
    playNoteChord(notes, instrument) {
        notes.forEach(note => {
            const url = this.getSampleUrl(instrument, note.index, note.octave - 4);
            if (this.audioCache[url]) {
                const audio = this.audioCache[url];
                audio.currentTime = 0;
                audio.volume = AUDIO_CONFIG.SAMPLE_VOLUME;
                audio.play().catch(() => {});
            }
        });
    }

    /**
     * Reproduce sonido de éxito
     */
    playSuccessSound() {
        const url = `${BASE_URL}/acierto.mp3`;
        if (this.audioCache[url]) {
            const audio = this.audioCache[url];
            audio.currentTime = 0;
            audio.volume = AUDIO_CONFIG.SUCCESS_VOLUME;
            audio.play().catch(() => {});
        }
    }

    /**
     * Reproduce sonido de error
     */
    playErrorSound() {
        const url = `${BASE_URL}/error.mp3`;
        if (this.audioCache[url]) {
            const audio = this.audioCache[url];
            audio.currentTime = 0;
            audio.volume = AUDIO_CONFIG.SUCCESS_VOLUME;
            audio.play().catch(() => {});
        }
    }

    /**
     * Reproduce música ambiental
     */
    playAmbientMusic(trackId) {
        this.stopAmbientMusic();

        // Los archivos de música están en la raíz del proyecto
        const url = trackId;
        if (this.audioCache[url]) {
            const music = this.audioCache[url];
            music.loop = true;
            music.volume = AUDIO_CONFIG.AMBIENT_VOLUME;
            music.play().catch(() => {});
            this.ambientMusic = music;
        }
    }

    /**
     * Detiene la música ambiental
     */
    stopAmbientMusic() {
        if (this.ambientMusic) {
            try {
                this.ambientMusic.pause();
                this.ambientMusic.currentTime = 0;
            } catch(e) {}
            this.ambientMusic = null;
        }
    }

    /**
     * Pausa la música ambiental
     */
    pauseAmbientMusic() {
        if (this.ambientMusic) {
            try {
                this.ambientMusic.pause();
            } catch(e) {}
        }
    }

    /**
     * Reanuda la música ambiental
     */
    resumeAmbientMusic() {
        if (this.ambientMusic) {
            try {
                this.ambientMusic.play();
            } catch(e) {}
        }
    }

    /**
     * Crea ruido blanco para el motor
     */
    createWhiteNoise() {
        const bufferSize = this.audioContext.sampleRate * 2;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const data = noiseBuffer.getChannelData(0);

        for (let i = 0; i < bufferSize; i++) {
            data[i] = Math.random() * 2 - 1;
        }

        return noiseBuffer;
    }

    /**
     * Inicia el sonido del motor de la nave
     */
    async startEngineSound() {
        if (!this.audioContext || this.engineNoise) return;

        await this.initAudioContext();

        const noiseBuffer = this.createWhiteNoise();
        const noise = this.audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        filter.type = 'lowpass';
        filter.frequency.value = AUDIO_CONFIG.ENGINE_FILTER_FREQ;
        gain.gain.value = 0;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        noise.start();

        this.engineNoise = noise;
        this.engineGain = gain;
    }

    /**
     * Inicia el sonido de los thrusters direccionales
     */
    async startThrusterSound() {
        if (!this.audioContext || this.thrusterNoise) return;

        await this.initAudioContext();

        const noiseBuffer = this.createWhiteNoise();
        const noise = this.audioContext.createBufferSource();
        noise.buffer = noiseBuffer;
        noise.loop = true;

        const gain = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        filter.type = 'bandpass';
        filter.frequency.value = AUDIO_CONFIG.THRUSTER_FILTER_FREQ;
        filter.Q.value = AUDIO_CONFIG.THRUSTER_Q;
        gain.gain.value = 0;

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(this.audioContext.destination);
        noise.start();

        this.thrusterNoise = noise;
        this.thrusterGain = gain;
    }

    /**
     * Actualiza el sonido del motor según velocidad y thrust
     */
    updateEngineSound(speed, isThrusting) {
        if (!this.engineNoise || !this.audioContext) return;

        try {
            const targetVolume = isThrusting
                ? AUDIO_CONFIG.ENGINE_THRUST_VOLUME
                : (speed > 0.01 ? AUDIO_CONFIG.ENGINE_VOLUME : 0);

            this.engineGain.gain.setTargetAtTime(
                targetVolume,
                this.audioContext.currentTime,
                0.2
            );
        } catch(e) {}
    }

    /**
     * Actualiza el sonido de los thrusters direccionales
     */
    updateThrusterSound(isSteering) {
        if (!this.thrusterGain || !this.audioContext) return;

        try {
            const targetVolume = isSteering ? AUDIO_CONFIG.THRUSTER_VOLUME : 0;
            const timeConstant = isSteering ? 0.005 : 0.05;

            this.thrusterGain.gain.setTargetAtTime(
                targetVolume,
                this.audioContext.currentTime,
                timeConstant
            );
        } catch(e) {}
    }

    /**
     * Detiene todos los sonidos
     */
    stopAllSounds() {
        if (this.engineNoise) {
            try {
                this.engineNoise.stop();
            } catch(e) {}
            this.engineNoise = null;
        }

        if (this.thrusterNoise) {
            try {
                this.thrusterNoise.stop();
            } catch(e) {}
            this.thrusterNoise = null;
        }

        this.stopAmbientMusic();
    }

    /**
     * Inicializa el micrófono y el analizador
     */
    async initMicrophone() {
        await this.initAudioContext();

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        this.micStream = stream;

        const analyser = this.audioContext.createAnalyser();
        analyser.fftSize = 2048;
        this.analyser = analyser;

        this.audioContext.createMediaStreamSource(stream).connect(analyser);

        return analyser;
    }

    /**
     * Obtiene el analizador de audio
     */
    getAnalyser() {
        return this.analyser;
    }

    /**
     * Detiene el micrófono
     */
    stopMicrophone() {
        if (this.micStream) {
            this.micStream.getTracks().forEach(track => track.stop());
            this.micStream = null;
        }
    }

    /**
     * Limpia recursos
     */
    cleanup() {
        this.stopAllSounds();
        this.stopMicrophone();
    }
}
