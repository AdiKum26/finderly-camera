/**
 * Created by Aditya Kumar on 30/08/2025
 * Documented clearly for understanding purposes
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
} from 'react-native';
import visionService from '../services/visionService';

/**
 * Props interface for the ObjectRecognition component
 * This component handles AI-powered image analysis and displays results
 */
interface ObjectRecognitionProps {
  /** Base64 encoded image data for AI processing */
  imageBase64: string;
  /** URI of the photo to display above the analyze button */
  photoUri?: string;
  /** Callback function triggered when analysis completes */
  onAnalysisComplete?: (results: any) => void;
}

/**
 * ObjectRecognition Component
 * 
 * This component provides an interface for users to analyze images using
 * computer vision AI services. It displays the photo, provides an analyze
 * button, and shows detection results including objects and labels.
 * 
 * The component handles three main states:
 * - Initial state: Shows placeholder when no image is available
 * - Analysis state: Shows loading indicator during processing
 * - Results state: Displays detected objects or fallback labels
 */
const ObjectRecognition: React.FC<ObjectRecognitionProps> = ({
  imageBase64,
  photoUri,
  onAnalysisComplete,
}) => {
  // State management for component behavior
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // Animation for loading spinner
  const spinValue = useRef(new Animated.Value(0)).current;

  // Start pulsing animation when analyzing begins
  useEffect(() => {
    if (isAnalyzing) {
      const pulseAnimation = Animated.loop(
        Animated.sequence([
          Animated.timing(spinValue, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(spinValue, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          })
        ])
      );
      pulseAnimation.start();
      
      return () => pulseAnimation.stop();
    }
  }, [isAnalyzing, spinValue]);

  // Auto-analyze when imageBase64 is provided
  React.useEffect(() => {
    if (imageBase64 && !results && !isAnalyzing) {
      analyzeImage();
    }
  }, [imageBase64]);

  /**
   * Initiates the image analysis process
   * 
   * This function coordinates with the vision service to process the
   * provided image and extract meaningful information. It manages
   * loading states and error handling throughout the process.
   */
  const analyzeImage = async () => {
    // Guard clause: ensure we have image data before proceeding
    if (!imageBase64) return;

    // Set loading state and clear any previous errors
    setIsAnalyzing(true);
    setError(null);

    try {
      // Delegate the actual analysis to our vision service
      const analysis = await visionService.analyzeImage(imageBase64);
      
      // Store results and notify parent component if callback provided
      setResults(analysis);
      onAnalysisComplete?.(analysis);
    } catch (err) {
      // Provide user-friendly error message and log technical details
      setError('Failed to analyze image. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      // Always ensure loading state is reset, regardless of outcome
      setIsAnalyzing(false);
    }
  };



  return (
    <View style={styles.container}>
      
      {/* Loading State */}
      {isAnalyzing && (
        <View style={styles.analyzingContainer}>
          <View style={styles.analyzingDots}>
            <Animated.View style={[styles.dot, { opacity: spinValue }]} />
            <Animated.View style={[styles.dot, { opacity: spinValue.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }]} />
            <Animated.View style={[styles.dot, { opacity: spinValue.interpolate({ inputRange: [0, 1], outputRange: [0.1, 1] }) }]} />
          </View>
          <Text style={styles.analyzingText}>Analyzing image with AI...</Text>
        </View>
      )}

      {/* Error Display */}
      {/* 
        Show user-friendly error messages when analysis fails.
        Uses consistent styling with the rest of the component.
      */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      {/* Results Display Section */}
      {/* 
        Conditional rendering of analysis results. The component
        intelligently handles different result scenarios to provide
        the most useful information to the user.
      */}
      {results && !isAnalyzing && (
        <ScrollView style={styles.resultsContainer}>
          <Text style={styles.sectionTitle}>Detected Objects</Text>
          
          {/* Results Logic: Objects vs Labels */}
          {/* 
            Smart fallback system: if objects are detected, show them;
            otherwise, provide alternative information using labels
            to ensure users always get valuable insights.
          */}
          {results.objects && results.objects.length > 0 ? (
            // Primary case: objects were successfully detected
            <View style={styles.section}>
              {results.objects.map((object: string, index: number) => (
                <Text key={index} style={styles.objectText}>
                  • {object}
                </Text>
              ))}
            </View>
          ) : (
            // Fallback case: no objects detected, show labels instead
            <View style={styles.noObjectsContainer}>
              <Text style={styles.noObjectsText}>Could not recognize object</Text>
              
              {/* Labels Section - Alternative Information */}
              {/* 
                When object detection fails, labels often provide
                useful context about what the AI can identify in
                the image, even if precise object boundaries aren't clear.
              */}
              {results.labels && results.labels.length > 0 && (
                <View style={styles.labelsSection}>
                  <Text style={styles.labelsTitle}>Object Labels:</Text>
                  {results.labels.map((label: string, index: number) => (
                    <Text key={index} style={styles.labelText}>
                      • {label}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};

/**
 * Component Styles
 * 
 * These styles create a clean, professional interface that
 * prioritizes readability and user experience. The color scheme
 * and spacing are designed to work well across different
 * device sizes and orientations.
 */
const styles = StyleSheet.create({
  // Main container with proper spacing and layout
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32, // Generous top spacing for header breathing room
  },
  

  // Error state container with appropriate visual treatment
  errorContainer: {
    backgroundColor: '#FFEBEE',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  
  // Error text styling for clear communication
  errorText: {
    color: '#C62828',
    textAlign: 'center',
  },
  
  // Results container for scrollable content
  resultsContainer: {
    flex: 1,
  },
  
  // Section title with prominent styling
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 0, // No button above anymore
    textAlign: 'center',
    color: '#333',
  },
  
  // Standard section container for results
  section: {
    marginBottom: 24,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  
  // Container for cases where no objects are detected
  noObjectsContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  // Text styling for no-objects message
  noObjectsText: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  
  // Labels section container for fallback information
  labelsSection: {
    width: '100%',
  },
  
  // Labels title styling for clear hierarchy
  labelsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  
  // Individual label text styling
  labelText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  
  // Object text styling for detected items
  objectText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  
  // Analyzing container styling
  analyzingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    minHeight: 200,
  },
  
  // Analyzing dots container styling
  analyzingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    gap: 12,
  },
  
  // Individual dot styling
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  
  // Analyzing text styling
  analyzingText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
    maxWidth: 250,
  },
});

export default ObjectRecognition;
