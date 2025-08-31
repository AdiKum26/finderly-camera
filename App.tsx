/**
 * Created by Aditya Kumar on 08/30/2025
 * Finderly Camera - Main App Navigation Setup
 */

import "react-native-gesture-handler";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/screens/HomeScreen";
import CameraScreen from "./src/screens/CameraScreen";
import { PhotoReviewScreen } from "./src/screens/PhotoReviewScreen";
import HowItWorksScreen from "./src/screens/HowItWorksScreen";
import ContactScreen from "./src/screens/ContactScreen";
import { StatusBar } from "expo-status-bar";

// Define navigation parameter types for each route in the app
export type RootStackParamList = {
  Home: { photoUri?: string } | undefined; // Optional photoUri passed when returning from photo review
  Camera: undefined;
  PhotoReview: { photoUri: string }; // Requires a photoUri to review
  HowItWorks: undefined;
  Contact: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * Main App Component
 * - Sets up navigation using React Navigation
 * - Applies consistent theming and screen transitions
 */
export default function App() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      {/* Applies the system status bar styling */}
      <StatusBar style="auto" />

      {/* Navigation stack setup */}
      <Stack.Navigator>
        {/* Home screen with title and styled header */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: "Finderly Camera",
            headerStyle: { backgroundColor: '#f8f9fa' },
            headerTitleStyle: { fontWeight: '600' },
          }} 
        />

        {/* Camera screen - no header, immersive full-screen experience */}
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ 
            headerShown: false,
            gestureEnabled: false,
          }} 
        />

        {/* Photo review screen - user confirms or analyzes captured image */}
        <Stack.Screen 
          name="PhotoReview" 
          component={PhotoReviewScreen} 
          options={{ 
            headerShown: false,
            gestureEnabled: true,
          }} 
        />

        {/* How It Works - info screen explaining app functionality */}
        <Stack.Screen 
          name="HowItWorks" 
          component={HowItWorksScreen} 
          options={{ 
            headerShown: false,
            gestureEnabled: true,
          }} 
        />

        {/* Contact screen - user support and contact info */}
        <Stack.Screen 
          name="Contact" 
          component={ContactScreen} 
          options={{ 
            headerShown: false,
            gestureEnabled: true,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}