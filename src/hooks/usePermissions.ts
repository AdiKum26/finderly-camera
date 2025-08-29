import { useEffect, useState } from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";

export function usePermissions() {
  const [cameraStatus, setCameraStatus] = useState<CameraPermissionStatus>("not-determined");
  const [micStatus, setMicStatus] = useState<CameraPermissionStatus>("not-determined");

  useEffect(() => {
    (async () => {
      const c = await Camera.getCameraPermissionStatus();
      const m = await Camera.getMicrophonePermissionStatus();
      setCameraStatus(c);
      setMicStatus(m);
    })();
  }, []);

  const request = async () => {
    const c = await Camera.requestCameraPermission();
    const m = await Camera.requestMicrophonePermission();
    setCameraStatus(c);
    setMicStatus(m);
  };

  const granted = cameraStatus === "granted"; // mic optional for photo
  return { cameraStatus, micStatus, granted, request };
}
