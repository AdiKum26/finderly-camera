/**
 * Created by Aditya Kumar on 30/08/2025
 * Documented clearly for understanding purposes
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
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

  // Early return for cases where no image data is available
  // This prevents unnecessary rendering and provides clear user guidance
  if (!imageBase64) {
    return (
      <View style={styles.container}>
        <Text style={styles.placeholder}>Take a photo to analyze</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Photo Display Section */}
      {/* 
        Show the captured photo above the analyze button to provide
        visual context for what the user is about to analyze
      */}
      {photoUri && (
        <View style={styles.photoContainer}>
          <Image 
            source={{ uri: photoUri }} 
            style={styles.photo} 
            resizeMode="contain" 
          />
        </View>
      )}

      {/* Analysis Trigger Button */}
      {/* 
        The primary action button that initiates the AI analysis.
        Disabled state prevents multiple simultaneous requests and
        provides visual feedback during processing.
      */}
      <TouchableOpacity
        style={[styles.analyzeButton, isAnalyzing && styles.analyzingButton]}
        onPress={analyzeImage}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          // Show loading indicator during analysis
          <ActivityIndicator color="#fff" />
        ) : (
          // Show action text when ready for user interaction
          <Text style={styles.analyzeButtonText}>
            🔍 Analyze Image
          </Text>
        )}
      </TouchableOpacity>

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
      {results && (
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
  
  // Placeholder text styling for empty states
  placeholder: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
  
  // Photo display container for visual context
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  // Photo styling with professional appearance
  photo: {
    width: 200,
    height: 200,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  
  // Primary action button with brand-consistent purple theme
  analyzeButton: {
    backgroundColor: '#8B5CF6', // Purple that matches app design system
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 16, // Consistent spacing above button
  },
  
  // Disabled state styling for button during processing
  analyzingButton: {
    backgroundColor: '#999',
  },
  
  // Button text styling for clear readability
  analyzeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
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
    marginTop: 24, // Consistent spacing from button
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
});

export default ObjectRecognition;
