import { StyleSheet, Text, View } from "react-native";
import { colors } from "../constants/colors";

type CategoryTitleProps = {
  title: string;
};

export default function CategoryTitle({ title }: CategoryTitleProps) {
  return (
    <View style={styles.pill}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginBottom: 12,
    marginLeft: -25,
    width: 150,
    shadowColor: "#0000007a",
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
