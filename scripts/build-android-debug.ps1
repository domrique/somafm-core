$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$jdkRoot = Join-Path $root ".tools\jdk-21"
$sdkRoot = Join-Path $root ".tools\android-sdk"
$gradleHome = Join-Path $root ".tools\gradle-home"

if (-not (Test-Path -LiteralPath $jdkRoot)) {
  throw "Local JDK 21 not found at $jdkRoot"
}

if (-not (Test-Path -LiteralPath $sdkRoot)) {
  throw "Local Android SDK not found at $sdkRoot"
}

$javaHome = (Get-ChildItem -LiteralPath $jdkRoot -Directory | Select-Object -First 1).FullName

$env:JAVA_HOME = $javaHome
$env:ANDROID_HOME = $sdkRoot
$env:ANDROID_SDK_ROOT = $sdkRoot
$env:GRADLE_USER_HOME = $gradleHome
$env:Path = "$javaHome\bin;$sdkRoot\cmdline-tools\latest\bin;$sdkRoot\platform-tools;$env:Path"

function Invoke-Checked {
  param([scriptblock]$Command)

  & $Command
  if ($LASTEXITCODE -ne 0) {
    throw "Command failed with exit code $LASTEXITCODE"
  }
}

Push-Location $root
try {
  Invoke-Checked { .\scripts\generate-android-assets.ps1 }
  Invoke-Checked { npm run android:sync }
  Invoke-Checked { android\gradlew.bat --no-daemon -p android assembleDebug }
}
finally {
  Pop-Location
}
