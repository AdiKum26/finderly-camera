import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "../../App";
import { View, Text, Image, StyleSheet, Button, SafeAreaView } from "react-native";

export default function HomeScreen() {
  const nav = useNavigation<any>();
  const route = useRoute<RouteProp<RootStackParamList, "Home">>();
  const photoUri = route.params?.photoUri;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome 👋</Text>
      <Text style={styles.subtitle}>Tap below to open the camera and take a photo.</Text>
      <Button title="Open Camera" onPress={() => nav.navigate("Camera")} />

      {photoUri ? (
        <View style={styles.previewWrap}>
          <Text style={styles.previewTitle}>Last photo</Text>
          <Image source={{ uri: photoUri }} style={styles.preview} resizeMode="cover" />
        </View>
      ) : (
        <Text style={{ marginTop: 16, color: "#666" }}>No photo yet</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 16, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 14, color: "#666", textAlign: "center" },
  previewWrap: { marginTop: 24, width: "100%", alignItems: "center" },
  previewTitle: { fontSize: 16, fontWeight: "600", marginBottom: 8 },
  preview: { width: "100%", height: 280, borderRadius: 12 },
});
