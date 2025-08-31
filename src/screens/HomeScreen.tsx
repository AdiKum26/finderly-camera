/**
 * Created by Aditya Kumar on 08/30/2025
 * HomeScreen - Main entry screen for Finderly
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

export default function HomeScreen() {
  const navigation = useNavigation<any>();
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  const showActionSheet = () => setIsActionSheetVisible(true);
  const hideActionSheet = () => setIsActionSheetVisible(false);

  // Navigate to camera view
  const handleOpenCamera = () => {
    hideActionSheet();
    navigation.navigate("Camera");
  };

  // Select image from gallery and navigate to photo review
  const handlePhotoGallery = async () => {
    hideActionSheet();
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Required", "Enable photo access to use your gallery.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const selectedPhoto = result.assets[0];
        navigation.navigate("PhotoReview", { photoUri: selectedPhoto.uri });
      }
    } catch (error) {
      console.error("Gallery access error:", error);
      Alert.alert("Error", "Could not open photo gallery.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with contact and help buttons */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Contact')} style={styles.phoneButton}>
          <Image source={require('../../assets/phone-icon.jpeg')} style={styles.phoneIcon} resizeMode="contain" />
        </TouchableOpacity>

        <Image source={require('../../assets/finderly-text-icon.jpg')} style={styles.headerIcon} resizeMode="contain" />

        <TouchableOpacity onPress={() => navigation.navigate('HowItWorks')} style={styles.infoButton}>
          <Image source={require('../../assets/info-button.jpeg')} style={styles.infoButtonIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Main content scroll area */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.welcomeSection}>
          <View style={styles.iconContainer}>
            <Image source={require('../../assets/finderly-icon.jpg')} style={styles.icon} resizeMode="contain" />
          </View>
          <Text style={styles.title}>Find it, snap it, fix it</Text>
          <Text style={styles.subtitle}>
            Snap or upload an image — Finderly will analyze and guide you.
          </Text>
        </View>

        {/* Main call-to-action */}
        <View style={styles.identifySection}>
          <TouchableOpacity onPress={showActionSheet} style={styles.identifyImageButton}>
            <Image source={require('../../assets/identify-your-issue.jpeg')} style={styles.identifyImage} resizeMode="cover" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>

      {/* Action sheet for selecting photo source */}
      <Modal
        visible={isActionSheetVisible}
        transparent
        animationType="slide"
        onRequestClose={hideActionSheet}
      >
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={hideActionSheet}>
          <View style={styles.actionSheetContainer}>
            <TouchableOpacity onPress={handlePhotoGallery} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Photo Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleOpenCamera} style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Camera</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hideActionSheet} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

// Screen styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  phoneButton: { width: 60, alignItems: "center", marginTop: -20 },
  phoneIcon: { width: 60, height: 60 },
  headerIcon: { width: 210, height: 70, flex: 1, textAlign: "center" },
  infoButton: { padding: 4, marginTop: -20 },
  infoButtonIcon: { width: 60, height: 60 },
  scrollView: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 40 },
  welcomeSection: { alignItems: "center", marginBottom: 40 },
  iconContainer: { marginBottom: 16 },
  icon: { width: 80, height: 80 },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#495057",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    color: "#6c757d",
    textAlign: "center",
    lineHeight: 24,
    maxWidth: 300,
  },
  identifySection: { alignItems: "center", marginBottom: 40 },
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
  identifyImage: { width: 350, height: 420, borderRadius: 16 },
  bottomSpacing: { height: 20 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  actionSheetContainer: {
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 40,
  },
  actionButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    alignItems: "center",
  },
  actionButtonText: { fontSize: 18, color: "#007AFF", fontWeight: "500" },
  cancelButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    marginTop: 8,
  },
  cancelButtonText: { fontSize: 18, color: "#FF3B30", fontWeight: "500" },
});