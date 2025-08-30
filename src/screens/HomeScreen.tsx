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
import { useNavigation } from "@react-navigation/native";
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

  // State for action sheet modal
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

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
        
        // Navigate to photo review screen with the selected photo
        navigation.navigate("PhotoReview", { photoUri: selectedPhoto.uri });
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



  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Finderly branding */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.phoneButton}
          onPress={() => navigation.navigate('Contact')}
          accessibilityLabel="Contact support"
        >
          <Image 
            source={require('../../assets/phone-icon.jpeg')} 
            style={styles.phoneIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image 
          source={require('../../assets/finderly-text-icon.jpg')} 
          style={styles.headerIcon}
          resizeMode="contain"
        />
        <TouchableOpacity 
          style={styles.infoButton}
          onPress={() => navigation.navigate('HowItWorks')}
          accessibilityLabel="How Finderly works"
        >
          <Image 
            source={require('../../assets/info-button.jpeg')} 
            style={styles.infoButtonIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Scrollable content area */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome section */}
        <View style={styles.welcomeSection}>
          <View style={styles.iconContainer}>
            <Image 
              source={require('../../assets/finderly-icon.jpg')} 
              style={styles.icon}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.title}>Find it, snap it, fix it</Text>
          <Text style={styles.subtitle}>
            Finderly analyzes your photo or video, provides DIY solutions, 
            and connects you with the right professional.
          </Text>
        </View>

        {/* Identify Your Issue section */}
        <View style={styles.identifySection}>
          <TouchableOpacity 
            style={styles.identifyImageButton}
            onPress={showActionSheet}
            accessibilityLabel="Choose photo source"
          >
            <Image 
              source={require('../../assets/identify-your-issue.jpeg')} 
              style={styles.identifyImage}
              resizeMode="cover"
            />
          </TouchableOpacity>
        </View>



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
  
  // Header styling for Finderly branding
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
    minHeight: 80,
  },
  
  // Phone button styling
  phoneButton: {
    padding: 4,
    width: 60,
    alignItems: "center",
    marginTop: -20,
  },
  
  // Phone icon styling
  phoneIcon: {
    width: 60,
    height: 60,
  },
  
  // Header icon styling
  headerIcon: {
    width: 210,
    height: 70,
    flex: 1,
    textAlign: "center",
  },
  
  // Info button styling
  infoButton: {
    padding: 4,
    marginTop: -20,
  },
  
  // Info button icon styling
  infoButtonIcon: {
    width: 60,
    height: 60,
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
    marginBottom: 40,
  },
  
  // Icon container
  iconContainer: {
    marginBottom: 16,
  },
  
  // Icon styling for the finderly icon image
  icon: {
    width: 80,
    height: 80,
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
  
  // Identify Your Issue section styling
  identifySection: {
    alignItems: "center",
    marginBottom: 40,
  },
  
  // Clickable image button container
  identifyImageButton: {
    marginBottom: 24,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  
  // Identify issue image
  identifyImage: {
    width: 350,
    height: 420,
    borderRadius: 16,
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
    color: "#FF3B30", // iOS blue color
    fontWeight: "500",
  },
});
