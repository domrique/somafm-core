# Android / Google TV Build

This project is wrapped as an Android / Google TV app with Capacitor.

## One Web Payload

The browser version and APK use the same source file:

```text
index.html
```

Do not edit generated copies directly:

- `www/index.html`
- `android/app/src/main/assets/public/index.html`

They are rebuilt from the root `index.html` by `npm run android:sync`.

## What is included

- Android project in `android/`.
- Capacitor web asset export to `www/`.
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
dist/web/favicon.ico
dist/android/SomaFMCore-player-release.apk
```

The package script also verifies that the Android HTML payload is identical to
the root `index.html`.

## Manual sync

```powershell
npm run android:sync
```

The player uses remote HTTPS streams, so test audio behavior on the actual Android
device or Google TV box before publishing.
