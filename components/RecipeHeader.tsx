import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

type RecipeHeaderProps = {
  title: string;
  onMenuPress?: () => void;
};

export default function RecipeHeader({
  title,
  onMenuPress,
}: RecipeHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onMenuPress}>
        <Text style={styles.menuButtonText}>☰</Text>
      </Pressable>

      <View style={styles.titleOverlay}>
        <View style={styles.titlePill}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.main_nav,
    marginBottom: 15,
  },
  menuButtonText: {
    fontSize: 60,
    fontWeight: "800",
    color: colors.primary_orange,
  },
  titleOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 70,
  },
  titlePill: {
    minWidth: 200,
    maxWidth: "70%",
    backgroundColor: colors.primary_orange,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    justifyContent: "center",
  },
  titleText: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
