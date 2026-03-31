import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import ScreenContainer from "../../components/ScreenContainer";
import SectionTitle from "../../components/SectionTitle";
import SearchBar from "../../components/SearchBar";
import RecipeCard from "../../components/RecipeCard";
import { colors } from "../../constants/colors";
import { Recipe } from "../../types/recipe";

const sampleRecipe: Recipe = {
  id: "1",
  source: "api",
  title: "Pad Thai",
  description: "A sweet, salty, and tangy noodle dish.",
  imageUrl: "",
  category: "Asian",
  servings: "4",
  ingredients: ["Rice noodles", "Eggs", "Peanuts"],
  preparation: ["Boil noodles", "Cook egg", "Mix everything together"],
};

export default function HomeScreen() {
  const [searchText, setSearchText] = useState("");
  const [submittedSearch, setSubmittedSearch] = useState("");

  const handleSearchSubmit = () => {
    setSubmittedSearch(searchText.trim());
  };

  return (
    <ScreenContainer>
      <SectionTitle title="Community Dish" />

      <SearchBar
        value={searchText}
        onChangeText={setSearchText}
        onSubmit={handleSearchSubmit}
        placeholder="Search recipes or categories..."
      />

      <View style={styles.infoCard}>
        <Text style={styles.infoText}>
          Submitted search: {submittedSearch || "None"}
        </Text>
      </View>

      <RecipeCard recipe={sampleRecipe} />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoText: {
    color: colors.text,
    fontSize: 16,
  },
});
