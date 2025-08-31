/**
 * Created by Aditya Kumar on 08/30/2025
 * CameraScreen - Fullscreen photo capture interface
 */

import { useRef, useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Camera, useCameraDevice } from "react-native-vision-camera";
import ShutterButton from "../components/ShutterButton";
import { usePermissions } from "../hooks/usePermissions";

export default function CameraScreen() {
  const navigation = useNavigation<any>();

  // Get camera permissions
  const { granted, cameraStatus, request } = usePermissions();

  // Track which camera is active (front/back)
  const [facing, setFacing] = useState<"back" | "front">("back");
  const device = useCameraDevice(facing);

  // Reference to Camera component
  const cameraRef = useRef<Camera>(null);

  // Captured photo and flashlight toggle
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [torch, setTorch] = useState<"on" | "off">("off");

  // Check if the camera is ready to use
  const isCameraReady = useMemo(() => granted && !!device, [granted, device]);

  // Show permission screen if not granted
  if (cameraStatus !== "granted") {
    return (
      <View style={styles.center}>
        <Text style={styles.title}>Camera Permission</Text>
        <Text style={styles.msg}>We need access to your camera to take photos.</Text>
        <TouchableOpacity onPress={request} style={styles.btn}>
          <Text style={styles.btnText}>Grant Permission</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.btn, { backgroundColor: "#eee" }]}>
          <Text style={[styles.btnText, { color: "#333" }]}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Handle device not available (e.g. on simulators)
  if (!device) {
    return (
      <View style={styles.center}>
        <Text style={styles.msg}>No camera device available.</Text>
      </View>
    );
  }

  // Capture a photo using the current camera
  const handleTakePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePhoto({ flash: torch === "on" ? "on" : "off" });
      if (!photo) return;
      const uri = Platform.OS === "android" ? "file://" + photo.path : photo.path;
      setPhotoUri(uri);
    } catch (error) {
      console.warn("Failed to take photo", error);
    }
  };

  // Navigate to photo review with the captured photo
  const handleUsePhoto = () => {
    if (photoUri) {
      navigation.navigate("PhotoReview", { photoUri });
    }
  };

  return (
    <View style={styles.container}>
      {/* Live camera feed */}
      <Camera
        ref={cameraRef}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        photo={true}
        torch={torch}
      />

      {/* Overlay UI */}
      <View style={[StyleSheet.absoluteFill, styles.overlay]}>
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.pill}>
            <Text style={styles.pillText}>Back</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setTorch(t => t === "on" ? "off" : "on")} style={styles.pill}>
            <Text style={styles.pillText}>{torch === "on" ? "Torch On" : "Torch Off"}</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setFacing(f => f === "back" ? "front" : "back")} style={styles.pill}>
            <Text style={styles.pillText}>Flip</Text>
          </TouchableOpacity>
        </View>

        {/* Reticle overlay */}
        <View pointerEvents="none" style={styles.reticle} />

        <View style={styles.bottomBar}>
          <ShutterButton onPress={handleTakePhoto} />
        </View>

        {/* Show captured photo preview */}
        {photoUri && (
          <View style={styles.previewDock}>
            <Image source={{ uri: photoUri }} style={styles.preview} />
            <TouchableOpacity onPress={handleUsePhoto} style={[styles.pill, styles.useBtn]}>
              <Text style={styles.pillText}>Use Photo</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

// Styles for camera interface and overlays
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "black" },
  overlay: { justifyContent: "space-between" },
  topBar: {
    marginTop: 50,
    paddingHorizontal: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomBar: {
    marginBottom: 36,
    alignItems: "center",
  },
  pill: {
    backgroundColor: "rgba(0,0,0,0.5)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  pillText: { color: "white", fontWeight: "600" },
  reticle: {
    alignSelf: "center",
    width: "70%",
    height: "35%",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.8)",
    borderRadius: 12,
  },
  previewDock: {
    position: "absolute",
    bottom: 110,
    right: 16,
    alignItems: "center",
    gap: 8,
  },
  preview: {
    width: 96,
    height: 96,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },
  useBtn: { alignSelf: "center" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    gap: 12,
  },
  title: { fontSize: 20, fontWeight: "700" },
  msg: { color: "#555", textAlign: "center", marginBottom: 8 },
  btn: {
    backgroundColor: "#111827",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: { color: "white", fontWeight: "600" },
});