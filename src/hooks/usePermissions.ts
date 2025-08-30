/**
 * usePermissions Hook
 * 
 * Custom React hook for managing camera and photo library permissions
 * using react-native-vision-camera and expo-image-picker. Provides a clean interface for
 * permission status checking and requesting user consent.
 * 
 * Features:
 * - Automatic permission status detection
 * - Graceful permission request handling
 * - Real-time permission state updates
 * - Type-safe permission status management
 * - Clean API for component integration
 * 
 * @author Aditya Kumar
 * @created 2024
 * @version 1.0.0
 */

import { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";

/**
 * Permission status types from react-native-vision-camera
 * 
 * @typedef {CameraPermissionStatus} PermissionStatus
 * - "not-determined" - Permission not yet requested
 * - "denied" - Permission denied by user
 * - "restricted" - Permission restricted by system
 * - "granted" - Permission granted by user
 */

/**
 * Return type for usePermissions hook
 * 
 * @interface PermissionsState
 * @property {CameraPermissionStatus} cameraStatus - Current camera permission status
 * @property {boolean} granted - Whether camera permission is granted
 * @property {() => Promise<void>} request - Function to request camera permission
 */
interface PermissionsState {
  cameraStatus: CameraPermissionStatus;
  granted: boolean;
  request: () => Promise<void>;
}

/**
 * usePermissions - Camera permission management hook
 * 
 * This hook provides a comprehensive solution for handling camera permissions
 * in photo capture applications. It automatically detects current permission states
 * and provides methods for requesting user consent when needed.
 * 
 * The hook follows React best practices by using useEffect for side effects
 * and provides a clean, predictable API for components to consume.
 * 
 * @returns {PermissionsState} Object containing permission states and request function
 * 
 * @example
 * ```tsx
 * const { granted, cameraStatus, request } = usePermissions();
 * 
 * if (!granted) {
 *   return <PermissionRequest onRequest={request} />;
 * }
 * ```
 */
export function usePermissions(): PermissionsState {
  // Local state for tracking camera permission status
  const [cameraStatus, setCameraStatus] = useState<CameraPermissionStatus>("not-determined");

  /**
   * Effect hook to initialize permission statuses on component mount
   * 
   * This effect runs once when the hook is first used and queries
   * the current permission states from the device. It uses async/await
   * pattern for clean, readable permission checking code.
   */
  useEffect(() => {
    // Immediately invoked async function to check permissions
    (async () => {
      try {
        // Query current camera permission status from device
        const cameraPermission = await Camera.getCameraPermissionStatus();
        
        // Update local state with current permission value
        setCameraStatus(cameraPermission);
      } catch (error) {
        // Gracefully handle permission checking errors
        console.warn("Failed to check camera permission status:", error);
        
        // Set default state on error
        setCameraStatus("not-determined");
      }
    })();
  }, []); // Empty dependency array ensures effect runs only once

  /**
   * Request camera permission from the user
   * 
   * This function handles the permission request flow for camera access.
   * It updates the local state based on user responses and provides
   * a unified interface for permission management.
   * 
   * @returns {Promise<void>} Promise that resolves when permission is processed
   * 
   * @throws {Error} May throw if permission request fails
   */
  const request = async (): Promise<void> => {
    try {
      // Request camera permission
      const cameraPermission = await Camera.requestCameraPermission();
      
      // Update local state with user's permission decision
      setCameraStatus(cameraPermission);
    } catch (error) {
      // Handle permission request failures gracefully
      console.error("Failed to request camera permission:", error);
      
      // Set denied status on error to prevent infinite retry loops
      setCameraStatus("denied");
    }
  };

  // Computed value indicating if camera access is available
  const granted = cameraStatus === "granted";

  // Return permission state object for component consumption
  return { 
    cameraStatus, 
    granted, 
    request 
  };
}
