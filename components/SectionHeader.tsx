import { Image, StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

type SectionHeaderProps = {
  title: string;
};

export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View pointerEvents="none" style={styles.titleOverlay}>
        <View style={styles.titlePill}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: 70,
    justifyContent: "center",
    paddingHorizontal: 10,
    backgroundColor: colors.main_nav,
    marginBottom: 12,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  titleOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titlePill: {
    minWidth: 200,
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
