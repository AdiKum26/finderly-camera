/**
 * ShutterButton Component
 * 
 * Reusable camera shutter button component that provides visual feedback
 * and accessibility features for photo capture functionality.
 * 
 * Features:
 * - Circular design with inner/outer styling
 * - Press state visual feedback
 * - Disabled state handling
 * - Accessibility support
 * - Consistent sizing and spacing
 * 
 * @author Aditya Kumar
 * @created 2024
 * @version 1.0.0
 */

import { Pressable, StyleSheet, View } from "react-native";

/**
 * Props interface for ShutterButton component
 * 
 * @interface Props
 * @property {() => void} onPress - Callback function triggered on button press
 * @property {boolean} [disabled] - Optional flag to disable button interaction
 */
type Props = { 
  onPress: () => void; 
  disabled?: boolean; 
};

/**
 * ShutterButton - Interactive camera capture button
 * 
 * This component implements a professional camera shutter button design
 * with proper touch feedback, accessibility features, and visual states.
 * It demonstrates React Native best practices for custom button components.
 * 
 * @param props - Component props containing onPress handler and disabled state
 * @returns JSX.Element - Rendered shutter button component
 */
export default function ShutterButton({ onPress, disabled }: Props) {
  return (
    <Pressable 
      onPress={onPress} 
      disabled={disabled} 
      style={({ pressed }) => [
        styles.outer, 
        pressed && { opacity: 0.7 }
      ]}
      accessibilityRole="button"
      accessibilityLabel="Take photo"
      accessibilityHint="Double tap to capture a photo"
    >
      <View style={[styles.inner, disabled && { opacity: 0.5 }]} />
    </Pressable>
  );
}

// Button dimensions and styling constants
const SIZE = 80;
const BORDER_WIDTH = 4;
const INNER_OFFSET = 18;

// Component-specific styles following design system principles
const styles = StyleSheet.create({
  // Outer circular container with border styling
  outer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: BORDER_WIDTH,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    // Subtle shadow for depth (iOS only)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Android elevation
    elevation: 5,
  },
  
  // Inner circular fill with solid background
  inner: {
    width: SIZE - INNER_OFFSET,
    height: SIZE - INNER_OFFSET,
    borderRadius: (SIZE - INNER_OFFSET) / 2,
    backgroundColor: "#fff",
  },
});
