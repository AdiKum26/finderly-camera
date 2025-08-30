# 🔑 API Configuration Template

## Google Cloud Vision API Setup

**⚠️ IMPORTANT: You must configure your own API key for this app to work!**

### Step 1: Get Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Cloud Vision API
4. Go to APIs & Services > Credentials
5. Create an API Key
6. Copy the generated key

### Step 2: Update Configuration

Replace the placeholder in `src/config/vision.ts`:

```typescript
export const GOOGLE_CLOUD = {
  /** API key for authenticating requests to Google Cloud Vision */
  API_KEY: 'YOUR_ACTUAL_API_KEY_HERE', // ⚠️ REPLACE THIS
  
  /** Base URL for the Google Cloud Vision API endpoint */
  BASE_URL: 'https://vision.googleapis.com/v1/images:annotate',
  // ... other settings
};
```

### Step 3: Security Best Practices

- ✅ Restrict API key to Vision API only
- ✅ Set up billing alerts
- ✅ Monitor API usage
- ✅ Never commit API keys to version control
- ❌ Don't share your API key publicly

### Step 4: Test Your Setup

1. Take a photo in the app
2. Tap "AI Analysis"
3. Tap "Analyze Image"
4. Check if results appear

If you see errors, verify your API key is correct and the Vision API is enabled.

---

**Remember: This template file is safe to commit. Your actual API key should only be in the source code file.**
