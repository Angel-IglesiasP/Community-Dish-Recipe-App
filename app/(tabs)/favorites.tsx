import { useFavorites } from "@/src/context/FavoritesContext";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecipeCard from "../../components/RecipeCard";
import ScreenContainer from "../../components/ScreenContainer";
import { colors } from "../../constants/colors";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();

  return (
    <ScreenContainer>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You have no saved recipes yet.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {favorites.map((recipe) => (
              <View key={recipe.id} style={styles.gridItem}>
                <RecipeCard recipe={recipe} />
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.secondary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.mutedText,
    textAlign: "center",
  },
  favoriteItem: {
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 12,
  },
  gridItem: {
    width: "48%",
    marginBottom: 12,
  },
});
