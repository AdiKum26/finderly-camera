/**
 * Created by Aditya Kumar on 30/08/2025
 * Documented clearly for understanding purposes
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

/**
 * HomeSearchIcon Component
 * 
 * A custom icon component that displays a house with a magnifying glass inside.
 * Uses a gradient from pink to purple to match the app's design theme.
 * 
 * The icon represents the concept of "home search" or "property investigation"
 * and is used as the main icon on the home screen.
 */
const HomeSearchIcon: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* House outline with gradient border effect */}
      <View style={styles.houseContainer}>
        {/* House roof */}
        <View style={styles.roof} />
        
        {/* House body */}
        <View style={styles.houseBody}>
          {/* Magnifying glass lens */}
          <View style={styles.magnifierLens} />
          
          {/* Magnifying glass handle */}
          <View style={styles.magnifierHandle} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  houseContainer: {
    width: 56,
    height: 56,
    position: 'relative',
  },
  
  // House roof (triangle shape)
  roof: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 20,
    borderRightWidth: 20,
    borderBottomWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FF6B9D', // Pink color
    alignSelf: 'center',
  },
  
  // House body (rectangle)
  houseBody: {
    width: 40,
    height: 32,
    backgroundColor: 'transparent',
    borderWidth: 3,
    borderColor: '#8B5CF6', // Purple color
    borderRadius: 4,
    alignSelf: 'center',
    marginTop: -2,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  
  // Magnifying glass lens (circle)
  magnifierLens: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#8B5CF6', // Purple color
    backgroundColor: 'transparent',
  },
  
  // Magnifying glass handle (line)
  magnifierHandle: {
    position: 'absolute',
    bottom: -8,
    right: -4,
    width: 12,
    height: 3,
    backgroundColor: '#8B5CF6', // Purple color
    borderRadius: 1.5,
    transform: [{ rotate: '45deg' }],
  },
});

export default HomeSearchIcon;
