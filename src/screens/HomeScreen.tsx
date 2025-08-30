/**
 * HomeScreen Component
 * 
 * Main landing screen that displays welcome message, camera access button,
 * and preview of the most recently captured photo.
 * 
 * Features:
 * - Welcome interface with clear call-to-action
 * - Navigation to camera screen
 * - Photo preview display with fallback message
 * - Responsive layout with proper spacing
 * 
 * @author Aditya Kumar
 * @created 2024
 * @version 1.0.0
 */

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../../App";
import { View, Text, Image, StyleSheet, Button, SafeAreaView } from "react-native";

/**
 * HomeScreen - Main application entry point
 * 
 * This component serves as the primary interface for users to access
 * camera functionality and view captured photos. It demonstrates
 * proper TypeScript usage with navigation types and conditional rendering.
 * 
 * @returns JSX.Element - Rendered home screen component
 */
export default function HomeScreen() {
  // Navigation hook for programmatic navigation between screens
  const navigation = useNavigation<any>();
  
  // Route parameters to access photo URI passed from camera screen
  const route = useRoute<RouteProp<RootStackParamList, "Home">>();
  const photoUri = route.params?.photoUri;

  /**
   * Handles navigation to the camera screen
   * Uses the native stack navigator to push the camera view
   */
  const handleOpenCamera = () => {
    navigation.navigate("Camera");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Welcome section with clear user guidance */}
      <Text style={styles.title}>Welcome</Text>
      <Text style={styles.subtitle}>
        Tap below to open the camera and take a photo.
      </Text>
      
      {/* Primary action button to access camera functionality */}
      <Button 
        title="Open Camera" 
        onPress={handleOpenCamera}
        accessibilityLabel="Navigate to camera screen"
      />

      {/* Conditional rendering for photo preview or empty state */}
      {photoUri ? (
        <View style={styles.previewWrap}>
          <Text style={styles.previewTitle}>Last photo</Text>
          <Image 
            source={{ uri: photoUri }} 
            style={styles.preview} 
            resizeMode="cover"
            accessibilityLabel="Preview of captured photo"
          />
        </View>
      ) : (
        <Text style={styles.emptyStateText}>
          No photo yet
        </Text>
      )}
    </SafeAreaView>
  );
}

// Component-specific styles following React Native best practices
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    gap: 16, 
    alignItems: "center" 
  },
  title: { 
    fontSize: 24, 
    fontWeight: "700" 
  },
  subtitle: { 
    fontSize: 14, 
    color: "#666", 
    textAlign: "center" 
  },
  previewWrap: { 
    marginTop: 24, 
    width: "100%", 
    alignItems: "center" 
  },
  previewTitle: { 
    fontSize: 16, 
    fontWeight: "600", 
    marginBottom: 8 
  },
  preview: { 
    width: "100%", 
    height: 280, 
    borderRadius: 12 
  },
  emptyStateText: { 
    marginTop: 16, 
    color: "#666" 
  }
});
