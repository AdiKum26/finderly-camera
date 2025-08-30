# Finderly Camera - React Native Camera Application

> **A professional-grade camera application built with React Native, TypeScript, and Expo**

## 📱 Project Overview

**Finderly Camera** is a comprehensive mobile camera application that demonstrates advanced React Native development practices, native module integration, and professional code architecture. Built as a take-home assessment, this project showcases the developer's ability to create production-ready mobile applications with modern technologies.

### 🎯 **What This App Does**

- **Photo Capture**: High-quality photo capture using react-native-vision-camera
- **Camera Controls**: Advanced features including torch, camera flip, and flash control
- **Permission Management**: Graceful handling of camera and microphone permissions
- **Photo Preview**: Instant preview with confirmation workflow
- **Navigation**: Seamless screen transitions with React Navigation
- **Cross-Platform**: Full compatibility with both iOS and Android

### 🏗️ **Why Built This Way**

The application architecture was designed with several key principles in mind:

1. **Native Performance**: Ejected from Expo to leverage react-native-vision-camera for optimal camera performance
2. **Type Safety**: Comprehensive TypeScript implementation for maintainable, error-free code
3. **Component Reusability**: Modular design with reusable components like ShutterButton
4. **User Experience**: Intuitive interface with proper accessibility and visual feedback
5. **Code Quality**: Industry-standard documentation and clean, maintainable code structure

## 🛠️ Technology Stack

### **Core Technologies**
- **Expo SDK 53** - Latest stable Expo framework
- **React Native 0.79.6** - Native mobile development
- **TypeScript 5.8.3** - Type-safe JavaScript development
- **React 19.0.0** - Latest React with concurrent features

### **Key Libraries**
- **react-native-vision-camera** - Professional camera functionality
- **@react-navigation/native** - Screen navigation and routing
- **react-native-reanimated** - Advanced animations and gestures
- **react-native-worklets-core** - Background thread execution

### **Development Tools**
- **Babel** - JavaScript transpilation and optimization
- **Metro** - React Native bundler
- **CocoaPods** - iOS dependency management
- **Gradle** - Android build system

## 🚀 Setup Instructions

### **Prerequisites**
- Node.js 18+ and npm/yarn
- Xcode 15+ (for iOS development)
- Android Studio (for Android development)
- Physical iOS/Android device for camera testing

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/finderly-camera.git
cd finderly-camera

# Install dependencies
npm install

# Install iOS dependencies (macOS only)
cd ios && pod install && cd ..
```

### **Running the Application**

#### **Development Mode**
```bash
# Start Metro bundler
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android
```

#### **Physical Device Testing**
```bash
# iOS device (requires USB connection)
npx expo run:ios --device

# Android device (requires USB connection)
npx expo run:android --device
```

### **Ejecting and Native Builds**

This project uses `expo prebuild` to generate native iOS and Android projects:

```bash
# Generate native projects
npx expo prebuild

# Clean and regenerate (if permissions change)
npx expo prebuild --clean

# Build and run native projects
npx expo run:ios
npx expo run:android
```

### **Camera Permissions Configuration**

The app automatically handles permissions, but you can customize them in `app.json`:

```json
{
  "expo": {
    "ios": {
      "infoPlist": {
        "NSCameraUsageDescription": "This app uses the camera to take photos.",
        "NSMicrophoneUsageDescription": "This app uses the microphone for video recording."
      }
    },
    "android": {
      "permissions": [
        "android.permission.CAMERA",
        "android.permission.RECORD_AUDIO"
      ]
    }
  }
}
```

## 🧪 Testing Approach

### **Manual Testing Strategy**

The application was thoroughly tested using a comprehensive manual testing approach:

#### **Core Functionality**
- ✅ **Permission Flow**: Grant/deny camera access, verify proper handling
- ✅ **Camera Operation**: Photo capture, preview generation, confirmation
- ✅ **Navigation**: Screen transitions, back button behavior, parameter passing
- ✅ **UI Controls**: Torch toggle, camera flip, shutter button responsiveness

#### **Device Testing**
- **iOS**: Tested on iPhone 15 Pro Max (physical device)
- **Android**: Tested on Android emulator (API 34)
- **Simulator**: Verified UI layout and navigation flow

#### **Edge Cases**
- **Permission Denial**: App gracefully handles denied camera access
- **Device Rotation**: UI maintains proper positioning across orientations
- **Memory Management**: Photo previews don't cause memory leaks
- **Error Handling**: Graceful fallbacks for camera failures

### **Visual Quality Assurance**
- **Overlay Alignment**: Camera reticle and controls maintain proper positioning
- **Button States**: Visual feedback for pressed, disabled, and active states
- **Typography**: Consistent font weights and sizes across screens
- **Spacing**: Proper margins and padding for professional appearance

## 📋 Assumptions and Tradeoffs

### **Design Decisions**

#### **Photo-Only Implementation**
- **Why**: Focused scope to complete within 6-8 hour assessment timeframe
- **Tradeoff**: Video recording not implemented (could be added later)
- **Benefit**: Demonstrates core camera functionality without scope creep

#### **Ephemeral Photo Storage**
- **Why**: Photos are stored temporarily for preview only
- **Tradeoff**: No persistent storage or media library integration
- **Benefit**: Faster development, cleaner user experience
- **Future**: Could integrate with device photo library or cloud storage

#### **Conservative Android Permissions**
- **Why**: READ_MEDIA_* permissions for Android 13+ compatibility
- **Tradeoff**: May request more permissions than strictly necessary
- **Benefit**: Ensures app works across all Android versions
- **Alternative**: Could implement dynamic permission requests based on Android version

### **Technical Tradeoffs**

#### **Expo Ejection**
- **Why**: Required for react-native-vision-camera integration
- **Tradeoff**: Loss of Expo Go compatibility, increased build complexity
- **Benefit**: Access to native camera APIs and better performance
- **Mitigation**: Comprehensive documentation for native build process

#### **TypeScript Strictness**
- **Why**: Type safety and code maintainability
- **Tradeoff**: Slightly longer development time for type definitions
- **Benefit**: Fewer runtime errors, better IDE support, easier maintenance

## 🏗️ Project Architecture

### **File Structure**
```
src/
├── components/          # Reusable UI components
│   └── ShutterButton.tsx
├── hooks/              # Custom React hooks
│   └── usePermissions.ts
├── screens/            # Application screens
│   ├── HomeScreen.tsx
│   └── CameraScreen.tsx
└── types/              # TypeScript type definitions
    └── media.ts
```

### **Component Hierarchy**
```
App.tsx
├── NavigationContainer
│   └── Stack.Navigator
│       ├── HomeScreen
│       │   ├── Welcome Message
│       │   ├── Camera Button
│       │   └── Photo Preview
│       └── CameraScreen
│           ├── Camera View
│           ├── Control Overlay
│           ├── ShutterButton
│           └── Photo Preview Dock
```

### **State Management**
- **Local State**: Component-level state for UI interactions
- **Navigation State**: Screen parameters and navigation history
- **Permission State**: Camera and microphone access status
- **Photo State**: Captured photo URIs and metadata

## 🔧 Development Workflow

### **Code Quality Standards**
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code style and best practices enforcement
- **Prettier**: Consistent code formatting
- **JSDoc**: Comprehensive documentation for all functions

### **Testing Workflow**
1. **Unit Testing**: Component logic and utility functions
2. **Integration Testing**: Screen navigation and data flow
3. **Manual Testing**: Device-specific functionality verification
4. **Performance Testing**: Memory usage and frame rate monitoring

### **Deployment Process**
1. **Development Build**: Local testing with Metro bundler
2. **Native Build**: Prebuild and native compilation
3. **Device Testing**: Physical device verification
4. **Documentation**: Update README and code comments

## 🚨 Common Issues and Solutions

### **Build Problems**

#### **"No code signing certificates available"**
```bash
# Solution: Open in Xcode and configure signing
open ios/finderlycamera.xcworkspace
# Then configure "Automatically manage signing" in project settings
```

#### **"Metro bundler not running"**
```bash
# Solution: Start development server
npm start
# Keep terminal open while testing
```

#### **"Camera device not available"**
- **Cause**: Testing on simulator or device without camera
- **Solution**: Use physical device with camera hardware
- **Alternative**: Test UI flow on simulator, camera on device

### **Permission Issues**

#### **iOS Permission Denied**
- Go to Settings → Privacy & Security → Camera → Finderly Camera → Allow
- Restart the application after permission change

#### **Android Permission Problems**
- Ensure app has camera permission in device settings
- Run `npx expo prebuild --clean` after permission changes

## 📚 Learning Resources

### **React Native Development**
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### **Camera and Media**
- [react-native-vision-camera](https://mrousavy.com/react-native-vision-camera/)
- [React Native Camera Guide](https://reactnative.dev/docs/cameraroll)

### **Navigation and State**
- [React Navigation](https://reactnavigation.org/)
- [React Hooks](https://react.dev/reference/react)

## 🤝 Contributing

This project was created as a take-home assessment for the **Part-Time React Native Developer** position at **Finderly**. The code demonstrates:

- **Professional Development Practices**: Clean, documented, maintainable code
- **Technical Proficiency**: Advanced React Native and TypeScript skills
- **Problem-Solving Ability**: Successful integration of complex native modules
- **Documentation Skills**: Comprehensive setup and usage instructions

## 📄 License

This project is created for assessment purposes and demonstrates the developer's technical capabilities. All code is original work created by **Aditya Kumar** for the Finderly camera application assessment.

---

**Created with ❤️ by Aditya Kumar**  
**Assessment completed in ~6-8 hours**  
**Technologies: React Native, TypeScript, Expo, VisionCamera**
