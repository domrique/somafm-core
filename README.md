# SomaFM Core

> Poor Man's Radio for Everyone.

SomaFM Core is a lightweight single-file web radio player for SomaFM stations, built as a terminal-style interface. It runs directly in the browser and needs no server, build step, database, or account.

Live version: [domrique.github.io/somafm-core](https://domrique.github.io/somafm-core/)

![SomaFM Core screenshot](assets/screenshot-main.png)

## Features

- Terminal-style UI with typed commands and clickable station list.
- SomaFM channel loading from the public SomaFM API with a built-in fallback list.
- AAC / HLS playback support.
- Live Web Audio visualizer in the status bar.
- Now-playing metadata polling with clickable track copy.
- Bottom control bar with play/pause, volume, random station, help, and home.
- Volume popup with mute / unmute.
- Last station restore via `last` / `resume`.
- Random station playback via `random` / `rnd`.
- Current station highlighting in the station list.
- Mobile-friendly controls: tapping bottom buttons does not force the keyboard open.
- `favicon.ico` included for browser tabs and installed shortcuts.

## Run

### GitHub Pages

1. Upload `index.html` and `favicon.ico` to your repository.
2. Enable GitHub Pages in `Settings` -> `Pages`.
3. Select the branch that contains the files, usually `main`.
4. Open the published URL.

GitHub Pages usually updates automatically after each commit. If the old version is still visible, hard-refresh the page with `Ctrl + F5`.

### Local

Open `index.html` in any modern browser.

## Controls

You can use the bottom bar, click a station, or type commands into the terminal prompt.

| Command / Key | Action |
| :--- | :--- |
| `[number]` | Play a station by its list number. |
| `space` | Play / pause the current stream. |
| `home` / `back` / `esc` | Show the station list without stopping playback. |
| `random` / `rnd` | Play a random station. |
| `last` / `resume` | Continue the last played station. |
| `mute` | Toggle mute. |
| `unmute` | Disable mute. |
| `stop` | Stop playback completely. |
| `help` / `man` | Show the short command reference. |
| `cls` | Clear the terminal output. |

## Files

- `index.html` - the whole application.
- `favicon.ico` - browser tab / shortcut icon.
- `README.md` - English documentation.
- `README.ru.md` - Russian documentation.

## Tech Stack

- HTML5 / CSS3
- Vanilla JavaScript
- Web Audio API
- Canvas
- hls.js
- SomaFM public API

---

Created for educational and personal listening purposes. Music streams are provided by [SomaFM](https://somafm.com/).
