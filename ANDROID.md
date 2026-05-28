# Android / Google TV Build

This project is packaged as an Android / Google TV launcher APK with Capacitor.

## One Web App

The browser version is the source of truth:

```text
index.html
manifest.webmanifest
sw.js
```

Do not edit generated copies directly:

- `www/index.html`
- `www/manifest.webmanifest`
- `www/sw.js`
- `android/app/src/main/assets/public/index.html`
- `android/app/src/main/assets/public/manifest.webmanifest`
- `android/app/src/main/assets/public/sw.js`

They are rebuilt from the root files by `npm run android:sync`.

The APK launcher opens the live PWA URL:

```text
https://domrique.github.io/somafm-core/
```

This avoids Android WebView background-audio sleep issues by letting the system
browser engine handle playback.

## What is included

- Android project in `android/`.
- Capacitor web asset export to `www/`.
- PWA manifest and service worker for browser install.
- Android TV launcher category and TV banner.
- D-pad basics in the web UI:
  - Arrow keys / D-pad: move focus
  - OK / Enter: activate focused station or button
  - Back / Escape: return to the station list
  - Media Play/Pause / Space: play or pause

## Local toolchain

For this workspace, Java and Android SDK were installed locally under `.tools/`:

- JDK 21: `.tools/jdk-21/`
- Android SDK: `.tools/android-sdk/`

These folders are ignored by git.

On a fresh clone, install JDK 21 and Android SDK first, then either place them
under the same `.tools/` paths or adjust the PowerShell build scripts for your
machine.

## Build Debug APK

```powershell
.\scripts\build-android-debug.ps1
```

The debug APK is created here:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

Debug APKs are useful for local testing, but Play Protect can block them during
normal sideload install.

## Build Release APK

```powershell
npm run android:release
```

The release build creates a local signing key in `.tools/android-signing/` and
builds:

```text
android/app/build/outputs/apk/release/app-release.apk
```

## Package Artifacts

To separate the plain web file from the APK:

```powershell
npm run package:release
```

This creates:

```text
dist/web/index.html
dist/web/manifest.webmanifest
dist/web/sw.js
dist/web/favicon.ico
dist/android/SomaFMCore-player-release.apk
```

The package script also verifies that the staged browser and Android web payloads
are identical.

## Manual sync

```powershell
npm run android:sync
```

The player uses remote HTTPS streams, so test audio behavior on the actual Android
device or Google TV box before publishing.
