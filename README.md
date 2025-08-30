# 📸 Finderly Camera

A React Native mobile application that combines camera functionality with **AI-powered object recognition using Google Cloud Vision API**. This app demonstrates advanced mobile development with cloud AI integration.

## 🚀 Features

### Core Functionality
- **Camera Integration**: Take photos using device camera or select from photo library
- **AI Object Recognition**: **Powered by Google Cloud Vision API** for professional-grade image analysis
- **Smart Results Display**: Shows detected objects with fallback to labels when objects aren't recognized
- **Modern UI/UX**: Clean, professional interface with purple theme
- **Cross-Platform**: Built with React Native and Expo for iOS and Android

### AI Analysis Capabilities (Google Cloud Vision API)
- **Object Detection**: Identifies and locates objects within images with high accuracy
- **Label Classification**: Categorizes image content with confidence scores
- **Text Extraction**: Reads and extracts text from images (OCR)
- **Smart Fallbacks**: Provides alternative information when primary detection fails
- **Professional Grade**: Enterprise-level AI capabilities used by major companies

## 🛠️ Technology Stack

- **Frontend**: React Native 0.79.5
- **Framework**: Expo SDK 53
- **Camera**: react-native-vision-camera
- **AI Services**: **Google Cloud Vision API** (Primary AI engine)
- **HTTP Client**: Axios for API communication
- **Navigation**: React Navigation 7
- **Language**: TypeScript

## 🔑 **IMPORTANT: Google Cloud Vision API Setup Required**

**This app requires a Google Cloud Vision API key to function.** The AI analysis features will not work without proper API configuration.

### Why Google Cloud Vision API?
- **Industry Standard**: Used by major companies worldwide
- **High Accuracy**: State-of-the-art machine learning models
- **Scalable**: Handles millions of requests per day
- **Reliable**: 99.9% uptime SLA
- **Feature Rich**: Multiple detection types in one API

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator (or physical device)
- **Google Cloud Platform account with Vision API enabled** ⚠️ **REQUIRED**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/AdiKum26/finderly-camera.git
   cd finderly-camera
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install additional dependencies for AI functionality**
   ```bash
   npm install @google-cloud/vision axios
   ```

4. **🔑 CRITICAL: Configure Google Cloud Vision API**
   
   **Step 1: Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable billing (required for API usage)

   **Step 2: Enable Vision API**
   - Navigate to APIs & Services > Library
   - Search for "Cloud Vision API"
   - Click "Enable"

   **Step 3: Create API Key**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy the generated key

   **Step 4: Update Configuration**
   ```typescript
   // src/config/vision.ts
   export const GOOGLE_CLOUD = {
     API_KEY: 'YOUR_API_KEY_HERE', // Replace with your actual API key
     BASE_URL: 'https://vision.googleapis.com/v1/images:annotate',
     // ... other settings
   };
   ```

   **Step 5: Security Best Practices**
   - Restrict API key to Vision API only
   - Set up billing alerts
   - Monitor API usage in Google Cloud Console

5. **Start the development server**
   ```bash
   npx expo start
   ```

6. **Run on device/simulator**
   ```bash
   # For iOS
   npx expo run:ios
   
   # For Android
   npx expo run:android
   ```

## 🔧 Configuration

### Google Cloud Vision API Setup (MANDATORY)

**⚠️ WARNING: Without this setup, the AI analysis will not work!**

1. **Enable Vision API**
   - Navigate to APIs & Services > Library
   - Search for "Cloud Vision API"
   - Click "Enable"

2. **Create API Key**
   - Go to APIs & Services > Credentials
   - Click "Create Credentials" > "API Key"
   - Copy the generated key

3. **Update Configuration**
   ```typescript
   // src/config/vision.ts
   export const GOOGLE_CLOUD = {
     API_KEY: 'YOUR_API_KEY_HERE', // ⚠️ REPLACE THIS WITH YOUR KEY
     BASE_URL: 'https://vision.googleapis.com/v1/images:annotate',
     // ... other settings
   };
   ```

4. **Security Best Practices**
   - Restrict API key to Vision API only
   - Set up billing alerts
   - Monitor API usage for anomalies
   - Never commit API keys to version control

### API Pricing (as of 2024)
- **Label Detection**: $1.50 per 1000 requests
- **Object Localization**: $2.00 per 1000 requests
- **Text Detection**: $1.50 per 1000 requests
- **Free Tier**: 1000 requests per month
- **Billing**: Pay-as-you-go with no upfront costs

## 📁 Project Structure

```
finderly-camera/
├── src/
│   ├── components/
│   │   ├── ObjectRecognition.tsx    # AI analysis component (Google Cloud Vision)
│   │   └── ShutterButton.tsx        # Camera shutter button
│   ├── config/
│   │   └── vision.ts                # Vision API configuration (YOUR API KEY HERE)
│   ├── hooks/
│   │   └── usePermissions.ts        # Camera permissions hook
│   ├── screens/
│   │   ├── CameraScreen.tsx         # Camera capture screen
│   │   └── HomeScreen.tsx           # Main home screen with AI analysis
│   ├── services/
│   │   └── visionService.ts         # Google Cloud Vision service integration
│   └── types/
│       └── media.ts                 # TypeScript type definitions
├── android/                          # Android native code
├── ios/                             # iOS native code
├── assets/                          # App icons and images
├── App.tsx                          # Main app component
└── package.json                     # Dependencies and scripts
```

## 🔍 How It Works

### 1. Photo Capture
- User takes photo using camera or selects from library
- Photo is displayed in home screen with preview
- AI Analysis button appears below the photo

### 2. AI Analysis (Google Cloud Vision API)
- User taps "AI Analysis" button
- Photo is converted to Base64 format
- Full-screen modal opens with photo display
- User taps "Analyze Image" button

### 3. Object Recognition (Cloud AI)
- Image is sent to **Google Cloud Vision API**
- API analyzes image using multiple detection methods:
  - **Object Localization** (primary) - Identifies and locates objects
  - **Label Detection** (fallback) - Categorizes image content
  - **Text Detection** (additional) - Extracts readable text
- Results are processed and displayed

### 4. Results Display
- **Primary**: Shows detected objects if available
- **Fallback**: Shows "Could not recognize object" + object labels
- **Smart Logic**: Automatically chooses best available information

## 🎨 UI/UX Features

### Design System
- **Color Scheme**: Professional purple theme (#8B5CF6)
- **Typography**: Clear hierarchy with proper font weights
- **Spacing**: Consistent padding and margins throughout
- **Components**: Reusable, well-styled UI elements

### Responsive Design
- Adapts to different screen sizes
- Proper spacing on various devices
- Touch-friendly button sizes
- Accessible color contrasts

### User Experience
- Intuitive navigation flow
- Clear visual feedback
- Loading states and error handling
- Smooth animations and transitions

## 🧪 Testing

### Manual Testing
1. **Camera Functionality**
   - Test photo capture
   - Verify photo library access
   - Check permission handling

2. **AI Analysis (Google Cloud Vision)**
   - Test with various image types
   - Verify API integration
   - Check error handling
   - Monitor API usage

3. **UI/UX**
   - Test on different screen sizes
   - Verify accessibility features
   - Check performance

### API Testing
- Test with sample images
- Verify rate limiting
- Check error responses
- Monitor API usage in Google Cloud Console

## 🚨 Troubleshooting

### Common Issues

1. **Camera Permissions**
   - Ensure camera permissions are granted
   - Check device settings
   - Restart app if needed

2. **API Key Issues (Most Common)**
   - ⚠️ **Verify API key is correct and updated**
   - Check API is enabled in Google Cloud Console
   - Verify billing is set up
   - Check API quotas and limits

3. **Build Errors**
   - Clear Metro cache: `npx expo start --clear`
   - Reinstall dependencies: `npm install`
   - Check Expo SDK compatibility

4. **Performance Issues**
   - Optimize image sizes
   - Implement caching
   - Monitor API usage and costs

### Debug Mode
- Enable React Native debugger
- Check console logs
- Monitor network requests to Google Cloud Vision API
- Use Expo DevTools

## 🔒 Security Considerations

### API Key Security (CRITICAL)
- **Never commit API keys to version control**
- Use environment variables in production
- Restrict API key permissions to Vision API only
- Monitor API usage for anomalies
- Set up billing alerts

### Data Privacy
- Images are processed by Google Cloud Vision API
- No images are stored permanently
- Base64 conversion happens locally
- Consider implementing data retention policies
- Review Google Cloud privacy policies

## 🚀 Deployment

### Development Build
```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

### Production Build
```bash
# Build for production
eas build --platform ios
eas build --platform android

# Submit to app stores
eas submit --platform ios
eas submit --platform android
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards
- Follow TypeScript best practices
- Use consistent formatting
- Add comprehensive comments
- Follow React Native conventions
- **Never commit API keys or sensitive data**

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Cloud Vision API** for enterprise-grade AI capabilities
- **Expo** for the development framework
- **React Native** community for tools and libraries
- **Open source contributors** for inspiration and code

## 📞 Support

### Getting Help
- Check the [Issues](https://github.com/AdiKum26/finderly-camera/issues) page
- Review the troubleshooting section
- Check Expo and React Native documentation
- **Google Cloud Vision API Documentation**: [https://cloud.google.com/vision/docs](https://cloud.google.com/vision/docs)

### Contact
- **Developer**: Aditya Kumar
- **Repository**: [GitHub](https://github.com/AdiKum26/finderly-camera)
- **Issues**: [GitHub Issues](https://github.com/AdiKum26/finderly-camera/issues)

## ⚠️ Important Notes

### API Key Security
- **This repository contains a placeholder API key**
- **You MUST replace it with your own Google Cloud Vision API key**
- **Never share your API key publicly**
- **Monitor your API usage and costs**

### Cost Management
- Google Cloud Vision API has usage-based pricing
- Set up billing alerts to avoid unexpected charges
- Monitor usage in Google Cloud Console
- Start with free tier (1000 requests/month)

---

**Built with ❤️ using React Native and Google Cloud Vision API**

*Last updated: August 2025*
*Created by Aditya Kumar*
