import { StyleSheet, Text } from "react-native";
import { colors } from "../constants/colors";

type TrendingTitleProps = {
  title: string;
};

export default function TrendingTitle({ title }: TrendingTitleProps) {
  return <Text style={styles.title}>{title}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "700",
    color: colors.main_nav,
    marginBottom: 8,
    marginTop: 8,
    marginLeft: 16,
  },
});
