# SomaFM Core 📻

> **Poor Man's Radio for Everyone.**
> A minimalist, terminal-style web player for SomaFM radio stations.

**SomaFM Core** is a lightweight, single-file HTML player that turns your browser into a "hacker-style" radio station. No servers, no databases, no installation required. Just open the file and listen.
### 🔴 [Launch Player (Live Demo)](https://domrique.github.io/somafm-core/)

<img width="801" height="723" alt="image" src="https://github.com/user-attachments/assets/095575df-2a13-4f48-960d-30e9a357d79b" />


## 🇷🇺 [Русская версия](README.ru.md)

## ✨ Features
*   **Terminal UI**: Fully text-based interface inspired by CLI aesthetics.
*   **Live Visualizer**: Built-in audio visualizer powered by Web Audio API.
*   **SomaFM API**: Automatically fetches the live channel list (Groove Salad, Drone Zone, Def Con, etc.).
*   **HLS & AAC**: Supports modern streaming formats.
*   **Zero Dependencies**: Everything runs from a single `index.html`.

## 🚀 How to Run
### Option 1: GitHub Pages (Recommended)
1.  Upload `index.html` to your repository.
2.  Enable **GitHub Pages** in settings (`Settings` -> `Pages` -> `Branch: main`).
3.  Open the provided URL.

### Option 2: Local
Simply download `index.html` and open it in any modern browser (Chrome, Firefox, Safari).

## ⌨️ Controls
You can control the player by typing commands or using keyboard shortcuts:

| Command / Key | Action |
| :--- | :--- |
| `[number]` | Type station number (e.g., `1`, `7`) and hit Enter to play. |
| `space` | Pause / Resume playback. |
| `esc` / `home` | Stop music and return to station list. |
| `cls` | Clear terminal screen. |

## 🛠 Tech Stack
*   HTML5 / CSS3 (CSS Variables for theming)
*   Vanilla JavaScript (ES6+)
*   SomaFM Public API

---
*Created for educational purposes. Music streams provided by [SomaFM](https://somafm.com).*
