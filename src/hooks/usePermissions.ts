/**
 * Created by Aditya Kumar on 08/30/2025
 * usePermissions.ts - Requests camera permission using react-native-vision-camera
 */

import { useEffect, useState } from 'react';
import { Camera } from 'react-native-vision-camera';

/**
 * usePermissions - Hook that checks and requests camera permissions
 * Returns whether permission is granted
 */
export const usePermissions = () => {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const request = async () => {
    const status = await Camera.requestCameraPermission();
    setHasPermission(status === 'granted');
    return status;
  };

  useEffect(() => {
    request();
  }, []);

  return {
    granted: hasPermission,
    cameraStatus: hasPermission ? 'granted' : 'denied',
    request
  };
};