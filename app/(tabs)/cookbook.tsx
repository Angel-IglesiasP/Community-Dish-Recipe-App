import { useMyRecipes } from "@/src/context/MyRecipesContext";
import { router } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import RecipeCard from "../../components/RecipeCard";
import ScreenContainer from "../../components/ScreenContainer";
import SectionHeader from "../../components/SectionHeader";
import { colors } from "../../constants/colors";

export default function CookbookScreen() {
  const { myRecipes } = useMyRecipes();

  return (
    <ScreenContainer>
      <SectionHeader title="My Cookbook" />

      {myRecipes.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You have not created any recipes yet.
          </Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.grid}>
            {myRecipes.map((recipe) => (
              <View key={recipe.id} style={styles.gridItem}>
                <RecipeCard
                  recipe={recipe}
                  onPress={() =>
                    router.push({
                      pathname: "/recipe/[id]",
                      params: { id: recipe.id },
                    })
                  }
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.main_nav,
    textAlign: "center",
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
