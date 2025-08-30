/**
 * Created by Aditya Kumar on 30/08/2025
 * Documented clearly for understanding purposes
 */

/**
 * Finderly Camera - Main Application Component
 * 
 * Root component that sets up navigation, routing, and global app configuration.
 * Implements React Navigation with TypeScript for type-safe navigation between
 * camera and home screens.
 * 
 * Features:
 * - React Navigation setup with native stack navigator
 * - Type-safe navigation parameters
 * - Global status bar configuration
 * - Screen routing and navigation options
 */

// Import gesture handler at the top level for proper touch handling
import "react-native-gesture-handler";

// Navigation and routing imports
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen component imports
import HomeScreen from "./src/screens/HomeScreen";
import CameraScreen from "./src/screens/CameraScreen";
import { PhotoReviewScreen } from "./src/screens/PhotoReviewScreen";

// Expo utilities
import { StatusBar } from "expo-status-bar";

/**
 * Root navigation parameter list type definition
 * 
 * Defines the structure of navigation parameters for each screen
 * in the application. This ensures type safety when passing data
 * between screens during navigation.
 * 
 * @interface RootStackParamList
 * @property {Object} Home - Home screen parameters
 * @property {string} [Home.photoUri] - Optional URI of captured photo to display
 * @property {undefined} Camera - Camera screen (no parameters needed)
 */
export type RootStackParamList = {
  Home: { photoUri?: string } | undefined;
  Camera: undefined;
  PhotoReview: { photoUri: string };
};

/**
 * Native stack navigator instance for screen routing
 * 
 * Creates a stack-based navigation system that allows users to
 * navigate between screens with proper back button handling
 * and transition animations.
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * App - Main application component
 * 
 * This component serves as the entry point for the Finderly Camera
 * application. It sets up the navigation structure, configures
 * global app settings, and renders the appropriate screen based
 * on the current navigation state.
 * 
 * The component demonstrates proper TypeScript usage with React Navigation,
 * clean component organization, and follows React Native best practices
 * for app structure and navigation setup.
 * 
 * @returns JSX.Element - Rendered application with navigation setup
 */
export default function App() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      {/* Global status bar configuration */}
      <StatusBar style="auto" />
      
      {/* Stack navigator for screen management */}
      <Stack.Navigator>
        {/* Home screen - main landing page */}
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: "Finderly Camera",
            // Additional navigation options can be added here
            headerStyle: {
              backgroundColor: '#f8f9fa',
            },
            headerTitleStyle: {
              fontWeight: '600',
            },
          }} 
        />
        
        {/* Camera screen - full-screen camera interface */}
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen} 
          options={{ 
            headerShown: false, // Hide header for immersive camera experience
            // Prevent back gesture on iOS for better UX
            gestureEnabled: false,
          }} 
        />
        
        {/* Photo Review screen - displays captured photo with AI analysis options */}
        <Stack.Screen 
          name="PhotoReview" 
          component={PhotoReviewScreen} 
          options={{ 
            headerShown: false, // Custom header implemented in component
            // Allow back gesture for natural navigation
            gestureEnabled: true,
          }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
