/**
 * Babel Configuration for Finderly Camera
 * 
 * Babel configuration file that sets up the build pipeline for the
 * React Native application. Configures presets and plugins for
 * proper transpilation and optimization.
 * 
 * Key Configuration:
 * - Expo preset for React Native compatibility
 * - Reanimated plugin for advanced animations (MUST be last)
 * - Cache optimization for development builds
 * 
 * @author Aditya Kumar
 * @created 2024
 * @version 1.0.0
 */

/**
 * Babel configuration function
 * 
 * This function configures the Babel transpiler with the necessary
 * presets and plugins for React Native development. The configuration
 * is optimized for Expo projects and includes essential plugins
 * for modern React Native features.
 * 
 * @param {Object} api - Babel API object for configuration
 * @param {boolean} api.cache - Cache configuration flag
 * @returns {Object} Babel configuration object
 */
module.exports = function(api) {
  // Enable caching for improved build performance
  api.cache(true);
  
  return {
    // Presets define the base configuration for React Native
    presets: [
      "babel-preset-expo" // Expo-specific preset for React Native
    ],
    
    // Plugins extend functionality and must be in specific order
    plugins: [
      // React Native Reanimated plugin - MUST be the last plugin
      // This is critical for proper animation and gesture handling
      "react-native-reanimated/plugin"
    ],
  };
};
