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
      <View style={styles.sideSlot}>
        <Pressable onPress={onMenuPress}>
          <Text style={styles.menuButtonText}>☰</Text>
        </Pressable>
      </View>

      <View style={styles.centerSlot}>
        <View style={styles.titlePill}>
          <Text style={styles.titleText} numberOfLines={1}>
            {title}
          </Text>
        </View>
      </View>

      <View style={styles.sideSlot} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 70,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.main_nav,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  sideSlot: {
    width: 56,
    justifyContent: "center",
    alignItems: "center",
  },

  centerSlot: {
    flex: 1,
    alignItems: "center",
  },

  menuButtonText: {
    fontSize: 44,
    fontWeight: "800",
    color: colors.primary_orange,
  },

  titlePill: {
    minWidth: 200,
    maxWidth: "85%",
    backgroundColor: colors.primary_orange,
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  titleText: {
    color: colors.accent,
    fontSize: 20,
    fontWeight: "700",
    textAlign: "center",
  },
});
