import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * ContactScreen - Contact and support information
 * 
 * This screen provides users with contact information and support details
 * for reaching out to the Finderly team.
 */
export const ContactScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  /**
   * Handles navigation back to the home screen
   */
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back button */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          accessibilityLabel="Go back"
        >
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* House icon */}
        <View style={styles.iconContainer}>
          <Image 
            source={require('../../assets/finderly-icon.jpg')} 
            style={styles.houseIcon}
            resizeMode="contain"
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>Contact Us</Text>

        {/* Description */}
        <Text style={styles.description}>
          If you are encountering issues and want to reach out to us, our email is:
        </Text>

        {/* Email */}
        <View style={styles.emailContainer}>
          <Text style={styles.email}>support@finderly.us</Text>
        </View>

        {/* Additional info */}
        <Text style={styles.additionalInfo}>
          We're here to help! Feel free to reach out with any questions, feedback, or technical issues you may have.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

/**
 * Component Styles
 * 
 * Clean, modern styling that matches the app's design system
 * with proper spacing, typography, and color scheme.
 */
const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  // Header with back button
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },

  // Back button
  backButton: {
    padding: 8,
  },

  // Back button text (chevron)
  backButtonText: {
    fontSize: 32,
    color: '#8B5CF6',
    fontWeight: '600',
  },

  // Scroll view
  scrollView: {
    flex: 1,
  },

  // Scroll content
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },

  // Icon container
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },

  // House icon
  houseIcon: {
    width: 80,
    height: 80,
  },

  // Main title
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 40,
  },

  // Description text
  description: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
    maxWidth: 320,
  },

  // Email container
  emailContainer: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },

  // Email text
  email: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B5CF6',
    textAlign: 'center',
  },

  // Additional info
  additionalInfo: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
});

export default ContactScreen;
