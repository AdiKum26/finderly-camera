/**
 * Created by Aditya Kumar on 08/30/2025
 * HowItWorksScreen - Explains Finderly functionality
 */

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

const HowItWorksScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top nav header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Instructions content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.infoIconContainer}>
          <View style={styles.infoIcon}>
            <Text style={styles.infoIconText}>i</Text>
          </View>
        </View>

        <Text style={styles.title}>How Finderly works</Text>

        <Text style={styles.introText}>
          Use Finderly to analyze photos using AI. Whether it's an object, issue, or item — get useful insights in seconds.
        </Text>

        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>1</Text></View>
            <Text style={styles.stepText}>Take a photo or choose one from your gallery.</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>2</Text></View>
            <Text style={styles.stepText}>AI scans the image to detect objects and text.</Text>
          </View>

          <View style={styles.step}>
            <View style={styles.stepNumber}><Text style={styles.stepNumberText}>3</Text></View>
            <Text style={styles.stepText}>Get instant results with labels, suggestions, or matches.</Text>
          </View>
        </View>

        <Text style={styles.scopeText}>
          Finderly is ideal for identifying everyday objects, appliances, tools, and more.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// Basic UI styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  backButton: { padding: 8 },
  backButtonText: {
    fontSize: 32,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  scrollView: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 40 },
  infoIconContainer: { alignItems: 'center', marginBottom: 24 },
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
  infoIconText: {
    fontSize: 28,
    color: '#8B5CF6',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 40,
  },
  introText: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 32,
    maxWidth: 320,
    alignSelf: 'center',
  },
  stepsContainer: { marginBottom: 32 },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
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
  stepNumberText: {
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#374151',
    lineHeight: 24,
    fontWeight: '500',
  },
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