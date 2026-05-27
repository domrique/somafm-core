$ErrorActionPreference = "Stop"

Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$favicon = Join-Path $root "favicon.ico"
$resRoot = Join-Path $root "android\app\src\main\res"

if (-not (Test-Path -LiteralPath $favicon)) {
  throw "favicon.ico not found"
}

function New-IconBitmap {
  param(
    [int]$Size,
    [int]$Padding = 0,
    [string]$Background = "#007acc"
  )

  $canvas = New-Object System.Drawing.Bitmap $Size, $Size
  $graphics = [System.Drawing.Graphics]::FromImage($canvas)
  $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $graphics.Clear([System.Drawing.ColorTranslator]::FromHtml($Background))

  $iconSize = [Math]::Max(1, $Size - ($Padding * 2))
  $icon = New-Object System.Drawing.Icon $favicon, $iconSize, $iconSize
  $graphics.DrawIcon($icon, (New-Object System.Drawing.Rectangle $Padding, $Padding, $iconSize, $iconSize))
  $icon.Dispose()
  $graphics.Dispose()
  return $canvas
}

function Save-Png {
  param(
    [System.Drawing.Bitmap]$Bitmap,
    [string]$Path
  )

  New-Item -ItemType Directory -Force -Path (Split-Path -Parent $Path) | Out-Null
  $tmp = "$Path.tmp"
  if (Test-Path -LiteralPath $tmp) {
    Remove-Item -LiteralPath $tmp -Force
  }
  $Bitmap.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
  $Bitmap.Dispose()
  Move-Item -LiteralPath $tmp -Destination $Path -Force
}

$launcherSizes = @{
  "mipmap-mdpi" = 48
  "mipmap-hdpi" = 72
  "mipmap-xhdpi" = 96
  "mipmap-xxhdpi" = 144
  "mipmap-xxxhdpi" = 192
}

foreach ($entry in $launcherSizes.GetEnumerator()) {
  $dir = Join-Path $resRoot $entry.Key
  $size = [int]$entry.Value
  Save-Png (New-IconBitmap -Size $size -Padding ([Math]::Round($size * 0.12))) (Join-Path $dir "ic_launcher.png")
  Save-Png (New-IconBitmap -Size $size -Padding ([Math]::Round($size * 0.12))) (Join-Path $dir "ic_launcher_round.png")
  Save-Png (New-IconBitmap -Size 108 -Padding 18 -Background "#007acc") (Join-Path $dir "ic_launcher_foreground.png")
}

$splashTargets = @{
  "drawable\splash.png" = 320
  "drawable-port-mdpi\splash.png" = 320
  "drawable-port-hdpi\splash.png" = 480
  "drawable-port-xhdpi\splash.png" = 640
  "drawable-port-xxhdpi\splash.png" = 960
  "drawable-port-xxxhdpi\splash.png" = 1280
  "drawable-land-mdpi\splash.png" = 320
  "drawable-land-hdpi\splash.png" = 480
  "drawable-land-xhdpi\splash.png" = 640
  "drawable-land-xxhdpi\splash.png" = 960
  "drawable-land-xxxhdpi\splash.png" = 1280
}

foreach ($entry in $splashTargets.GetEnumerator()) {
  $size = [int]$entry.Value
  Save-Png (New-IconBitmap -Size $size -Padding ([Math]::Round($size * 0.34)) -Background "#121212") (Join-Path $resRoot $entry.Key)
}

Write-Output "Generated Android launcher icons and splash images from favicon.ico"
