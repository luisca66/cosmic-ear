# 🌌 Cosmic Ear - Musical Ear Training Game

A space-themed musical ear training game that uses real-time pitch detection to help you improve your musical ear.

## 🎮 About

Cosmic Ear is an interactive web-based game developed by Storm Studios that combines music education with stunning 3D space visuals. Pilot your spaceship through the cosmos, matching musical notes with your voice to solve planetary challenges and earn points.

## ✨ Features

- **Real-time Pitch Detection** using Web Audio API
- **Stunning 3D Graphics** powered by Three.js
- **Spaceship Flight Controls** - WASD for direction, QE for roll, Space to accelerate
- **Multiple Instruments** - Piano, Cello, Corno, Coro, Fagot
- **5 Ambient Music Tracks** - Space Ambient, Cosmic Song, Orbital Drift, and more
- **Dynamic Scoring System** - earn up to 2000 points per planet based on speed
- **Configurable Difficulty** - choose 1-5 notes per planet
- **Time-Limited Missions** - race against the clock
- **Responsive Design** - works on desktop browsers

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Microphone access for pitch detection
- Optional: Musical instrument for practice

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/cosmic-ear-training.git
cd cosmic-ear-training
```

2. Open `index.html` in your web browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server
```

3. Visit `http://localhost:8000` in your browser

### No Build Required

This project uses vanilla JavaScript with JSX via Babel browser transform, so no build step is necessary for development.

## 🎵 How to Play

1. **Configure your mission** - Select difficulty (1-5 notes), mission duration (3+ minutes), and background music
2. **Allow microphone access** when prompted
3. **Pilot your spaceship** using WASD/Arrows for direction, QE for roll, Space to accelerate
4. **Approach planets** and click when in range to start the tuning challenge
5. **Listen** to the chord played by the game
6. **Sing** each note shown as "Nota 1", "Nota 2", etc.
7. **Match the pitch** accurately to complete the planet and earn points
8. **Complete as many planets as possible** before time runs out!

## 🎯 Scoring System

- **Base Points**: 100 × (1 / time in seconds) × difficulty multiplier
- **Difficulty Multipliers**: 1 note = 1.0x, 2 notes = 1.5x, 3 notes = 2.5x, 4 notes = 4.0x, 5 notes = 6.0x
- **Maximum**: 2000 points per planet
- **Minimum Time**: 0.5 seconds

## 🛠️ Technology Stack

- **React 18** - UI components with hooks
- **Three.js r128** - 3D graphics and animations
- **Web Audio API** - Real-time pitch detection using autocorrelation
- **Tailwind CSS** - Utility-first styling
- **Babel Standalone** - JSX transformation in browser (no build required)

## 📁 Project Structure

```
cosmic-ear-training/
├── index.html              # Main entry point with CDN imports
├── css/
│   └── styles.css         # Global styles, animations, glassmorphism
├── js/
│   ├── app.jsx            # Complete React application (all-in-one)
│   │                      # Contains: components, game logic, Three.js setup
│   ├── constants.js       # Game configuration & constants (modular reference)
│   ├── audio/             # Audio modules (modular reference)
│   │   ├── pitchDetection.js  # Pitch detection algorithms
│   │   └── audioManager.js    # Audio playback management
│   ├── three/             # Three.js modules (modular reference)
│   │   ├── starfield.js   # Starfield creation
│   │   ├── nebula.js      # Nebula shader
│   │   └── spaceship.js   # 3D spaceship model
│   └── components/        # Component templates (modular reference)
│       ├── SpaceScene.jsx
│       ├── TunerPanel.jsx
│       ├── PlanetView.jsx
│       └── GameOverScreen.jsx
├── cosmic-ear.html        # Original monolithic version
├── *.mp3                  # Background music files
├── README.md
└── LICENSE
```

**Note**: The main application runs from `js/app.jsx` which contains all the code inline for browser compatibility with Babel Standalone. The modular files in subdirectories serve as reference/documentation of the organized code structure.

## 🎨 Customization

You can customize the game by modifying `js/app.jsx` constants section:

- **NOTES**: Musical notes array
- **INSTRUMENTS**: Available instrument samples
- **NOTE_COLORS**: Color mapping for each note (Three.js colors)
- **MUSIC_TRACKS**: Background music options
- **Game Configuration**: Number of planets, distances, interaction radius
- **Scoring Multipliers**: Adjust difficulty rewards

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎮 Controls

| Key | Action |
|-----|--------|
| **W / ↑** | Pitch up |
| **S / ↓** | Pitch down |
| **A / ←** | Yaw left |
| **D / →** | Yaw right |
| **Q** | Roll left |
| **E** | Roll right |
| **Space** | Accelerate |
| **Click** | Activate tuner (when near planet) |
| **Esc** | Close tuner |

## 🙏 Acknowledgments

- **Three.js** community for amazing 3D graphics library
- **React** team for the excellent UI framework
- **Storm Studios** for game design and development
- **Tailwind CSS** for rapid UI development

## 📧 Contact

Developed by **Storm Studios**
Website: [stormstudios.com.mx](https://stormstudios.com.mx)

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ and 🎵 by Storm Studios
