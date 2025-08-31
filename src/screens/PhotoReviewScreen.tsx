/**
 * Created by Aditya Kumar on 08/30/2025
 * PhotoReviewScreen - Review captured image and run AI analysis
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
  const spinValue = useRef(new Animated.Value(0)).current;

  // Start animation while loading
  useEffect(() => {
    if (showAIAnalysis && !imageBase64) {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(spinValue, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(spinValue, { toValue: 0, duration: 800, useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [showAIAnalysis, imageBase64]);

  // Convert photo to Base64 and trigger analysis
  const handleAIAnalysis = async () => {
    if (isAnalyzing) return;

    try {
      setIsAnalyzing(true);
      const response = await fetch(photoUri);
      const blob = await response.blob();
      const reader = new FileReader();

      reader.onload = () => {
        const base64 = reader.result as string;
        const base64Data = base64.split(',')[1];
        setImageBase64(base64Data);
        setShowAIAnalysis(true);
        setIsAnalyzing(false);
      };

      reader.readAsDataURL(blob);
    } catch (err) {
      console.error('Base64 conversion error:', err);
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

      {/* Scrollable body */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.startOverContainer}>
          <TouchableOpacity
            style={styles.startOverButton}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: 'Home' }] })}
          >
            <Text style={styles.startOverButtonText}>Start over</Text>
          </TouchableOpacity>
        </View>

        {/* Photo frame */}
        <View style={styles.photoSection}>
          <View style={styles.photoContainer}>
            <Image source={{ uri: photoUri }} style={styles.photo} resizeMode="cover" />
          </View>

          {/* Analyze button */}
          <TouchableOpacity
            style={[styles.aiInsightsButton, isAnalyzing && styles.aiInsightsButtonDisabled]}
            onPress={handleAIAnalysis}
            disabled={isAnalyzing}
          >
            <Text style={styles.aiInsightsButtonText}>
              {isAnalyzing ? 'Analyzing...' : 'AI Insights'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.instructionText}>Tap to analyze objects in your photo</Text>
        </View>

        {/* AI results */}
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
              <View style={styles.loadingContainer}>
                <View style={styles.loadingDots}>
                  <Animated.View style={[styles.dot, { opacity: spinValue }]} />
                  <Animated.View style={[styles.dot, { opacity: spinValue.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }) }]} />
                  <Animated.View style={[styles.dot, { opacity: spinValue.interpolate({ inputRange: [0, 1], outputRange: [0.1, 1] }) }]} />
                </View>
                <Text style={styles.loadingText}>Preparing image...</Text>
              </View>
            ) : (
              <ObjectRecognition imageBase64={imageBase64} photoUri={photoUri} />
            )}
          </View>
        )}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: { fontSize: 20, fontWeight: '700', color: '#212529' },
  startOverContainer: { alignItems: 'center', paddingTop: 20, paddingBottom: 10 },
  startOverButton: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#8B5CF6',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 4,
  },
  startOverButtonText: { color: '#8B5CF6', fontSize: 16, fontWeight: '600' },
  photoSection: { flex: 1, alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 },
  photoContainer: {
    width: 320,
    height: 400,
    borderRadius: 20,
    padding: 8,
    backgroundColor: '#8B5CF6',
    marginBottom: 32,
  },
  photo: { width: '100%', height: '100%', borderRadius: 16 },
  aiInsightsButton: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    elevation: 6,
    marginBottom: 16,
  },
  aiInsightsButtonDisabled: { backgroundColor: '#9CA3AF', shadowOpacity: 0.1 },
  aiInsightsButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  instructionText: { fontSize: 16, color: '#6c757d', textAlign: 'center', lineHeight: 24 },
  aiResultsContainer: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
    backgroundColor: '#f8f9fa',
    marginTop: 24,
    borderRadius: 20,
    marginHorizontal: 20,
    elevation: 4,
  },
  aiResultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  aiResultsTitle: { fontSize: 20, fontWeight: '700', color: '#212529', flex: 1, textAlign: 'center' },
  hideResultsButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  hideResultsButtonText: { color: '#ffffff', fontSize: 14, fontWeight: '500' },
  scrollView: { flex: 1 },
  scrollContent: { paddingBottom: 20 },
  bottomSpacing: { height: 40 },
  loadingContainer: { alignItems: 'center', paddingVertical: 60, paddingHorizontal: 20, minHeight: 200 },
  loadingDots: { flexDirection: 'row', justifyContent: 'center', marginBottom: 24, gap: 12 },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#8B5CF6',
    elevation: 4,
  },
  loadingText: { fontSize: 18, color: '#6c757d', textAlign: 'center', fontWeight: '500' },
});