//done!!
import { colors } from "@/constants/colors";
import { Image, StyleSheet, View } from "react-native";
import SearchBar from "./SearchBar";

type HomeHeaderProps = {
  searchText: string;
  onChangeSearchText: (text: string) => void;
  onSubmitSearch: () => void;
};

export default function HomeHeader({
  searchText,
  onChangeSearchText,
  onSubmitSearch,
}: HomeHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.searchContainer}>
        <SearchBar
          value={searchText}
          onChangeText={onChangeSearchText}
          onSubmit={onSubmitSearch}
          placeholder="Search recipes or categories..."
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    padding: 10,
    backgroundColor: colors.main_nav,
  },
  logoContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.accent,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  searchContainer: {
    flex: 1,
  },
});
