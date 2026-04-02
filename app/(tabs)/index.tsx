import { useFavorites } from "@/src/context/FavoritesContext";
import { useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CategoryTitle from "../../components/CategoryTitle";
import HomeHeader from "../../components/HomeHeader";
import RecipeCard from "../../components/RecipeCard";
import RecipePreviewCard from "../../components/RecipePreviewCard";
import ScreenContainer from "../../components/ScreenContainer";
import TrendingTitle from "../../components/TrendingTitle";
import { colors } from "../../constants/colors";
import {
  getMealsByCategory,
  getTrendingMeals,
  searchMealsByName,
} from "../../services/mealDb";
import { Recipe } from "../../types/recipe";

type CategorySection = {
  title: string;
  recipes: Recipe[];
};

const HOME_CATEGORIES = ["Beef", "Chicken", "Seafood", "Vegetarian"];

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Recipe[]>([]);
  const [categorySections, setCategorySections] = useState<CategorySection[]>(
    [],
  );
  const [loading, setLoading] = useState(false);
  const [homeLoading, setHomeLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [trendingRecipes, setTrendingRecipes] = useState<Recipe[]>([]);
  const { isFavorite, toggleFavorite } = useFavorites();
  const { reset } = useLocalSearchParams<{ reset?: string }>();
  const resetHomeScreen = useCallback(() => {
    setSearchText("");
    setSubmittedSearch("");
    setSearchResults([]);
    setErrorMessage("");
  }, []);

  useEffect(() => {
    const loadHomeCategories = async () => {
      try {
        setHomeLoading(true);
        setErrorMessage("");

        const [trending, sectionResults] = await Promise.all([
          getTrendingMeals(),
          Promise.all(
            HOME_CATEGORIES.map(async (category) => {
              const recipes = await getMealsByCategory(category);
              return {
                title: category,
                recipes: recipes.slice(0, 5),
              };
            }),
          ),
        ]);

        setTrendingRecipes(trending);
        setCategorySections(sectionResults);
      } catch (error) {
        setErrorMessage("Could not load home categories.");
      } finally {
        setHomeLoading(false);
      }
    };

    loadHomeCategories();
  }, []);

  const handleSearchSubmit = async () => {
    const trimmedSearch = searchText.trim();

    setSubmittedSearch(trimmedSearch);

    if (!trimmedSearch) {
      setSearchResults([]);
      setErrorMessage("");
      return;
    }

    try {
      setLoading(true);
      setErrorMessage("");

      const results = await searchMealsByName(trimmedSearch);
      setSearchResults(results);
    } catch (error) {
      setErrorMessage("Could not load recipes. Please try again.");
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    resetHomeScreen();
  }, [reset, resetHomeScreen]);

  const isShowingSearchResults = submittedSearch.length > 0;

  return (
    <ScreenContainer>
      <HomeHeader
        searchText={searchText}
        onChangeSearchText={setSearchText}
        onSubmitSearch={handleSearchSubmit}
      />

      {loading || homeLoading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : null}

      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      <ScrollView showsVerticalScrollIndicator={false}>
        {isShowingSearchResults ? (
          <View style={styles.searchResultsContainer}>
            <Text style={styles.resultsTitle}>Recipes you might like!:</Text>
            <View style={styles.grid}>
              {searchResults.map((recipe) => (
                <View key={recipe.id} style={styles.gridItem}>
                  <RecipeCard recipe={recipe} />
                </View>
              ))}
            </View>
            {!loading && searchResults.length === 0 ? (
              <Text style={styles.emptyText}>No recipes found.</Text>
            ) : null}
          </View>
        ) : (
          <>
            <View style={styles.trendingContainer}>
              <TrendingTitle title="Trending" />
              <View style={styles.trendingDivider} />
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.horizontalList}
              >
                {trendingRecipes.map((recipe) => (
                  <RecipePreviewCard
                    key={recipe.id}
                    recipe={recipe}
                    isFavorite={isFavorite(recipe.id)}
                    onToggleFavorite={() => toggleFavorite(recipe)}
                  />
                ))}
              </ScrollView>
            </View>

            {categorySections.map((section) => (
              <View key={section.title} style={styles.section}>
                <CategoryTitle title={section.title} />
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalList}
                >
                  {section.recipes.map((recipe) => (
                    <RecipePreviewCard
                      key={recipe.id}
                      recipe={recipe}
                      isFavorite={isFavorite(recipe.id)}
                      onToggleFavorite={() => toggleFavorite(recipe)}
                    />
                  ))}
                </ScrollView>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 8,
  },
  errorText: {
    color: "#B91C1C",
    marginBottom: 12,
    fontSize: 16,
  },
  emptyText: {
    color: colors.mutedText,
    fontSize: 16,
    marginTop: 8,
    marginBottom: 16,
    textAlign: "center",
  },
  horizontalList: {
    paddingBottom: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    marginBottom: 12,
  },
  trendingContainer: {
    backgroundColor: "#caa2a2",
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 20,
    padding: 1,
    margin: 15,
  },
  trendingDivider: {
    height: 2,
    backgroundColor: "#000000",
    marginTop: -4,
    marginBottom: 12,
    width: "85%",
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.secondary,
    marginBottom: 12,
  },
  searchResultsContainer: {
    paddingHorizontal: 12,
    paddingTop: 5,
  },
});
