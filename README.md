# Finderly Camera (Expo + VisionCamera, TypeScript)

A minimal, typed React Native app demonstrating:
- Expo project ejected to native
- `react-native-vision-camera` for photo capture
- Graceful permissions
- Reusable UI (ShutterButton)
- Basic overlays and `@react-navigation/native` stack

## Tech
- Expo (latest)
- TypeScript
- React Navigation (native-stack)
- VisionCamera + JSI deps (Reanimated, Worklets Core)

## Setup
```bash
npm i
# If you change permissions in app.json, re-prebuild
npx expo prebuild

iOS (macOS)
npx expo run:ios

Android
npx expo run:android
```

## Ejecting / Native Modules

This project uses expo prebuild to generate ios/ and android/ so VisionCamera can run as a native module. For permission changes, run:

```bash
npx expo prebuild --clean
```

## Testing Approach

Manual flows: permission grant/deny, capture, preview, use photo

Visual checks: overlay alignment, torch, front/back

Device tests on Android emulator (SDK 34) and iOS Simulator (iPhone 15)

## Assumptions / Tradeoffs

Photo-only (no video) to keep scope within 6–8 hours

Saved preview is ephemeral; a production app would persist to app storage or media library

Conservative Android permissions for media reading; may be reduced depending on storage strategy

## Common pitfalls & fixes

- **Reanimated plugin position**: must be the last plugin in babel.config.js.
- **Expo Go won't work after eject**: use run:ios/run:android (dev builds), not Expo Go.
- **iOS build fails after changing permissions**: `npx expo prebuild --clean && npx expo run:ios`.
- **Android minSdk**: Expo SDK recent versions satisfy VisionCamera's requirements; ensure Android Studio/Gradle sync completes.
- **"No camera device available"**: use a real device or an emulator/simulator with a camera; on simulator, camera often returns none.
