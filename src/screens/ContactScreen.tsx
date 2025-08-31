/**
 * Created by Aditya Kumar on 08/30/2025
 * ContactScreen - App support and contact details
 */

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

const ContactScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with back navigation */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>‹</Text>
        </TouchableOpacity>
      </View>

      {/* Scrollable contact content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* App Icon */}
        <View style={styles.iconContainer}>
          <Image
            source={require('../../assets/finderly-icon.jpg')}
            style={styles.houseIcon}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>Contact Us</Text>

        <Text style={styles.description}>
          Need help? Reach out via email:
        </Text>

        <View style={styles.emailContainer}>
          <Text style={styles.email}>support@finderly.us</Text>
        </View>

        <Text style={styles.additionalInfo}>
          We're happy to assist with any questions, feedback, or issues.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

// Styling for layout and typography
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 32,
    color: '#8B5CF6',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  houseIcon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 40,
  },
  description: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 24,
    maxWidth: 320,
  },
  emailContainer: {
    backgroundColor: '#F3E8FF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#8B5CF6',
  },
  email: {
    fontSize: 20,
    fontWeight: '600',
    color: '#8B5CF6',
    textAlign: 'center',
  },
  additionalInfo: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 320,
  },
});

export default ContactScreen;