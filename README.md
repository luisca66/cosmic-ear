# 🌌 Cosmic Ear - Musical Ear Training Game

A space-themed musical ear training game that uses real-time pitch detection to help you improve your musical ear.

## 🎮 About

Cosmic Ear is an interactive web-based game that combines music education with stunning 3D space visuals. Travel through the cosmos, matching notes with your voice or instrument to navigate from planet to planet.

## ✨ Features

- **Real-time Pitch Detection** using ML5.js
- **Stunning 3D Graphics** powered by Three.js
- **Progressive Difficulty** - travel through different planets
- **Multiple Instruments** - practice with piano, guitar, and more
- **Immersive Soundtrack** - ambient space music
- **Responsive Design** - works on desktop and mobile

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

1. **Allow microphone access** when prompted
2. **Listen** to the target note played by the game
3. **Sing or play** the note on your instrument
4. **Match the pitch** accurately to advance
5. **Travel through planets** - each level increases difficulty
6. **Avoid losing all lives** - wrong notes cost you!

## 🛠️ Technology Stack

- **React** - UI components
- **Three.js** - 3D graphics and animations
- **ML5.js** - Machine learning for pitch detection
- **Web Audio API** - Audio playback and processing
- **Babel Standalone** - JSX transformation in browser

## 📁 Project Structure

```
cosmic-ear/
├── index.html              # Main entry point
├── css/
│   └── styles.css         # All styles and animations
├── js/
│   ├── app.jsx            # Main React application
│   ├── components/        # React components
│   │   ├── SpaceScene.jsx
│   │   ├── TunerPanel.jsx
│   │   ├── PlanetView.jsx
│   │   └── GameOverScreen.jsx
│   ├── audio/             # Audio processing modules
│   │   ├── pitchDetection.js
│   │   └── audioManager.js
│   ├── three/             # Three.js 3D elements
│   │   ├── starfield.js
│   │   ├── nebula.js
│   │   └── spaceship.js
│   └── constants.js       # Game configuration
├── README.md
└── LICENSE
```

## 🎨 Customization

You can customize the game by modifying `js/constants.js`:

- Add new notes and frequencies
- Change planet colors and names
- Adjust difficulty settings
- Add new background music tracks

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Three.js community for amazing 3D graphics library
- ML5.js team for accessible machine learning tools
- React team for the excellent UI framework

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

Made with ❤️ and 🎵 by [Your Name]
