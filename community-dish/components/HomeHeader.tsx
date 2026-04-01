import { Image, StyleSheet, View } from "react-native";
import SearchBar from "./SearchBar";
import { colors } from "../constants/colors";

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
    marginBottom: 16,
  },
  logoContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  logo: {
    width: 40,
    height: 40,
  },
  searchContainer: {
    flex: 1,
  },
});
