$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$jdkRoot = Join-Path $root ".tools\jdk-21"
$sdkRoot = Join-Path $root ".tools\android-sdk"
$gradleHome = Join-Path $root ".tools\gradle-home"
$signingRoot = Join-Path $root ".tools\android-signing"
$keystorePath = Join-Path $signingRoot "somafmcore-release.jks"
$propsPath = Join-Path $signingRoot "release.properties"
$alias = "somafmcore"

if (-not (Test-Path -LiteralPath $jdkRoot)) {
  throw "Local JDK 21 not found at $jdkRoot"
}

if (-not (Test-Path -LiteralPath $sdkRoot)) {
  throw "Local Android SDK not found at $sdkRoot"
}

$javaHome = (Get-ChildItem -LiteralPath $jdkRoot -Directory | Select-Object -First 1).FullName
$keytool = Join-Path $javaHome "bin\keytool.exe"

New-Item -ItemType Directory -Force -Path $signingRoot | Out-Null

if (-not (Test-Path -LiteralPath $propsPath)) {
  $chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789".ToCharArray()
  $password = -join (1..32 | ForEach-Object { $chars | Get-Random })
  $storeFile = $keystorePath.Replace("\", "/")

  & $keytool -genkeypair `
    -v `
    -keystore $keystorePath `
    -storepass $password `
    -keypass $password `
    -alias $alias `
    -keyalg RSA `
    -keysize 2048 `
    -validity 10000 `
    -dname "CN=SomaFMCore, OU=Personal, O=domrique, L=Local, ST=Local, C=US"

  if ($LASTEXITCODE -ne 0) {
    throw "keytool failed with exit code $LASTEXITCODE"
  }

  @(
    "storeFile=$storeFile"
    "storePassword=$password"
    "keyAlias=$alias"
    "keyPassword=$password"
  ) | Set-Content -LiteralPath $propsPath -Encoding ASCII
}

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
  Invoke-Checked { android\gradlew.bat --no-daemon -p android assembleRelease }
}
finally {
  Pop-Location
}
