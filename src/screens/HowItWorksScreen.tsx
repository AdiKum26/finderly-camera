import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

/**
 * HowItWorksScreen - Explains how the Finderly app works
 * 
 * This screen provides users with a clear understanding of the app's
 * functionality, from photo capture to AI analysis and professional connections.
 */
export const HowItWorksScreen: React.FC = () => {
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
        {/* Information icon */}
        <View style={styles.infoIconContainer}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>How Finderly works</Text>

        {/* Introduction */}
        <Text style={styles.introText}>
          Take a photo or select from your gallery! Finderly uses can help you to analyze your image and identify objects and issues.
        </Text>

        {/* Steps */}
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepText}>
              Take a clear photo or select an image from your gallery
            </Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepText}>
              Our AI analyzes the image to detect objects, text, and identify what's in the photo
            </Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepText}>
              Get detailed results showing detected objects and their classifications with confidence scores
            </Text>
          </View>
        </View>

        {/* Problem scope */}
        <Text style={styles.scopeText}>
          Finderly can identify objects, read text, and analyze any type of image. Perfect for identifying household items, appliances, tools, electronics, and more.
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
  },

  // Information icon container
  infoIconContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  // Information icon
  infoIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },

  // Information icon text
  infoIconText: {
    fontSize: 28,
    color: '#8B5CF6',
    fontWeight: 'bold',
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

  // Introduction text
  introText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    maxWidth: 320,
    alignSelf: 'center',
  },

  // Steps container
  stepsContainer: {
    marginBottom: 32,
  },

  // Individual step
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },

  // Step number circle
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#8B5CF6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    marginTop: 2,
  },

  // Step number text
  stepNumberText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },

  // Step text
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontWeight: '500',
  },

  // Problem scope text
  scopeText: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    maxWidth: 320,
    alignSelf: 'center',
  },
});

export default HowItWorksScreen;
