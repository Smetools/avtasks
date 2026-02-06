# AVTasks APK Build Guide

## Quick Option: PWABuilder Online (Recommended - No SDK Required)

1. **Visit PWABuilder:**
   - Go to https://www.pwabuilder.com/
   - Enter your PWA URL: `https://smetools.github.io/avtasks/`
   - Click "Start"

2. **Generate Android Package:**
   - Scroll to "Android" section
   - Click "Generate" or "Store Package"
   - Choose "Trusted Web Activity" (TWA) option
   - Fill in:
     - App Name: `AVTasks`
     - Package ID: `com.arslanventures.avtasks`
     - Host: `smetools.github.io`
     - Start URL: `/avtasks/`
   - Click "Download Package"

3. **The generated ZIP contains:**
   - Signed APK ready to install
   - Source code for customization
   - Instructions for Google Play upload

## Option 2: Build Locally with Capacitor (Requires Android SDK)

### Prerequisites
- Android Studio (includes Android SDK)
- Java JDK 11 or higher
- Node.js (already installed)

### Steps

1. **Install Android Studio:**
   ```bash
   # Download from: https://developer.android.com/studio
   # Or on Ubuntu/Debian:
   sudo snap install android-studio --classic
   ```

2. **Configure Android SDK:**
   ```bash
   export ANDROID_HOME=$HOME/Android/Sdk
   export PATH=$PATH:$ANDROID_HOME/tools:$ANDROID_HOME/platform-tools
   ```

3. **Build the APK:**
   ```bash
   cd /home/molt/openclaw/hassan/projects/avtasks
   
   # Sync Capacitor (if not already done)
   npx cap sync android
   
   # Build the APK
   cd android
   ./gradlew assembleDebug
   
   # The APK will be at:
   # android/app/build/outputs/apk/debug/app-debug.apk
   ```

4. **Build Release APK (for distribution):**
   ```bash
   cd android
   ./gradlew assembleRelease
   
   # APK at: android/app/build/outputs/apk/release/app-release-unsigned.apk
   ```

### Sign the APK (for installation on devices)

1. **Generate keystore:**
   ```bash
   keytool -genkey -v -keystore avtasks.keystore -alias avtasks \
     -keyalg RSA -keysize 2048 -validity 10000
   ```

2. **Sign the APK:**
   ```bash
   jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 \
     -keystore avtasks.keystore \
     app/build/outputs/apk/release/app-release-unsigned.apk avtasks
   
   # Align the APK
   zipalign -v 4 app-release-unsigned.apk avtasks-release.apk
   ```

## Option 3: Use GitHub Actions (Cloud Build)

Create `.github/workflows/build-apk.yml`:

```yaml
name: Build Android APK

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Setup Java
        uses: actions/setup-java@v3
        with:
          distribution: 'temurin'
          java-version: '11'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build web app
        run: npm run build
      
      - name: Sync Capacitor
        run: npx cap sync android
      
      - name: Build APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug
      
      - name: Upload APK
        uses: actions/upload-artifact@v3
        with:
          name: app-debug
          path: android/app/build/outputs/apk/debug/app-debug.apk
```

Then download the APK from GitHub Actions artifacts.

## Current Status

✅ **PWA deployed:** https://smetools.github.io/avtasks/  
✅ **Capacitor configured** with Android platform  
✅ **Agent tasks integration** complete  
⏳ **APK build** requires Android SDK (use PWABuilder online for quickest result)

## Testing the APK

Once you have the APK:

1. **Enable "Install Unknown Apps"** on your Android device:
   - Settings → Security → Install unknown apps
   - Enable for your file manager or browser

2. **Transfer and install:**
   ```bash
   # Via ADB (if device connected):
   adb install avtasks-release.apk
   
   # Or transfer via file sharing and tap to install
   ```

3. **Test features:**
   - Add/complete/delete user tasks
   - Check agent tasks section updates
   - Test offline functionality
   - Verify PWA install prompt
