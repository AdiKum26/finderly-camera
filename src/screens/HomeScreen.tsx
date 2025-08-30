/**
 * Created by Aditya Kumar on 30/08/2025
 * Documented clearly for understanding purposes
 */

/**
 * HomeScreen Component
 * 
 * Main landing screen that displays welcome message, camera access button,
 * and preview of the most recently captured photo. Features a clean,
 * simple design inspired by the original Finderly app aesthetic.
 * 
 * Features:
 * - Clean, minimal interface design
 * - Professional purple color scheme
 * - Simple card-based layout
 * - Restored photo preview functionality
 * - Clear call-to-action for camera access
 * - Scrollable content for full photo preview
 * - Action sheet for photo source selection
 * - Photo gallery access for existing photos
 */

import React, { useState } from "react";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../../App";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  SafeAreaView, 
  ScrollView, 
  Modal,
  Alert
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import ObjectRecognition from '../components/ObjectRecognition';

/**
 * HomeScreen - Main application entry point with clean design
 * 
 * This component serves as the primary interface for users to access
 * camera functionality and view captured photos. It features a clean,
 * minimal design that prioritizes usability and visual clarity.
 * 
 * @returns JSX.Element - Rendered home screen component
 */
export default function HomeScreen() {
  // Navigation hook for programmatic navigation between screens
  const navigation = useNavigation<any>();
  
  // Route parameters to access photo URI passed from camera screen
  const route = useRoute<RouteProp<RootStackParamList, "Home">>();
  const photoUri = route.params?.photoUri;

  // State for action sheet modal
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);
  
  // State for AI Analysis
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  /**
   * Shows the action sheet with photo source options
   */
  const showActionSheet = () => {
    setIsActionSheetVisible(true);
  };

  /**
   * Hides the action sheet
   */
  const hideActionSheet = () => {
    setIsActionSheetVisible(false);
  };

  /**
   * Handles navigation to the camera screen
   * Uses the native stack navigator to push the camera view
   */
  const handleOpenCamera = () => {
    hideActionSheet();
    navigation.navigate("Camera");
  };

  /**
   * Handles selection from photo gallery
   * Opens the device's photo library for photo selection
   */
  const handlePhotoGallery = async () => {
    hideActionSheet();
    
    try {
      // Request permission to access photo library
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          "Permission Required",
          "Sorry, we need camera roll permissions to access your photo gallery.",
          [{ text: "OK", style: "default" }]
        );
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedPhoto = result.assets[0];
        
        // Navigate to home with the selected photo
        navigation.navigate("Home", { photoUri: selectedPhoto.uri });
      }
    } catch (error) {
      console.error("Error accessing photo gallery:", error);
      Alert.alert(
        "Error",
        "Failed to access photo gallery. Please try again.",
        [{ text: "OK", style: "default" }]
      );
    }
  };

  /**
   * Handles cancel action
   */
  const handleCancel = () => {
    hideActionSheet();
  };

  /**
   * Initiates the AI analysis process for the captured photo
   * 
   * This function converts the photo to Base64 format and prepares
   * it for AI analysis. The conversion process ensures compatibility
   * with the vision service API while maintaining image quality.
   */
  const handleAIAnalysis = async () => {
    if (!photoUri) return;

    try {
      // Convert photo to Base64 for AI processing
      const response = await fetch(photoUri);
      const blob = await response.blob();
      
      // Create a FileReader to convert blob to Base64
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setImageBase64(base64);
        setShowAIAnalysis(true);
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      Alert.alert('Error', 'Failed to prepare image for analysis');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Scrollable content area */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome section */}
        <View style={styles.welcomeSection}>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>🏠</Text>
          </View>
          <Text style={styles.title}>Find it, snap it, fix it</Text>
          <Text style={styles.subtitle}>
            Finderly analyzes your photo or video, provides DIY solutions, 
            and connects you with the right professional.
          </Text>
        </View>

        {/* Camera action section */}
        <View style={styles.cameraSection}>
          <View style={styles.cameraPreview}>
            <View style={styles.cameraPlaceholder}>
              <Text style={styles.cameraIcon}>📱</Text>
              <Text style={styles.cameraText}>Camera Ready</Text>
            </View>
            <TouchableOpacity 
              style={styles.cameraButton}
              onPress={showActionSheet}
              accessibilityLabel="Choose photo source"
            >
              <Text style={styles.cameraButtonIcon}>🔍</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.sectionTitle}>Identify Your Issue</Text>
          <Text style={styles.sectionDescription}>
            Snap a photo or record video of your repair issue and Finderly will spot the problem.
          </Text>
        </View>

        {/* Photo preview section (when available) */}
        {photoUri && (
          <View style={styles.photoSection}>
            <View style={styles.photoContainer}>
              <Image 
                source={{ uri: photoUri }} 
                style={styles.photoPreview} 
                resizeMode="cover"
                accessibilityLabel="Preview of captured photo"
              />
              <View style={styles.photoOverlay}>
                <Text style={styles.photoOverlayText}>Photo Selected</Text>
              </View>
            </View>
            <Text style={styles.sectionTitle}>Issue Identified</Text>
            <Text style={styles.sectionDescription}>
              Your photo has been selected. Review and analyze the issue for solutions.
            </Text>
            
            {/* AI Analysis Button */}
            <TouchableOpacity
              style={styles.aiAnalysisButton}
              onPress={handleAIAnalysis}
            >
              <Text style={styles.aiAnalysisButtonText}>AI Analysis</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Bottom spacing to ensure photo preview is fully visible */}
        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action Sheet Modal */}
      <Modal
        visible={isActionSheetVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={hideActionSheet}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={handleCancel}
        >
          <View style={styles.actionSheetContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handlePhotoGallery}
            >
              <Text style={styles.actionButtonText}>Photo Gallery</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={handleOpenCamera}
            >
              <Text style={styles.actionButtonText}>Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* AI Analysis Modal */}
      <Modal
        visible={showAIAnalysis}
        animationType="slide"
        presentationStyle="fullScreen"
      >
        <View style={styles.aiModalOverlay}>
          <View style={styles.aiModalContainer}>
            
            {/* Modal Header */}
            <View style={styles.aiModalHeader}>
              <View style={styles.aiModalTitleContainer}>
                <Text style={styles.aiModalTitle}>AI Object Recognition</Text>
              </View>
              <TouchableOpacity 
                onPress={() => setShowAIAnalysis(false)}
                style={styles.aiModalCloseButton}
              >
                <Text style={styles.aiModalCloseButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* AI Analysis Content */}
            {imageBase64 && (
              <ObjectRecognition 
                imageBase64={imageBase64}
                photoUri={photoUri || undefined}
                onAnalysisComplete={(results) => {
                  console.log('Analysis complete:', results);
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

// Clean, simple styling matching the reference design
const styles = StyleSheet.create({
  // Main container with white background
  container: { 
    flex: 1, 
    backgroundColor: "#ffffff" 
  },
  
  // ScrollView styling
  scrollView: {
    flex: 1,
  },
  
  // ScrollView content container
  scrollContent: {
    padding: 24,
    paddingBottom: 40, // Extra bottom padding for scroll
  },
  
  // Welcome section styling
  welcomeSection: {
    alignItems: "center",
    paddingTop: 20,
    marginBottom: 40,
  },
  
  // Icon container
  iconContainer: {
    marginBottom: 16,
  },
  
  // Large icon styling
  icon: {
    fontSize: 64,
  },
  
  // Main title styling
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#495057",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
  },
  
  // Subtitle styling
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
  
  // Camera section styling
  cameraSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  
  // Camera preview container
  cameraPreview: {
    position: "relative",
    alignItems: "center",
    marginBottom: 24,
  },
  
  // Camera placeholder styling
  cameraPlaceholder: {
    width: 280,
    height: 160,
    backgroundColor: "#f8f9fa",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#dee2e6",
    borderStyle: "dashed",
  },
  
  // Camera icon in placeholder
  cameraIcon: {
    fontSize: 48,
    color: "#6c757d",
    marginBottom: 8,
  },
  
  // Camera text in placeholder
  cameraText: {
    fontSize: 14,
    color: "#6c757d",
    fontWeight: "500",
  },
  
  // Camera action button
  cameraButton: {
    position: "absolute",
    bottom: -30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6f42c1",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6f42c1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  
  // Camera button icon
  cameraButtonIcon: {
    fontSize: 24,
    color: "#ffffff",
  },
  
  // Section title styling
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#495057",
    textAlign: "center",
    marginBottom: 12,
  },
  
  // Section description styling
  sectionDescription: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
  
  // Photo section styling
  photoSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  
  // Photo container
  photoContainer: {
    position: "relative",
    marginBottom: 24,
  },
  
  // Photo preview styling
  photoPreview: {
    width: 280,
    height: 200,
    borderRadius: 16,
  },
  
  // Photo overlay styling
  photoOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(111, 66, 193, 0.9)",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  
  // Photo overlay text
  photoOverlayText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  
  // Bottom spacing to ensure content is fully scrollable
  bottomSpacing: {
    height: 20,
  },

  // Modal overlay styling
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  // Action sheet container styling
  actionSheetContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40, // Safe area padding
  },

  // Action button styling
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },

  // Action button text styling
  actionButtonText: {
    fontSize: 18,
    color: "#007AFF", // iOS blue color
    fontWeight: "500",
  },

  // Cancel button styling
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 8,
  },

  // Cancel button text styling
  cancelButtonText: {
    fontSize: 18,
    color: "#FF3B30", // iOS red color
    fontWeight: "500",
  },

  // AI Analysis button styling
  aiAnalysisButton: {
    backgroundColor: "#8B5CF6", // Purple theme consistent with app design
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 24,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  
  // AI Analysis button text styling
  aiAnalysisButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  
  // AI Modal overlay styling for full-screen modal
  aiModalOverlay: {
    flex: 1,
    backgroundColor: "#000000",
  },
  
  // AI Modal container styling
  aiModalContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  
  // AI Modal header styling with proper spacing and layout
  aiModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    paddingTop: 80, // Generous top padding to center the header
    paddingBottom: 24, // Bottom padding for better separation
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    backgroundColor: "#f8f9fa",
    minHeight: 120, // Ensure consistent header height
  },
  
  // AI Modal title container for proper centering
  aiModalTitleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // AI Modal title styling with prominent appearance
  aiModalTitle: {
    fontSize: 20, // Slightly larger for better visibility
    fontWeight: "700", // Bolder for better prominence
    color: "#333333",
    textAlign: "center", // Ensure center alignment
  },

  // AI Modal close button styling
  aiModalCloseButton: {
    padding: 12,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
    alignSelf: "flex-start", // Align to top of header
    marginLeft: 8, // Add left margin for spacing
  },
  
  // AI Modal close button text styling
  aiModalCloseButtonText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "600",
  },
});
