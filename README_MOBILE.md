# Mobile Build Instructions for Barom Learn

This project uses **Capacitor** to wrap the React web app into a native mobile application.

## Prerequisites
- **Node.js** (and npm)
- **Android Studio** (for Android builds)
- **Xcode** (for iOS builds - optional)
- **Java JDK 17+**

## How to build your Android APK

Because building an APK requires the full Android SDK and Java environment (not fully available in the cloud container), follow these steps on your local machine:

1. **Export the Code**: Use the "Export" or "GitHub" feature in the AI Studio menu to get the full source code.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Build the Web App**:
   ```bash
   npm run build
   ```
4. **Sync with Android**:
   ```bash
   npx cap sync android
   ```
5. **Open in Android Studio**:
   ```bash
   npx cap open android
   ```
6. **Generate APK**:
   In Android Studio, go to `Build` > `Build Bundle(s) / APK(s)` > `Build APK(s)`.
   The APK will be located in `android/app/build/outputs/apk/debug/app-debug.apk`.

## Scripts
- `npm run mobile:sync`: Syncs the latest web changes with the mobile projects.
- `npm run mobile:open:android`: Opens the project in Android Studio.

## Architecture Note
This app is built using **React + Vite + Capacitor**. This allows for a fast, modern development workflow that works across Android, iOS, and Web with a single codebase.
