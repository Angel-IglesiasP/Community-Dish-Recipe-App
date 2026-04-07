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
    backgroundColor: colors.primary_orange,
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginBottom: 12,
    marginLeft: -18,
    width: 230,
    shadowColor: "#0000007a", //fix the shadows!!
    shadowOffset: {
      width: 1,
      height: 3,
    },
  },
  text: {
    color: colors.accent,
    fontSize: 26,
    fontWeight: "500",
    textAlign: "center",
  },
});
