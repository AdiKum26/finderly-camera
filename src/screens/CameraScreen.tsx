/**
 * CameraScreen Component
 * 
 * Full-screen camera interface that provides photo capture functionality
 * with advanced controls including torch, camera flip, and photo preview.
 * 
 * Features:
 * - Live camera preview using react-native-vision-camera
 * - Photo capture with flash control
 * - Front/back camera switching
 * - Torch (flashlight) toggle
 * - Photo preview with confirmation
 * - Graceful permission handling
 * - Overlay UI with reticle guide
 * 
 * @author Aditya Kumar
 * @created 2024
 * @version 1.0.0
 */

import { useRef, useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import ShutterButton from "../components/ShutterButton";
import { usePermissions } from "../hooks/usePermissions";

/**
 * CameraScreen - Advanced camera interface with photo capture
 * 
 * This component demonstrates the integration of react-native-vision-camera
 * with proper permission handling, device management, and user interface
 * design. It showcases TypeScript best practices and React Native patterns.
 * 
 * @returns JSX.Element - Rendered camera screen component
 */
export default function CameraScreen() {
  // Navigation hook for returning to previous screen
  const navigation = useNavigation<any>();
  
  // Custom hook for managing camera permissions
  const { granted, cameraStatus, request } = usePermissions();
  
  // Camera device state management
  const [facing, setFacing] = useState<"back" | "front">("back");
  const device = useCameraDevice(facing);
  
  // Camera reference for programmatic control
  const cameraRef = useRef<Camera>(null);
  
  // Local state for captured photo and torch control
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [torch, setTorch] = useState<"on" | "off">("off");

  // Computed value to determine if camera is ready for use
  const isCameraReady = useMemo(() => granted && !!device, [granted, device]);

  /**
   * Permission request screen - shown when camera access is not granted
   * Provides clear explanation and action buttons for user consent
   */
  if (cameraStatus !== "granted") {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera Permission</Text>
        <Text style={styles.msg}>
          We need access to your camera to take photos.
        </Text>
        
        {/* Primary action to request camera permissions */}
        <TouchableOpacity onPress={request} style={styles.btn}>
          <Text style={styles.btnText}>Grant Permission</Text>
        </TouchableOpacity>
        
        {/* Secondary action to return to previous screen */}
        <TouchableOpacity 
          onPress={() => navigation.goBack()} 
          style={[styles.btn, { backgroundColor: "#eee" }]}
        >
          <Text style={[styles.btnText, { color: "#333" }]}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /**
   * Device unavailable screen - shown when no camera device is detected
   * This typically occurs on simulators or devices without camera hardware
   */
  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>No camera device available.</Text>
      </View>
    );
  }

  /**
   * Handles photo capture using the active camera device
   * Configures flash based on torch state and handles platform-specific URI formatting
   */
  const handleTakePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({ 
        flash: torch === "on" ? "on" : "off" 
      });
      
      if (!photo) return;
      
      // Platform-specific URI formatting for cross-platform compatibility
      const uri = Platform.OS === "android" ? "file://" + photo.path : photo.path;
      setPhotoUri(uri);
    } catch (error) {
      console.warn("Failed to take photo", error);
    }
  };

  /**
   * Handles photo confirmation and navigation back to home screen
   * Passes the captured photo URI as navigation parameter
   */
  const handleUsePhoto = () => {
    if (photoUri) {
      navigation.navigate("Home", { photoUri });
    }
  };

  return (
    <View style={styles.container}>
      {/* Main camera view using react-native-vision-camera */}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        torch={torch}
      />

      {/* Overlay UI for camera controls and guidance */}
      <View style={[StyleSheet.absoluteFill, styles.overlay]}>
        {/* Top control bar with navigation and camera options */}
        <View style={styles.topBar}>
          {/* Back button to return to home screen */}
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.pill}
            accessibilityLabel="Return to home screen"
          >
            <Text style={styles.pillText}>Back</Text>
          </TouchableOpacity>

          {/* Torch toggle button for flash control */}
          <TouchableOpacity 
            onPress={() => setTorch(current => current === "on" ? "off" : "on")} 
            style={styles.pill}
            accessibilityLabel="Toggle torch/flashlight"
          >
            <Text style={styles.pillText}>
              {torch === "on" ? "Torch On" : "Torch Off"}
            </Text>
          </TouchableOpacity>

          {/* Camera flip button for front/back switching */}
          <TouchableOpacity 
            onPress={() => setFacing(current => current === "back" ? "front" : "back")} 
            style={styles.pill}
            accessibilityLabel="Switch between front and back camera"
          >
            <Text style={styles.pillText}>Flip</Text>
          </TouchableOpacity>
        </View>

        {/* Visual guide overlay for photo composition */}
        <View pointerEvents="none" style={styles.reticle} />

        {/* Bottom control area with shutter button */}
        <View style={styles.bottomBar}>
          <ShutterButton onPress={handleTakePhoto} />
        </View>

        {/* Photo preview and confirmation interface */}
        {photoUri && (
          <View style={styles.previewDock}>
            <Image 
              source={{ uri: photoUri }} 
              style={styles.preview} 
              accessibilityLabel="Preview of captured photo"
            />
            <TouchableOpacity 
              onPress={handleUsePhoto} 
              style={[styles.pill, styles.useBtn]}
              accessibilityLabel="Confirm and use captured photo"
            >
              <Text style={styles.pillText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

// Comprehensive styling for camera interface and overlay elements
const styles = StyleSheet.create({
  // Main container with black background for camera view
  container: { 
    flex: 1, 
    backgroundColor: "black" 
  },
  
  // Overlay container for UI elements
  overlay: { 
    justifyContent: "space-between" 
  },
  
  // Top control bar with camera options
  topBar: { 
    marginTop: 50, 
    paddingHorizontal: 16, 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },
  
  // Bottom area containing shutter button
  bottomBar: { 
    marginBottom: 36, 
    alignItems: "center" 
  },
  
  // Pill-shaped button styling for controls
  pill: { 
    backgroundColor: "rgba(0,0,0,0.5)", 
    paddingHorizontal: 12, 
    paddingVertical: 8, 
    borderRadius: 999 
  },
  
  // Text styling for pill buttons
  pillText: { 
    color: "white", 
    fontWeight: "600" 
  },
  
  // Visual guide overlay for photo composition
  reticle: {
    alignSelf: "center",
    width: "70%",
    height: "35%",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
  },
  
  // Photo preview dock with confirmation button
  previewDock: {
    position: "absolute",
    bottom: 110,
    right: 16,
    alignItems: "center",
    gap: 8,
  },
  
  // Photo preview thumbnail
  preview: { 
    width: 96, 
    height: 96, 
    borderRadius: 8, 
    borderWidth: 2, 
    borderColor: "#fff" 
  },
  
  // Use photo button styling
  useBtn: { 
    alignSelf: "center" 
  },
  
  // Centered layout for permission and error screens
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    padding: 24, 
    gap: 12 
  },
  
  // Title styling for permission screens
  title: { 
    fontSize: 20, 
    fontWeight: "700" 
  },
  
  // Message text styling
  msg: { 
    color: "#555", 
    textAlign: "center", 
    marginBottom: 8 
  },
  
  // Button styling for permission actions
  btn: { 
    backgroundColor: "#111827", 
    paddingHorizontal: 14, 
    paddingVertical: 10, 
    borderRadius: 10 
  },
  
  // Button text styling
  btnText: { 
    color: "white", 
    fontWeight: "600" 
  }
});
