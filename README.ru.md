# SomaFM Core

> Poor Man's Radio for Everyone.

SomaFM Core - терминальный веб-плеер для SomaFM и небольшого набора отобранных независимых внешних станций. Работает как обычная страница в браузере, устанавливаемая PWA и Android / Google TV launcher APK.

**🔊 Live: [https://domrique.github.io/somafm-core/](https://domrique.github.io/somafm-core/)**

Язык: [English](README.md) / **Русский**

![Скриншот SomaFM Core](assets/screenshot-main.png)

## Возможности

- Терминальный интерфейс: команды, кликабельный список станций и нижняя панель.
- Загрузка каналов SomaFM через публичный API со встроенным fallback-списком.
- Отдельный блок external radio для независимых, андеграундных и непопсовых потоков.
- Поддержка AAC / MP3 / HLS и Web Audio визуализатор.
- Now playing для SomaFM и внешних ICY-потоков, где метаданные доступны.
- Продолжение последней станции через `last` / `resume`.
- Случайная станция через `random` / `rnd`.
- Android / Google TV launcher APK с управлением под D-pad / пульт.

## Запуск

### Live

Открыть GitHub Pages:

[https://domrique.github.io/somafm-core/](https://domrique.github.io/somafm-core/)

### Локально в браузере

Откройте `index.html` в любом современном браузере.

### Android APK

APK открывает live PWA:

[https://domrique.github.io/somafm-core/](https://domrique.github.io/somafm-core/)

Так Android-версия остаётся идентичной веб-версии и использует обычный браузерный аудиостек, который лучше переживает воспроизведение в фоне.

Скачать последний APK:

[SomaFMCore-player-release.apk](https://github.com/domrique/somafm-core/releases/latest/download/SomaFMCore-player-release.apk)

Собрать release APK в этой рабочей папке:

```powershell
npm install
npm run package:release
```

Артефакты:

```text
dist/web/index.html
dist/web/manifest.webmanifest
dist/web/sw.js
dist/android/SomaFMCore-player-release.apk
```

Подробности: [ANDROID.md](ANDROID.md).

## Управление

Можно пользоваться нижней панелью, кликать станции, использовать клавиатуру / D-pad или вводить команды в терминальную строку.

| Команда / клавиша | Действие |
| :--- | :--- |
| `[number]` | Включить станцию по номеру в списке. |
| `space` | Play / pause. |
| `home` / `back` / `esc` | Показать список станций, не останавливая музыку. |
| `random` / `rnd` | Включить случайную станцию. |
| `last` / `resume` | Продолжить последнюю станцию. |
| `mute` / `unmute` | Переключить mute. |
| `stop` | Полностью остановить воспроизведение. |
| `help` / `man` | Показать короткую справку. |
| Стрелки / D-pad | Перемещать фокус на TV-интерфейсе. |
| Enter / OK | Активировать выбранную станцию или кнопку. |

## Структура

- `index.html` - исходник приложения для браузера и APK.
- `manifest.webmanifest` / `sw.js` - PWA-метаданные и лёгкий cache worker.
- `assets/screenshot-main.png` - скриншот для README.
- `android/` - Android-проект Capacitor.
- `scripts/` - сборка, упаковка и генерация Android-иконок.
- `RADIO_CANDIDATES.md` - станции для повторной проверки.
- `ANDROID.md` - заметки по Android / Google TV сборке.

## Технологии

- HTML5 / CSS3
- Vanilla JavaScript
- Web Audio API
- Canvas
- hls.js
- SomaFM public API
- Capacitor Android

---

Проект создан для личного прослушивания и экспериментов. Потоки SomaFM предоставляются [SomaFM](https://somafm.com/), внешние потоки принадлежат соответствующим станциям.
