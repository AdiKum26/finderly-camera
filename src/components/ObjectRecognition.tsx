/**
 * Created by Aditya Kumar on 08/30/2025
 * ObjectRecognition - Renders object detection results using Base64 image
 */

import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { recognizeObjectsFromImage } from '../services/visionService';

interface ObjectRecognitionProps {
  imageBase64: string;
  photoUri: string;
}

const ObjectRecognition: React.FC<ObjectRecognitionProps> = ({ imageBase64, photoUri }) => {
  const [objects, setObjects] = useState<string[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Trigger object recognition on mount
  useEffect(() => {
    const fetchObjects = async () => {
      try {
        const result = await recognizeObjectsFromImage(imageBase64);
        if (result?.objects && result.objects.length > 0) {
          setObjects(result.objects);
          setLabels([]);
        } else if (result?.labels && result.labels.length > 0) {
          setObjects([]);
          setLabels(result.labels);
        } else {
          setError('No recognizable objects found.');
        }
      } catch (e) {
        console.error('Recognition error:', e);
        setError('Unable to process image. Try again later.');
      }
    };

    fetchObjects();
  }, [imageBase64]);

  return (
    <View style={styles.container}>
      {/* Display results or error */}
      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View style={styles.labelsContainer}>
          {objects.length > 0 ? (
            <>
              <Text style={styles.labelHeader}>Recognized Devices:</Text>
              {objects.map((object, index) => (
                <Text key={index} style={styles.labelItem}>• {object}</Text>
              ))}
            </>
          ) : labels.length > 0 ? (
            <>
              <Text style={styles.labelHeader}>Recognized Objects:</Text>
              {labels.map((label, index) => (
                <Text key={index} style={styles.labelItem}>• {label}</Text>
              ))}
            </>
          ) : (
            <Text style={styles.loading}>Scanning...</Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 16, alignItems: 'center' },
  errorText: {
    color: '#EF4444',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 16,
  },
  labelsContainer: { alignItems: 'flex-start', width: '100%', paddingHorizontal: 24 },
  labelHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  labelItem: {
    fontSize: 16,
    color: '#1F2937',
    marginBottom: 4,
  },
  loading: {
    fontSize: 16,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
});

export default ObjectRecognition;