# 🛠️ Cosmic Ear - Development Guide

## Project Architecture

This project uses a **hybrid approach** for maximum compatibility and modularity:

### Main Application (`js/app.jsx`)

The game runs as a **single-file React application** that's transformed in the browser using Babel Standalone. This approach:

- ✅ **No build step required** - Open and play instantly
- ✅ **Works in any modern browser** - No Node.js needed
- ✅ **Easy to deploy** - Just upload files to any web server
- ✅ **Perfect for learning** - All code in one place

### Modular Reference Files

The `js/` subdirectories contain **modular ES6 versions** of the code for:

- 📚 **Documentation purposes** - Understand code organization
- 🎓 **Learning reference** - See clean separation of concerns
- 🔄 **Future migration** - Easy to move to a build system later
- 🧪 **Testing** - Can be unit tested independently

## Code Organization

### 1. Constants (`js/constants.js`)

```javascript
export const NOTES = ["C", "C#", "D", ...];
export const INSTRUMENTS = ["Piano", "Cello", ...];
export const NOTE_COLORS = { "C": 0xff0000, ... };
export const MUSIC_TRACKS = [...];
export const SCORE_MULTIPLIERS = { 1: 1.0, 2: 1.5, ... };
```

**Responsibility**: Game configuration and static data

### 2. Audio System (`js/audio/`)

#### `pitchDetection.js`
```javascript
export function getNoteFromPitch(frequency)
export function autoCorrelate(buffer, sampleRate)
```
**Responsibility**: Convert audio frequency to musical notes

#### `audioManager.js`
```javascript
export class AudioManager {
    preloadAllSamples(onProgress)
    playNoteChord(notes, instrument)
    playSuccessSound()
    startEngineSound()
    updateEngineSound(speed, isThrusting)
}
```
**Responsibility**: Audio playback, music management, engine sounds

### 3. Three.js Components (`js/three/`)

#### `starfield.js`
```javascript
export function createStarfield(count = 2000)
```
**Responsibility**: Background starfield with 2000+ stars

#### `nebula.js`
```javascript
export function createNebula()
```
**Responsibility**: Animated nebula with custom shaders

#### `spaceship.js`
```javascript
export function createSpaceship()
```
**Responsibility**: Detailed 3D spaceship model (100+ components)

### 4. React Components (Integrated in `app.jsx`)

The main app.jsx contains all components inline:

```jsx
// SVG Icons
const IconMusic = () => <svg>...</svg>
const IconPlay = () => <svg>...</svg>
const IconLogOut = () => <svg>...</svg>
const IconMic = () => <svg>...</svg>

// Main App Component
function App() {
    // State management
    // Game logic
    // Three.js scene setup
    // Event handlers

    return (
        // Intro screen
        // Playing HUD
        // Tuner panel
        // Game over screen
    )
}
```

## Game State Management

### States
```javascript
const [gameState, setGameState] = useState('intro')
// 'intro' | 'playing' | 'gameOver'

const [tunerActive, setTunerActive] = useState(false)
// Controls whether tuner panel is visible

const [tunerPhase, setTunerPhase] = useState('playing')
// 'playing' | 'listening' | 'success'
```

### Refs (Persistent Data)
```javascript
const sceneRef = useRef(null)              // Three.js scene
const cameraRef = useRef(null)             // Camera
const shipRef = useRef(null)               // Spaceship mesh
const planetMeshesRef = useRef([])         // All planets
const audioCtxRef = useRef(null)           // Audio context
const analyserRef = useRef(null)           // Pitch analyzer
const keysPressed = useRef({})             // Keyboard state
```

## Game Flow

```
[INTRO]
   ↓
   • User selects difficulty (1-5 notes)
   • User selects mission duration (3+ minutes)
   • User selects background music
   • User activates microphone
   ↓
[PLAYING]
   ↓
   • Spaceship spawns at origin
   • 15 planets generated randomly
   • User pilots ship (WASD/QE/Space)
   • User clicks planet to activate tuner
   ↓
[TUNER ACTIVE]
   ↓
   • Phase 1: Play chord (1.5s)
   • Phase 2: Listen to user singing
   • Match detection (700ms hold time)
   • On success: particles, score, next note
   • On complete: close tuner, add points
   ↓
[CONTINUE PLAYING]
   ↓
   • Visit more planets
   • Race against time
   ↓
[TIME RUNS OUT]
   ↓
[GAME OVER]
   • Show final score
   • Show performance message
   • Option to restart or exit
```

## Pitch Detection Algorithm

Uses **autocorrelation** method:

```javascript
function autoCorrelate(buffer, sampleRate) {
    1. Calculate RMS (volume check)
    2. Trim silence from buffer
    3. Compute autocorrelation
    4. Find first valley and maximum peak
    5. Use parabolic interpolation
    6. Return frequency = sampleRate / period
}
```

**Accuracy**: ±30 cents tolerance for note matching

## Scoring Formula

```javascript
timeElapsed = max(0.5, actualTime)
basePoints = 100 × (1 / timeElapsed)
multiplier = SCORE_MULTIPLIERS[numNotes]
finalScore = min(2000, round(basePoints × multiplier))
```

## Three.js Scene Hierarchy

```
Scene
├── AmbientLight (0x222244, 0.5)
├── DirectionalLight (0xffffff, 1)
├── Starfield (Points)
├── Nebula (Mesh with ShaderMaterial)
├── Spaceship (Group)
│   ├── Body (ExtrudeGeometry)
│   ├── Nose (Cone)
│   ├── Cockpit (Sphere)
│   ├── Wings (Group × 2)
│   ├── Tail Fins (Group × 2)
│   ├── Engine (Cylinder)
│   └── Engine Light (PointLight)
├── Planet[0..14] (Group)
│   ├── Core (Sphere)
│   ├── Glow (Sphere, BackSide)
│   └── Moons[0..n] (Sphere)
└── Particles[] (Dynamic)
```

## Performance Optimizations

1. **Geometry Reuse**: Same moon geometry for all moons
2. **Texture-less**: All colors via materials (no texture loading)
3. **LOD**: Planets use appropriate poly counts for size
4. **Frustum Culling**: Three.js automatically culls off-screen objects
5. **Audio Cache**: All samples preloaded and reused
6. **RAF Throttling**: Game loop runs at 60fps max

## Browser Compatibility

### Tested Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 14+ (requires user gesture for audio)

### Required APIs
- Web Audio API
- MediaDevices.getUserMedia()
- WebGL 1.0+
- ES6 (Arrow functions, destructuring, etc.)

## Development Workflow

### Quick Start
```bash
# No installation needed!
# Just open index.html in browser
open index.html
```

### With Live Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Using VS Code
# Install "Live Server" extension
# Right-click index.html > Open with Live Server
```

### Debugging

**Chrome DevTools**:
- F12 → Sources tab → See transpiled JSX
- Console → React DevTools available
- Performance tab → Check 60fps rendering

**Three.js Inspector**:
```javascript
// In console
window.sceneRef.current
window.shipRef.current
```

## Adding New Features

### Add New Planet Type
```javascript
// In generatePlanet()
const planetTypes = {
    'ice': { color: 0x00ffff, size: 2.0 },
    'lava': { color: 0xff4400, size: 1.8 },
    // ...
};
```

### Add New Instrument
```javascript
// In INSTRUMENTS array
const INSTRUMENTS = [..., "Violin"];

// Upload samples to server:
// BASE_URL/Violin/C2.mp3 through B6.mp3
```

### Add New Music Track
```javascript
// In MUSIC_TRACKS array
const MUSIC_TRACKS = [..., {
    id: 'new-song.mp3',
    name: 'New Song',
    icon: '🎸'
}];

// Place new-song.mp3 in project root
```

## Future Enhancements

### Potential Improvements
- [ ] Add multiplayer mode
- [ ] Implement power-ups
- [ ] Add boss planets with complex chords
- [ ] Include rhythm challenges
- [ ] Add leaderboard system
- [ ] Support MIDI input devices
- [ ] Add mobile touch controls
- [ ] Implement save/load progress

### Build System Migration
To migrate to a proper build system:

```bash
# 1. Initialize npm project
npm init -y

# 2. Install dependencies
npm install react react-dom three
npm install -D @vitejs/plugin-react vite

# 3. Update imports in files to use ES6 modules

# 4. Configure Vite
# vite.config.js

# 5. Build
npm run build
```

## Testing

### Manual Testing Checklist
- [ ] Microphone activation works
- [ ] All 5 difficulty levels functional
- [ ] Time countdown accurate
- [ ] Scoring calculation correct
- [ ] All 6 music tracks play
- [ ] Spaceship controls responsive
- [ ] Planet collision detection works
- [ ] Note detection accurate (±30 cents)
- [ ] Particles spawn on success
- [ ] Game over screen appears
- [ ] Restart functionality works

### Unit Testing (Future)
```javascript
// Example with Jest
import { getNoteFromPitch } from './pitchDetection';

test('converts 440Hz to A4', () => {
    const result = getNoteFromPitch(440);
    expect(result.note).toBe('A');
    expect(result.octave).toBe(4);
});
```

## Troubleshooting

### Microphone Not Working
- Check browser permissions
- Try HTTPS instead of HTTP
- Safari requires user gesture before audio

### Three.js Not Rendering
- Check WebGL support: `about:gpu` in Chrome
- Update graphics drivers
- Try disabling hardware acceleration

### Audio Samples Not Loading
- Check BASE_URL accessibility
- Verify CORS headers on server
- Check browser console for 404 errors

### Performance Issues
- Reduce number of stars (in createStarfield)
- Lower renderer pixel ratio
- Disable shooting stars effect

## Credits

**Development**: Storm Studios
**Libraries**: React, Three.js, Tailwind CSS
**Audio Samples**: Storm Studios
**Music**: Licensed ambient tracks

---

Happy coding! 🚀🎵
