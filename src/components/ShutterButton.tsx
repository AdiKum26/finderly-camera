import { Pressable, StyleSheet, View } from "react-native";

type Props = { onPress: () => void; disabled?: boolean; };

export default function ShutterButton({ onPress, disabled }: Props) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={({ pressed }) => [styles.outer, pressed && { opacity: 0.7 }]}>
      <View style={[styles.inner, disabled && { opacity: 0.5 }]} />
    </Pressable>
  );
}

const SIZE = 80;
const styles = StyleSheet.create({
  outer: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    borderWidth: 4,
    borderColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    width: SIZE - 18,
    height: SIZE - 18,
    borderRadius: (SIZE - 18) / 2,
    backgroundColor: "#fff",
  },
});
