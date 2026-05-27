$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$distRoot = Join-Path $root "dist"
$webDist = Join-Path $distRoot "web"
$androidDist = Join-Path $distRoot "android"
$apkSource = Join-Path $root "android\app\build\outputs\apk\release\app-release.apk"
$apkTarget = Join-Path $androidDist "SomaFMCore-player-release.apk"

Push-Location $root
try {
  .\scripts\build-android-release.ps1

  New-Item -ItemType Directory -Force -Path $webDist | Out-Null
  New-Item -ItemType Directory -Force -Path $androidDist | Out-Null

  Copy-Item -LiteralPath (Join-Path $root "index.html") -Destination (Join-Path $webDist "index.html") -Force
  Copy-Item -LiteralPath (Join-Path $root "favicon.ico") -Destination (Join-Path $webDist "favicon.ico") -Force
  Copy-Item -LiteralPath $apkSource -Destination $apkTarget -Force

  npm run verify:shared

  Write-Output "Web artifact: dist\web\index.html"
  Write-Output "APK artifact:  dist\android\SomaFMCore-player-release.apk"
}
finally {
  Pop-Location
}
