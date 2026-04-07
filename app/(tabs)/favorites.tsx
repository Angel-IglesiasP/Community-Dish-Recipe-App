import { useFavorites } from "@/src/context/FavoritesContext";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecipeCard from "../../components/RecipeCard";
import ScreenContainer from "../../components/ScreenContainer";
import SearchBar from "../../components/SearchBar";
import SectionHeader from "../../components/SectionHeader";
import { colors } from "../../constants/colors";

export default function FavoritesScreen() {
  const { favorites, toggleFavorite } = useFavorites();
  const [searchText, setSearchText] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const handleSearchSubmit = () => {
    setSubmittedSearch(searchText.trim());
  };
  const filteredFavorites =
    submittedSearch.length === 0
      ? favorites
      : favorites.filter((recipe) =>
          recipe.title.toLowerCase().includes(submittedSearch.toLowerCase()),
        );

  return (
    <ScreenContainer>
      <SectionHeader title="Favorites" />
      <View style={styles.searchContainer}>
        <SearchBar
          value={searchText}
          onChangeText={setSearchText}
          onSubmit={handleSearchSubmit}
          placeholder="Search favorites..."
        />
      </View>

      {filteredFavorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You have no saved recipes yet.</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {filteredFavorites.map((recipe) => (
              <View key={recipe.id} style={styles.gridItem}>
                <RecipeCard
                  recipe={recipe}
                  isFavorite={true}
                  onToggleFavorite={() => toggleFavorite(recipe)}
                />
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
    color: colors.main_nav,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    borderRadius:10,
    padding:12,
    backgroundColor:colors.accent,
    fontSize: 18,
    fontWeight: "600",
    color: colors.place_holder,
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
  searchContainer: {
    paddingHorizontal: 12,
    marginBottom: 4,
    height: 70,
  },
});
