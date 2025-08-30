/**
 * Created by Aditya Kumar on 30/08/2025
 * Documented clearly for understanding purposes
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ObjectRecognition from '../components/ObjectRecognition';

/**
 * PhotoReviewScreen - Displays the captured photo with AI analysis options
 * 
 * This screen shows the user's captured photo in an attractive frame with
 * options to analyze it using AI. It serves as an intermediate step between
 * photo capture and AI analysis results.
 */
interface PhotoReviewScreenProps {
  route: {
    params: {
      photoUri: string;
    };
  };
}

export const PhotoReviewScreen: React.FC<PhotoReviewScreenProps> = ({ route }) => {
  const { photoUri } = route.params;
  const navigation = useNavigation<any>();
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // Animation for loading spinner
  const spinValue = useRef(new Animated.Value(0)).current;

  // Start pulsing animation when loading begins
  useEffect(() => {
    if (showAIAnalysis && !imageBase64) {
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
  }, [showAIAnalysis, imageBase64, spinValue]);

  /**
   * Handles the AI analysis button press
   * Converts the photo to Base64 and performs AI analysis
   */
  const handleAIAnalysis = async () => {
    if (isAnalyzing) return; // Prevent multiple simultaneous requests
    
    try {
      setIsAnalyzing(true);
      
      // Convert image to Base64 for API processing
      const response = await fetch(photoUri);
      const blob = await response.blob();
      const reader = new FileReader();
      
      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1]; // Remove data:image/...;base64, prefix
        setImageBase64(base64Data);
        setShowAIAnalysis(true);
        setIsAnalyzing(false);
      };
      
      reader.readAsDataURL(blob);
    } catch (error) {
      console.error('Error converting image to Base64:', error);
      setIsAnalyzing(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Photo Review</Text>
      </View>
      
      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Start Over Button */}
        <View style={styles.startOverContainer}>
          <TouchableOpacity 
            style={styles.startOverButton}
            onPress={() => navigation.navigate('Home')}
            accessibilityLabel="Start over and return to home"
          >
            <Text style={styles.startOverButtonText}>Start over</Text>
          </TouchableOpacity>
        </View>

        {/* Photo Display Section */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image 
              source={{ uri: photoUri }} 
              style={styles.photo}
              resizeMode="cover"
            />
          </View>
          
                  {/* AI Insights Button */}
        <TouchableOpacity 
          style={[
            styles.aiInsightsButton,
            isAnalyzing && styles.aiInsightsButtonDisabled
          ]}
          onPress={handleAIAnalysis}
          accessibilityLabel="Analyze photo with AI"
          disabled={isAnalyzing}
        >
          <Text style={styles.aiInsightsButtonText}>
            {isAnalyzing ? 'Analyzing...' : 'AI Insights'}
          </Text>
        </TouchableOpacity>
          
          {/* Instructional Text */}
          <Text style={styles.instructionText}>
            Click to recognize and classify objects in your photo
          </Text>
        </View>

              {/* AI Analysis Results */}
      {showAIAnalysis && (
        <View style={styles.aiResultsContainer}>
          <View style={styles.aiResultsHeader}>
            <Text style={styles.aiResultsTitle}>AI Analysis Results</Text>
            <TouchableOpacity 
              style={styles.hideResultsButton}
              onPress={() => setShowAIAnalysis(false)}
            >
              <Text style={styles.hideResultsButtonText}>Hide Results</Text>
            </TouchableOpacity>
          </View>
          
          {!imageBase64 ? (
            // Loading state while converting image and starting analysis
            <View style={styles.loadingContainer}>
              <View style={styles.loadingDots}>
                <Animated.View style={[styles.dot, { opacity: spinValue }]} />
                <Animated.View style={[styles.dot, { opacity: spinValue.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }]} />
                <Animated.View style={[styles.dot, { opacity: spinValue.interpolate({ inputRange: [0, 1], outputRange: [0.1, 1] }) }]} />
              </View>
              <Text style={styles.loadingText}>Preparing image for analysis...</Text>
            </View>
          ) : (
            // Show ObjectRecognition component when analysis is ready
            <ObjectRecognition 
              imageBase64={imageBase64}
              photoUri={photoUri}
            />
          )}
        </View>
      )}
        
        {/* Bottom spacing for better scrolling */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  // Main container styling
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  
  // Header section styling
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  
  // Header title styling
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
  },
  
  // Start over button container
  startOverContainer: {
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10,
  },
  
  // Start over button styling
  startOverButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    minWidth: 200,
  },
  
  // Start over button text styling
  startOverButtonText: {
    color: '#8B5CF6',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Photo section styling
  photoSection: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  
  // Photo container with purple border
  photoContainer: {
    width: 320,
    height: 400,
    borderRadius: 20,
    padding: 8,
    backgroundColor: '#8B5CF6',
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 32,
  },
  
  // Photo styling
  photo: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
  },
  
  // AI Insights button styling
  aiInsightsButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    shadowColor: '#8B5CF6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    marginBottom: 16,
  },
  
  // Disabled state for AI Insights button
  aiInsightsButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0.1,
  },
  
  // AI Insights button text styling
  aiInsightsButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  
  // Instructional text styling
  instructionText: {
    fontSize: 16,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  

  
  // AI Results container styling
  aiResultsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: '#f8f9fa',
    marginTop: 24,
    borderRadius: 20,
    marginHorizontal: 20,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  
  // AI Results header styling
  aiResultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  
  // AI Results title styling
  aiResultsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#212529',
    flex: 1,
    textAlign: 'center',
  },
  
  // Hide results button styling
  hideResultsButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  
  // Hide results button text styling
  hideResultsButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  
  // ScrollView styling
  scrollView: {
    flex: 1,
  },
  
  // ScrollView content styling
  scrollContent: {
    paddingBottom: 20,
  },
  
  // Bottom spacing for better scrolling
  bottomSpacing: {
    height: 40,
  },
  
  // Loading container styling
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
    minHeight: 200,
  },
  
  // Loading dots container styling
  loadingDots: {
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
  
  // Loading text styling
  loadingText: {
    fontSize: 18,
    color: '#6c757d',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
    maxWidth: 250,
  },
});
