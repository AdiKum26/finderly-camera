# 📸 Finderly Camera

A React Native mobile application that combines camera functionality with **AI-powered object recognition using Google Cloud Vision API**. This app demonstrates advanced mobile development with cloud AI integration, Expo ejection, and the use of **react-native-vision-camera** for native-level performance.

## 🚀 Features

### Core Functionality
- **Camera Integration**: Capture photos using the device camera (via `react-native-vision-camera`) or select from photo library
- **AI Object Recognition**: **Powered by Google Cloud Vision API** for professional-grade image analysis
- **Smart Results Display**: Shows detected objects with fallback labels when objects aren't recognized
- **Modern UI/UX**: Clean, professional interface with purple theme and reusable components
- **Cross-Platform**: Built with React Native + Expo for iOS and Android

### AI Analysis Capabilities (Google Cloud Vision API)
- **Label Detection**: Categorizes image content with high confidence
- **Object Recognition**: Detects multiple objects in a single image
- **Text Extraction**: OCR support for extracting text from images
- **Enterprise-grade**: Uses industry-standard APIs relied on by global companies

## 🛠️ Technology Stack

- **Framework**: Expo SDK 53 (bare workflow with prebuild/eject)
- **Camera**: react-native-vision-camera
- **UI**: React Native + custom components (`ShutterButton`, etc.)
- **Navigation**: React Navigation 7
- **Language**: TypeScript
- **AI Service**: Google Cloud Vision API
- **HTTP Client**: Axios

## 🔑 Google Cloud Vision API Setup

This app requires a Google Cloud Vision API key. Without it, AI analysis will not work.

### 1. Create a Google Cloud Project
- Go to [Google Cloud Console](https://console.cloud.google.com/)
- Enable billing
- Enable the **Cloud Vision API**

### 2. Create API Key
- APIs & Services → Credentials → Create API Key
- Restrict key to **Vision API only**

### 3. Add API Key to Config
```typescript
// src/config/vision.ts
export const VISION_CONFIG = {
  GOOGLE_CLOUD: {
    BASE_URL: 'https://vision.googleapis.com/v1/images:annotate',
    API_KEY: 'YOUR_GOOGLE_CLOUD_VISION_API_KEY_HERE', // replace
  },
};
```

### ⚠️ Security Best Practices
- Never commit real API keys to GitHub
- Restrict API key usage
- Monitor usage and set billing alerts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI (`npm i -g expo-cli`) or `npx expo`
- Xcode (iOS) / Android Studio (Android)
- Google Cloud Vision API key (required)

### Installation & Setup

```bash
# Clone repo
git clone https://github.com/AdiKum26/finderly-camera.git
cd finderly-camera

# Install dependencies
npm install

# Install native deps
npm install react-native-vision-camera axios expo-image-picker

# Prebuild for native modules
npx expo prebuild
npx pod-install   # iOS only

# Run on device/simulator
npx expo run:ios
npx expo run:android
```

## 📁 Project Structure

```
finderly-camera/
├── src/
│   ├── components/
│   │   ├── ShutterButton.tsx        # Reusable camera shutter button
│   │   └── ObjectRecognition.tsx    # Renders Vision API results
│   ├── config/
│   │   └── vision.ts                # Vision API config
│   ├── hooks/
│   │   └── usePermissions.ts        # Camera permission hook
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── CameraScreen.tsx
│   │   ├── PhotoReviewScreen.tsx
│   │   ├── HowItWorksScreen.tsx
│   │   └── ContactScreen.tsx
│   └── services/
│       └── visionService.ts         # Google Vision API integration
├── App.tsx                          # Navigation + root app
├── app.json                         # Expo config
└── README.md
```

## 🔍 How It Works

1. **Permissions**: Requests camera access using react-native-vision-camera
2. **Capture/Select**: User takes a photo or chooses one from gallery
3. **Review**: Photo opens in PhotoReviewScreen
4. **AI Analysis**: On button press, photo is converted to Base64 → sent to Google Vision API → labels returned
5. **Results Display**: Results shown inline via ObjectRecognition component

## 🎨 UI/UX

- **Theme**: Purple accent color (#8B5CF6)
- **Reusable Component**: ShutterButton with press/disabled states
- **Feedback**: Loading animations while analyzing
- **Accessibility**: Screen reader labels on buttons

## 🧪 Testing Approach

### Manual Testing
- Verified camera permission flows (deny/allow)
- Tested photo capture + gallery selection
- Validated Vision API responses with sample images

### Error Handling
- No camera device → shows fallback message
- API key missing/invalid → safe failure
- Network errors → graceful error messages

## 🔍 Assumptions & Tradeoffs

- Chose react-native-vision-camera for native performance → required Expo eject/prebuild
- Limited AI scope to label detection for time constraint; OCR/object localization noted as future work
- API keys kept inline for demo, but real apps should use .env + secret management
- Minimal UI (focus on camera + AI flow)

## 🚨 Troubleshooting

### Cannot find native module 'VisionCamera'
```bash
Run npx expo prebuild then npx expo run:ios/run:android
```

### iOS permissions not showing
Check `app.json` → `infoPlist` → `NSCameraUsageDescription`

### API errors
Ensure Vision API is enabled + key is valid

### Hermes crashes (new architecture)
Clean build folders → re-run prebuild

## 📄 License

This project is for assessment/demo purposes only.

---

Built with ❤️ using React Native, Expo, react-native-vision-camera, and Google Cloud Vision API  
Created by Aditya Kumar (08/30/2025)