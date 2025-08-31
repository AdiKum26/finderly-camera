/**
 * Created by Aditya Kumar on 08/30/2025
 * Reusable shutter button for camera capture
 */

import { Pressable, StyleSheet, View } from 'react-native';

type Props = {
  onPress: () => void;
  disabled?: boolean;
};

/**
 * ShutterButton - A round camera button with tap feedback
 * 
 * - Shows pressed state visually
 * - Disabled state fades the button
 * - Accessibility labels for screen readers
 */
export default function ShutterButton({ onPress, disabled }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.outer,
        pressed && { opacity: 0.7 },
      ]}
      accessibilityRole="button"
      accessibilityLabel="Take photo"
      accessibilityHint="Double tap to capture a photo"
    >
      <View style={[styles.inner, disabled && { opacity: 0.5 }]} />
    </Pressable>
  );
}

// Size constants for outer and inner circle
const SIZE = 80;
const BORDER_WIDTH = 4;
const INNER_OFFSET = 18;

const styles = StyleSheet.create({
  outer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inner: {
    width: SIZE - INNER_OFFSET,
    height: SIZE - INNER_OFFSET,
    borderRadius: (SIZE - INNER_OFFSET) / 2,
    backgroundColor: '#fff',
  },
});